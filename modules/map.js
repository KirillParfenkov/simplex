var fs = require( 'fs' );
var url = require( 'url' );
var async = require( 'async' );
var dataMenager = require('./data_menager');

exports.mapRouts = function( app ) {

	app.get('/admin_panel', function( req, res ) {

		//var filesForView = new Array();
		//var docs = new Array();

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
					callback( err, filesForView);
				});
			}
		}, function renderView( err, result ) {
			if ( err ) throw err;
			console.log( result );
			res.render('admin_panel', {title: 'Admin panel', files: result.files, fileMap: result.fileMap });
		});
/*
		dataMenager.pages.select( {}, { map: true, path: true }, function( err, documents ) {

			console.log( 'Doces size: ' + documents.length );
			console.log( 'Doces object: ' + documents );

			for ( var i = 0; i < documents.length; i++ ) {
				console.log( '--i-->' + i );
				console.log( 'Doc: ' + documents[i].map + '  ---> ' + documents[i].path );
			}
		});

		fs.readdir('views', function( err, files) {
			files.forEach( function( file ) {
				var stat = fs.statSync('views/' + file);
				if ( stat.isFile() ) {
					filesForView.push(file);
				}
			});

			res.render('admin_panel', { title: 'Admin panel', files: filesForView, map: ['asd', 'asd'] });

		});*/
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

	app.get( '/selectAllFiles', function( req, res ) {

		var docs = new Array();

		dataMenager.pages.select( {}, { map: true, path: true }, function( err, documents ) {

			documents.each( function( err, doc ) {
				if ( !err ) {
					docs.push( doc );
				}

				console.log( docs );
				res.send( docs );
			});
		});

	} );

}