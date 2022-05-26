export const apiSearch = (() =>{
    // Variables
    const defaultSearch = ['San Antonio','Texas','United States'],
        searchTerm = document.querySelector('#searchTerm'),
        apiKey = '33768e0de385b09222a84be10f07a718',
        lookupCCode = require('country-code-lookup'),
        lookupSCode = require('us-state-codes')

    // Functions


    // must return {city name},{state code}(This is for USA Only),{country code}

    let isoStateCode = (string) => {
        if (lookupSCode.getStateCodeByStateName(string) !== null) {
            return lookupSCode.getStateCodeByStateName(string)
        }
            return 'State Does not exist'

    }
    let isoCountryCode = (string) => {
        if (lookupCCode.byCountry(string) !== null) {
            return lookupCCode.byCountry(string).iso2
        }
        return 'Country Does not exist'
    }

    let stringFormat = (stringArray) => {
        let array = []

        for (let i = 0; i < stringArray.length; i++) {
            if (i == 0) {
                array[i]= stringArray[i]
                    .replace(/(\s+$|^\s+)/g, '') 
            // remove whitespace from begining and end of string
                    .replace(/\s+/g, '+'); 
            // replace any remaining white space with +, so it works in api call  
                continue
            }
            array[i]= stringArray[i]
                .replace(/(\s+$|^\s+)/g, '') 
        }
        return array
    }
    //  String Input Examples:
    //  City Name, Country Name
    //  City Name, State Name(Only for US), Country Name 

    let codeValidation = (searchTerm) =>{
        if (searchTerm.includes('Country Does not exist')) {
            return `Invalid Entry: Country Does not exist`
        }
        if (searchTerm.includes('State Does not exist')) {
            return `Invalid Entry: State Does not exist`
        }
        return searchTerm
    }

    // Format String for Searching with API
    let searchItem = (string) => {
        let sItem = string.split(','),
            wSpaceRemoved = stringFormat(sItem)
        if (wSpaceRemoved.length == 2) {
            wSpaceRemoved[1] = isoCountryCode(wSpaceRemoved[1])
        }

        if (wSpaceRemoved.length == 3) {
            wSpaceRemoved[1] = isoStateCode(wSpaceRemoved[1])
            wSpaceRemoved[2] = isoCountryCode(wSpaceRemoved[2])
        }

        return wSpaceRemoved
    }
    
    let formatSearch = () =>{
        let defaultSearch = searchItem(searchTerm.value)
        if (defaultSearch[2].search('Invalid') == -1 ||defaultSearch[1].search('Invalid') == -1 ) {
            getWeather(defaultSearch)
        }
        return defaultSearch
    }

    
    // API Retreival based on search
    async function getWeather(apiItem){
        let defaultSearch = searchItem(searchTerm.value)
    
        try{
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${apiItem}&limit=1&appid=${apiKey}`),
            weatherData = await response.json(),
            response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=imperial`),
            preciseWeatherData = await response2.json();
            console.log(preciseWeatherData)
        return preciseWeatherData
        
        }catch(err){
            console.log('search did not return anything')
        }
    };

    return {formatSearch}
})()