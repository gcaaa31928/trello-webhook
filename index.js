var Trello = require("node-trello");
var t = new Trello("5d3b5f469f111435b56e0d84a7570bf8", "d266ca014d70a0f4a9283ca2d58819090134bcdfc6baa8e731e138b547e5db9e");

t.get("/1/boards/5a5f03328066cc1a059790ef/cards", function(err, data) {
	if (err) throw err;
	data.forEach(function(card) {
		console.log(card);
	});
});


// URL arguments are passed in as an object.
// t.get("/1/members/me", { cards: "open" }, function(err, data) {
//   if (err) throw err;
//     console.log(data);
//     });
