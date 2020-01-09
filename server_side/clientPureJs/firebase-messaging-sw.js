importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: 'your messagingSenderId' 
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    //console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here  
    var notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
      image: payload.notification.image,
      click_action: payload.notification.click_action
    };
    new Notification(payload.notification.title, notificationOptions);

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

self.addEventListener('notificationclick', (event) => {
    if (event.action) {
        clients.openWindow(event.action);
    }
    event.notification.close();
}); 