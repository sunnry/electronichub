var express = require('express');
var http = require('http');
var https = require('https');
var passport = require('passport');
var localstrategy = require('passport-local').Strategy;
var errorhandler = require('errorhandler');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var express_session = require('express-session');
var fs = require('fs');
var routes = require('./routes');


var app = express();
app.set('views',__dirname + '/views');
app.set('view engine','jade');
app.use(errorhandler());
app.use(bodyparser());
app.use(cookieparser());
app.use(logerrors);
app.use(express_session({secret:'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/public",express.static(__dirname + "/public"));
app.use("/lib",express.static(__dirname + "/bower_components"));

var http_port = 2000;
var https_port = 2043;


app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login',routes.loginVerify);
app.get('/signup',routes.signup);
app.post('/signup',routes.do_signup);

function logerrors(err,req,res,next){
        console.error(err.stack);
        next(err);
}


var hskey = fs.readFileSync('privatekey.pem');
var hscert = fs.readFileSync('certificate.pem');

var options = {
		key:hskey,
		cert:hscert
	      };


//create http and https server
var server = http.createServer(app).listen(http_port,listen_callback);
var sslserver = https.createServer(options,app).listen(https_port,listen_callbacks);



function listen_callback(req,res){
        console.log('http:we are listen on the port of' + server.address().port);
}

function listen_callbacks(req,res){
	console.log('https:we are listening on the port of ' + sslserver.address().port);
}
