var express = require('express');
var app = express();
var cors = require('cors');
require('./tools/send_fcm_message.js')();
require('./tools/get_access_token.js')();
require('./tools/subscribe_topic.js')();
require('./tools/send_fcm_topic.js')();
require('./tools/unsubscribe_topic.js')();

app.use(cors());
app.get('/sendTopic', function(req, res) {
    var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
    var topic = 'notifyTest';
    getAccessToken().then(function (accessToken){
        //sendFcmMessage(accessToken.access_token);
        //subscribeTopic(token,topic);
        sendFcmTopic(token,topic).then(function(callback){
            res.send(callback);
        });

    });  
});

app.get('/send1to1message', function(req, res) {
    var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
    var topic = 'notifyTest';
    getAccessToken().then(function (accessToken){
        //sendFcmMessage(accessToken.access_token);
        //subscribeTopic(token,topic);
        sendFcmMessage(token);
        res.send('sent');
    });  
});

app.get('/subscribe', function(req, res) {
    var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
    var topic = 'notifyTest';
    getAccessToken().then(function (accessToken){
        //sendFcmMessage(accessToken.access_token);
        subscribeTopic(token,topic);
        //sendFcmTopic(token,topic);
        res.json({
            message:'subscribed successfully!'
        });
    });  
});

app.get('/unsubscribe', function(req, res) {
    var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
    var topic = 'notifyTest';
    getAccessToken().then(function (accessToken){
        //sendFcmMessage(accessToken.access_token);
       unsubscribeTopic(token,topic).then(function(callback){
            //sendFcmTopic(token,topic);
            res.json({
                message:callback
            });
       });
    });  
});

app.listen(5000, function() {
    console.log('Example app listening on port 5000!');
});