
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('simplex', server);
var variables = 'variables';

exports.set = function ( variable, callback ) {
	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( variables, function( err, collection ) {
				if ( !err ) {
					collection.insert( variable, { safe: true }, function( err, result ) {
						if ( err ) {
							callback(err);
							db.close();
						} else {
							callback(err, result);
							db.close();
						}
					});
				} else {
					callback(err);
					db.close();
				}
			});
		}
	});
}

exports.get = function ( name ) {

}

exports.delete = function ( list ) {

}

exports.insert = function ( list ) {

}

exports.selectAll = function ( callback ) {
	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( variables, function( err, collection ) {
				if ( !err ) {
					collection.find().toArray(function ( err, docs ) {
						callback(err, docs);
						db.close();
					});
				} else {
					callback(err);
					db.close();
				}
			});
		}
	});
}

exports.upsert = function ( viewName, name, type, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( variables, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name, viewName: viewName },
									  { viewName: viewName, name: name, type: type },
									  { upsert: true },
									  callback);
					db.close();
				}
			});
		} else {
			callback( err );
			db.close();
		}
	});
}

exports.select = function ( query, fields, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( variables, function( err, collection ) {
				if ( !err ) {
					collection.find( query, fields ).toArray( function( err, documents ) {
						callback( err, documents );
						db.close();
					});
				}
			});
		} else {
			callback( err );
			db.close();
		}
	});
}