import './style.css';

//Goal of Project

// Variables

const button = document.querySelector('button'),
    inputCity = document.querySelector('#weatherSearchCity'),
    inputCountry = document.querySelector('#weatherSearchCountry'),
    body = document.querySelector('body'),
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

// API Retreival based on search
async function getWeather(){
    let defaultSearch = 'San Antonio',
        apiKey = '33768e0de385b09222a84be10f07a718';

    if(inputCity.value != ''){
        defaultSearch = inputCity.value;
    };
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

// Updates main display of weather Data
let updateMainDisplay = (weatherData) => {
    for (let i = 0; i < 5; i++) {
        if (i < 2) {
            mainDisplayItem.children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}°`
        }else if (i == 4){
            mainDisplayItem.children[i+1].alt = weatherData[3]
            mainDisplayItem.children[i+1].src = `http://openweathermap.org/img/wn/${weatherData[4]}@2x.png`
        }else{
            mainDisplayItem.children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}`
        }
    }
};
//----------------------Working on this function
// Display Data Update Function
let dataDisplayUpdate = (domElement, weatherData, elementNumber, number) => {
    if (number < 2) {
        domElement[elementNumber].children[number+1].innerHTML = `${displayText[i]} ${weatherData[i]}°`
        return
    }
    if (number == 4){
        domElement[elementNumber].children[number+1].alt = weatherData[3]
        domElement[elementNumber].children[number+1].src = `http://openweathermap.org/img/wn/${weatherData[4]}@2x.png`
        return
    }else{
        domElement[elementNumber].children[number+1].innerHTML = `${displayText[i]} ${weatherData[i]}`
    }
};
 
// Updates 5 Day Display data
let displayUpdate = (weatherData,number) =>{
    for (let i = 0; i < 5; i++) {
        if (i < 2) {
            gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}°`
        }else if (i == 4){
            gridItem[number].children[i+1].alt = weatherData[3]
            gridItem[number].children[i+1].src = `http://openweathermap.org/img/wn/${weatherData[4]}@2x.png`
        }else{
            gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}`
        }
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
    displayWeather();
    event.preventDefault();
});


defaultDateDisplay();
