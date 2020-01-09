function firebaseControl() {
    $('#exampleModal').modal('hide');
    localStorage.setItem("click", "true");
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey('BKsyqq2G4vKCbUw5-9892nXab4rUTLfvwsnbD3lZd8SvjdDHQulPh0LfPCqFXokVTN6BexuSTZqHxkPphcxhuCg');

    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            messaging.getToken().then((currentToken) => {
            if (currentToken) {   
              var notificationOptions = {
                title:'test',
                body: 'test',
                icon: 'test',
                image: 'test',
                click_action: 'test'
              };
              new Notification('test', notificationOptions);
                send1to1message(currentToken)
                subscribeTopic(currentToken);
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

    const popupButton = document.getElementById('popup-button');

    if( localStorage.getItem("click")!=='true'){
    popupButton.insertAdjacentHTML('beforeend', 
        `
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="tltle" class="modal-title" id="exampleModalLabel">Subcribe for discounted deals.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div id="modalContent"class="modal-body">
                Would you want receive the good discount deals?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeBtn()">CLose</button>
                <button type="button" id="btnYes" class="btn btn-primary" onclick="firebaseControl()">YES</button>
              </div>
            </div>
          </div>
        </div>`
        );
      }
})();