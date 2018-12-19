// Linking our route to data sources that hold our friends info.
var friendsData = require("../data/friends");

module.exports = function(app) {
    
    //handles whenever a user visits a page

    //displays json of all possible friends
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });

    // handles when user submits survey and results (data) is pushed to javascript array
    // saves data to the friendsData array
    // handles friend compatibility
    app.post("/api/friends", function(req, res) {
        res.json()
    })
};