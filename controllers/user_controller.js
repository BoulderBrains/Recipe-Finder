var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res){
    res.render("index");
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

router.post("/update", function(req, res){
    
	user.userFAVORITE( [req.body.username], [req.body.password], [req.body.favorite], function(data) {
		console.log(data.length);
		
		// if (data != 0) {
        //     res.redirect("/recipe");
        // } else {
        //     res.send("USER EXISTS!!!!!!");
            
        // }			
        res.end();
	});
});


//Export routers for server.js to use
module.exports = router;