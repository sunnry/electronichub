var mongoClient = require('mongodb').MongoClient;


exports.signupNewUser = function(req,res,email,password){
	mongoClient.connect('mongodb://127.0.0.1/ehdb',function(err,db){
			if(err) throw err;
			console.log("signup with new user:%s, password:%s\n",email,password);
			var accounts = db.collection('accounts');
			accounts.insert({account_email:email,account_password:password},function(err,docs){
				if(err)  throw err;

				res.redirect('/login');
				});
			});
}



exports.login = function(req,res,email,password){
	mongoClient.connect('mongodb://127.0.0.1/ehdb',function(err,db){
			if(err) throw err;
			console.log("login with new user:%s, password:%s\n",email,password);
			var accounts = db.collection('accounts');
			accounts.find({account_email:email}).toArray(function(err,docs){
					if(err) throw err;
					var user = docs[0];
					if(user.account_password == password){
						res.redirect('http://127.0.0.1:2000');
					}
					else if(user.account_password != password){
						res.redirect('/login');
					}
				});
			});
}



exports.queryById = function(id,fn){
	mongoClient.connect('mongodb://127.0.0.1/ehdb',function(err,db){
			if(err) throw err;
			console.log("query user:%s\n",email);
			var accounts = db.collection('accounts');
			accounts.find({account_email:email},function(err,docs){
				if(err){ console.log("login error"); }

				});
			});
}


exports.queryByAccountname = function(email,fn){
	mongoClient.connect('mongodb://127.0.0.1/ehdb',function(err,db){
			if(err) throw err;
			console.log("query user:%s\n",email);
			var accounts = db.collection('accounts');
			accounts.find({account_email:email},function(err,docs){
				if(err){ console.log("login error");  res.redirect('/login');}

				});
			});
}
