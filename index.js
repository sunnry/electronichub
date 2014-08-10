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
var mongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var routes = require('./routes');
/*database related modules*/
var dbs = require('./dbs');

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

/*passport strategy setting*/

function queryById(id,fn){
	dbs.queryById(id,fn);
}

function queryByUsername(username,fn){
	dbs.queryByAccountname(username,fn);
}

passport.serializeUser(function(user,done){
	done(null,user._id);
});


passport.deserializeUser(function(id,done){
				queryById(id,function(err,user){
					done(err,user);
				});
			});


passport.use(new localstrategy(function(account_name,password,done){
			process.nextTick(function(){
				queryByUsername(account_name,function(err,user){
					if(err) {return done(err);}
					if(!user){return done(null,false);}
					if(user.account_password != password){
					return done(null,false);
					}
					return done(null,user);
					});
				});
			}));


var http_port = 2000;
var https_port = 2043;

/*set routing*/
app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),routes.loginVerify);
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
