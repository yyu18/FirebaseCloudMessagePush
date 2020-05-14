import React from 'react';
import { askForPermissioToReceiveNotifications } from './push-notification';
import { checkTopics } from './components/check_topics';
import  showDescriptions from './components/show_description';
import ShowDrawer from './components/show_drawer';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { message } from 'antd';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        permission:'',
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
      var toggleStatus = [...self.state.toggle];
      if(!localStorage.getItem("permission")){
        showDescriptions().then(function(permission){
          if(JSON.parse(permission).permission==='sure'){
              askForPermissioToReceiveNotifications().then(function(result){
                if(JSON.parse(result).permission){
                  self.setState({ permission:'NO' })
                } else {
                self.setState({ token:JSON.parse(result).token });
                    
                if(JSON.parse(result).token) {
                  //check the info of all topics
                  checkTopics(JSON.parse(result).token).then(function(result){
                    var res = JSON.parse(result);
                    if(res.status==="SUCCESS") {
                      if(res.message.rel){
                        self.setState({topic:res.message.rel.topics});
                                  
                        Object.keys(res.message.rel.topics).map(function(key,index){
                          switch(key) {
                          case 'notifyTest1' :
                            toggleStatus[0].status = true;
                            self.setState({ toggleStatus});
                            break;
                          case 'notifyTest2' :
                            toggleStatus[1].status = true;
                            self.setState({ toggleStatus});
                            break;
                          case 'notifyTest3' :
                            toggleStatus[2].status = true;
                            self.setState({ toggleStatus});
                            break;
                          case 'notifyTest4' :
                            toggleStatus[3].status = true;
                            self.setState({ toggleStatus});
                            break;
                            default:
                          }
                        })
                      } else {
                        self.setState({topic:res.message.rel})
                      }
                    } else {
                      console.log(res.message)
                    }
                  })
                  }
                }
              });
            } else {
               console.log('redirection');
            }
          });
        } else {
            askForPermissioToReceiveNotifications().then(function(result){
              if(JSON.parse(result).permission){
                self.setState({ permission:'NO' })
              } else {
              self.setState({ token:JSON.parse(result).token });
                  
              if(JSON.parse(result).token) {
                //check the info of all topics
                checkTopics(JSON.parse(result).token).then(function(result){
                  var res = JSON.parse(result);
                  if(res.status==="SUCCESS") {
                    if(res.message.rel){
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
                          default:
                        }
                      })
                    } else {
                      self.setState({topic:res.message.rel})
                    }
                  } else {
                    console.log(res.message)
                  }
                })
                }
              }
              });
          }
        }

    handleClick = (id) =>{
      var xmlHttp = new XMLHttpRequest();
      var toggleStatus = [...this.state.toggle];
      var data = JSON.stringify({
        "topic":toggleStatus[id].id,
        "token":this.state.token
      });
      if(toggleStatus[id].status === 'true'){
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
        toggleStatus[id].status = '';
        this.setState({ toggleStatus});
      } else {
          xmlHttp.open( "POST",  'https://nodejs.singtao.ca:8080/subscribe'); // false for synchronous request
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
        toggleStatus[id].status = 'true';
        this.setState({ toggleStatus});
      };
    }
  
    render() {
console.log(this.state);
      return (
        <React.Fragment>
          <div className = "title">
            <h1 className = 'titleTopic'>Topic</h1>
            <h1>Subscribe</h1>
          </div>
          {this.state.permission==='NO' ? (
            <React.Fragment>

              <div className = 'subscribe'>
                <h2>notifyTest1</h2>
                <Switch disabled='true' style={{marginLeft:'5%'}} onClick={()=>this.handleClick(0)}/>
              </div>
              <div className = 'subscribe'>
                <h2>notifyTest2</h2>
                <Switch disabled='true' style={{marginLeft:'5%'}} onClick={()=>this.handleClick(1)}/>
              </div>
              <div className = 'subscribe'>
                <h2>notifyTest3</h2>
                <Switch disabled='true' style={{marginLeft:'5%'}} onClick={()=>this.handleClick(2)}/>
              </div>
              <div className = 'subscribe'>
                <h2>notifyTest4</h2>
                <Switch disabled='true' style={{marginLeft:'5%'}} onClick={()=>this.handleClick(3)}/>
              </div>
              <ShowDrawer />
            </React.Fragment>
      ) : (
        <React.Fragment>
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
      )}  
        </React.Fragment>
      );
    }
  }

export default App;