// index.js
// where your node app starts

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

// Timestamp implementation
app.get("/api/:date?", function (req, res) {
  // Handle empty parameter case FIRST
  if (!req.params.date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  let dateInput = req.params.date;
  let date;

  // Handle non-empty parameters
  date = !isNaN(dateInput) ? new Date(Number(dateInput)) : new Date(dateInput);

  // Validate the date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
