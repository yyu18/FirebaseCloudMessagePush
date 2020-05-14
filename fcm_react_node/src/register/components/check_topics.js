export const checkTopics = async (token) => {
    return new Promise(function(resolve,reject){
      try {     
        var data = JSON.stringify({
            "token":token
          });
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "POST",  'https://nodejs.singtao.ca:8080/check-topics'); // false for synchronous request
          xmlHttp.setRequestHeader("Content-Type", "application/json");
          xmlHttp.send(data);
          xmlHttp.onreadystatechange= function() {
            if(this.readyState === 4 && this.status === 200){ 
                return resolve(xmlHttp.response);
            }
        }
      } catch (error) {
        console.error(error);
      }
    })
  }