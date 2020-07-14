var express = require('express');
var router = express.Router();
const { sendMessage,subscribeToTopic,unsubscribeFromTopic,sendMulticast } =require('../tools/tools_adminSDK.js');
//export GOOGLE_APPLICATION_CREDENTIALS="/home/hubertyu/Code/FirebaseCloudMessagePush/fcm_react_node/pushnotification-124c9-firebase-adminsdk-yjb00-ac805d66b8.json"
router.post('/send',(req,res,next)=>{
  sendMessage(req,res,(err,data)=>{
    if(err) {
      next(err);
    } else {
      res.json({
        'success':data
      })
    }
  });
});

router.post('/multicast',(req,res,next)=>{
  sendMulticast(req,res,(err,data)=>{
    if(err){
      console.log(err);
    } else {
      res.json({
        'success':data
      })
    }
  })
})

router.post('/subcribe',(req,res,next)=>{
  subscribeToTopic(req,res,(err,data)=>{
    if(err){
      next(err);
    } else {
      res.json({
        'success':data
      })
    }
  })
})

router.post('/unsubcribe',(req,res,next)=>{
  unsubscribeFromTopic(req,res,(err,data)=>{
    if(err){
      next(err);
    } else {
      res.json({
        'success':data
      })
    }
  })
})



module.exports = router;