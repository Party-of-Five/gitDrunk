// JS FOR SEARCH BY COCKTAIL
// Variables
var listOfCocktailVal = [];
var drinksArr = [];
var ingredArr = [];
var ingredList = "";

// Get All the Ingredients from the DB API
function getAllIngList() {
  var settings = {
    url: `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    let allIng = response.drinks;
    // Creates a button for each search result
    for (let i = 0; i < allIng.length; i++) {
      // console.log(allDrinks[i].strDrink);
      let IngName = allIng[i].strIngredient1;
      // render Ingredients to droplist
      $("#ingredients").append(`<option value="${IngName}"> </option>`);
    }
  });
}

// When you click the search button
$("#cocktailSubBtn").click(function (event) {
  event.preventDefault();
  $(".ingResults").empty();
  drinksArr = [];
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
    drinksArr.push(response);
    var allDrinks = response.drinks;
    // Creates a button for each search result
    for (let i = 0; i < allDrinks.length; i++) {
      var drinkName = allDrinks[i].strDrink;
      $(".ingResults").append(
        `<li><button id="identifyDrink ${i}" onClick="getDrink(${allDrinks[i].idDrink})" type="button">${drinkName}</button></li>`
      );
      listOfCocktailVal.push(drinkName);
    }
  });
}

// JS FOR SEARCH BY INGREDIENT PAGE

$(".ingredientAddBtn").click(function () {
  event.preventDefault();
  let value = $(".ingredientInfo").val().trim();
  // Only add ingredient if TextArea has a value
  if (value === "") {
  } else {
    // Render Ingeredient to Page
    $(".listIng").append(`<li class="ingLi">${value}</li>`);
    $(".ingredientInfo").val("");
  }
});

$(".clearList").click(function () {
  $(".listIng").empty();
});

$("#ingredientSubBtn").click(function () {
  event.preventDefault();
  drinksArr = [];
  $(".ingResults").empty();
  // Get Cocktails for each Ingredients
  $(".ingLi").each(function () {
    value = $(this).text();
    searchIngredient(value);
  });
});

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
      var drinkObject = {
        name: allDrinks[i].strDrink,
        id: allDrinks[i].idDrink,
      };
      // Creates button that passes in the drink ID onClick
      $(".ingResults").append(
        `<li><button id="identifyDrink${i}" drinkId="${allDrinks[i].idDrink}" onClick="getDrink(${allDrinks[i].idDrink})" type="button">${drinkObject.name}</button></li>`
      );
      listOfCocktailVal.push(drinkObject);
    }
  });
}
// Takes Drink ID and passes it into API to get ingredients, measurements, etc.
function getDrink(drink) {
  $("#featureIngredients").empty();
  ingredArr = [];
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + drink,
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    // console.log(response);
    console.log(response.drinks[0].strDrink);
    $(".featureText").text(response.drinks[0].strInstructions);
    if (
      response.drinks[0].strIngredient1 != null &&
      response.drinks[0].strMeasure1 != null
    ) {
      ingredArr.push(
        response.drinks[0].strIngredient1 + " " + response.drinks[0].strMeasure1
      );
    } else if (response.drinks[0].strIngredient1 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient1);
    }
    if (
      response.drinks[0].strIngredient2 != null &&
      response.drinks[0].strMeasure2 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient2 +
          " " +
          response.drinks[0].strMeasure2
      );
    } else if (response.drinks[0].strIngredient2 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient2);
    }
    if (
      response.drinks[0].strIngredient3 != null &&
      response.drinks[0].strMeasure3 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient3 +
          " " +
          response.drinks[0].strMeasure3
      );
    } else if (response.drinks[0].strIngredient3 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient3);
    }
    if (
      response.drinks[0].strIngredient4 != null &&
      response.drinks[0].strMeasure4 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient4 +
          " " +
          response.drinks[0].strMeasure4
      );
    } else if (response.drinks[0].strIngredient4 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient4);
    }
    if (
      response.drinks[0].strIngredient5 != null &&
      response.drinks[0].strMeasure5 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient5 +
          " " +
          response.drinks[0].strMeasure5
      );
    } else if (response.drinks[0].strIngredient6 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient6);
    }
    if (
      response.drinks[0].strIngredient6 != null &&
      response.drinks[0].strMeasure6 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient6 +
          " " +
          response.drinks[0].strMeasure6
      );
    } else if (response.drinks[0].strIngredient6 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient6);
    }
    if (
      response.drinks[0].strIngredient7 != null &&
      response.drinks[0].strMeasure7 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient7 +
          " " +
          response.drinks[0].strMeasure7
      );
    } else if (response.drinks[0].strIngredient7 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient7);
    }
    if (
      response.drinks[0].strIngredient8 != null &&
      response.drinks[0].strMeasure8 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient8 +
          " " +
          response.drinks[0].strMeasure8
      );
    } else if (response.drinks[0].strIngredient8 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient8);
    }
    if (
      response.drinks[0].strIngredient9 != null &&
      response.drinks[0].strMeasure9 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient9 +
          " " +
          response.drinks[0].strMeasure9
      );
    } else if (response.drinks[0].strIngredient9 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient9);
    }
    if (
      response.drinks[0].strIngredient10 != null &&
      response.drinks[0].strMeasure10 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient10 +
          " " +
          response.drinks[0].strMeasure10
      );
    } else if (response.drinks[0].strIngredient10 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient10);
    }
    if (
      response.drinks[0].strIngredient11 != null &&
      response.drinks[0].strMeasure11 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient11 +
          " " +
          response.drinks[0].strMeasure11
      );
    } else if (response.drinks[0].strIngredient11 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient11);
    }
    if (
      response.drinks[0].strIngredient12 != null &&
      response.drinks[0].strMeasure12 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient12 +
          " " +
          response.drinks[0].strMeasure12
      );
    } else if (response.drinks[0].strIngredient12 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient12);
    }
    if (
      response.drinks[0].strIngredient13 != null &&
      response.drinks[0].strMeasure13 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient13 +
          " " +
          response.drinks[0].strMeasure13
      );
    } else if (response.drinks[0].strIngredient13 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient13);
    }
    if (
      response.drinks[0].strIngredient14 != null &&
      response.drinks[0].strMeasure14 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient14 +
          " " +
          response.drinks[0].strMeasure14
      );
    } else if (response.drinks[0].strIngredient14 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient14);
    }
    if (
      response.drinks[0].strIngredient15 != null &&
      response.drinks[0].strMeasure15 != null
    ) {
      ingredArr.push(
        " " +
          response.drinks[0].strIngredient15 +
          " " +
          response.drinks[0].strMeasure15
      );
    } else if (response.drinks[0].strIngredient15 != null) {
      ingredArr.push(" " + response.drinks[0].strIngredient15);
    }

    $("#featureIngredients").innerHTML = "";
    for (var i = 0; i < ingredArr.length; i++) {
      ingredList = "<li>" + ingredArr[i] + "</li>";
      // console.log(ingredList);
      $("#featureIngredients").append(ingredList);
    }
    var image = $(
      `<img src="${response.drinks[0].strDrinkThumb}" width="350" height="350"/>`
    );
    $(".featureImage").html(image);
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
  getCocktail(liquor);
});

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
    // Target ID
    let randomCocktailID = randomCocktail.idDrink;
    // Passes Cocktail ID to getDrink function
    getDrink(randomCocktailID);
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
    let randomSurpriseID = response.drinks[0].idDrink;
    getDrink(randomSurpriseID);
  });
}
// create function for #identifyDrink to pull up information by drink id and display it in .featureText and .featureImage

// create ABV function to look up beers based on ABV and display options w/ pics
$(".beerSelectLow").click(function () {
	event.preventDefault();
	let abv = 4;

	getBeer1(abv);
});

$(".beerSelectHigh").click(function () {
	event.preventDefault();
	
	let abv = 3.99;

	getBeer2(abv);
});

function getBeer1(abv) {
	var settings = {
		async: true,
		crossDomain: true,
		url: `https://api.punkapi.com/v2/beers?abv_lt=`+ abv,
		method: "GET",
		headers: {},
	};

	$.ajax(settings).done(function (response) {
		let possibleBeers = response;
		
		let randomBeer =
			possibleBeers[Math.floor(Math.random() * possibleBeers.length)];
		
		$(".beerName").html("Name:"+ " " + randomBeer.name);
		
		$(".tagLine").html(randomBeer.tagline);
		
		$(".firstBrewed").html("First brewed:"+ " " + randomBeer.first_brewed);
		
		$(".beerDesciption").html("Description:"+ " " + randomBeer.description);
		var image = $(
			`<img src="${randomBeer.image_url}" width="auto" height="350"/>`
		);

		$(".beerImg").html(image);
		
		$(".alcByVol").html("ABV:"+ " " + randomBeer.abv);

	});
};

function getBeer2(abv) {
		var settings = {
			async: true,
			crossDomain: true,
			url: `https://api.punkapi.com/v2/beers?abv_gt=`+ abv,
			method: "GET",
			headers: {},
		};

	$.ajax(settings).done(function (response) {
		let possibleBeers = response;
		
		let randomBeer =
			possibleBeers[Math.floor(Math.random() * possibleBeers.length)];
		
		$(".beerName").html("Name:"+ " " + randomBeer.name);
		
		$(".tagLine").html(randomBeer.tagline);
		
		$(".firstBrewed").html("First brewed:"+ " " + randomBeer.first_brewed);
		
		$(".beerDesciption").html("Description:"+ " " + randomBeer.description);
		var image = $(
			`<img src="${randomBeer.image_url}" width="auto" height="350"/>`
		);

		$(".beerImg").html(image);
		
		$(".alcByVol").html("ABV:"+ " " + randomBeer.abv);

	});
}
//#endregion
