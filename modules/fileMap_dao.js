
var dbConnector = require('./database_connector');


var db = dbConnector.getDB();
var VIEW_COLLECTION = 'views';

exports.upsert = function ( name, file, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( VIEW_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name },
									  { name: name,
									    path: file },
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
			db.createCollection( VIEW_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( query, fields ).toArray( function( err, documents ) {
						callback( err, documents );
						console.log('view closed');
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