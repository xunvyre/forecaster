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
    //call the API and get the needed data
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units=imperial&appid=5027f45d9847017607fd34991ce9cbc7";
    fetch(apiURL).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                //push data to new functions
                displayTodaysInfo(data);
                createButton(data);
            });
        }
        else
        {
            //return error
            alert("Error: City not found!");
        }
    })
    .catch(function(error)
    {
        //return error
        alert("Unable to connect to OpenWeather :(");
    });
};

var displayTodaysInfo = function (data)
{
    //create elements for today's weather
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

    //append created elements
    bigWeatherBox.appendChild(bigTitle);
    bigTitle.appendChild(bigIcon);
    bigWeatherBox.appendChild(bigTemp);
    bigWeatherBox.appendChild(bigWSpeed);
    bigWeatherBox.appendChild(bigHum);

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +data.coord.lat+ "&lon=" +data.coord.lon+ "&units=imperial&exclude=minutely,hourly,alerts&appid=5027f45d9847017607fd34991ce9cbc7";
    fetch(fiveDayURL).then(function(response)
    {
        response.json().then(function(fiveDayData)
        {
            //first, use new data to add UV level to bigWeatherBox 
            var bigUV = document.createElement("p");
            bigUV.textContent = "UV Index: ";
            
            var value = document.createElement("button");
            value.textContent = fiveDayData.current.uvi;
            value.setAttribute = ("id", "bUVI");
            if (fiveDayData.current.uvi <= 3)
            {
                value.classList = "btn uv1 col-2";
            }
            else if (fiveDayData.current.uvi > 7)
            {
                value.classList = "btn uv3 col-2";
            }
            else
            {
                value.classList = "btn uv2 col-2";
            }

            bigWeatherBox.appendChild(bigUV);
            bigUV.appendChild(value);
        });
    });
};

var createButton = function(data)
{
    var appendButton = document.querySelector("#prev-searches");

    var newButton = document.createElement("button");
    newButton.textContent = data.name;
    newButton.classList = "btn col-12";

    appendButton.appendChild(newButton);
    //store in localStorage
}

//get prev searches on page load
citySearchEl.addEventListener("submit", newSearch);