function firebaseControl() {
  $('#exampleModal').modal('hide');
  localStorage.setItem("click", "true");
  const messaging = firebase.messaging();
  //messaging.usePublicVapidKey('BKsyqq2G4vKCbUw5-9892nXab4rUTLfvwsnbD3lZd8SvjdDHQulPh0LfPCqFXokVTN6BexuSTZqHxkPphcxhuCg');

  Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
          messaging.getToken().then((currentToken) => {
          if (currentToken) { 
            localStorage.setItem("browser_token", currentToken);
            subscribeTopic(currentToken,'web').then(()=>{
              subscribeTopic(currentToken,'singtao').then(()=>{
                var notificationOptions = {
                  title:'星CLUB',
                  body: '瀏覽器推送功能已激活！我們會向您推送打折信息',
                  icon: 'https://www.singtao.ca/deals/singclub_logo_55x55.png',
                  image: '',
                  click_action: 'https://www.singtao.ca/deals/blackfriday/index_push.php',
                  requireInteraction: true
                };
                new Notification('星CLUB', notificationOptions);
                checkTopic(currentToken).then((res)=>{
                  $(":input:checkbox").bootstrapToggle('enable')
                  for(var value in res){
                    console.log(value);
                    if(value==='vancouver'){
                      $('#vancouverTopic').bootstrapToggle('on')
                    }
                    if(value==='toronto'){
                      $('#torontoTopic').bootstrapToggle('on')
                    }
                    if(value==='calgary'){
                      $('#calgaryTopic').bootstrapToggle('on')
                    }
                  }
                })
                .catch((error)=>console.log(error))
              })
              .catch((error)=>console.log(error))
            })
              .catch((error)=>console.log(error));
          } else {
              console.log('No Instance ID token available. Request permission to generate one.');
          }
          }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          });  
        // Callback fired if Instance ID token is updated.
          messaging.onTokenRefresh(() => {
            messaging.getToken().then((refreshedToken) => {
              console.log('Token refreshed.');
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              setTokenSentToServer(false);
              // Send Instance ID token to app server.
              subscribeTopic(refreshedToken);
              // ...
            }).catch((err) => {
              console.log('Unable to retrieve refreshed token ', err);
              showToken('Unable to retrieve refreshed token ', err);
            });
          });

      } 
  });  
}

async function unSubscribeTopic(token, topic){
  var data = JSON.stringify(
    {
        "to": "/topics/"+topic,
        "registration_tokens": [token]
    }
);
let response = await fetch('https://iid.googleapis.com/iid/v1:batchRemove', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'
  },
  body: data
})
let value = await response.json();
  return new Promise(function(resolve, reject){
    resolve('unsubscribe topic:'+topic); 
  })
}


  function closeBtn() {
    localStorage.setItem("click", "true");
  }


  function subscribeTopic(token, topic){
    var data = JSON.stringify({
      "topic":topic,
      "token":token
  });
    return new Promise(function(resolve, reject){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST",  'https://mastersandbox2.singtao.ca:5000/subscribe'); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(data);
    xmlHttp.onreadystatechange= function() {
        if(this.readyState === 4 && this.status === 200){
            var res = JSON.parse(xmlHttp.response);
            if(res.status==="SUCCESS") {
                resolve('register topic:  '+topic);
            } else {
                reject(res.message);
            }
        }
    }
    })
  }


  function checkTopic(token){
    return new Promise(function(resolve, reject){
      fetch('https://iid.googleapis.com/iid/info/'+token+'?details=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'key=AAAAgcfyfSY:APA91bEbE67PTQgR70Y7LDF1_RQFBIcUaOVN39Jpt68n7faObzjXFNKoMSdTvRd4yonTBPhYoVfFpzOVpD7Y5hWzrtXe6iJSWN4S1hCpWC174AOYtlwAGgKItr6ibMScOHxrSQ5rofQJ'
        },
      }).then(res=>res.json())
      .then(data=>{resolve(data.rel.topics)})
      .catch(err=>{reject(err)})
    })
  }

  function toggleStatus(e){
    currentToken=localStorage.getItem('browser_token');
    if(currentToken!=undefined){
      var topicToggle = $(e).find('input');
      if(topicToggle.prop('checked')===false){
        subscribeTopic(currentToken,topicToggle.attr('data-topic')).then((val)=>{
          console.log(val);
          topicToggle.bootstrapToggle('on');
          alert(val);
        }).catch((err)=>{
          console.log(err);
          topicToggle.bootstrapToggle('off');
          alert('Something wrong');
        });
      } else {
        unSubscribeTopic(currentToken,topicToggle.attr('data-topic')).then((val)=>{
          topicToggle.bootstrapToggle('off');
          alert(val);
        }).catch(()=>{
          topicToggle.bootstrapToggle('on');
          alert('something wrong');
        })
      }
    } else {
      alert('please allow the notification or register again')
    }
  }
  

(function() {
console.log('firebase connected');
$(":input:checkbox").bootstrapToggle('disable')
currentToken=localStorage.getItem('browser_token');
if(currentToken!=undefined){
  checkTopic(currentToken).then((res)=>{
    console.log(res);
    $(":input:checkbox").bootstrapToggle()
    $(":input:checkbox").bootstrapToggle('enable')
    for(var value in res){
      if(value==='vancouver'){
        $('#vancouverTopic').bootstrapToggle('on')
      }
      if(value==='toronto'){
        $('#torontoTopic').bootstrapToggle('on')
      }
      if(value==='calgary'){
        $('#calgaryTopic').bootstrapToggle('on')
      }
    }
  })
  .catch((err)=>console.log(err))
  }
  var firebaseConfig = {
    apiKey: "AIzaSyAZcIseC2UyttJhmriir2rymtOUTJi-SCc",
    authDomain: "singtao-news.firebaseapp.com",
    databaseURL: "https://singtao-news.firebaseio.com",
    projectId: "singtao-news",
    storageBucket: "singtao-news.appspot.com",
    messagingSenderId: "557405338918",
    appId: "1:557405338918:web:6a94ed20110de7f80255e7",
    measurementId: "G-L8ZC156K0E"
  };
  // Initialize Firebase
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