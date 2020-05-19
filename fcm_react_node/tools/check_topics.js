var request = require('request');

module.exports = function() {
    this.checkTopics = function(token,callback) {
        var URL = 'https://iid.googleapis.com/iid/info/'+token+'?details=true';   
        request.post({
            headers: {
            'content-type':'application/json',
            'authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'
            },
            url : URL,
        },function(err, res, body){
            var bodyParse = JSON.parse(body);
            if(bodyParse.error) return callback(bodyParse.error);
            callback(null,bodyParse);
        })
    }
}