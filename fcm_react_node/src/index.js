import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './register/App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'

const routing = (
    <Router>
      <div>
        <Switch>
            <Route path="/admin" component={App} />
            <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
