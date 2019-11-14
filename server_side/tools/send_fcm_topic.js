const https = require('https');
var request = require('request');

var PROJECT_ID = 'pushnotification-124c9';

module.exports = function() {
    this.sendFcmTopic = function (token,topic) {
        return new Promise(function(resolve, reject) {
    // call HTTP legacy API
        const data = JSON.stringify(

            {
                "notification":{
                    'title':'this is a notification title',
                    'body':'this is a notification body',
                    'image':'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
                    "icon": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
                    'click_action':'http://localhost:3000/'
            },
                "to":"/topics/" + topic
              }
        );

        request.post({
            headers: {
            'content-type':'application/json',
            'authorization':'key=AAAAmhzl77Y:APA91bEmevvvsA5Qx-tunGhOz6q_Q7BJg4EYd7vsRw6twCsYcmz562BTXYsDj3TyduOWB7rrAZ96uW5LmENbc_oGUPRrgif44QEiht0AFKDgmuvedmn3CK4ppUAb576esZZAeDS2HgYG'
            },
            url:'https://fcm.googleapis.com/fcm/send',
            body:data
        },function(err, res, body){
            resolve(body);
        })


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
    })
    }
}