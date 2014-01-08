var host = window.location.host;

function selectAllPages( callback ) {
	
	$.get('http://' + host + '/selectAllPages', callback);

}

function selectAllViews( callback ) {
	
	$.get('http://' + host + '/selectAllViews', callback);

}

function sendNewPage( name, place, view, callback ) {
	$.post( 'http://' + host + "/insertNewPage", 
		    { pageName: name, pagePlace: place, pageView: view },
		    callback, "text");
}

function sendNewView( name, file, callback ) {
	$.post( 'http://' + host + "/insertNewView", 
		    { viewName: name, fileName: file },
		    callback, "text");
}

function sendNewVariable( viewName, name, type, callback ) {
	$.post( 'http://' + host + "/insertNewVariable", 
		    { viewName: viewName, variableName: name, variableType: type },
		    callback, "text");
}

function selectViewByName( viewName, callback ) {
	$.get( 'http://' + host + "/selectView/" + viewName, callback );
}

function selectVariablesForView( viewName, callback) {
	$.get( 'http://' + host + "/selectAllVariablesForView/" + viewName, callback );
}