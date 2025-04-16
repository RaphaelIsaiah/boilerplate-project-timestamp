// index.js
// where your node app starts

// Trigger clean build

// init project
var express = require("express");
const path = require("path");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/views/index.html");G
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({ greeting: "hello API" });
// });

// timestamp implementation
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  // Handle empty parameter
  let date = !dateInput
    ? new Date()
    : !isNaN(dateInput)
    ? new Date(Number(dateInput)) // Handle Unix timestamp
    : new Date(dateInput); // Handle date string

  // Validate the date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return Unix and UTC timestamps
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
