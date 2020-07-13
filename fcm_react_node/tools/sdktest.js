var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });

router.post('/send',(req,res,next)=>{
    var message = {
        data:req.body.data,
        topic:req.body.topic
    }
console.log(message);
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;