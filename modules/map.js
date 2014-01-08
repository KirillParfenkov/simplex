var fs = require( 'fs' );
var url = require( 'url' );
var async = require( 'async' );
var dataMenager = require('./data_menager');

var publishFiles;
var publishFileMap;

exports.update = function( app ) {

	dataMenager.pages.select( {}, { name: true, place: true, path: true }, function( err, documents ) {


		documents.forEach( function( doc ) {
			app.get( '/' + doc.place, function( req, res ) {
				res.render( doc.path, { title: doc.name } );
			});
		});
	});

}

exports.mapRouts = function( app ) {

	app.post( '/insertNewVariable', function( req, res ) {
		dataMenager.variables.upsert( req.body.viewName, 
			                        { name: req.body.variableName, type: req.body.variableType },
		                              function( err, name, type ) {
			if ( !err ) {
				res.send( req.body.name );
				console.log( 'Upserted Variable: ' + req.body.name + '\n' );
			} else {
				res.send( 'Error!' );
				console.log( err );
			}
		});
	});

	app.get( '/admin_panel/page/:id', function( req, res ) {
		dataMenager.pages.selectById( req.params.id, {_id: true, name: true, place: true, view: true },
		                         function( err, pages ) {
			if ( !err )  {

				if ( pages[0] ) {
					res.render( 'admin/pageEdit', { title: 'Page Edit', page: pages[0] } );
				}

			} else {
				res.send( 'Error!' );
			}
		});
	});

	app.get( '/admin_panel/view/:name', function( req, res ) {

		async.parallel( {
			view: function getView( callback ) {
				dataMenager.views.select({ name: req.params.name }, { name: true, variables: true }, function( err, documents ) {

					if ( !err ) {
						if ( documents ) {
							callback( err, documents[0]);
						}
					} else {
						callback( err );
					}
				});
			},

			variableTypes: function getVariableTypes( callback ) {
				dataMenager.variables.getTyles( function( err, types ) {

					callback( err, types );
				});
			}
		}, function render( err, result ) {
			if ( err ) throw err;

			if ( result.view ) {
				res.render( 'admin/viewEdit', { title: 'View Edit', view: result.view, variableTypes: result.variableTypes } );
			} else {
				res.send( 'Error!' );
			}
		});
	});

	app.get('/admin_panel', function( req, res ) {
		res.render( 'admin/home', { title: 'Admin panel'} );
	});

	app.post( '/fileUpdate', function( req, res ) {
		dataMenager.pages.upsert( req.body.map, req.body.fileName, function( err, file ) {
			if ( !err) {
				res.send( req.body.fileName );
				console.log( 'Upserted: ' + req.body.fileName + '\n');
			} else {
				res.send( 'Error!' );
				console.log( err );
			}
		});
	});

	app.get( '/selectAllPages', function( req, res ) {

		dataMenager.pages.select({}, { _id: true, name: true, place: true, view: true }, function( err, documents ) {

			if ( !err ) {
				res.send( documents );
			} else {
				console.log( err );
				res.send( 'Error!' );
			}
		});
	});

	app.get( '/selectView/:name', function( req, res ) {
		dataMenager.views.select({ name: req.params.name }, {name: true}, function( err, documents ) {

			if ( !err ) {
				console.log( documents );
				res.send( documents[0] );
			} else {
				console.log( err );
				res.send( 'Error!' );
			}
		});
	});

	app.get( '/selectAllViews', function( req, res ) {

		dataMenager.views.select({}, {name: true, path: true}, function( err, documents ) {

			if ( !err ) {
				res.send( documents );
			} else {
				console.log( err );
				res.send( 'Error!' );
			}
		});
	});

	app.get( '/selectAllVariablesForView/:viewName', function( req, res ) {

		dataMenager.views.select({ name: req.params.viewName }, 
			                     { variables: true}, 
			                       function( err, documents ) {
			if ( !err ) {
				if ( documents[0] ) {
					res.send( documents[0].variables);
				}
			} else {
				console.log( err );
				res.send( 'Error!' );
			}
		});
	});

	app.post( '/insertNewPage', function( req, res ) {
		dataMenager.pages.upsert( req.body.pageName, req.body.pagePlace, req.body.pageView, function( err, file ){
			if ( !err ) {
				res.send( req.body.fileName );
				console.log( 'Inserted ' + req.body.pageName + '\n');
			} else {
				res.send( 'Error!' );
				console.log( err );
			}
		});
	});

	app.post( '/insertNewView', function( req, res ) {
		dataMenager.views.upsert( req.body.viewName, req.body.fileName, function( err, file ) {
			if ( !err ) {
				res.send( req.body.fileName );
				console.log( 'Inserted ' + req.body.fileName + '\n' );
			} else {
				res.send( 'Error!' );
				console.log( err );
			}
		}); 
	});

}