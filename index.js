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
  let tempElement = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}°C`;
  let moreInfo = document.querySelector(".moreinfo");
  let weatherDescription = response.data.weather[0].description;
  console.log(response);
  moreInfo.innerHTML = weatherDescription;
}
let searchBar = document.querySelector(".search-form");
searchBar.addEventListener("submit", newCity);
