exports.index = function(req,res){
	res.render('index');
};



exports.login = function(req,res){
	res.render('login');
}


exports.loginVerify = function(req,res){
	res.render('login');
}

exports.contact = function(req,res){
	res.render("contact");
}


exports.community = function(req,res){
	res.render('community');
}