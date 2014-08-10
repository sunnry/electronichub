var mongoClient = require('mongodb').MongoClient;


exports.setupMongoDb = function(){
	mongoClient.connect('mongodb://127.0.0.1/ehdb',function(err,db){
			if(err) throw err;
			console.log("connect to mongodb:ehdb succeed\n");
			return db;
			}
			);

}

