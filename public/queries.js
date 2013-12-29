var host = window.location.host;

function selectAllPages( callback ) {
	
	$.get('http://' + host + '/selectAllPages', callback);

}

function sendNewFilePlace( name, place, file, callback ) {
	$.post( 'http://' + host + "/insertNewFilePlace", 
		    { pageName: name, pagePlace: place, fileName: file },
		    callback, "text");
}