function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    console.log(searchInput.value);
    let cityElement = document.querySelector("#city-Element");
    cityElement.innerHTML =searchInput.value;
    // call the API
    


}
let searchFormElement = document.querySelector("#searchForm");
// console.log(searchFormElement);
searchFormElement.addEventListener("submit",handleSearchSubmit)
