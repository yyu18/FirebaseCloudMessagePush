var request = require('request');
var PROJECT_ID = 'pushnotification-124c9';
require('./valid_image.js')();

//https://homepages.cae.wisc.edu/~ece533/images/airplane.png
module.exports = function() {
    this.sendFcmTopic = function (topic,content,callback) {    
            if(!content.title||!content.body){
                return callback('EMPTY TITLE OR DESCRIPTION')
            } else {
                    if(!content.image.match(/.(jpg|jpeg|png|gif)$/i)||!content.icon.match(/.(jpg|jpeg|png|gif)$/i)){
                        return callback('IMAGE Extension is not allowed');
                    } else {
                        console.log(validImage(content.image));
                        console.log(validImage(content.icon));
                        if(!validImage(content.image)||!validImage(content.icon)){
                            return callback('Sorry, the Image or ICON URL must be HTTPS!');
                        } else {
            const data = JSON.stringify(
                {
                    "data":{
                        'title':content.title,
                        'body':content.body,
                        'image':content.image,
                        "icon": content.icon,
                        'click_action':content.url,
                },
                    "to":"/topics/" + topic
                }
            );

        request.post({
            headers: {
            'content-type':'application/json',
            //the old account key:
            //'authorization':'key=AAAAmhzl77Y:APA91bEmevvvsA5Qx-tunGhOz6q_Q7BJg4EYd7vsRw6twCsYcmz562BTXYsDj3TyduOWB7rrAZ96uW5LmENbc_oGUPRrgif44QEiht0AFKDgmuvedmn3CK4ppUAb576esZZAeDS2HgYG'
            'authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'    
        },
            url:'https://fcm.googleapis.com/fcm/send',
            body:data
        },function(err, res, body){
            var bodyParse = JSON.parse(body);
            if(bodyParse.error) return callback(bodyParse.error);
            callback(null,bodyParse);
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
   
                }
            }
        }
    }
}
    
