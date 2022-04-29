//Goal of Project
//You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

// Variables
const button = document.querySelector('button'),
    inputCity = document.querySelector('#weatherSearchCity'),
    inputCountry = document.querySelector('#weatherSearchCountry'),
    body = document.querySelector('body'),
    mainDisplayItem = document.getElementById('gridMainDisplayItem'),
    gridItem = document.getElementsByClassName('gridItem'),
    currentDate = Date();

// Functions

// API Retreival based on search
async function getWeather(){
    let defaultSearch = 'San Antonio';

    if(inputCity.value != ''){
        defaultSearch = inputCity.value;
    };
    try{
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${defaultSearch}&limit=1&appid=0c32baf96cab07598f9ffa6ec5612d52`),
        weatherData = await response.json(),
        response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&exclude=current,minutely,hourly&appid=0c32baf96cab07598f9ffa6ec5612d52&units=imperial`),
        preciseWeatherData = await response2.json();

        
    // console.log(preciseWeatherData)
    return preciseWeatherData
    
    }catch(err){
        console.log('search did not return anything')
    }
};

async function displayWeather (){
    let weatherData = await getWeather();

    for (let i = 0; i < 6; i++) {
        console.log(weatherData.daily[i].humidity)
        console.log(weatherData.daily[i].temp.max)
        console.log(weatherData.daily[i].temp.min)
        console.log(weatherData.daily[i].weather[0].description)
    }
    // testFunction()
    //weatherData.daily[i].humidity
    //weatherData.daily[i].temp.max
    //weatherData.daily[i].temp.min
    //weatherData.daily[i].weather[0].description
}


let testFunction = (weatherData,number) =>{
    for (let i = 0; i < 4; i++) {
        console.log(gridItem[number].children[i])
    }
    console.log(gridItem[0].children[0].innerHTML)

}

// Event Listeners
button.addEventListener('click', function(event){
    displayWeather()
    event.preventDefault();
});



