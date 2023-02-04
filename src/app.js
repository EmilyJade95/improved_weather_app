// Display Correct Date
function showDate() {
  let currentDate = document.querySelector(".date");
  let currentTime = document.querySelector(".time");
  currentDate.innerHTML = `${day}, ${month} ${date} ${year}`;
  currentTime.innerHTML = `${hour}:${minutes}`;
}
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour <= 9) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes <= 9) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

showDate();

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
  let weatherDescription = document.querySelector(".weather-desc");
  weatherDescription.innerHTML = `${weatherDesc}`;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.icon);
}

//Search for a City

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let searchedCity = cityInput.value;
  let apiKey = "776b6d9305acf4056ofe6t078ed04517";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showCurrentTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

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

//Add Use my current location button
function showGeoLocatedTemperature(response) {
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
  let weatherDescription = document.querySelector(".weather-desc");
  weatherDescription.innerHTML = `${weatherDesc}`;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.icon);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "776b6d9305acf4056ofe6t078ed04517";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showGeoLocatedTemperature);
}

function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findCurrentLocation);

let celsiusTemperature = null;
let realFeelTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
