import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.js';

class RouteApp extends Component {
  render(){
    return (
        <Router>
            <Route exact path="/" component={App}/>
        </Router>
    );

  }
}
export default RouteApp;