$(document).ready(function() {

	var ingredients = [];

	$("#find-ingredient").on("click", function (event) {
		event.preventDefault();
		// create variable for ingredients input #ingredient-input
		var ingredient = $('#ingredient-input').val();

		// add value from input to ingredients array
		ingredients.push(ingredient);

		// create a list item for the ingredient
		var ingredientListItem = $("<li>").html(ingredient);

		// append ingredient to ingredients list 
		$('.ingredients-list').append(ingredientListItem);
		$('#ingredient-input').val("");
	});

	var dataFromAPI;

	// This .on("click") function will trigger the AJAX Call
	$("#find-recipe").one("click", function (event) {

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
			method: "GET",
			success: logFavorite(response),
		}).then(function (response) {
			console.log(response);
			for (var i = 0; i < response.hits.length; i++){

				// console.log(response.hits[i].recipe.image);
				// console.log(response.hits[i].recipe.label);
				// console.log(response.hits[i].recipe.url);


				var recipeDiv = $("<div class='col-sm panel'>");

				var title = response.hits[i].recipe.label;
				// var time = "Total time: " + response.hits[i].recipe.totalTime + " minutes";
				var image = response.hits[i].recipe.image;
				var urlLink = response.hits[i].recipe.url;

				//creating an image tag for the recipe picture
				var foodImage = $("<img>");
				foodImage.addClass("recipe-image");
				foodImage.attr("src", image);
				foodImage.attr("width", "300px");
				
				//variables that hold the picture, title and time to cook
				var recipePicture = $("<div>").html(foodImage);
				var recipeTitle = $("<a>").html(title).attr("href", urlLink).attr("target", "_new");
				recipeTitle.addClass("recipe-name");

				var favoriteButton = $("<button>").addClass("favorite-button btn btn-warning");
				var star = '\u2b50';
				favoriteButton.attr("value", star);
				favoriteButton.attr("type", "submit");
				favoriteButton.attr("action", "/recipe");

				// var favoriteTrigger = $("<button>").attr("action", "/recipe");
				// favoriteTrigger.attr("name", "favTrigger");
				favoriteButton.attr("data-img-url", urlLink);
				favoriteButton.addClass("favorite-trigger");
				favoriteButton.attr("method", "POST");

				// favoriteTrigger.append(favoriteButton);

				recipePicture.append(favoriteButton);


				// var recipeTime = $("<p>").text(time);
				
				//appending the picture, title and time to browser
				recipeDiv.append(recipePicture, recipeTitle);
				recipeDiv.addClass("panel-body recipe-card");
				$("#recipe-view").append(recipeDiv);
			};

				$(".recipe-card").on("click", ".favorite-trigger", function() {
					console.log("Shit was clicked");
				var favLink = $(this)[0].attributes[4].nodeValue;
					console.log(favLink);
			});
		})
	});

	function logFavorite(response, favLink1, favLink2, favLink3) {
		console.log("log favorite data: " + response);
		console.log("outside fav link 1: " + favLink1);
		console.log("outside fav link 2: " + favLink2);
		console.log("outside fav link 3: " + favLink3);
	}
});
