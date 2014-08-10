var dbs = require('./dbs');


exports.index = function(req,res){
	res.render('index');
};


exports.login = function(req,res){
	if(typeof(req.connection.encrypted) == 'undefined'){
		res.redirect('https://127.0.0.1:2043/login');
	}
	else if(typeof(req.connection.encrypted == 'object')){
		res.render('login');
	}
}


exports.loginVerify = function(req,res){
	console.log(req.body.email);
	console.log(req.body.password);
	dbs.login(req,res,req.body.email,req.body.password);
}

exports.contact = function(req,res){
	res.render("contact");
}


exports.community = function(req,res){
	res.render('community');
}


exports.signup = function(req,res){
	if(typeof(req.connection.encrypted) == 'undefined'){
		res.redirect('https://127.0.0.1:2043/signup');
	}
	else if(typeof(req.connection.encrypted == 'object')){
		res.render('signup');
		
	}
}


exports.do_signup = function(req,res){
	console.log(req.body.email);
	console.log(req.body.password);
	dbs.signupNewUser(req,res,req.body.email,req.body.password);
}
