// TODO:
// Create on click for each search result button
// With on click render recipe to screen
// Render photo to screen?
// Only one recipe / photo should show at a time
// If a new search is entered clear and replace results

// JS FOR SEARCH BY COCKTAIL
// Variables
var listOfCocktailVal = [];
// When you click the search button
$("#cocktailSubBtn").click(function (event) {
  event.preventDefault();
  // Input taken and assigned to variable
  cocktailInput = $("#cocktailInput").val().trim();
  // Call search cocktail function
  searchCocktail(cocktailInput);
});

// Uses the input to search the Coctail API
function searchCocktail(cocktailVal) {

	var settings = {
		url: `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${cocktailVal}`,
		method: "GET",
		timeout: 0,
		headers: {},
	};

	$.ajax(settings).done(function (response) {
		// console.log(response);
		let allDrinks = response.drinks;
		// Creates a button for each search result
		for (let i = 0; i < allDrinks.length; i++) {
			// console.log(allDrinks[i].strDrink);
			let drinkName = allDrinks[i].strDrink;
			$("#searchResults").append(
				`<li><button id="drink${i}" type="submit">${drinkName}</button></li>`
			);
		}
	});
}

// JS FOR SEARCH BY INGREDIENT PAGE

$(".ingredientAddBtn").click(function () {

	let value = $(".ingredientInfo").val().trim();
	// Only add ingredient if TextArea has a value
	if (value === "") {
	} else {
		// Render Ingeredient to Page
		$(".listIng").append(`<li class="ingLi">${value}</li>`);
		$(".ingredientInfo").val("");
	}
});

$("#ingredientSubBtn").click(function () {
	event.preventDefault();
	// Get Cocktails for each Ingredients >>>>>>>>>
	$(".ingLi").each(function () {
		value = $(this).text();
		// Get Cocktails for each Ingredients

		searchIngredient(value);
	});
	console.log(listOfCocktailVal);
	// value = $(".ingredientInfo").val().trim();
	// console.log(value);
});


var drinksArr = []

function searchIngredient(ingredient) {

	var settings = {
		async: true,
		crossDomain: true,
		url:
			"https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" +
			ingredient,
		method: "GET",
		headers: {},
	};
	$.ajax(settings).done(function (response) {
    drinksArr.push(response);
		var allDrinks = response.drinks;
		// Creates a button for each search result
		for (let i = 0; i < allDrinks.length; i++) {
			// console.log(allDrinks[i].strDrink);
			var drinkName = allDrinks[i].strDrink;
			$(".ingResults").append(
				`<li><button class="identifyDrink" id="${i}" onClick="getDrink(${i})" type="submit">${drinkName}</button></li>`
			);
			listOfCocktailVal.push(drinkName);
		}
	});

function getDrink(drink) {
  console.log(drinksArr[0].drinks[drink])
  var idLookup = idDrink
  var unirest = require("unirest");
  var req = unirest("GET", "https://the-cocktail-db.p.rapidapi.com/lookup.php");

  req.query({
	  i: "11007"
  });

  req.headers({
	  "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
	  "x-rapidapi-key": "fec2323914msh6be937a2ff5cba0p1cc78ejsn762f18f5e051",
	  "useQueryString": true
  });


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

}

// JS FOR ROULETTE PAGE

// TODO: Dry up code by dynamically generating buttons with on click attached

// Assign on click to each liquor button using the data name as a value to pass into the getCocktal function
$("#vodka").click(function () {
  event.preventDefault();
  let liquor = $("#vodka").attr("data-name");

  getCocktail(liquor);
});

$("#tequila").click(function () {
  event.preventDefault();
  let liquor = $("#tequila").attr("data-name");


$("#gin").click(function () {
  event.preventDefault();
  let liquor = $("#gin").attr("data-name");

  getCocktail(liquor);
});

$("#whiskey").click(function () {
  event.preventDefault();
  let liquor = $("#whiskey").attr("data-name");

  getCocktail(liquor);
});

$("#rum").click(function () {
  event.preventDefault();
  let liquor = $("#rum").attr("data-name");

  getCocktail(liquor);
});

// API call for cocktail using specified liqours
function getCocktail(liquorChoice) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" +
      liquorChoice,
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    let possibleDrinks = response.drinks;
    // Randomly chooses a cocktail from the array of drinks containing that liquor
    var randomCocktail =
      possibleDrinks[Math.floor(Math.random() * possibleDrinks.length)];
    // Show random selection in feature box
    $(".featureText").text(randomCocktail.strDrink);
  });
}

$("#surpriseSelect").click(function () {
  event.preventDefault();

  getRandom();
});

// API call for random cocktail
function getRandom() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    let randomSurprise = response.drinks[0].strDrink;
    // Show random selection in feature box
    $(".featureText").text(randomSurprise);
  });
}

// create function for #identifyDrink to pull up information by drink id and display it in .featureText and .featureImage

// create ABV function to look up beers based on ABV and display options w/ pics
