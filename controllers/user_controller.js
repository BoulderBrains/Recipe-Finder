var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res){
	user.all(function(data) {
		var hbsObject = {
		  users: data
		};
		console.log(hbsObject);
		res.render("recipe", hbsObject);
	});
});

router.get("/recipe",function(req,res){
    res.render("recipe");
});

router.post("/login", function(req, res){
    console.log(req.body);
    
	user.userGET([req.body.username], [req.body.password], function(data){
		if (data.length > 0) {
            
            res.redirect("/recipe");
        } else {
            res.send("Incorrect Username and/or Password!");
            
        }			
        res.end();
    });
});

router.post("/add", function(req, res){
    
	user.userADD( [req.body.username], [req.body.password], function(data) {
        console.log(data.length);
		if (data != 0) {
            res.redirect("/recipe");
        } else {
            res.send("USER EXISTS!!!!!!");
            
        }			
        res.end();
	});
});

router.post("/recipe", function(req, res){
	

	user.userFAVORITE( [req.body.username], [req.body.password], [req.body.favorite], function(data) {
		console.log(data.length);

		user.update({
			username: req.body.username,
			favoriteRecipe: req.body.favorite
		}, condition, function(result) {
			if (result.changedRows == 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			  } else {
				res.status(200).end();
			  }
		});
	});			
});


//Export routers for server.js to use
module.exports = router;