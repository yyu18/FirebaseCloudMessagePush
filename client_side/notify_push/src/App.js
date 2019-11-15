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
      toggleStatus:{
        'notifyTest1':'',
        'notifyTest2':'',
        'notifyTest3':'',
        'notifyTest4':''
      }
    }
    this.topicRef = React.createRef();
	}

    componentDidMount () {
      let self=this;
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
               console.log(key);
               switch(key) {
                  case 'notifyTest1' :
                    self.setState({toggleStatus:{
                      'notifyTest1':'true'
                   }});
                   break;
                  case 'notifyTest2' :
                    self.setState({toggleStatus:{
                      'notifyTest2':'true'
                    }});
                    break;
                  case 'notifyTest3' :
                      self.setState({toggleStatus:{
                        'notifyTest3':'true'
                      }});
                      break;
                  case 'notifyTest4' :
                      self.setState({toggleStatus:{
                        'notifyTest4':'true'
                      }});
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

    handleClick = (e) =>{
      this.setState({topic:e})
    }
   
    onChange=(checked)=> {
      var xmlHttp = new XMLHttpRequest();

      var data = JSON.stringify({
        "topic":this.state.topic,
        "token":this.state.token
      });
      if(checked) {
        xmlHttp.open( "POST",  'http://localhost:5000/subscribe'); // false for synchronous request
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
        }

      } else {
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
      }
    }
   
    render() {
console.log(this.state)
      return (
        <React.Fragment>
        <div className = "title">
          <h1 className = 'titleTopic'>Topic</h1>
          <h1>Subscribe</h1>
        </div>

        <div className = 'subscribe'>
          <h2 ref={this.topicRef}>notifyTest1</h2>
          <Switch onChange={this.onChange}  style={{marginLeft:'5%'} } onClick={()=>this.handleClick('notifyTest1')}/>
        </div>
        <div className = 'subscribe'>
          <h2 ref={this.topicRef}>notifyTest2</h2>
          <Switch onChange={this.onChange}  style={{marginLeft:'5%'}} onClick={()=>this.handleClick('notifyTest2')}/>
        </div>
        <div className = 'subscribe'>
          <h2 ref={this.topicRef}>notifyTest3</h2>
          <Switch onChange={this.onChange}  style={{marginLeft:'5%'}} onClick={()=>this.handleClick('notifyTest3')}/>
        </div>
        <div className = 'subscribe'>
          <h2 ref={this.topicRef}>notifyTest4</h2>
          <Switch onChange={this.onChange}  style={{marginLeft:'5%'}} onClick={()=>this.handleClick('notifyTest4')}/>
        </div>

        </React.Fragment>
      );
    }
  }

export default App;