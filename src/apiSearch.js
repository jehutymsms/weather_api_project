import { formatSearch } from './formatSearch';

export const apiSearch = (() =>{
    // Variables
    const apiKey = '33768e0de385b09222a84be10f07a718'

    // Functions
    
    // API Retreival based on search
    async function getWeather(){
        let defaultSearch = formatSearch.apiItem('San Antonio')
    
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

    return {getWeather}
})()