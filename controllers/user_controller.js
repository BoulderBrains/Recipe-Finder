var express = require("express");
var router = express.Router();
var connection = require("../config/connection.js");

// Import the model (burger.js) to use its database functions.
var user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res){
    res.render("index");
});

router.get("/recipe/:userId",function(req,res){
    user.userGetData(req.params.userId, function(data) {
		var hbsObject = {
			users: data
		};
		// console.log(hbsObject);
		res.render("recipe", hbsObject);
	});
});

router.post("/login", function(req, res){
    // console.log(req.body);
	user.userGET([req.body.username], [req.body.password], function(data){
		connection.query("SELECT * FROM users WHERE username = ?", req.body.username, function(err, user, fields){
			if (user) {
				res.redirect("/recipe/" + user[0].id);
			} else {
				res.send("Incorrect Username and/or Password!");
			}	
		});
    });
});

router.post("/add", function(req, res){
	user.userADD( [req.body.username], [req.body.password], function(data) {
		// console.log(data.length);
		connection.query("SELECT * FROM users WHERE username = ?", req.body.username, function(err, user, fields){
			if (user != 0) {
				res.redirect("/recipe/" + user[0].id);
			} else {
				res.send("USER EXISTS!!!!!!");
			}			
			res.end();
		});
	});
});

// We were unable to get our favoriting functionaly working. 
// TODO: fix the ablity for a user to favorite a recipe, then show the button

// router.post("/recipe", function(req, res){
// 	console.log("LARGE OBJECT", req.url);
// 	user.userFAVORITE({
// 		username: req.body.username,
// 		favoriteRecipe: req.body.favorited
// 	}, function(result) {
// 		if (result.changedRows == 0) {
// 			// If no rows were changed, then the ID must not exist, so 404
// 			return res.status(404).end();
// 		} else {
// 			res.status(200).end();
// 		}
// 	});			
// });

//Export routers for server.js to use
module.exports = router;