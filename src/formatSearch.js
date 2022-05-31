import {stateCodeLocate} from './stateCodeLocate';

export const formatSearch = (() =>{
    // Variables
    const searchTerm = document.querySelector('#searchTerm'),
        lookupCCode = require('country-code-lookup')


    // Functions

    // State ISO code
    let isoStateCode = (string) => {
        if (stateCodeLocate.convertStateToAbbr(string) !== undefined && stateCodeLocate.convertStateToAbbr(string) !== null) {
            return stateCodeLocate.convertStateToAbbr(string)
        }
            return 'State Does not exist'
    }

    // Country ISO code
    let isoCountryCode = (string) => {
        try {
            if (lookupCCode.byCountry(string) !== undefined && lookupCCode.byCountry(string) !== null) {
                return lookupCCode.byCountry(string).iso2
            }
            return 'Country Does not exist'
        } catch (err) {
            return 'Country Does not exist'
        }
    }

    // Removing white space  and adding + for API search
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

    let searchValidation = (arrayString) =>{
        if (arrayString.includes('Country Does not exist')){
            return 'Country Does not exist'
        }
        if (arrayString.includes('State Does not exist')) {
            return 'State Does not exist'
        }
        return arrayString
    }


    // Format String for Searching with API
    let formatItem = (string) => {
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


    let apiItem = (Term) =>{
        if (Term) {
            return searchValidation(formatItem(Term))
        }
        return searchValidation(formatItem(searchTerm))
    }

    return {apiItem}

})()