import React from 'react';
import { askForPermissioToReceiveNotifications } from './push-notification';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Input,message } from 'antd';


class App extends React.Component {
    state = {
        token:'',
        topic:''
    };
    handleClick = () =>{
        askForPermissioToReceiveNotifications().then(function(result){
            this.setState({ token:result });
            console.log(result);
        });
    }
   
    onChange=(checked)=> {
      if(checked) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET",  'http://localhost:5000/subscribe', false ); // false for synchronous request
        xmlHttp.send( null );

        message.success(xmlHttp.responseText);
   
      } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET",  'http://localhost:5000/unsubscribe', false ); // false for synchronous request
        xmlHttp.send( null );

        message.error(xmlHttp.responseText);
      }
    }
   
    render() {
      return (
        <React.Fragment>
        <div className = "title">
          <h1 className = 'titleTopic'>Topic</h1>
          <h1>Subscribe</h1>
        </div>

        <div className = 'subscribe'>
          <h2>Mock Topic 1</h2>
          <Switch defaultChecked onChange={this.onChange}  style={{marginLeft:'5%'}} />
        </div>
        </React.Fragment>
      );
    }
  }

  

export default App;