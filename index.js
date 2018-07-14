const http = require('http');
const url = require('url');


var server = http.createServer(function(req, res) {
	
	var parsedUrl = url.parse(req.url, true);
	var path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
	
	req.on('data', function(data) {});

	req.on('end', function() {
		var chosenHandler = router[path] || handlers.notFound;

		chosenHandler({}, function(statusCode=200, payload={}) {
			var payloadString = JSON.stringify(payload);

			res.writeHead(statusCode, {
				'Content-Type': 'application/json'
			});

			res.end(payloadString);
		});
	});
});

server.listen(3000, function() {
	console.log('Server listening on port 3000');
});

var handlers = {};
handlers.hello = function(data, callback) {
	callback(200, {'message': 'Hello World !!'});
};

handlers.notFound = function(data, callback) {
	callback(404);
}

var router = {
	'hello': handlers.hello
}
