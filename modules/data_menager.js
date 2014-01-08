var varibleDao = require('./variable_dao');
var fileMapDao = require('./fileMap_dao');
var pageDao = require('./page_dao');

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
	
	upsert: function( name, place, view, callback ) {
		pageDao.upsert( name, place, view, callback );
	},

	select: function( query, fields, callback ) {
		pageDao.select( query, fields, callback );
	},

	selectById: function( id, fields, callback) {
		pageDao.selectById( id, fields, callback );
	}
}

exports.views = {

	upsert: function( name, file, callback ) {
		fileMapDao.upsert( name, file, callback ); 
	},

	select: function( query, fields, callback ) {
		fileMapDao.select( query, fields, callback );
	}
}

exports.variables = {

	upsert: function( viewName, variable, callback ) {
		varibleDao.pushVariable( viewName, variable, callback ); 
	},

	remove: function( viewName, matchVar, callback ) {
		varibleDao.pullVariable( viewName, matchVar, callback );
	},

	select: function( query, fields, callback ) {
		varibleDao.select( query, fields, callback );
	},

	getTyles: function( callback ) {
		varibleDao.getTyles( callback );
	}
}