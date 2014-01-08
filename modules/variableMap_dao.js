
var dbConnector = require('./database_connector');


var db = dbConnector.getDB();
var VARIABLE_COLLECTION = 'variables';

exports.upsert = function ( name, type, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( VARIABLE_COLLECTION, function( err, collection ) {
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
			db.createCollection( VARIABLE_COLLECTION, function( err, collection ) {
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