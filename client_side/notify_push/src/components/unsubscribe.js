import { message } from 'antd';
export const unsubscribe = async (toggle) => {
    return new Promise(function(resolve,reject){
      try {     
        var xmlHttp = new XMLHttpRequest();
        var toggleStatus = [...this.state.toggle];
        var data = JSON.stringify({
          "topic":toggleStatus[id].id,
          "token":this.state.token
        });
        xmlHttp.open( "POST",  'https://nodejs.singtao.ca:8080/unsubscribe'); // false for synchronous request
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(data);
        xmlHttp.onreadystatechange= function() {
          if(this.readyState === 4 && this.status === 200){
            var res = JSON.parse(xmlHttp.response);
            if(res.status==="SUCCESS") {
              message.warning(res.message);
            } else {
              message.error(res.message)
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    })
  }