import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBZ9iO9ZwY3Eck9_Ja_NTfaoEVo_sWzZoc",
  authDomain: "pushnotification-124c9.firebaseapp.com",
  databaseURL: "https://pushnotification-124c9.firebaseio.com",
  projectId: "pushnotification-124c9",
  storageBucket: "pushnotification-124c9.appspot.com",
  messagingSenderId: "661909794742",
  appId: "1:661909794742:web:a00aab3b2b8800a82b5b17",
  measurementId: "G-C1WGZPEPBX"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey('BKsyqq2G4vKCbUw5-9892nXab4rUTLfvwsnbD3lZd8SvjdDHQulPh0LfPCqFXokVTN6BexuSTZqHxkPphcxhuCg');

export const askForPermissioToReceiveNotifications = async () => {
  return new Promise(function(resolve,reject){
    try {     
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          messaging.getToken().then((currentToken) => {
            if (currentToken) {
              //console.log(currentToken);
              return resolve(  JSON.stringify({
                "token":currentToken
                }));
            } else {
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });   
        } else {
          console.log('Unable to get permission to notify.');
          return resolve(
            JSON.stringify({
            "permission":'disagree'
            })
          );
        }
      });   
    } catch (error) {
      console.error(error);
    }
  })
}