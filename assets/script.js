// TODO:
// Get personal API Key
// Create on click for each search result button
// With on click render recipe to screen
// Render photo to screen?
// Only one recipe / photo should show at a time
// If a new search is entered clear and replace results

// JS FOR SEARCH BY COCKTAIL

// When you click the search button
$("#cocktailSubBtn").click(function (event) {
  event.preventDefault();
  // Input taken and assigned to variable
  cocktailInput = $("#cocktailInput").val().trim();
  // Call search cocktail function
  searchCocktail(cocktailInput);
});

// Uses the input to search the API
function searchCocktail(cocktailVal) {
  var settings = {
    url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailVal}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let allDrinks = response.drinks;
    // Creates a button for each search result
    for (let i = 0; i < allDrinks.length; i++) {
      console.log(allDrinks[i].strDrink);
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
  $(".listIng").append("<li>" + value + "</li>");
});

$(".ingredientSubBtn").click(function () {
  event.preventDefault();
  value = $(".ingredientInfo").val().trim();
  console.log(value);
  // find out how to pull from multiple ingredients at once.  redo search to use listed ingredients as criteria.
  searchIngredient(value);
});

function searchIngredient(ingredient) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + ingredient,
    method: "GET",
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "fec2323914msh6be937a2ff5cba0p1cc78ejsn762f18f5e051",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);

    let allDrinks = response.drinks;
    // Creates a button for each search result
    for (let i = 0; i < allDrinks.length; i++) {
      console.log(allDrinks[i].strDrink);
      let drinkName = allDrinks[i].strDrink;
      $(".ingResults").append(
        `<li><button id="drink${i}" class="identifyDrink" onClick="drinkSelector(drink${i})" type="submit">${drinkName}</button></li>`
      );
    }
  });
}
// create function for #identifyDrink to pull up information by drink id and display it in .featureText and .featureImage

function drinkSelector(drink) {
  var findDrink = drink.innerHTML;
  console.log(findDrink)
};

// JS FOR ROULETTE PAGE

// TODO: See why all .liquorSelect buttons are getting the same data-name
// Append: Drink name and pull recipe + photo to post on page in  correct area

// Random drink generator based on liquor button clicked
$(".liquorSelect").click(function () {
  event.preventDefault();
  // WHY?? Every liquor button is showing as vodka
  let liquor = $(".liquorSelect").attr("data-name");
  console.log(liquor);

  getCocktail(liquor);
});

function getCocktail(liquor) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + liquor,
    method: "GET",
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "fec2323914msh6be937a2ff5cba0p1cc78ejsn762f18f5e051",
    },
  };

  $.ajax(settings).done(function (response) {
    let possibleDrinks = response.drinks;
    // Randomly chooses a cocktail from the array of drinks containing that liquor
    var randomCocktail =
      possibleDrinks[Math.floor(Math.random() * possibleDrinks.length)];
    // Console log random selection
    console.log(randomCocktail.strDrink);
  });
}


