const url = 'https://api.openweathermap.org/data/2.5/';
const key = 'bb0e36825f234151a2207bbd55640749';

const searchBar = document.getElementById('searchBar');

const setQuery = (e) => {
    if (e.keyCode == "13") { // it means pressed Enter.
        getResult(searchBar.value)
    }
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    //  console.log(query)
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
};

const displayResult = (result) => {
    let city = document.querySelector(".city");
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector(".temp")
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector(".desc")
    desc.innerText = result.weather[0].description
    
    let minmax = document.querySelector(".minmax")
    minmax.innerText = `min ${Math.round(result.main.temp_min)}°C / max ${Math.round(result.main.temp_max)}°C`
};

searchBar.addEventListener('keypress', setQuery)