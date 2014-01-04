
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongodb.Db( 'simplex', server );
var variables = 'variables';

exports.upsert = function ( name, type, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( variables, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name },
									  { name: name,
									    type: type },
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