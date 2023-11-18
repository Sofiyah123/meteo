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
  // call the API
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#searchForm");
// console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
