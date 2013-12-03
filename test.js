var dataMenager = require('./modules/data_menager');
var fs = require('fs');
var map = require('./modules/map');

dataMenager.varibles.set({  name : 'Test', 
	                       value : 'TestValue' },

	                      function(err, result) {
	                      	if ( err ) {

	                     	} else {
	                     		console.log('My log: \n' + result);
	                     	}
	                     });


fs.readdir('views', function(err, files) {
	for (var i = 0; i < files.length; i++) {
		console.log('file: ' + files[i]);
		var stat = fs.statSync('views/' +files[i]);
		console.log('is file: ' + stat.isFile());
	}
});