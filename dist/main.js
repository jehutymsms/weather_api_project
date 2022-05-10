/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 //Goal of Project
// Variables

var button = document.querySelector('button'),
    inputCity = document.querySelector('#weatherSearchCity'),
    inputCountry = document.querySelector('#weatherSearchCountry'),
    body = document.querySelector('body'),
    mainDisplayItem = document.getElementById('gridMainDisplayItem'),
    gridItem = document.getElementsByClassName('gridItem'),
    currentDay = new Date().toLocaleDateString('en-us', {
  weekday: "long"
}),
    currentDate = new Date().toLocaleDateString('en-us', {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit"
}),
    time = new Date(),
    d = time.getDate(),
    m = time.getMonth(),
    y = time.getFullYear(),
    displayText = ['High:', 'Low:', 'Humidity:', 'Cloud Cast:']; // Functions
// API Retreival based on search

function getWeather() {
  return _getWeather.apply(this, arguments);
}

function _getWeather() {
  _getWeather = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var defaultSearch, apiKey, response, weatherData, response2, preciseWeatherData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            defaultSearch = 'San Antonio', apiKey = '33768e0de385b09222a84be10f07a718';

            if (inputCity.value != '') {
              defaultSearch = inputCity.value;
            }

            ;
            _context.prev = 3;
            _context.next = 6;
            return fetch("https://api.openweathermap.org/geo/1.0/direct?q=".concat(defaultSearch, "&limit=1&appid=").concat(apiKey));

          case 6:
            response = _context.sent;
            _context.next = 9;
            return response.json();

          case 9:
            weatherData = _context.sent;
            _context.next = 12;
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(weatherData[0].lat, "&lon=").concat(weatherData[0].lon, "&exclude=current,minutely,hourly&appid=").concat(apiKey, "&units=imperial"));

          case 12:
            response2 = _context.sent;
            _context.next = 15;
            return response2.json();

          case 15:
            preciseWeatherData = _context.sent;
            return _context.abrupt("return", preciseWeatherData);

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](3);
            console.log('search did not return anything');

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 19]]);
  }));
  return _getWeather.apply(this, arguments);
}

;

function displayWeather() {
  return _displayWeather.apply(this, arguments);
}

function _displayWeather() {
  _displayWeather = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var weatherData, currentWeather, i, weatherArray;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getWeather();

          case 2:
            weatherData = _context2.sent;
            currentWeather = [weatherData.daily[0].temp.max, weatherData.daily[0].temp.min, weatherData.daily[0].humidity, weatherData.daily[0].weather[0].description, weatherData.daily[0].weather[0].icon];
            currentWeather[3] = currentWeather[3].replace(/(^\w{1})|(\s+\w{1})/g, function (letter) {
              return letter.toUpperCase();
            });
            updateMainDisplay(currentWeather);

            for (i = 0; i < 5; i++) {
              weatherArray = [weatherData.daily[i].temp.max, weatherData.daily[i].temp.min, weatherData.daily[i].humidity, weatherData.daily[i].weather[0].description];
              weatherArray[3] = weatherArray[3].replace(/(^\w{1})|(\s+\w{1})/g, function (letter) {
                return letter.toUpperCase();
              });
              displayUpdate(weatherArray, i);
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _displayWeather.apply(this, arguments);
}

var updateMainDisplay = function updateMainDisplay(weatherData) {
  for (var i = 0; i < 5; i++) {
    if (i < 2) {
      mainDisplayItem.children[i + 1].innerHTML = "".concat(displayText[i], " ").concat(weatherData[i], "\xB0");
    } else if (i == 4) {
      console.log('I am item 5');
      mainDisplayItem.children[i + 1].alt = weatherData[3];
      mainDisplayItem.children[i + 1].src = "http://openweathermap.org/img/wn/".concat(weatherData[4], "@2x.png");
      console.log(mainDisplayItem.children[i + 1].alt);
    } else {
      mainDisplayItem.children[i + 1].innerHTML = "".concat(displayText[i], " ").concat(weatherData[i]);
    }
  }
};

var displayUpdate = function displayUpdate(weatherData, number) {
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      gridItem[number].children[i + 1].innerHTML = "".concat(displayText[i], " ").concat(weatherData[i], "\xB0");
    } else {
      gridItem[number].children[i + 1].innerHTML = "".concat(displayText[i], " ").concat(weatherData[i]);
    }
  }
};

