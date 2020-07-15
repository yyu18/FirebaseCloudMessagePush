var express = require('express');
var router = express.Router();

router.post('/register',register);

router.post('/login',login);

module.exports = router;

function register(req,res,next) {
    console.log('register');
}

function login(req,res,next) {
    console.log('login');
}