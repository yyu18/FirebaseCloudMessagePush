importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//the old account configuration:
    /*
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
*/
  var firebaseConfig = {
    apiKey: "AIzaSyD5RnLj_yhouX5YqPIW7ul6y-ffv32uhrw",
    authDomain: "singclub-web-push-notification.firebaseapp.com",
    databaseURL: "https://singclub-web-push-notification.firebaseio.com",
    projectId: "singclub-web-push-notification",
    storageBucket: "singclub-web-push-notification.appspot.com",
    messagingSenderId: "1042744562869",
    appId: "1:1042744562869:web:b38f2915e3d92799435afc",
    measurementId: "G-YM1NZMETKV"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
var click_action=0;
messaging.setBackgroundMessageHandler(function(payload) {
    click_action=payload.click_action;
    // Customize notification here  
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      image: payload.data.image,
      data: payload.data.click_action,
      /*actions: [
        {
          action: 'shopping',
          title: 'Shopping',
          icon: payload.data.icon
        },
        {
          action: 'close',
          title: 'Close',
          icon: payload.data.icon
        }
      ],*/
      requireInteraction: true
    };
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

self.addEventListener('notificationclick', (event) => {
  clients.openWindow(event.notification.data);
  event.notification.close();
}); 

self.addEventListener('notificationclose', function(event) {
  event.notification.close();
});