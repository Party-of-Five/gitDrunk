$("#cocktailSubBtn").click(function (event) {
  event.preventDefault();
  cocktailInput = $("#cocktailInput").val().trim();
  searchCocktail(cocktailInput);
});

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
    // loop through the api response
    // create button for each drink in array
    // name the button correctly
    // id/value equal to spot in array
    // append to #searchResults
    for (let i = 0; i < allDrinks.length; i++) {
      console.log(allDrinks[i].strDrink);
      let drinkName = allDrinks[i].strDrink;
      let drinkBtn = $("<button>");
    }
  });
}
