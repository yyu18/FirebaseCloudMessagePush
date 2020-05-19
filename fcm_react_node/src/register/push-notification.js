import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAZcIseC2UyttJhmriir2rymtOUTJi-SCc",
  authDomain: "singtao-news.firebaseapp.com",
  databaseURL: "https://singtao-news.firebaseio.com",
  projectId: "singtao-news",
  storageBucket: "singtao-news.appspot.com",
  messagingSenderId: "557405338918",
  appId: "1:557405338918:web:e2d76f3e2eae76f60255e7",
  measurementId: "G-8LSC4P988N"
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