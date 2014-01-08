var mongodb = require('mongodb');
var dbConnector = require('./database_connector');


var db = dbConnector.getDB();
var PAGE_COLLECTION = 'pages';

exports.upsert = function ( name, place, view, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name },
									  {  name: name,
									    place: place,
									     view: view },
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

exports.selectById = function ( id, fields, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( { _id: mongodb.ObjectID( id ) }, fields ).toArray( function( err, documents ) {
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

exports.select = function ( query, fields, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( PAGE_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( query, fields ).toArray( function( err, documents ) {
						callback( err, documents );
						console.log('page closed');
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