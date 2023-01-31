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
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
  let mainTemp = document.querySelector(".current-temperature");
  mainTemp.innerHTML = `${currentTemperature}`;
  let humid = document.querySelector(".humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `Real Feel: ${realFeel}°`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed: ${windSpeed} km/h`;
  let weatherDescription = document.querySelector(".weather-desc");
  weatherDescription.innerHTML = `${weatherDesc}`;
}

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
