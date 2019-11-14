import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.js';
import Admin from './admin.js';

class RouteApp extends Component {
  render(){
    return (
        <Router>
            <Route  path="/admin" component={Admin}/>
            <Route exact path="/" component={App}/>
        </Router>
    );

  }
}
export default RouteApp;