var {google} = require('googleapis');
var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
var SCOPES = [MESSAGING_SCOPE];

module.exports = function() {
    this.getAccessToken = function() {
        return new Promise(function(resolve, reject) {
            var key = require('../pushnotification-124c9-firebase-adminsdk-431re-e643cd4d3b.json');
            var jwtClient = new google.auth.JWT(
                key.client_email,
                null,
                key.private_key,
                SCOPES,
                null
            );
            jwtClient.authorize(function(err, tokens) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(tokens);
            });
        })
    }
}