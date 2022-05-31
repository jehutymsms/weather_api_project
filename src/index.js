import './style.css';
import { apiSearch } from './/apiSearch';
import { formatSearch } from './formatSearch';
import { domManipulation } from './domManipulation';

// Variables

const button = document.querySelector('button'),
    searchTerm = document.querySelector('#searchTerm'),
    body = document.querySelector('body'),
    form = document.querySelector('form'),
    mainDisplayItem = document.getElementById('gridMainDisplayItem'),
    gridItem = document.getElementsByClassName('gridItem'),
    currentDay = new Date().toLocaleDateString('en-us', { weekday: "long" }),
    currentDate = new Date().toLocaleDateString('en-us', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    }),
    time = new Date(),
    displayText = ['High:', 'Low:', 'Humidity:', 'Cloud Cast:'];

// Functions

// Creates Weather Data Array
let weatherArrayData = (weatherObject, number) => {
    let weatherDataArray = [
        weatherObject.daily[number].temp.max,
        weatherObject.daily[number].temp.min,
        weatherObject.daily[number].humidity,
        weatherObject.daily[number].weather[0].description,
        weatherObject.daily[number].weather[0].icon
    ];

    weatherDataArray[2] = `${weatherDataArray[2]}%`
    weatherDataArray[3] = weatherDataArray[3].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return weatherDataArray
};

// Updates Display of weather data
async function displayWeather() {
    let weatherData = await apiSearch.getWeather(),
        currentWeather = weatherArrayData(weatherData, 0);

    updateMainDisplay(currentWeather)

    for (let i = 0; i < 5; i++) {
        let weatherArray = weatherArrayData(weatherData, i)
        displayUpdate(weatherArray, i)
    }
};


// Event Listeners
button.addEventListener('click', function (event) {
    formatSearch.apiItem()
    event.preventDefault();
});


// Default Display
form.reset()
domManipulation.defaultDateDisplay();
