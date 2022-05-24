export const apiSearch = (() =>{
    // Variables
    const defaultSearch = ['San Antonio','Texas','United States'],
        searchTerm = document.querySelector('#searchTerm'),
        apiKey = '33768e0de385b09222a84be10f07a718',
        lookupCCode = require('country-code-lookup'),
        lookupSCode = require('us-state-codes')

    // Functions


    // must return {city name},{state code}(This is for USA Only),{country code}


    //  String Input Examples:
    //  City Name, Country Name
    //  City Name, State Name(Only for US), Country Name 

    // Format String for Searching with API
    let searchItem = (string) => {
        let sItem = string.split(','),
            wSpaceRemoved = []

        for (let i = 0; i < sItem.length; i++) {
            wSpaceRemoved[i]= sItem[i].replace(/^\s+|\s+$/g, '')        
        }

        if (wSpaceRemoved.length == 2) {
            wSpaceRemoved[1] = lookupCCode.byCountry(wSpaceRemoved[1]).iso2
        }

        if (wSpaceRemoved.length == 3) {
            wSpaceRemoved[1] = lookupSCode.getStateCodeByStateName(wSpaceRemoved[1])
            console.log(lookupCCode.byCountry(wSpaceRemoved[2]).iso2)
            wSpaceRemoved[2] = lookupCCode.byCountry(wSpaceRemoved[2]).iso2
        }

        // let sItem = string.split(',')
    
        // if(sItem[1] != ''){
        //     defaultSearch[1] = sItem[1];
        //     defaultSearch[1] = lookupSCode.getStateCodeByStateName(defaultSearch[1])
        // };
        // if(sItem[2] != ''){
        //     defaultSearch[2] = sItem[2];
        //     defaultSearch[2] = lookupCCode.byCountry(defaultSearch[2]).iso2
        // };
    
    
        // if (defaultSearch[2] != '') {
        //     defaultSearch[2] = lookupCCode.byCountry(defaultSearch[2]).iso2
        // }
    
        // if (defaultSearch[1] != '' && defaultSearch[2] == 'US') {
        //     defaultSearch[1] = lookupSCode.getStateCodeByStateName(defaultSearch[1])
        //     return `${defaultSearch[0]},${defaultSearch[1]},${defaultSearch[2]}`
        // }
        
    
    
        // defaultSearch[1] = lookupSCode.getStateCodeByStateName(defaultSearch[1])
        
        // return `${defaultSearch[0]}`
        // return lookupCCode.countries
        return {wSpaceRemoved}
    }
    
    
    // API Retreival based on search
    async function getWeather(){
        let defaultSearch = searchItem(searchTerm.value)
    
        try{
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${defaultSearch}&limit=1&appid=${apiKey}`),
            weatherData = await response.json(),
            response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=imperial`),
            preciseWeatherData = await response2.json();
            console.log(preciseWeatherData)
        return preciseWeatherData
        
        }catch(err){
            console.log('search did not return anything')
        }
    };

    return {searchItem}
})()