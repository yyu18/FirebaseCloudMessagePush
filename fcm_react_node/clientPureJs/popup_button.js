function firebaseControl() {
  $('#exampleModal').modal('hide');
  localStorage.setItem("click", "true");
  const messaging = firebase.messaging();
  //messaging.usePublicVapidKey('BKsyqq2G4vKCbUw5-9892nXab4rUTLfvwsnbD3lZd8SvjdDHQulPh0LfPCqFXokVTN6BexuSTZqHxkPphcxhuCg');

  Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
          messaging.getToken().then((currentToken) => {
          if (currentToken) { 
            subscribeTopic(currentToken);
            var notificationOptions = {
              title:'星CLUB',
              body: '瀏覽器推送功能已激活！我們會向您推送打折信息',
              icon: 'https://www.singtao.ca/deals/singclub_logo_55x55.png',
              image: '',
              click_action: 'https://www.singtao.ca/deals/blackfriday/index_push.php',
              requireInteraction: true
            };
            new Notification('星CLUB', notificationOptions);

          } else {
              console.log('No Instance ID token available. Request permission to generate one.');
          }
          }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          });  
   
      } 
  });  
}

  function send1to1message(token) {
    var data = JSON.stringify({
      "token":token
    });
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST",  'https://nodejs.singtao.ca:3001/send1to1message'); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(data);
    xmlHttp.onreadystatechange= function() {
        if(this.readyState === 4 && this.status === 200){
            var res = JSON.parse(xmlHttp.response);
            if(res.status==="SUCCESS") {
                console.log('register successfully!');
            } else {
                console.log(res.message)
            }
        }
    }
  }
  function closeBtn() {
    localStorage.setItem("click", "true");
  }
  function subscribeTopic(token) {
      var data = JSON.stringify({
          "topic":'blackfriday',
          "token":token
      });
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "POST",  'https://nodejs.singtao.ca:3001/subscribe'); // false for synchronous request
      xmlHttp.setRequestHeader("Content-Type", "application/json");
      xmlHttp.send(data);
      xmlHttp.onreadystatechange= function() {
          if(this.readyState === 4 && this.status === 200){
              var res = JSON.parse(xmlHttp.response);
              if(res.status==="SUCCESS") {
                  console.log('register successfully!');
              } else {
                  console.log(res.message)
              }
          }
      }
  }

(function() {

  //the old account configuration:
  /*  var firebaseConfig = {
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

    const popupButton = document.getElementById('popup-button');

    if( localStorage.getItem("click")!=='true'){
    popupButton.insertAdjacentHTML('beforeend', 
        `
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <img src="https://www.singtao.ca/deals/singclub_logo_55x55.png" alt="singclub" height="35" width="35" style="margin-right:3%">
                <h5 id="tltle" class="modal-title" id="exampleModalLabel">   星CLUB 信息推送服務</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div id="modalContent"class="modal-body">
                您同意在電腦瀏覽器上接收我們推送的購物信息嗎？
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeBtn()">不同意</button>
                <button type="button" id="btnYes" class="btn btn-primary" onclick="firebaseControl()">同意</button>
              </div>
            </div>
          </div>
        </div>`
        );
      }
})();