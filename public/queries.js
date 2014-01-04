var host = window.location.host;

function selectAllPages( callback ) {
	
	$.get('http://' + host + '/selectAllPages', callback);

}

function selectAllViews( callback ) {
	
	$.get('http://' + host + '/selectAllViews', callback);

}

function sendNewFilePlace( name, place, file, callback ) {
	$.post( 'http://' + host + "/insertNewFilePlace", 
		    { pageName: name, pagePlace: place, fileName: file },
		    callback, "text");
}

function sendNewView( name, file, callback ) {
	$.post( 'http://' + host + "/insertNewView", 
		    { viewName: name, fileName: file },
		    callback, "text");
}

function sendNewVariable( viewName ,name, type, callback ) {
	$.post( 'http://' + host + "/insertNewVariable", 
		    { viewName: viewName, variableName: name, variableType: type },
		    callback, "text");
}

function selectViewByName( viewName, callback ) {
	$.get( 'http://' + host + "/selectView/" + viewName, callback );
}