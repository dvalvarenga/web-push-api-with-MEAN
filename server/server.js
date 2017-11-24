const express = require("express");
const webpush = require('web-push');
const bodyParser = require('body-parser');

const app = express();

//not compulsory. just for tracking
webpush.setGCMAPIKey('<Your GMC API Key>');

webpush.setVapidDetails(
    'mailto:eshwar.more@gmail.com',
    'BKhiNM4mUdr8E3tLGgCcBls08iLAH5CKhkVx1G0KwTmJ2Z7luXvardf3bdbKxVtnnuNPwCIfMQ3iCDV1lGpK5Ug',
    'u7JW6r7pyFm3i4p5sX7e1vyc5lYP8zzhycuJJHhamqc'
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// This is the same output of calling JSON.stringify on a PushSubscription
let pushSubscription;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/register', (req, res) => {
    pushSubscription = req.body;
    res.send({});
})

app.post('/sendmessage', (req, res) => {
    if (pushSubscription && Object.keys(pushSubscription).length > 0) {
        if (!req.body.message) {
            req.body.message = 'this is default messsage!';
        }
        webpush.sendNotification(pushSubscription, req.body.message);
        res.send('pushed successfully!');
    } else {
        res.send('sorry! no service worker registered yet');
    }
})

app.listen(3000, () => console.log('Web Push API demo app listening on port 3000!'));