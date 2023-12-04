function refreshWeather(response) {
  let temperature = document.querySelector("#temperature");
  let cityName = document.querySelector("#cityName");
  let description = document.querySelector("#description");
  let weatherAppIcon = document.querySelector(".Current-weather-app-icon");
  let humidity = document.querySelector("#Humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector(".time");
  let day = document.querySelector(".day");
  let now = new Date();
  let counter = now.getDay();
  

  time.innerHTML = now.getHours() + ":" + now.getMinutes();
  wind.innerHTML = response.data.wind.speed + "km/h";
  humidity.innerHTML = response.data.temperature.humidity + "%";
  description.innerHTML = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;
  weatherAppIcon.innerHTML = `<img src='${iconUrl}'>`;
  cityName.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let AppTime = document.querySelector(".time");
  for ( i= 0; i<7; i++){
    if (counter == 0){
      day.innerHTML ="Sunday";
    }else if(counter == 1){
      day.innerHTML = "Monday";
    }else if(counter == 2){
      day.innerHTML ="Tuesday"
    }else if(counter == 3){
      day.innerHTML ="Wednesday"
    }else if(counter == 4){
      day.innerHTML ="Thursday"
    }
    else if(day == 5){
      day.innerHTML ="Friday"
    }
    else{
      day.innerHTML ="Saturday"
    }
  }
  console.log(now.getMinutes());
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let cityName = document.querySelector("#cityName");
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let weatherForecast = document.querySelector("#weatherForecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = " ";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weatherForecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src='${
                  day.condition.icon_url
                }' class="weather-forecast-icon">
                <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature">
                    <strong>${Math.round(day.temperature.maximum)}°</strong>
                  </div>
                  <div class="weather-forecast-temperature"> ${Math.round(
                    day.temperature.minimum
                  )}°</div>
                </div>
        </div>
        
        
            `;
    }
  });
  weatherForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
// formatDay();
// displayForecast();
