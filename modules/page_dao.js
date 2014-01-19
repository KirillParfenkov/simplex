var mongodb = require('mongodb');
var dbConnector = require('./database_connector');


var PAGE_COLLECTION = 'pages';
var SIMPLEX_DB = 'simplex';

exports.setVariables = function ( pageId, variables, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ _id: mongodb.ObjectID( pageId ) }, { $set: {variables: variables} }, callback);
					mongoclient.close();
				}
			});
		} else {
			callback( err );
			mongoclient.close();
		}
	});
}

exports.upsert = function ( name, place, view, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name },
									  {  name: name,
									    place: place,
									     view: view },
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

exports.selectById = function ( id, fields, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( { _id: mongodb.ObjectID( id ) }, fields ).toArray( function( err, documents ) {
						callback( err, documents );
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

exports.select = function ( query, fields, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( query, fields ).toArray( function( err, documents ) {
						callback( err, documents );
						console.log('page closed');
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