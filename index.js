const http = require('http')
const port = process.env.PORT || 3000

const requestHandler = (req, response) => {
	console.dir(req.param);

	if (req.method == 'POST') {
		console.log("POST");
		var body = '';
		req.on('data', function (data) {
			body += data;
			console.log("Partial body: " + body);
		});
		req.on('end', function () {
			console.log("Body: " + body);
		});
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('post received');
	}
	response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`server is listening on ${port}`)
})
