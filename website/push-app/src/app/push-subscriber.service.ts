import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PushSubscriberService {

    private readonly _applicationServerPublicKey
    = 'BKhiNM4mUdr8E3tLGgCcBls08iLAH5CKhkVx1G0KwTmJ2Z7luXvardf3bdbKxVtnnuNPwCIfMQ3iCDV1lGpK5Ug';
    private _swRegistration: any;
    public isSupported = true;
    public isSubscribed: boolean;

    constructor(private _http: Http) {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('assets/sw.js')
                .then((swReg) => {
                    console.log('Service Worker is registered', swReg);
                    this._swRegistration = swReg;
                    this.isSupported = true;

                    this._swRegistration.pushManager.getSubscription()
                        .then((isSubscribed) => {
                            this.isSubscribed = isSubscribed;
                        })
                        .catch((error) => {
                            console.log('error: ' + error);
                        });
                })
                .catch(function (error) {
                    console.error('Service Worker Error', error);
                });
        } else {
            console.warn('Push messaging is not supported');
            alert('Push Not Supported');
            this.isSupported = false;
        }
    }

    public subscribe(): void {
        const applicationServerKey = this.urlB64ToUint8Array(this._applicationServerPublicKey);
        this._swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then((subscription) => {
                console.log('User is subscribed.');

                this.updateSubscriptionOnServer(subscription);

                this.isSubscribed = true;
            })
            .catch(function (err) {
                console.log('Failed to subscribe the user: ', err);
                alert('Failed to subscribe the user.. retry');
            });
    }

    public unsubscribe() {
        this._swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(function (error) {
                console.log('Error unsubscribing', error);
            })
            .then(() => {
                this.updateSubscriptionOnServer(null);

                console.log('User is unsubscribed.');
                this.isSubscribed = false;
            });
    }

    private updateSubscriptionOnServer(subscription): void {
        this._http.post('http://localhost:3000/register', subscription)
            .subscribe((res) => {
                console.log('successfully sent subscription object to our server');
            }, (error) => {
                alert('may be our server not running on port 3000');
                console.log(error);
            })
    }

    private urlB64ToUint8Array(base64String): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

}
