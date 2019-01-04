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
        console.log( "BODY", req.body);
        var newUser = req.body;
        var bestFriend =
        {
            name: "",
            photo: "",
            friendScore: 1000
        }
        for (i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i]; // create variable for each friend in the array
            console.log("Current Friend", currentFriend);
            var totalDifference = 0;
            for (j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j]; // create a variable for each score for the CURRENT friend in the array
                var currentUserScore = newUser.scores[j]; // create varaible for each score for the CURRENT User in the array 
               // var currentUserScoreParsed = parseInt(currentUserScore);
                totalDifference += Math.abs(currentFriendScore - currentUserScore);
                //console.log("total difference", totalDifference);
                //console.log("Friend Score", currentFriendScore);
               // console.log("Current User", currentUserScore);  
            }
            if (totalDifference <= bestFriend.friendScore) {
                bestFriend.name = currentFriend.name
                bestFriend.photo = currentFriend.photo
                bestFriend.friendScore = totalDifference
            }
        }
        // var currentUser = answersArray;
        console.log("new best friend", bestFriend);
        friendsData.push(req.body);
        res.json(bestFriend);
    })
};