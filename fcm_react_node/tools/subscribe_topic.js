var request = require('request');

module.exports = function() {
    this.subscribeTopic = function(token,topic,callback) {
        console.log('subscribeTopic');
        var URL = 'https://iid.googleapis.com/iid/v1/'+ token +'/rel/topics/'+ topic;
        request.post({
            headers: {
            'Content-type':'application/json',
            //the old account key:
            //'Authorization':'key=AAAAmhzl77Y:APA91bEmevvvsA5Qx-tunGhOz6q_Q7BJg4EYd7vsRw6twCsYcmz562BTXYsDj3TyduOWB7rrAZ96uW5LmENbc_oGUPRrgif44QEiht0AFKDgmuvedmn3CK4ppUAb576esZZAeDS2HgYG'
            'Authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'    
            },
            url : URL,
        },function(err, res, body){
            console.log(body);
            var bodyParse = JSON.parse(body);
            if(bodyParse.error) return callback(bodyParse.error);
            callback(null,bodyParse);
        })
    }
}