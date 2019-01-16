var ingredients = [];

$("#find-ingredient").on("click", function (event) {
	event.preventDefault();
	// create variable for ingredients input #ingredient-input
	var ingredient = $('#ingredient-input').val();
	console.log("ingredient: " + ingredient);
	// add value from input to ingredients array
	ingredients.push(ingredient);
	// print out ingredients array after ingredient is added to it. 
	$('.ingredients-list').append(ingredient + ", ");
	console.log(ingredients);
});

// This .on("click") function will trigger the AJAX Call
$("#find-recipe").on("click", function (event) {

	// event.preventDefault() can be used to prevent an event's default behavior.
	// Here, it prevents the submit button from trying to submit a form when clicked
	event.preventDefault();

	// Here we grab the ingredients from the ingredients array
	var recipe = ingredients;

	// Here we construct our URL
	var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=3d68d15b&app_key=ff6536114baba9fa9737d7daa7776171&from=0&to=3";

	// Write code between the dashes below to hit the queryURL with $ajax, then take the response data
	// and display it in the div with an id of recipe-view
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
	
		for (var i = 0; i < response.hits.length; i++){
			console.log(response.hits[i].recipe.image)
			console.log(response.hits[i].recipe.label)
			console.log(response.hits[i].recipe.url)

			// var recipe1 = response.hits[0].recipe
			// var receipe2 = response.hits[1].recipe
			// var recipe3 = response.hits[2].recipe
			var recipeDiv = $("<div class='col-lg-4 col-sm-6'>");

			var title = response.hits[i].recipe.label
			var time = "Total time: " + response.hits[i].recipe.totalTime + " minutes"
			var image = response.hits[i].recipe.image
			//click image brings you to recipe site
			var urlLink = response.hits[i].recipe.url
			var foodImage = $("<img>");
			foodImage.addClass("image");
			foodImage.attr("src", image);
			foodImage.attr("width", "300px")
			$(".image").html(foodImage);
			//when image licked on, recipe site loads
			$(".image").on("click", function(){
				$(".image").wrap($("<a>").attr("href", urlLink));
			  });
			//creating recipe title and time to cook
			var titleP = $("<p>").text(title);
			var timeP = $("<p>").text(time)
			//appending to scrren
			recipeDiv.append(foodImage, titleP, timeP)

			$("#recipe-view").prepend(recipeDiv)
		}
	});
});