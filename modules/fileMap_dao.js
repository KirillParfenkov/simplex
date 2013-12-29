
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('simplex', server);
var pages = 'pages';

exports.upsert = function ( name, place, file, callback ) {

	db.open( function( err, db ) {
		if ( !err ) {
			db.createCollection( pages, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name },
									  { name: name,
									  	place: place,
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
			db.createCollection( pages, function( err, collection ) {
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