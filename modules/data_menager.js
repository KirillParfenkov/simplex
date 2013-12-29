var varibleDao = require('./variable_dao');
var fileMapDao = require('./fileMap_dao');


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
	
	upsert: function( name, place, file, callback ) {
		fileMapDao.upsert( name, place, file, callback );
	},

	select: function( query, fields, callback ) {
		fileMapDao.select( query, fields, callback );
	}
}