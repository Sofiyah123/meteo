function refreshWeather(response) {
  let temperature = document.querySelector("#temperature");
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
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

function displayForecast() {
  let weatherForecast = document.querySelector("#weatherForecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = " ";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weatherForecast-day">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">☀</div>
                <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature">
                    <strong>15°</strong>
                  </div>
                  <div class="weather-forecast-temperature"> 9°</div>
                </div>
        </div>
        
        
            `;
  });
  weatherForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
displayForecast();
