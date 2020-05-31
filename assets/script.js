// TODO:
// Get personal API Key
// Create on click for each search result button
// With on click render recipe to screen
// Render photo to screen?
// Only one recipe / photo should show at a time
// If a new search is entered clear and replace results

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


$(".ingredientAddBtn").click(function(){
  let value = $(".ingredientInfo").val().trim();
  $(".listIng").append("<li>"+value+"</li>");
});

$(".ingredientSubBtn").click(function(){
  event.preventDefault();
  let value = $(".ingredientInfo").val().trim();
  console.log(value);

  searchIngredient(value);
});

function searchIngredient(value) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i="+value,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "fec2323914msh6be937a2ff5cba0p1cc78ejsn762f18f5e051"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    
    let allDrinks = response.drinks;
    // Creates a button for each search result
    for (let i = 0; i < allDrinks.length; i++) {
      console.log(allDrinks[i].strDrink);
      let drinkName = allDrinks[i].strDrink;
      $(".ingResults").append(
        `<li><button id="drink${i}" type="submit">${drinkName}</button></li>`
      );
    }

  });
}
