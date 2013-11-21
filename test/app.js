var fs = require('fs'),
 https = require('https'),
  http = require('http');


var privateKey = fs.readFileSync('test/site.key').toString();
var certificate = fs.readFileSync('test/final.crt').toString();

var options = {
     key: privateKey,
    cert: certificate
};

https.createServer(options, function(req, res){
    res.writeHead(200);
    res.end("Hello Secure World\n");
}).listen(3000);