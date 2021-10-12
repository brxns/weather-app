//Display time
let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let time = `${hour}:${minute}`;
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${date}, ${time}`;
//Display searched city + weather
function newCity(event) {
  //Change city
  event.preventDefault();
  let city = document.querySelector("#search-bar");
  let defaultLocation = document.querySelector("#city");
  defaultLocation.innerHTML = `${city.value}`;
  let apiKey = "8a2b906d2e66cbae91442329a5210f3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
//Weather
function currentTemp(response) {
  //display temperature
  let tempElement = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}°`;
  //display weather description
  let moreInfo = document.querySelector(".description");
  let weatherDescription = response.data.weather[0].description;
  moreInfo.innerHTML = weatherDescription;
  //display feel like
  let feelsLike = document.querySelector(".feel");
  let feelsLikeResponse = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like ${feelsLikeResponse}°`;
  //display windspeed
  let windspeed = document.querySelector(".wind-speed");
  let windspeedResponse = Math.round(response.data.wind.speed);
  windspeed.innerHTML = `${windspeedResponse} mph`;

  celsiusTemp = response.data.main.temp;
}
let searchBar = document.querySelector(".search-form");
searchBar.addEventListener("submit", newCity);

//units
function convertToFahrenheit(event) {
  event.preventDefault();
  let newImperialTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(newImperialTemp)}°`;
}
function convertToCelsius(event) {
  event.preventDefault();
  temp.innerHTML = `${Math.round(celsiusTemp)}°`;
}
//made celsiusTemp and temp into global elements so that i could call it from inside functions.
let temp = document.querySelector("#temp");
let celsiusTemp = null;
let fahrenheit = document.querySelector(".imperial");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celsius = document.querySelector(".metric");
celsius.addEventListener("click", convertToCelsius);

//Additional forecast
