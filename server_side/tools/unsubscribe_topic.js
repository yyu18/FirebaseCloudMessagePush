var request = require('request');

module.exports = function() {
    this.unsubscribeTopic = function(token,topic) {
        return new Promise(function(resolve, reject) {
        const data = JSON.stringify(
            {
                "to": "/topics/"+topic,
                "registration_tokens": token
             }
        );

        var URL = 'https://iid.googleapis.com/iid/v1:batchRemove';
        request.post({
            headers: {
            'content-type':'application/json',
            'authorization':'key=AAAAmhzl77Y:APA91bEmevvvsA5Qx-tunGhOz6q_Q7BJg4EYd7vsRw6twCsYcmz562BTXYsDj3TyduOWB7rrAZ96uW5LmENbc_oGUPRrgif44QEiht0AFKDgmuvedmn3CK4ppUAb576esZZAeDS2HgYG'
            },
            url : URL,
            body : data,
        },function(err, res, body){
            console.log(body);
            resolve(body);
        })
        console.log('unsubscribed!');
    })
    }
}