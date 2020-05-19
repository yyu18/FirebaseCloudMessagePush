const https = require('https');
var request = require('request');

var PROJECT_ID = 'pushnotification-124c9';
var HOST = 'fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';

module.exports = function() {
    this.sendFcmMessage = function (token) {
        console.log(token);
/*
    //call HTTP V1 API
        const data = JSON.stringify(
            {
                "message": {
                "token" : "fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH",
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
            }
        );

        request.post({
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type':'application/json',
            },
            url:'https://fcm.googleapis.com/v1/projects/' + PROJECT_ID + '/messages:send HTTP/1.1',
            body:data
        },function(err, res, body){
            console.log(body);
        })
*/

    // call HTTP legacy API
        const data = JSON.stringify(

            {
                "notification":{
                    'title':'this is a notification title',
                    'body':'this is a notification body',
                    'image':'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
                    "icon": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            },
                "to":token
              }
        );

        request.post({
            headers: {
            'content-type':'application/json',
            'authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'
            },
            url:'https://fcm.googleapis.com/fcm/send',
            body:data
        },function(err, res, body){
            console.log(body);
        })

    }
}