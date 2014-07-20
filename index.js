var express = require('express');
var http = require('http');
var https = require('https');
var passport = require('passport');
var localstrategy = require('passport-local').Strategy;
var errorhandler = require('errorhandler');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var express_session = require('express-session');




var app = express();
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.use(errorhandler());
app.use(bodyparser());
app.use(cookieparser());
app.use(logerrors);
app.use(express_session({secret:'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());



function logerrors(err,req,res,next){
        console.error(err.stack);
        next(err);
}


var server = app.listen(2000,listen_callback);

function listen_callback(req,res){
        console.log('we are listen on the port of' + server.address().port);
}

