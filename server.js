// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date API endpoint
app.get("/api/:date?", (req, res) => {
  // Get date params and set to validate date
  let date = req.params.date
  if (date == undefined) {
    date = new Date()
  } else if (+date) {
    date = +date
  }
  // Display json for every respond
  const unix = new Date(date).getTime()
  const utc = new Date(date).toUTCString()
  if (unix == NaN || utc == "Invalid Date") {
    res.json({error: "Invalid Date"})
  } else {
    res.json({unix: unix, utc: utc})
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3300, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
