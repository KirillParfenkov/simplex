var dataMenager = require('./modules/data_menager');

dataMenager.varibles.set({  name : 'Test', 
	                       value : 'TestValue' },

	                      function(err, result) {
	                      	if ( err ) {

	                     	} else {
	                     		console.log('My log: \n' + result);
	                     	}
	                     });