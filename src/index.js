import './style.css';
import { apiSearch } from './/apiSearch';
import { formatSearch } from './formatSearch';
import { domManipulation } from './domManipulation';

// Variables

const button = document.querySelector('button'),
    form = document.querySelector('form')

// Functions

let validateSearch = (searchItem) =>{
    if (Array.isArray(searchItem)) {
        return true
    }
    return false
}

console.log(validateSearch(formatSearch.apiItem('San Antonio, Texas, United States ')))
console.log(validateSearch(formatSearch.apiItem('San Antonio, United States')))
console.log(validateSearch(formatSearch.apiItem('San Antonio')))

// Event Listeners
button.addEventListener('click', function (event) {
    domManipulation.searchError()
    // domManipulation.displayWeather()
    event.preventDefault();
});


// Default Display
form.reset()
domManipulation.defaultDateDisplay();
