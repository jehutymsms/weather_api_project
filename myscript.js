//Goal of Project
//You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

const button = document.querySelector('button'),
    inputCity = document.querySelector('#weatherSearchCity'),
    inputCountry = document.querySelector('#weatherSearchCountry'),
    body = document.querySelector('body'),
    mainDisplayItem = document.getElementById('gridMainDisplayItem');

async function getWeather(){
    let defaultSearch = 'San Antonio';

    if(inputCity.value != ''){
        defaultSearch = inputCity.value;
    };
    try{
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${defaultSearch}&APPID=0c32baf96cab07598f9ffa6ec5612d52&units=imperial`),

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${defaultSearch}&limit=1&appid=0c32baf96cab07598f9ffa6ec5612d52`),
        weatherData = await response.json(),
        response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&appid=0c32baf96cab07598f9ffa6ec5612d52`),
        preciseWeatherData = await response2.json();

    console.log(weatherData[0].lat)
    console.log(weatherData[0].lon)
    console.log(preciseWeatherData)
    

    }catch(err){
        console.log('search did not return anything')
    }
};

button.addEventListener('click', function(event){
    getWeather()
    event.preventDefault();
});



async function getWeatherImage(defaultSearch = 'sunny'){
    try{
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Re8JS3jj5HnRyaC0Gs1odAg1cxCjXmvP&s=${defaultSearch}`),
        weatherImage = await response.json();

    body.style.backgroundImage = weatherImage.data.images.original.url
    }catch(err){
        console.log('search did not return anything')
    }
};


console.log(mainDisplayItem.lastElementChild.innerHTML)
getWeatherImage()