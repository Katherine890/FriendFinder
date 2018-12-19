var express = require("express");
var path = require("path");

// Tells node we are creating an express server
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Points our server to the route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });