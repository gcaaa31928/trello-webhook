var Trello = require("node-trello");
var t = new Trello("5d3b5f469f111435b56e0d84a7570bf8", "d266ca014d70a0f4a9283ca2d58819090134bcdfc6baa8e731e138b547e5db9e");
const request = require('request');

// var payload='{"text": "First line of message to post in the channel.\nAlso you can have a second line of message."}';
// request.post('https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22tkElWrrctM0kmjFu1oX4r3IJJoDgQ79NbtGkirgH2DdR26ubpigNKGfrFu1jrC61%22').form({payload: payload});
t.get("/1/members/me", function(err, data) {
	if (err) throw err;
	console.log(data);
});
