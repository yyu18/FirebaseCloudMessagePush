import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RouteApp from './routeApp.js';

ReactDOM.render(<RouteApp />, document.getElementById('root'));


//POST request
/*
{
    "notification": {
        "title": "Firebase",
        "body": "Firebase is awesome",
        "click_action": "http://localhost:3000/",
        "icon": "http://url-to-an-icon/icon.png"
    },
    "to": "fg1Low5vUOVNJHrKNCOgwP:APA91bHGHLLu6SrvykgJpYmAkPP066Fw5udqi7idu2M68J_yKyOt3a0cM-4jNRUp2nBY4SegayvPKyJ1dvvWBItbiVfzJctvuFrfaEurA3a87A2QS75qMXXdSbTdiHJid8Q7hX04epy5"
}
*/

serviceWorker.unregister();
