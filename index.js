const http = require('http')
const port = process.env.PORT || 3000


const request = require('request');

const postMessage = (message) => {
	var payload=`{"text": "${message}"}`;
	request.post('https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22tkElWrrctM0kmjFu1oX4r3IJJoDgQ79NbtGkirgH2DdR26ubpigNKGfrFu1jrC61%22').form({payload: payload});

}

const isDone = (name) => {
	return name === "完成" || name === "Done";
}
const requestHandler = (req, response) => {
	console.dir(req.param);
	if (req.method == 'POST') {
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			try {
				console.log(body);
				var data = JSON.parse(body);
				var entities = data["action"]["display"]["entities"];
				var data = data["action"]["data"];
				var card = data["card"];
				if (isDone(data["list"]["name"])) {
					postMessage(`${card["name"]} 已經完成 ， 完成者為 ${entities['memberCreator']['text']}`);
				}
			} catch (err) {
				console.log(err);
			}
		});
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
