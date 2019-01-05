// Linking our route to data sources that hold our friends info.
var friendsData = require("../data/friends");

module.exports = function (app) {

    // This turns the users' results from strings to integers
    var stringScorestoIntScores = function(scores) {
        var result = [];

        for(let i=0; i < scores.length; i++) {
            result.push(parseInt(scores[i], 10));
        }

        return result;
    } 

    //displays json of all possible friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        var bestFriend =
        {
            name: "",
            photo: "",
            friendScore: 1000
        };
        // This is the variable for the newly parsed scores
        var newUserScore = stringScorestoIntScores(req.body.scores);
    
        for (var i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i]; // create variable for each friend in the array
            var totalDifference = 0;

            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j]; // create a variable for each score for the CURRENT friend in the array
                var currentUserScore = newUserScore[j]; // create varaible for each score for the CURRENT User in the array 
                totalDifference += Math.abs(currentFriendScore - currentUserScore);
              
            }

            if (totalDifference <= bestFriend.friendScore) {
                bestFriend.name = currentFriend.name
                bestFriend.photo = currentFriend.photo
                bestFriend.friendScore = totalDifference
            }
        }

        console.log("BEST MATCH", bestFriend);
       
        req.body.scores = newUserScore;
        
        friendsData.push(req.body);
        res.json(bestFriend);
    });
};