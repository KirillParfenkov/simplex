var dbConnector = require('./database_connector');


var VIEW_COLLECTION = 'views';
var SIMPLEX_DB = 'simplex';

exports.upsert = function ( name, file, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VIEW_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name },
									  { name: name,
									    path: file },
									  { upsert: true },
									  callback);
					mongoclient.close();
				}
			});
		} else {
			callback( err );
			mongoclient.close();
		}
	});
}

exports.select = function ( query, fields, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VIEW_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( query, fields ).toArray( function( err, documents ) {
						callback( err, documents );
						console.log('view closed');
						mongoclient.close();
					});
				}
			});
		} else {
			callback( err );
			mongoclient.close();
		}
	});
}