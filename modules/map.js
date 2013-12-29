var fs = require( 'fs' );
var url = require( 'url' );
var async = require( 'async' );
var dataMenager = require('./data_menager');

var publishFiles;
var publishFileMap;

exports.update = function( app ) {
/*
	async.parallel({

		fileMap: function getFileMaps( callback ) {
			dataMenager.pages.select( {}, { map: true, path: true }, function( err, documents ) {

				var map = {};
				for ( var i = 0; i < documents.length; i++ ) {
					map[documents[i].path] = documents[i].map;
				}

				callback( err, map );
			});
		},

		files: function getFilePaths( callback ) {
			fs.readdir('views', function( err, files ) {
				var stat;
				var filesForView = new Array ();
				for ( var i = 0; i < files.length; i++ ) {
					stat = fs.statSync( 'views/' + files[i] );
					if ( stat.isFile() ) {
						filesForView.push( files[i] );
					}
				}
				callback( err, filesForView );
			});
		}
	}, function renderView( err, result ) {

		if ( err ) throw err;
		publishFiles = result.files;
		publishFileMap = result.fileMap;

		publishFiles.forEach( function( file ) {
			app.get( '/' +  publishFileMap[file], function( req, res ) {
				res.render( file, { title: file } );
			});
		});
	});
*/


	dataMenager.pages.select( {}, { name: true, place: true, path: true }, function( err, documents ) {


		documents.forEach( function( doc ) {
			app.get( '/' + doc.place, function( req, res ) {
				res.render( doc.path, { title: doc.name } );
			});
		});
	});

}

exports.mapRouts = function( app ) {

	app.get('/admin_panel', function( req, res ) {
		res.render('admin/home', { title: 'Admin panel'});
	});

	app.post( '/fileUpdate', function( req, res ) {
		dataMenager.pages.upsert( req.body.map, req.body.fileName, function( err, file ) {
			if ( !err) {
				res.send( req.body.fileName );
				console.log( 'Upserted ' + req.body.fileName + '\n');
			} else {
				res.send( 'Error!' );
				console.log( err );
			}
		});
	});

	app.get( '/selectAllPages', function( req, res ) {

		dataMenager.pages.select({}, {name: true, place: true, path: true}, function( err, documents ) {

			if ( !err ) {
				res.send( documents );
			} else {
				console.log( err );
				res.send( 'Error!' );
			}
		});
	});

	app.post( '/insertNewFilePlace', function( req, res ) {
		dataMenager.pages.upsert( req.body.pageName, req.body.pagePlace, req.body.fileName, function( err, file ){
			if ( !err ) {
				res.send( req.body.fileName );
				console.log( 'Inserted ' + req.body.fileName + '\n');
			} else {
				res.send( 'Error!' );
				console.log( err );
			}
		});
	});

}