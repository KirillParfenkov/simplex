var fs = require('fs');
var url = require('url');
var dataMenager = require('./data_menager');

exports.mapRouts = function( app ) {

	app.get('/admin_panel', function( req, res ) {

		var filesForView = new Array();

		fs.readdir('views', function( err, files) {
			files.forEach( function( file ) {
				var stat = fs.statSync('views/' + file);
				if ( stat.isFile() ) {
					filesForView.push(file);
				}
			});

			res.render('admin_panel', { title: 'Admin panel', files: filesForView });

		});
	});

	app.post('/fileUpdate', function( req, res ) {
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