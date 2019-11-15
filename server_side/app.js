var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
require('./tools/send_fcm_message.js')();
require('./tools/get_access_token.js')();
require('./tools/subscribe_topic.js')();
require('./tools/send_fcm_topic.js')();
require('./tools/unsubscribe_topic.js')();
require('./tools/check_topics.js')();
//var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
//var topic = 'notifyTest';

app.use(bodyParser.json());
app.use(cors());

app.post('/sendTopic', function(req, res) {
    if(!req.body.topic||!req.body.content){
        res.json({
            'status':'ERROR',
            'message':'Topic or Content invalid!'
        })
    } else {


    sendFcmTopic(req.body.topic,req.body.content,function(err,data){
        if(err) {
            res.json({
                'status':'ERROR',
                'message':err
            })
        } else {
            res.json({
                'status':'SUCCESS',
                'message':'Message Sent, Message ID Is'+data.message_id
            })
        }
    })
}
});

app.post('/subscribe', function(req, res) {
    if(req.body.token){
        if(req.body.topic){
            subscribeTopic(req.body.token,req.body.topic,function(err,data){
                if(err) {
                    res.json({
                        'status':'ERROR',
                        'message':err
                    })
                } else {
                    res.json({
                        'status':'SUCCESS',
                        'message':'Subscribed Successfully!'
                    })
                }
            });
        } else {
            res.json({
                'status':'ERROR',
                'message':'Empty Topic'
            })
        }
    } else {
        res.json({
            'status':'ERROR',
            'message':'Invalid Token'
        })
    }
});

app.post('/unsubscribe', function(req, res) {
    //var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
    //var topic = 'notifyTest';
    if(!req.body.token||!req.body.topic) {
        res.json({
            'status':'ERROR',
            'message':'Token And Topic EMPTY!'
        })
    }
    getAccessToken().then(function (accessToken){
        //sendFcmMessage(accessToken.access_token);
       unsubscribeTopic(req.body.token,req.body.topic,function(err,data){
        if(err) {
            res.json({
                'status':'ERROR',
                'message':err
            })
        } else {
            res.json({
                'status':'SUCCESS',
                'message':'Unsubscribed Topic!'
            })
        }
       })
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

app.post('/check-topics', function(req, res) {
    var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
    var topic = 'notifyTest';
    if(req.body.token) {
        checkTopics(req.body.token,function(err,data){
            if(err) {
                res.json({
                    'status':'ERROR',
                    'message':err
                })
            } else {
                res.json({
                    'status':'SUCCESS',
                    'message':data
                })
            }
        })
    } else {
        res.json({
            'status':'ERROR',
            'message':'Invalid Token!'
        })
    }
});


app.listen(5000, function() {
    console.log('Example app listening on port 5000!');
});