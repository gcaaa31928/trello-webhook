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
	if (req.method == 'POST') {
		var body = '', entities, data, card, cardName;
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			try {
				data = JSON.parse(body);
				console.log('in', data);
				entities = data["action"]["display"]["entities"];
				data = data["action"]["data"];
				card = data["card"];
				cardName = ("listAfter" in data) ? data["listAfter"]["name"] : data["list"]["name"];
			} catch (err) {
				console.log(err);
			}
		});
	}
	response.end('Hello Node.js Server!')
	if (isDone(cardName)) {
		postMessage(`${card["name"]} 已經完成，完成者為 ${entities['memberCreator']['text']}`);
	}
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`server is listening on ${port}`)
})
