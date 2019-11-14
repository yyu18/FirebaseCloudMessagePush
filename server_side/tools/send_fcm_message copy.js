require('./get_access_token.js')();
const https = require('https');

var PROJECT_ID = 'pushnotification-124c9';
var HOST = 'fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';

module.exports = function() {
    this.sendFcmMessage = function (fcmMessage) {
        getAccessToken().then(function(accessToken) {

            const data = JSON.stringify({
                "message": {
                    "token" : 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH',
                    "notification": {
                      "title": "FCM Message",
                      "body": "This is a message from FCM"
                    },
                    "webpush": {
                      "headers": {
                        "Urgency": "high"
                      },
                      "notification": {
                        "body": "This is a message from FCM to web",
                        "requireInteraction": "true",
                        "badge": "/badge-icon.png"
                      }
                    }
                  }
                });
            console.log(data);

            var options = {
                hostname: HOST,
                path: PATH,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken.access_token,
                    'Content-Type':'application/json',
                    'Content-Type': data.length
                    },
                };
            var request = https.request(options, function(resp) {
                resp.setEncoding('utf8');
                resp.on('data', function(data) {
                    console.log('Message sent to Firebase for delivery, response:');
                    console.log(data);
                });
            });
            request.on('error', function(err) {
                console.log('Unable to send message to Firebase');
                console.log(err);
            });
            request.write(JSON.stringify(fcmMessage));
            request.end();
        });
    }
}