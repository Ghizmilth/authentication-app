var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongodb = reuire ('mongodb');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var uri =
  "mongodb://heroku_0c85xskw:qn26c4jp9ntk425dojtadb7opp@ds245518.mlab.com:45518/heroku_0c85xskw";
var uri =

//connect to MongoDB
mongoose.connect(uri);

// serve static files from template
app.use(express.static(__dirname + "/views"));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handle mongo error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});


var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

// include routes
var routes = require("./controllers/routerController");
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("Express app listening on port 8080", port);
});
