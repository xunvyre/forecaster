//define global variables
var todaysDate = moment().format("M/D/YYYY");
var citySearchEl = document.querySelector("#sidebar")
var cityInputEl = document.querySelector("#city");
var prevSearches = [];

/*var newSearch = function(event)
{
    event.preventDefault();

    var chosenCity = cityInputEl.value.trim();

    if (chosenCity)
    {
        getWeatherInfo(chosenCity);
    }
    else
    {
        alert("Please enter a valid location!")
    }
}*/

var getWeatherInfo = function(city)
{
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units=imperial&appid=5027f45d9847017607fd34991ce9cbc7";
    fetch(apiURL).then(function(response)
    {
        response.json().then(function(data)
        {
            console.log(data);
        });
    });
};

getWeatherInfo("seattle");