var defaultDateDisplay = function defaultDateDisplay() {
  mainDisplayItem.children[0].innerHTML = "".concat(currentDay, " ").concat(currentDate);

  for (var i = 0; i < 5; i++) {
    var curdate = new Date(y, m, d + i),
        display = "".concat(curdate.toLocaleDateString('en-us', {
      weekday: "long"
    }), " ").concat(curdate.toLocaleDateString());
    gridItem[i].children[0].innerHTML = display;
  }
}; // Event Listeners


button.addEventListener('click', function (event) {
  displayWeather();
  event.preventDefault();
});
defaultDateDisplay();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0MsT0FBTyxFQUFDO0lBQVQsQ0FBcEMsQ0FBTixjQUErRGtELE9BQU8sQ0FBQ25ELGtCQUFSLEVBQS9ELENBRFA7SUFFQUosUUFBUSxDQUFDOEMsQ0FBRCxDQUFSLENBQVlHLFFBQVosQ0FBcUIsQ0FBckIsRUFBd0JDLFNBQXhCLEdBQW9DTSxPQUFwQztFQUNIO0FBQ0osQ0FURCxFQVdBOzs7QUFDQWhFLE1BQU0sQ0FBQ2lFLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVNDLEtBQVQsRUFBZTtFQUM1QzFCLGNBQWM7RUFDZDBCLEtBQUssQ0FBQ0MsY0FBTjtBQUNILENBSEQ7QUFNQUwsa0JBQWtCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwaV9wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcz9lNjg3Iiwid2VicGFjazovL3dlYXRoZXJfYXBpX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcGlfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBpX3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbi8vR29hbCBvZiBQcm9qZWN0XG5cbi8vIFZhcmlhYmxlc1xuXG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSxcbiAgICBpbnB1dENpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VhdGhlclNlYXJjaENpdHknKSxcbiAgICBpbnB1dENvdW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VhdGhlclNlYXJjaENvdW50cnknKSxcbiAgICBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxuICAgIG1haW5EaXNwbGF5SXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkTWFpbkRpc3BsYXlJdGVtJyksXG4gICAgZ3JpZEl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdncmlkSXRlbScpLFxuICAgIGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7d2Vla2RheTpcImxvbmdcIn0pLFxuICAgIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywge1xuICAgICAgICBkYXk6XCIyLWRpZ2l0XCIsXG4gICAgICAgIG1vbnRoOlwiMi1kaWdpdFwiLFxuICAgICAgICB5ZWFyOlwiMi1kaWdpdFwiXG4gICAgfSksXG4gICAgdGltZSA9IG5ldyBEYXRlKCksXG4gICAgZCA9IHRpbWUuZ2V0RGF0ZSgpLFxuICAgIG0gPSB0aW1lLmdldE1vbnRoKCksXG4gICAgeSA9IHRpbWUuZ2V0RnVsbFllYXIoKSxcbiAgICBkaXNwbGF5VGV4dCA9IFsnSGlnaDonLCAnTG93OicsICdIdW1pZGl0eTonLCAnQ2xvdWQgQ2FzdDonXTtcblxuXG4vLyBGdW5jdGlvbnNcblxuLy8gQVBJIFJldHJlaXZhbCBiYXNlZCBvbiBzZWFyY2hcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIoKXtcbiAgICBsZXQgZGVmYXVsdFNlYXJjaCA9ICdTYW4gQW50b25pbycsXG4gICAgICAgIGFwaUtleSA9ICczMzc2OGUwZGUzODViMDkyMjJhODRiZTEwZjA3YTcxOCc7XG5cbiAgICBpZihpbnB1dENpdHkudmFsdWUgIT0gJycpe1xuICAgICAgICBkZWZhdWx0U2VhcmNoID0gaW5wdXRDaXR5LnZhbHVlO1xuICAgIH07XG4gICAgdHJ5e1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7ZGVmYXVsdFNlYXJjaH0mbGltaXQ9MSZhcHBpZD0ke2FwaUtleX1gKSxcbiAgICAgICAgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCksXG4gICAgICAgIHJlc3BvbnNlMiA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHt3ZWF0aGVyRGF0YVswXS5sYXR9Jmxvbj0ke3dlYXRoZXJEYXRhWzBdLmxvbn0mZXhjbHVkZT1jdXJyZW50LG1pbnV0ZWx5LGhvdXJseSZhcHBpZD0ke2FwaUtleX0mdW5pdHM9aW1wZXJpYWxgKSxcbiAgICAgICAgcHJlY2lzZVdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UyLmpzb24oKTtcbiAgICByZXR1cm4gcHJlY2lzZVdlYXRoZXJEYXRhXG4gICAgXG4gICAgfWNhdGNoKGVycil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZWFyY2ggZGlkIG5vdCByZXR1cm4gYW55dGhpbmcnKVxuICAgIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlXZWF0aGVyICgpe1xuICAgIGxldCB3ZWF0aGVyRGF0YSA9IGF3YWl0IGdldFdlYXRoZXIoKSxcbiAgICBjdXJyZW50V2VhdGhlciA9IFtcbiAgICAgICAgd2VhdGhlckRhdGEuZGFpbHlbMF0udGVtcC5tYXgsIFxuICAgICAgICB3ZWF0aGVyRGF0YS5kYWlseVswXS50ZW1wLm1pbiwgXG4gICAgICAgIHdlYXRoZXJEYXRhLmRhaWx5WzBdLmh1bWlkaXR5LCBcbiAgICAgICAgd2VhdGhlckRhdGEuZGFpbHlbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbiwgXG4gICAgICAgIHdlYXRoZXJEYXRhLmRhaWx5WzBdLndlYXRoZXJbMF0uaWNvblxuICAgIF07XG5cbiAgICBjdXJyZW50V2VhdGhlclszXSA9IGN1cnJlbnRXZWF0aGVyWzNdLnJlcGxhY2UoLyheXFx3ezF9KXwoXFxzK1xcd3sxfSkvZywgbGV0dGVyID0+IGxldHRlci50b1VwcGVyQ2FzZSgpKTtcblxuICAgIHVwZGF0ZU1haW5EaXNwbGF5KGN1cnJlbnRXZWF0aGVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGxldCB3ZWF0aGVyQXJyYXkgPSBbXG4gICAgICAgICAgICB3ZWF0aGVyRGF0YS5kYWlseVtpXS50ZW1wLm1heCwgXG4gICAgICAgICAgICB3ZWF0aGVyRGF0YS5kYWlseVtpXS50ZW1wLm1pbiwgXG4gICAgICAgICAgICB3ZWF0aGVyRGF0YS5kYWlseVtpXS5odW1pZGl0eSwgXG4gICAgICAgICAgICB3ZWF0aGVyRGF0YS5kYWlseVtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uXG4gICAgICAgIF1cbiAgICAgICAgd2VhdGhlckFycmF5WzNdID0gd2VhdGhlckFycmF5WzNdLnJlcGxhY2UoLyheXFx3ezF9KXwoXFxzK1xcd3sxfSkvZywgbGV0dGVyID0+IGxldHRlci50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgZGlzcGxheVVwZGF0ZSh3ZWF0aGVyQXJyYXksaSlcblxuICAgIH1cbn1cblxubGV0IHVwZGF0ZU1haW5EaXNwbGF5ID0gKHdlYXRoZXJEYXRhKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgaWYgKGkgPCAyKSB7XG4gICAgICAgICAgICBtYWluRGlzcGxheUl0ZW0uY2hpbGRyZW5baSsxXS5pbm5lckhUTUwgPSBgJHtkaXNwbGF5VGV4dFtpXX0gJHt3ZWF0aGVyRGF0YVtpXX3CsGBcbiAgICAgICAgfWVsc2UgaWYgKGkgPT0gNCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSSBhbSBpdGVtIDUnKVxuICAgICAgICAgICAgbWFpbkRpc3BsYXlJdGVtLmNoaWxkcmVuW2krMV0uYWx0ID0gd2VhdGhlckRhdGFbM11cbiAgICAgICAgICAgIG1haW5EaXNwbGF5SXRlbS5jaGlsZHJlbltpKzFdLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3dlYXRoZXJEYXRhWzRdfUAyeC5wbmdgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYWluRGlzcGxheUl0ZW0uY2hpbGRyZW5baSsxXS5hbHQpXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbWFpbkRpc3BsYXlJdGVtLmNoaWxkcmVuW2krMV0uaW5uZXJIVE1MID0gYCR7ZGlzcGxheVRleHRbaV19ICR7d2VhdGhlckRhdGFbaV19YFxuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgZGlzcGxheVVwZGF0ZSA9ICh3ZWF0aGVyRGF0YSxudW1iZXIpID0+e1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGlmIChpIDwgMikge1xuICAgICAgICAgICAgZ3JpZEl0ZW1bbnVtYmVyXS5jaGlsZHJlbltpKzFdLmlubmVySFRNTCA9IGAke2Rpc3BsYXlUZXh0W2ldfSAke3dlYXRoZXJEYXRhW2ldfcKwYFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGdyaWRJdGVtW251bWJlcl0uY2hpbGRyZW5baSsxXS5pbm5lckhUTUwgPSBgJHtkaXNwbGF5VGV4dFtpXX0gJHt3ZWF0aGVyRGF0YVtpXX1gXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCBkZWZhdWx0RGF0ZURpc3BsYXkgPSAoKSA9PiB7XG5cbiAgICBtYWluRGlzcGxheUl0ZW0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gYCR7Y3VycmVudERheX0gJHtjdXJyZW50RGF0ZX1gXG5cbiAgICBmb3IobGV0IGk9MDsgaSA8IDU7IGkrKyl7XG4gICAgICAgIGxldCBjdXJkYXRlID0gbmV3IERhdGUoeSwgbSwgZCtpKSxcbiAgICAgICAgZGlzcGxheSA9IGAke2N1cmRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHt3ZWVrZGF5OlwibG9uZ1wifSl9ICR7Y3VyZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKX1gXG4gICAgICAgIGdyaWRJdGVtW2ldLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IGRpc3BsYXlcbiAgICB9XG59XG5cbi8vIEV2ZW50IExpc3RlbmVyc1xuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGRpc3BsYXlXZWF0aGVyKClcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cblxuZGVmYXVsdERhdGVEaXNwbGF5KClcbiJdLCJuYW1lcyI6WyJidXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbnB1dENpdHkiLCJpbnB1dENvdW50cnkiLCJib2R5IiwibWFpbkRpc3BsYXlJdGVtIiwiZ2V0RWxlbWVudEJ5SWQiLCJncmlkSXRlbSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjdXJyZW50RGF5IiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJjdXJyZW50RGF0ZSIsImRheSIsIm1vbnRoIiwieWVhciIsInRpbWUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsInkiLCJnZXRGdWxsWWVhciIsImRpc3BsYXlUZXh0IiwiZ2V0V2VhdGhlciIsImRlZmF1bHRTZWFyY2giLCJhcGlLZXkiLCJ2YWx1ZSIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwid2VhdGhlckRhdGEiLCJsYXQiLCJsb24iLCJyZXNwb25zZTIiLCJwcmVjaXNlV2VhdGhlckRhdGEiLCJjb25zb2xlIiwibG9nIiwiZGlzcGxheVdlYXRoZXIiLCJjdXJyZW50V2VhdGhlciIsImRhaWx5IiwidGVtcCIsIm1heCIsIm1pbiIsImh1bWlkaXR5Iiwid2VhdGhlciIsImRlc2NyaXB0aW9uIiwiaWNvbiIsInJlcGxhY2UiLCJsZXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsInVwZGF0ZU1haW5EaXNwbGF5IiwiaSIsIndlYXRoZXJBcnJheSIsImRpc3BsYXlVcGRhdGUiLCJjaGlsZHJlbiIsImlubmVySFRNTCIsImFsdCIsInNyYyIsIm51bWJlciIsImRlZmF1bHREYXRlRGlzcGxheSIsImN1cmRhdGUiLCJkaXNwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9