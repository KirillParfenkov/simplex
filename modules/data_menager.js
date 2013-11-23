var varibleDao = require('./variable_dao'); 

exports.varibles = {

	get : function( name ) {

	},

	set : function( varible, callback ) {
		varibleDao.set( varible, callback );
	},

	selectAll : function ( callback ) {
		varibleDao.selectAll( callback );
	}
}

exports.pages = {
	
}