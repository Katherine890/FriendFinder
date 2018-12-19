// Gets correct file path for our html
var path = require("path");

  // Handles whenever users visit page
  module.exports = function(app) {

    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // If no matching route is found, set default to home
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    });

};