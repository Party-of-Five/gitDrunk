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
	});
}

// $("#citySubBtn").click(function (event) {
// 	event.preventDefault();
// 	cityInput = $("#cityInput").val().trim();
// 	cities.push(cityInput);
// 	// Store current City Value in History
// 	localStorage.setItem("cities", JSON.stringify(cities));
// 	// Call the APIs
// 	getCityInfo(cityInput);
// });
