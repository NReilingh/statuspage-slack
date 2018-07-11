// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// We'll use this later for an info page at /
app.use(express.static('public'));

// GET requests for a previous endpoint will show request history.
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// POST requests actually do the thing.
app.post('/services/*', express.json(), require('./statuspage_json.js'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
