var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var login_register_router = require('./register_login/login_register_router.js');
app.use(cors());
app.use(bodyParser.json());

app.listen(3000,function() { console.log('Example app listening on port 5000!');});

app.post('/',router);