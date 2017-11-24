import { Component } from '@angular/core';

import { PushSubscriberService } from './push-subscriber.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Web Push API Demo';

    constructor(public pushSubscriber: PushSubscriberService) {
    }
}
