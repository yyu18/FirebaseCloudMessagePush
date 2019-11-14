import React from 'react';
import { askForPermissioToReceiveNotifications } from './push-notification';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Input } from 'antd';

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
        fetch('http://localhost:5000/subscribe')
        .then(response => {
          console.log(response);
          response.json();
        })
        // ...then we update the users state
        .then(data => console.log(data)
         /* this.setState({
            users: data,
            isLoading: false,
          })*/
        )
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));

      } else {
        console.log('unsubsribed');
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
          <Input placeholder="Basic usage" style={{width:'11%'}} />
          <Switch defaultChecked onChange={this.onChange}  style={{marginLeft:'5%'}} />
        </div>
        </React.Fragment>
      );
    }
  }

  

export default App;