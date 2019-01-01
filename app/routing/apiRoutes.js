// Linking our route to data sources that hold our friends info.
var friendsData = require("../data/friends");

module.exports = function (app) {


    //handles whenever a user visits a page

    //displays json of all possible friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);

    });

    // handles when user submits survey and results (data) is pushed to javascript array
    // saves data to the friendsData array
    // handles friend compatibility
   
    // 2. take the differences of each compared strings and add together
    // 3. The user with the least amount of totalDifference is the match
    app.post("/api/friends", function (req, res) {
        console.log(req.body);
        var newUser = req.body;
        var bestFriend =
        {
            name: "",
            photo: "",
            friendScore: 1000
        }
        for (i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i];
            console.log("Current Friend", currentFriend);
            var difference = 0;
            for (j = 0; i < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = newUser.scores[j];
                difference += Math.abs(currentFriendScore - currentUserScore);
               // console.log(difference);
                //console.log(friendscore);
                //console.log(currentUserScore);
            }
            if (difference <= bestFriend.friendScore) {
                bestFriend.name = currentFriend.name
                bestFriend.photo = currentFriend.photo
                bestFriend.friendScore = difference
            }
        }
        // var currentUser = answersArray;
        console.log("new best friend", bestFriend);
        friendsData.push(req.body);
        res.json(bestFriend);
    })
};