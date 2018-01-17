const http = require('http')
const port = process.env.PORT || 3000


const request = require('request');

const postMessage = (message) => {
	var payload=`{"text": "${message}"}`;
	request.post('https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22tkElWrrctM0kmjFu1oX4r3IJJoDgQ79NbtGkirgH2DdR26ubpigNKGfrFu1jrC61%22').form({payload: payload});

}
const requestHandler = (req, response) => {
	console.dir(req.param);
	if (req.method == 'POST') {
		var body = '';
		req.on('data', function (data) {
			try {
				data = JSON.parse(data);
				var data = data["action"]["data"];
				var card = data["card"];
				if (data["listAfter"]["name"] == "完成") {
					postMessage(`${card["name"]} 已經完成 !!`);
				}
			} catch (err) {
				console.log(err);
			}
		});
		req.on('end', function () {
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
