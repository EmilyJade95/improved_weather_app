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
