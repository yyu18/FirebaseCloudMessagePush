var admin = require("firebase-admin");
//firebase initial
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
  
module.exports = {
    sendTopic:function(token,callback) {
        console.log('sendTopic');
    },
    
    subscribeTopic:function (topic,callback){
        console.log('subscribeTopic');
    }
}