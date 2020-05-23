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
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAZcIseC2UyttJhmriir2rymtOUTJi-SCc",
    authDomain: "singtao-news.firebaseapp.com",
    databaseURL: "https://singtao-news.firebaseio.com",
    projectId: "singtao-news",
    storageBucket: "singtao-news.appspot.com",
    messagingSenderId: "557405338918",
    appId: "1:557405338918:web:24335359cf1939d40255e7",
    measurementId: "G-4VGZKKHC6Z"
  };
  // Initialize Firebase
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