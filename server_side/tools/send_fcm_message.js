var request = require('request');
var admin = require('firebase-admin');
var PROJECT_ID = 'pushnotification-124c9';
var HOST = 'fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
//npm start index.js & 
//ps ax|grep node 
//$env:GOOGLE_APPLICATION_CREDENTIALS='pushnotification-124c9-firebase-adminsdk-yjb00-75cd76c370.json'
//export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
module.exports = function() {
    this.sendFcmMessage = function (token,callback) {
//HTTP V1 SDK


                var registrationToken = 'fg1Low5vUOVNJHrKNCOgwP:APA91bHRcFvFl11ysmyexfnnZeAtKW6hqWQtq7eZeugaH7FjgmyvoaEhvdlhjcvHKWKT_nNyeDlzTfV7OenTXu2mENmaUsJ0cE6CNyHy5soWABMm5GUgpsR-nWKrSpAhFXLEr9zczy6B';

                var message = {
                data: {
                    score: '850',
                    time: '2:45'
                },
                token: registrationToken
                };

                // Send a message to the device corresponding to the provided
                // registration token.
                admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });

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


    // call HTTP legacy API
        const data = JSON.stringify(

            {
                "notification":{
                    'title':'this is a notification title',
                    'body':'this is a notification body',
                    'image':'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
                    "icon": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            },
                "to":"fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH"
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
            console.log(body);
        })
*/
    }
}