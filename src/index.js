import './style.css';
import {apiSearch} from './/apiSearch';
import { formatSearch } from './formatSearch';

//Goal of Project


// Variables
// console.log(lookup.byCountry('United States of America').iso2)


const button = document.querySelector('button'),
    searchTerm = document.querySelector('#searchTerm'),
    body = document.querySelector('body'),
    form = document.querySelector('form'),
    mainDisplayItem = document.getElementById('gridMainDisplayItem'),
    gridItem = document.getElementsByClassName('gridItem'),
    currentDay = new Date().toLocaleDateString('en-us', {weekday:"long"}),
    currentDate = new Date().toLocaleDateString('en-us', {
        day:"2-digit",
        month:"2-digit",
        year:"2-digit"
    }),
    time = new Date(),
    displayText = ['High:', 'Low:', 'Humidity:', 'Cloud Cast:'];


// Functions


// Creates Weather Data Array
let weatherArrayData = (weatherObject, number) =>{
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
async function displayWeather (){
    let weatherData = await apiSearch.getWeather(),
    currentWeather = weatherArrayData(weatherData, 0);

    updateMainDisplay(currentWeather)

    for (let i = 0; i < 5; i++) {
        let weatherArray = weatherArrayData(weatherData, i)
        displayUpdate(weatherArray,i)

    }
};

// Display Data Update Function
let dataDisplayUpdate = (domElement, weatherData, number) => {
    if (number < 2) {
        domElement.children[number+1].innerHTML = `${displayText[number]} ${weatherData[number]}°`
        return
    }
    if (number == 4){
        domElement.children[number+1].alt = weatherData[3]
        domElement.children[number+1].src = `http://openweathermap.org/img/wn/${weatherData[4]}@2x.png`
        return
    }

    domElement.children[number+1].innerHTML = `${displayText[number]} ${weatherData[number]}`
};

// Updates main display of weather Data
let updateMainDisplay = (weatherData) => {
    for (let i = 0; i < 5; i++) {
        dataDisplayUpdate(mainDisplayItem, weatherData, i)
    }
};
 
// Updates 5 Day Display data
let displayUpdate = (weatherData,number) =>{
    for (let i = 0; i < 5; i++) {
        dataDisplayUpdate(gridItem[number], weatherData, i)
    }
};

// Defaut Date Display for Weather Data
let defaultDateDisplay = () => {
    mainDisplayItem.children[0].innerHTML = `${currentDay} ${currentDate}`

    for(let i=0; i < 5; i++){
        let date = time.getDate(),
            month = time.getMonth(),
            year = time.getFullYear(),
            curdate = new Date(year, month, date+i),
            display = `${curdate.toLocaleDateString('en-us', {weekday:"long"})} ${curdate.toLocaleDateString()}`

        gridItem[i].children[0].innerHTML = display
    }
};

// Event Listeners
button.addEventListener('click', function(event){
    formatSearch.apiItem()
    event.preventDefault();
});



form.reset()
defaultDateDisplay();
