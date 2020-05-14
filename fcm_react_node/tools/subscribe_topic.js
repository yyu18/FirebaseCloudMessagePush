var request = require('request');

module.exports = function() {
    this.subscribeTopic = function(token,topic,callback) {
        var URL = 'https://iid.googleapis.com/iid/v1/'+ token +'/rel/topics/'+ topic;
        request.post({
            headers: {
            'Content-type':'application/json',
            //the old account key:
            //'Authorization':'key=AAAAmhzl77Y:APA91bEmevvvsA5Qx-tunGhOz6q_Q7BJg4EYd7vsRw6twCsYcmz562BTXYsDj3TyduOWB7rrAZ96uW5LmENbc_oGUPRrgif44QEiht0AFKDgmuvedmn3CK4ppUAb576esZZAeDS2HgYG'
            'Authorization':'key=AAAA8shrVLU:APA91bHVYBjH-6tEOlMRXNlyNl75H7y10xmJs1yNsV7PCJ-aOhxy79i-StavWCqx9vVoT5EOjS12FJ2nsG5RGQy-afsFlVdY1_QXmId3eSGObnvh-r9vfVyZyRfdfClbxc_BhT_MbqHB'
            },
            url : URL,
        },function(err, res, body){
            var bodyParse = JSON.parse(body);
            if(bodyParse.error) return callback(bodyParse.error);
            callback(null,bodyParse);
        })
    }
}