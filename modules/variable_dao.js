var dbConnector = require('./database_connector');

var VARIABLES_COLLECTION = 'variables';
var VIEWS_COLLECTION = 'views';
var TYPE_COLLECTION = 'types';
var SIMPLEX_DB = 'simplex';

exports.set = function ( variable, callback ) {
	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VARIABLES_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.insert( VARIABLES_COLLECTION, { safe: true }, function( err, result ) {
						if ( err ) {
							callback(err);
							mongoclient.close();
						} else {
							callback(err, result);
							mongoclient.close();
						}
					});
				} else {
					callback(err);
					mongoclient.close();
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
	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VARIABLES_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find().toArray(function ( err, docs ) {
						callback(err, docs);
						mongoclient.close();
					});
				} else {
					callback(err);
					mongoclient.close();
				}
			});
		}
	});
}

exports.upsert = function ( viewName, name, type, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VARIABLES_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: name, viewName: viewName },
									  { viewName: viewName, name: name, type: type },
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
			db.createCollection( VARIABLES_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.find( query, fields ).toArray( function( err, documents ) {
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

exports.pushVariable = function ( viewName, variable, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VIEWS_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: viewName }, { $push: { variables: variable }}, callback);
					mongoclient.close();
				}
			});
		} else {
			callback( err );
			mongoclient.close();
		}
	});
}

exports.pullVariable = function ( viewName, matchVar, callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient ) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( VIEWS_COLLECTION, function( err, collection ) {
				if ( !err ) {
					collection.update({ name: viewName }, { $pull: { variables: matchVar }}, callback);
					mongoclient.close();
				}
			});
		} else {
			callback( err );
			mongoclient.close();
		}
	});
}

exports.getTyles = function ( callback ) {

	dbConnector.getMongoclient().open( function( err, mongoclient) {
		if ( !err ) {
			var db = mongoclient.db( SIMPLEX_DB );
			db.createCollection( TYPE_COLLECTION, function( err, collection) {
				if( !err ){
					collection.find({}, { name: true }).toArray( function( err, types ) {
						callback( err, types );
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