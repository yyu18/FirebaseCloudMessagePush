import React from 'react';
import { askForPermissioToReceiveNotifications } from './push-notification';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { message } from 'antd';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token:'',
        topic:{},
        toggle:[
          {id:'notifyTest1',status:''},
          {id:'notifyTest2',status:''},
          {id:'notifyTest3',status:''},
          {id:'notifyTest4',status:''}
        ]
      }
    }

    componentDidMount () {
      let self=this;
      var toggleStatus = {...self.state.toggle};
      askForPermissioToReceiveNotifications().then(function(result){
              //check the info of all topics
       var data = JSON.stringify({
        "token":result
      });
       var xmlHttp = new XMLHttpRequest();
       xmlHttp.open( "POST",  'http://localhost:5000/check-topics'); // false for synchronous request
       xmlHttp.setRequestHeader("Content-Type", "application/json");
       xmlHttp.send(data);
       xmlHttp.onreadystatechange= function() {
         if(this.readyState === 4 && this.status === 200){
           var res = JSON.parse(xmlHttp.response);
           if(res.status==="SUCCESS") {
             self.setState({topic:res.message.rel.topics});
             Object.keys(res.message.rel.topics).map(function(key,index){
               switch(key) {
                case 'notifyTest1' :
                  toggleStatus[0].status = 'true';
                  self.setState({ toggleStatus});
                  break;
                case 'notifyTest2' :
                  toggleStatus[1].status = 'true';
                  self.setState({ toggleStatus});
                  break;
                case 'notifyTest3' :
                  toggleStatus[2].status = 'true';
                  self.setState({ toggleStatus});
                  break;
                case 'notifyTest4' :
                  toggleStatus[3].status = 'true';
                  self.setState({ toggleStatus});
                  break;
               }
             })
           } else {
             console.log(res.message)
           }
         }
       }
        self.setState({ token:result });
    });
  }

    handleClick = (id) =>{
      var xmlHttp = new XMLHttpRequest();
      var toggleStatus = {...this.state.toggle};
      var data = JSON.stringify({
        "topic":toggleStatus[id].id,
        "token":this.state.token
      });
      if(toggleStatus[id].status === 'true'){
        xmlHttp.open( "POST",  'http://localhost:5000/unsubscribe'); // false for synchronous request
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
        toggleStatus[id].status = '';
        this.setState({ toggleStatus});
      } else {
          /*xmlHttp.open( "POST",  'http://localhost:5000/subscribe'); // false for synchronous request
          xmlHttp.setRequestHeader("Content-Type", "application/json");
          xmlHttp.send(data);
          xmlHttp.onreadystatechange= function() {
            if(this.readyState === 4 && this.status === 200){
              var res = JSON.parse(xmlHttp.response);
              if(res.status==="SUCCESS") {
                message.success(res.message);
              } else {
                message.error(res.message)
              }
            }
          }*/
        toggleStatus[id].status = 'true';
        this.setState({ toggleStatus});
      };
    }
  
    render() {
      return (
        <React.Fragment>
        <div className = "title">
          <h1 className = 'titleTopic'>Topic</h1>
          <h1>Subscribe</h1>
        </div>

        <div className = 'subscribe'>
          <h2>notifyTest1</h2>
          <Switch checked={this.state.toggle[0].status} style={{marginLeft:'5%'}} onClick={()=>this.handleClick(0)}/>
        </div>
        <div className = 'subscribe'>
          <h2>notifyTest2</h2>
          <Switch checked={this.state.toggle[1].status} style={{marginLeft:'5%'}} onClick={()=>this.handleClick(1)}/>
        </div>
        <div className = 'subscribe'>
          <h2>notifyTest3</h2>
          <Switch checked={this.state.toggle[2].status} style={{marginLeft:'5%'}} onClick={()=>this.handleClick(2)}/>
        </div>
        <div className = 'subscribe'>
          <h2>notifyTest4</h2>
          <Switch checked={this.state.toggle[3].status} style={{marginLeft:'5%'}} onClick={()=>this.handleClick(3)}/>
        </div>

        </React.Fragment>
      );
    }
  }

export default App;