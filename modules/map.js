var fs = require( 'fs' );
var url = require( 'url' );
var async = require( 'async' );
var dataMenager = require('./data_menager');

var publishFiles;
var publishFileMap;

exports.update = function( app ) {

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


}

exports.mapRouts = function( app ) {

	app.get('/admin_panel', function( req, res ) {
		res.render('admin/admin_panel', { title: 'Admin panel', files: publishFiles, fileMap: publishFileMap });
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



}