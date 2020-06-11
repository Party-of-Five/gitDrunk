// TODO: $(document).ready(function () {

// Creates the side bar nav from hamburger menu
$(".sidenav").sidenav();

//#region  Variables
var listOfCocktailVal = [];
var IngSrchCocktailNamesGrped = {};
var IngSrchCocktailIdGrped = {};
var IngSrchCocktailNames = [];
var IngSrchCocktailIDs = [];
var drinksArr = [];
var ingredArr = [];
var ingredList = "";

var usersIngredients = [];
//#endregion

//#region JS FOR SEARCH BY COCKTAIL

// When you click the search button
$("#cocktailSubBtn").click(function (event) {
  event.preventDefault();
  $(".ingResults").empty();
  // Input taken and assigned to variable
  cocktailInput = $("#cocktailInput").val().trim();
  // Call search cocktail function
  searchCocktail(cocktailInput);
});

// Uses the input to search the Cocktail API
function searchCocktail(cocktailVal) {
  var settings = {
    url: `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${cocktailVal}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    drinksArr.push(response);
    var allDrinks = response.drinks;
    for (let i = 0; i < allDrinks.length; i++) {
      var drinkName = allDrinks[i].strDrink;
      $(".ingResults").append(
        `<li><button id="identifyDrink ${i}" onClick="getDrink(${allDrinks[i].idDrink})" type="button">${drinkName}</button></li>`
      );
    }
  });
}
//#endregion

//#region Load Ingredients
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
    // Creates a button for each ingredient in the search result
    for (let i = 0; i < allIng.length; i++) {
      let IngName = allIng[i].strIngredient1;
      // render Ingredients to droplist
      $("#ingredients").append(`<option value="${IngName}"> </option>`);
    }
  });
}
//#endregion

//#region Ingredients Page JS
$(".ingredientAddBtn").click(function () {
  // Prevent click event from refreshing page
  event.preventDefault();
  // Get Users Ingredients & only add ingredient if TextArea has a value
  let value = $(".ingredientInfo").val().trim();
  if (value === "") {
    console.log("Give error to user"); //disable the button if empty
  } else {
    // Render Ingeredient(s) to Page
    usersIngredients.push(value);
    $(".listIng").append(`<li class="ingLi">${value}</li>`);
    $(".ingredientInfo").val("");
  }
});
// Clear Ingredients List
$(".clearList").click(function () {
  $(".listIng").empty();
});
// Submit Ingredients and Find Drinks
$("#ingredientSubBtn").click(async function () {
  event.preventDefault();
  drinksArr = [];
  $(".ingResults").empty();
  // Get Cocktails for each Ingredients
  // Promise.all allows you send in a array of promises, and it will wait until ALL response are done before moving on (if awaited)
  let responseArray = await Promise.all(
    usersIngredients.map((item) => searchIngredient(item))
  );

  let oneKeyDrinksArray = responseArray.reduce(
    (acc, current) => {
      acc.drinks.push(current.drinks);
      return acc;
    },
    { drinks: [] }
  );
  let combinedResponses = oneKeyDrinksArray.drinks.reduce(
    (a, b) => [...a, ...b],
    []
  );

  let groupByIDs = combinedResponses.reduce((acc, current) => {
    if (!acc[current.idDrink]) {
      acc[current.idDrink] = { rank: 1, ...current };
    } else {
      acc[current.idDrink] = {
        rank: Number(acc[current.idDrink].rank) + 1,
        ...current,
      };
    }
    return acc;
  }, {});
  function compare(a, b) {
    const bandA = a.rank;
    const bandB = b.rank;

    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }

  groupByIDs = Object.values(groupByIDs).sort(compare);
  for (let i = 0; i < groupByIDs.length; i++) {
    var drinkName = groupByIDs[i].strDrink;
    $(".ingResults").append(
      `<li><button id="identifyDrink ${i}" onClick="getDrink(${groupByIDs[i].idDrink})" type="button">${drinkName}</button></li>`
    );
    listOfCocktailVal.push(drinkName);
  }
});
//To be used in the Ingredient Submit Button on click
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
  return $.ajax(settings).done(function (response) {
    return response;
  });
}
//#endregion

//#region Render Ingredients onto page (TODO: Dry Up)
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

      $("#featureIngredients").append(ingredList);
    }
    var image = $(
      `<img src="${response.drinks[0].strDrinkThumb}" width="350" height="350"/>`
    );
    $(".featureImage").html(image);
  });
}
//#endregion

//#region  JS FOR ROULETTE PAGE

// TODO: Dry up code by dynamically generating buttons with on click attached

// Assign on click to each liquor button using the data name as a value to pass into the getCocktail function
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

// Calls getRandom when surprise button is clicked
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

// JS FOR PUB PAGE
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
// Calls API for ABV below a certain value
function getBeer1(abv) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://api.punkapi.com/v2/beers?abv_lt=` + abv,
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    let possibleBeers = response;

    let randomBeer =
      possibleBeers[Math.floor(Math.random() * possibleBeers.length)];

    $(".beerName").html("Name:" + " " + randomBeer.name);

    $(".tagLine").html(randomBeer.tagline);

    $(".firstBrewed").html("First brewed:" + " " + randomBeer.first_brewed);

    $(".beerDesciption").html("Description:" + " " + randomBeer.description);
    var image = $(
      `<img src="${randomBeer.image_url}" width="auto" height="350"/>`
    );

    $(".beerImg").html(image);

    $(".alcByVol").html("ABV:" + " " + randomBeer.abv);
  });
}
// Calls API for ABV above a certain value
function getBeer2(abv) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://api.punkapi.com/v2/beers?abv_gt=` + abv,
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    let possibleBeers = response;

    let randomBeer =
      possibleBeers[Math.floor(Math.random() * possibleBeers.length)];

    $(".beerName").html("Name:" + " " + randomBeer.name);

    $(".tagLine").html(randomBeer.tagline);

    $(".firstBrewed").html("First brewed:" + " " + randomBeer.first_brewed);

    $(".beerDesciption").html("Description:" + " " + randomBeer.description);
    var image = $(
      `<img src="${randomBeer.image_url}" width="auto" height="350"/>`
    );

    $(".beerImg").html(image);

    $(".alcByVol").html("ABV:" + " " + randomBeer.abv);
  });
}
//#endregion
// });

var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '10em', //distance from center
    start = -90, //shift start from 0
    $elements = $('.bullet'),
    numberOfElements = (type === 1) ?  $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
    slice = 360 * type / numberOfElements;

$elements.each(function(i) {
    var $self = $(this),
        rotate = slice * i + start,
        rotateReverse = rotate * -1;
    
    $self.css({
        'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
    });
});
