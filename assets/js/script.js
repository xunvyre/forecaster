//define global variables
var todaysDate = moment().format("M/D/YYYY");
var citySearchEl = document.querySelector("#sidebar")
var cityInputEl = document.querySelector("#city");
var prevSearches = [];

var newSearch = function(event)
{
    event.preventDefault();

    var chosenCity = cityInputEl.value.toLowerCase().trim();

    if (chosenCity)
    {
        getWeatherInfo(chosenCity);
        cityInputEl.value = "";
    }
    else
    {
        alert("Please enter the city name!")
    }
}

var getWeatherInfo = function(city)
{
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units=imperial&appid=5027f45d9847017607fd34991ce9cbc7";
    fetch(apiURL).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayTodaysInfo(data, city);
            });
        }
        else
        {
            alert("Error: City not found!");
        }
    })
    .catch(function(error)
    {
        alert("Unable to connect to OpenWeather :(");
    });
};

var displayTodaysInfo = function (data, city)
{
    var bigWeatherBox = document.querySelector("#todays-weather");
    bigWeatherBox.innerHTML = "";

    var bigTitle = document.createElement("h2");
    bigTitle.textContent = data.name +" "+ todaysDate;

    var bigIcon = document.createElement("img");
    bigIcon.setAttribute("src", "https://openweathermap.org/img/w/" +data.weather[0].icon+ ".png");

    var bigTemp = document.createElement("p");
    bigTemp.textContent = "Temp: " +Math.round(data.main.temp)+ " °F";

    var bigWSpeed = document.createElement("p");
    bigWSpeed.textContent = "Wind Speed: " +Math.round(data.wind.speed)+ " MPH";

    var bigHum = document.createElement("p");
    bigHum.textContent = "Humidity: " +data.main.humidity+ "%";

    bigWeatherBox.appendChild(bigTitle);
    bigTitle.appendChild(bigIcon);
    bigWeatherBox.appendChild(bigTemp);
    bigWeatherBox.appendChild(bigWSpeed);
    bigWeatherBox.appendChild(bigHum);
};

citySearchEl.addEventListener("submit", newSearch);