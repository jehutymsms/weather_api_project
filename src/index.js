import './style.css';
import {apiSearch} from './/apiSearch';

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
    lookupCCode = require('country-code-lookup'),
    lookupSCode = require('us-state-codes'),
    displayText = ['High:', 'Low:', 'Humidity:', 'Cloud Cast:'];


// Functions
// Create a function that returns a search parameter 
// must return {city name},{state code}(This is for USA Only),{country code}
// Working on this function----------------
let searchItem = (string) => {
    // let defaultSearch = ['San Antonio','Texas','United States'],
    //     sItem = string.split(',')

    // if(sItem[0] != ''){
    //     defaultSearch[0] = sItem[0];
    // };
    // if(sItem[1] != ''){
    //     defaultSearch[1] = sItem[1];
    // };
    // if(sItem[2] != ''){
    //     defaultSearch[2] = sItem[2];
    // };


    // if (defaultSearch[2] != '') {
    //     defaultSearch[2] = lookupCCode.byCountry(defaultSearch[2]).iso2
    // }

    // if (defaultSearch[1] != '' && defaultSearch[2] == 'US') {
    //     defaultSearch[1] = lookupSCode.getStateCodeByStateName(defaultSearch[1])
    //     return `${defaultSearch[0]},${defaultSearch[1]},${defaultSearch[2]}`
    // }
    


    // defaultSearch[1] = lookupSCode.getStateCodeByStateName(defaultSearch[1])
    
    return apiSearch.codeTest()
}


// API Retreival based on search
async function getWeather(){
    let defaultSearch = searchItem(searchTerm.value),
        apiKey = '33768e0de385b09222a84be10f07a718';

    try{
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${defaultSearch}&limit=1&appid=${apiKey}`),
        weatherData = await response.json(),
        response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=imperial`),
        preciseWeatherData = await response2.json();
    return preciseWeatherData
    
    }catch(err){
        console.log('search did not return anything')
    }
};

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
    let weatherData = await getWeather(),
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
    apiSearch.codeTest()
    // displayWeather();
    event.preventDefault();
});



form.reset()
defaultDateDisplay();
