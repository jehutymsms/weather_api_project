import './style.css';
import { apiSearch } from './/apiSearch';
import { formatSearch } from './formatSearch';
import { domManipulation } from './domManipulation';

// Variables

const button = document.querySelector('button'),
    form = document.querySelector('form')

// Functions

let validateSearch = () =>{
    try {
        if (Array.isArray(formatSearch.apiItem())) {
            console.log('true')
        }else{
            console.log('false')
        }
    } catch (error) {
        domManipulation.searchError('d')
        console.log('Error')
    }

}


// Event Listeners
button.addEventListener('click', function (event) {
    validateSearch()
    // apiSearch.apiItem()
    // domManipulation.displayWeather()
    event.preventDefault();
});


// Default Display
form.reset()
domManipulation.defaultDateDisplay();
