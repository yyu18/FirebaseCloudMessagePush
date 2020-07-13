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
    next();
}

const middleware = function(){
    console.log('middleware have inside send');
}
router.post('/send',adminSDKController);
router.use('/send',middleware);
module.exports = router;
