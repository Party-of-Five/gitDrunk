var settings = {
    "url": "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Cookie": "__cfduid=d3e813ce88e955b4387b21279e07cd83d1590720521"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });