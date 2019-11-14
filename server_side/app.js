var express = require('express');
var app = express();
require('./tools/send_fcm_message.js')();
require('./tools/get_access_token.js')();

app.get('/', function(req, res) {
  
    getAccessToken().then(function (accessToken){
        sendFcmMessage(accessToken.access_token);
        res.send(accessToken);
    });

    
});

app.listen(5000, function() {
    console.log('Example app listening on port 5000!');
});