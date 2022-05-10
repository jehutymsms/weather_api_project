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
    d = time.getDate(),
    m = time.getMonth(),
    y = time.getFullYear(),
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

async function displayWeather (){
    let weatherData = await getWeather(),
    currentWeather = [
        weatherData.daily[0].temp.max, 
        weatherData.daily[0].temp.min, 
        weatherData.daily[0].humidity, 
        weatherData.daily[0].weather[0].description, 
        weatherData.daily[0].weather[0].icon
    ];

    currentWeather[3] = currentWeather[3].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    updateMainDisplay(currentWeather)
    for (let i = 0; i < 5; i++) {
        let weatherArray = [
            weatherData.daily[i].temp.max, 
            weatherData.daily[i].temp.min, 
            weatherData.daily[i].humidity, 
            weatherData.daily[i].weather[0].description
        ]
        weatherArray[3] = weatherArray[3].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        displayUpdate(weatherArray,i)

    }
}

let updateMainDisplay = (weatherData) => {
    for (let i = 0; i < 5; i++) {
        if (i < 2) {
            mainDisplayItem.children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}°`
        }else if (i == 4){
            mainDisplayItem.children[i+1].alt = weatherData[3]
            mainDisplayItem.children[i+1].src = `http://openweathermap.org/img/wn/${weatherData[4]}@2x.png`
            console.log(mainDisplayItem.children[i+1].alt)
        }
            
        else{
            mainDisplayItem.children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}`
        }
    }
}

let displayUpdate = (weatherData,number) =>{
    for (let i = 0; i < 4; i++) {
        if (i < 2) {
            gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}°`
        }else{
            gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}`
        }
    }
}

let defaultDateDisplay = () => {

    mainDisplayItem.children[0].innerHTML = `${currentDay} ${currentDate}`

    for(let i=0; i < 5; i++){
        let curdate = new Date(y, m, d+i),
        display = `${curdate.toLocaleDateString('en-us', {weekday:"long"})} ${curdate.toLocaleDateString()}`
        gridItem[i].children[0].innerHTML = display
    }
}

// Event Listeners
button.addEventListener('click', function(event){
    displayWeather()
    event.preventDefault();
});


defaultDateDisplay()
