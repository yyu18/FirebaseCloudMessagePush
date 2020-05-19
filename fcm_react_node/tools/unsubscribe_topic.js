var request = require('request');

module.exports = function() {
    this.unsubscribeTopic = function(token,topic,callback) {
        if(!token) {
            return callback('Invalid Token');
        } else {
            const data = JSON.stringify(
                {
                    "to": "/topics/"+topic,
                    "registration_tokens": [token]
                }
            );
    
            var URL = 'https://iid.googleapis.com/iid/v1:batchRemove';
            request.post({
                headers: {
                'content-type':'application/json',
                'authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'
                },
                url : URL,
                body : data,
            },function(err, res, body){
                var bodyParse = JSON.parse(body);
                if(bodyParse.error) return callback(bodyParse.error);
                callback(null,bodyParse);
            })
        }
    }
}