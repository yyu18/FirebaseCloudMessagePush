var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  }); 

module.exports = {
    sendMessage: (req,res,callback)=>{
        var message = {
            "topic": "news",
            "notification": {
              "title": "Breaking News",
              "body": "New news story available."
            },
            "data": {
              "story_id": "story_12345"
            }
          }
        admin.messaging().send(message)
            .then((response) => {
                callback(null,response);
            }).catch((error) => {
                callback(error);
            })
    },

    subscribeToTopic: (req,res,callback)=>{
      var registrationTokens = [
        'YOUR_REGISTRATION_TOKEN_1',
        // ...
        'YOUR_REGISTRATION_TOKEN_n'
      ];
      admin.messaging().subscribeToTopic(registrationTokens, topic)
        .then(function(response) {
          callback(null,response);
        })
        .catch(function(error) {
          callback(error);
        });
    },

    unsubscribeFromTopic: (req,res,callback)=>{
      var registrationTokens = [
        'YOUR_REGISTRATION_TOKEN_1',
        // ...
        'YOUR_REGISTRATION_TOKEN_n'
      ];
      admin.messaging().unsubscribeFromTopic(registrationTokens, topic)
        .then(function(response) {
          console.log('Successfully unsubscribed from topic:', response);
        })
        .catch(function(error) {
          console.log('Error unsubscribing from topic:', error);
        });
    },

    sendMulticast: (req,res,callback)=>{
        // These registration tokens come from the client FCM SDKs.
      const registrationTokens = [
        'YOUR_REGISTRATION_TOKEN_1',
        // …
        'YOUR_REGISTRATION_TOKEN_N',
      ];

      const message = {
        data: {score: '850', time: '2:45'},
        tokens: registrationTokens,
      }

      admin.messaging().sendMulticast(message)
        .then((response) => {
          if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(registrationTokens[idx]);
              }
            });
            callback({'List of tokens that caused failures: ' : failedTokens});
          }
        });
    }
};