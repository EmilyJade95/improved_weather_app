// Display Correct Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  let fullYear = date.getFullYear();
  return `${day}, ${month} ${currentDate} ${fullYear}, ${hours}:${minutes}`;
}

formatDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.time
              )}</div>
              <img
                src=${forecastDay.condition.icon_url}
                alt=${forecastDay.condition.icon}
                width="40"
              />
              <div class="weather-forecast-temps">
                <span class="weather-forecast-temp-max">${Math.round(
                  forecastDay.temperature.maximum
                )}° </span>
                <span class="weather-forecast-temp-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "776b6d9305acf4056ofe6t078ed04517";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Add search Engine Functionality
function showCurrentTemperature(response) {
  let currentCity = response.data.city;
  let currentCountry = response.data.country;
  let currentTemperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let realFeel = Math.round(response.data.temperature.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherDesc = response.data.condition.description;

  celsiusTemperature = response.data.temperature.current;
  realFeelTemperature = response.data.temperature.feels_like;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
  let mainTemp = document.querySelector(".current-temperature");
  mainTemp.innerHTML = `${currentTemperature}`;
  let humid = document.querySelector(".humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `Real Feel: ${realFeel}℃`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed: ${windSpeed} km/h`;
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let weatherDescription = document.querySelector(".weather-desc");
  weatherDescription.innerHTML = `${weatherDesc}`;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.icon);

  getForecast(currentCity);
}

//Search for a City
function search(city) {
  let apiKey = "776b6d9305acf4056ofe6t078ed04517";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showCurrentTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Add Use my current location button
function findCity(response) {
  let city = response.data.city;
  search(city);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "776b6d9305acf4056ofe6t078ed04517";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(findCity);
}

function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findCurrentLocation);

//Add unit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let mainTemp = document.querySelector(".current-temperature");
  mainTemp.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let realFeelFahrenheit = Math.round((realFeelTemperature * 9) / 5 + 32);
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `Real Feel: ${realFeelFahrenheit}°`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".current-temperature");
  mainTemp.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = "Real Feel: " + Math.round(realFeelTemperature) + "°";
}

let celsiusTemperature = null;
let realFeelTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Zurich");
