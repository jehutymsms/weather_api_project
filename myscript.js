//Goal of Project
//You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

const button = document.querySelector('button'),
    inputCity = document.querySelector('#weatherSearchCity'),
    inputCountry = document.querySelector('#weatherSearchCountry'),
    body = document.querySelector('body'),
    mainDisplayItem = document.getElementById('gridMainDisplayItem'),
    gridItem = document.getElementsByClassName('gridItem');

async function getWeather(){
    let defaultSearch = 'San Antonio';

    if(inputCity.value != ''){
        defaultSearch = inputCity.value;
    };
    try{
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${defaultSearch}&APPID=0c32baf96cab07598f9ffa6ec5612d52&units=imperial`),

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${defaultSearch}&limit=1&appid=0c32baf96cab07598f9ffa6ec5612d52`),
        weatherData = await response.json(),
        response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&exclude=current,minutely,hourly&appid=0c32baf96cab07598f9ffa6ec5612d52&units=imperial`),
        preciseWeatherData = await response2.json();

        
    console.log(preciseWeatherData)
    return preciseWeatherData
    
    }catch(err){
        console.log('search did not return anything')
    }
};

button.addEventListener('click', function(event){
    getWeather()
    event.preventDefault();
});

async function displayWeather (object){
    for (let i = 0; i < 5; i++) {
        console.log(object.daily[i].humidity);
        
    }
}