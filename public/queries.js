var host = window.location.host;

function selectAllPages( callback ) {
	
	$.get('http://' + host + '/selectAllPages', callback);

}