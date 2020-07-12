var express = require('express');
var app = express();
var https = require("https");
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var admin = require("firebase-admin");
//var mongo = require('./router/mongodb_connect.js');

require('./tools/send_fcm_message.js')();
require('./tools/get_access_token.js')();
require('./tools/subscribe_topic.js')();
require('./tools/send_fcm_topic.js')();
require('./tools/unsubscribe_topic.js')();
require('./tools/check_topics.js')();
require('./tools/valid_url.js')();
var adminSDKTest = require('./tools/sdktest.js');
//var token = 'fg1Low5vUOVNJHrKNCOgwP:APA91bGVLWsGZnIOOoffeBcs1_UeVGvkfBwRwHGToi5M8PbA9SG7o23dwlu63xiG4SsRFs62jkG-ie2UY2AWD-nHIAjud1KvBNkD4UhpIY5uUsUB4izZw_jnck9kWDllofw2xYbVnTfH';
//var topic = 'notifyTest';

app.use(bodyParser.json());
app.use(cors());
//begin https with credential key
         /*var options = {
            key: fs.readFileSync('/etc/nginx/ssl/wildcard.singtao.ca/singtao.ca.key'),
            cert: fs.readFileSync('/etc/nginx/ssl/wildcard.singtao.ca/combine.crt')
           // ca: fs.readFileSync('/etc/ssl/wildcard.singtao.ca/gd_bundle-g2-g1.crt'), 
        }
        https.createServer(options,app).listen(5000,function(){
            console.log('listening on 5000')
        });*/
 //end https with credential key
//app listen to the external ip
//app.listen(5000, "0.0.0.0",function() { console.log('Example app listening on port 5000!'); });
//end app listen to the external ip

app.listen(5000,function() { console.log('Example app listening on port 5000!');});

//app.use('/mongo',mongo);
//adminSDK test 
/*
1. Send messages to individual devices
2. Send messages to topics and condition statements that match one or more topics.
3. Subscribe and unsubscribe devices to and from topics
*/

app.post('/adminSDK',function (req, res){
    console.log(req.body);
    if(req.body){
        adminSDKTest.sendTopic();
        adminSDKTest.subscribeTopic();
        res.json({
            hello:'hello'
        })
    }
})

app.post('/subscribe', function(req, res) {
    console.log(req.body);
    if(req.body.token){
        if(req.body.topic){
            subscribeTopic(req.body.token,req.body.topic,function(err,data){
                if(err) {
                    res.json({
                        'status':'ERROR',
                        'message':err
                    })
                } else {
                    console.log('subscribed successfully!');
                    console.log(req.body.topic);
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


app.post('/sendTopic', function(req, res) {
    console.log(req.body);
    if(!req.body.topic||!req.body.content){
        res.json({
            'status':'ERROR',
            'message':'Topic or Content invalid!'
        })
    } else {
    const URLValidator = validURL(req.body.content.url);
        if(URLValidator) {
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
        } else {
            res.json({
                'status':'ERROR',
                'message':'Invalid URL'
            })
        }
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

app.post('/send1to1message', function(req, res) {
    console.log(req.body);
    sendFcmMessage(req.body.token);
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

app.get('/firebase_control',function(req,res) {
    //res.send('hello');
    res.sendFile('tools/firebase_control.js' , { root : __dirname});

})

