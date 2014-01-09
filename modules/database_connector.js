var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
//var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});

//var mongoclient = new MongoClient( server );

exports.getMongoclient = function () {

	var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
	return new MongoClient( server );
} 