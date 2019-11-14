var request = require('request');

module.exports = function() {
    this.subscribeTopic = function(token,topic) {
        console.log('hello world');
        var URL =  'https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic;
        request.post({
            headers: {
            'content-type':'application/json',
            'authorization':'key=AAAAmhzl77Y:APA91bEmevvvsA5Qx-tunGhOz6q_Q7BJg4EYd7vsRw6twCsYcmz562BTXYsDj3TyduOWB7rrAZ96uW5LmENbc_oGUPRrgif44QEiht0AFKDgmuvedmn3CK4ppUAb576esZZAeDS2HgYG'
            },
            url : URL,
        },function(err, res, body){
            console.log(body);
        })
    }
}