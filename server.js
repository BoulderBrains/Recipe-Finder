var express = require("express");
var methodOverride = require('method-override');

// app.use('/favicon.ico', express.static('public/assets/images/carrotEmoji.ico'));

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(methodOverride('_method'));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//linking js and css files to recapp.js
app.use(express.static(__dirname + '/public'))

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/recipe', function (req, res) {
  res.render('recipe');
});

// Import routes and give the server access to them.
var routes = require("./controllers/user_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
