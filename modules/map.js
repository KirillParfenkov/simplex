
exports.mapRouts = function( app ) {

	app.get('/admin_panel', function(req, res) {
		res.render('admin_panel', {title: 'Admin panel'});
	});
}