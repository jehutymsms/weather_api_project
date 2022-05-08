import './style.css';

//Goal of Project
//You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

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
    });

    // let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))

    // let testDate = tomorrow.toLocaleDateString('en-us', {
    //     day:"2-digit",
    //     month:"2-digit",
    //     year:"2-digit"
    //     })

    // myDate.setDate(myDate.getDate() + 1)

    let time = new Date(),
        d = time.getDate(),
        m = time.getMonth(),
        y = time.getFullYear();


    for(let i=0; i < 5; i++){
        let curdate = new Date(y, m, d+i),
        display = `${curdate.toLocaleDateString('en-us', {weekday:"long"})} ${curdate.toLocaleDateString()}`
        gridItem[i].children[0].innerHTML = display
        console.log(display)
    }

    

    // for (let i = 0; i < 4; i++) {
        // 
    //     gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}`

    // }

    // let today = new Date();
    // let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString('en-us', {weekday:"long"})

    // console.log(tomorrow);
    // console.log(currentDate);
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
    let weatherData = await getWeather();
    for (let i = 0; i < 5; i++) {
        let weatherArray = [weatherData.daily[i].temp.max, weatherData.daily[i].temp.min, weatherData.daily[i].humidity, weatherData.daily[i].weather[0].description]
        weatherArray[3] = weatherArray[3].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        displayUpdate(weatherArray,i)

    }
}


let displayUpdate = (weatherData,number) =>{
    let displayText = ['High:', 'Low:', 'Humidity:', 'Cloud Cast:']

    for (let i = 0; i < 4; i++) {
        if (i < 2) {
            gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}°`
        }else{
            gridItem[number].children[i+1].innerHTML = `${displayText[i]} ${weatherData[i]}`
        }
    }
}

// Event Listeners
button.addEventListener('click', function(event){
    displayWeather()
    event.preventDefault();
});



