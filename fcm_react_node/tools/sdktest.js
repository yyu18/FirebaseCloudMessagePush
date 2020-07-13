var express = require('express');
var router = express.Router();
var adminSDKTest = require('./sdk_test_function.js');

const adminSDKController = function (req, res){
    console.log(req.body);
    if(req.body){
        adminSDKTest.sendTopic();
        adminSDKTest.subscribeTopic();
        res.json({
            hello:'hello'
        })

    }
}

router.post('/send',adminSDKController);

module.exports = router;
