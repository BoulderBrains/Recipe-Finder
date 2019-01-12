// This .on("click") function will trigger the AJAX Call
$("#find-recipe").on("click", function (event) {

	// event.preventDefault() can be used to prevent an event's default behavior.
	// Here, it prevents the submit button from trying to submit a form when clicked
	event.preventDefault();

	// Here we grab the text from the input box
	var recipe = $("#recipe-input").val();

	// Here we construct our URL
	var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=3d68d15b&app_key=ff6536114baba9fa9737d7daa7776171&from=0&to=1";

	// Write code between the dashes below to hit the queryURL with $ajax, then take the response data
	// and display it in the div with an id of recipe-view
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		$("#recipe-view").text(JSON.stringify(response));
	});
});

var ingredients = [];

function AddToIngredients() {
	// create variable for ingredients input #ingredient-input
	var ingredient = $('#ingredient-input').val();
	console.log("ingredient: " + ingredient);
	// add value from input to ingredients array
	ingredients.push(ingredient);

	console.log(ingredients);
}