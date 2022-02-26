// search location form
const cityInput = document.querySelector(".search-input");
const btn = document.querySelector(".search-btn");
let inputValidation = document.querySelector(".inputValidation");
// main weather
let mainTemperature = document.querySelector(".main-temperature");
let mainCityName = document.querySelector(".main-city-name");
let mainDateTime = document.querySelector(".main-city-dateTime");
let mainCityWeatherIcon = document.querySelector(".main-city-weather-icon");
let mainCityWeather = document.querySelector(".main-city-weather");

btn.addEventListener("click", getCityLocation);
window.addEventListener("load", getCityLocation);

// get latitude and longitude from api
async function getCityLocation() {
    try {
        if (cityInput.value == "") {
            inputValidation.innerHTML = "please enter city name"
        } else {

            const apiKey = "2e5106d164404a74c4f772ab768266e7";
            let geo = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`)).json();
            let lon = Number(geo["coord"]["lon"]);
            let lat = Number(geo["coord"]["lat"]);
            weather(apiKey, lon, lat);
            inputValidation.innerHTML = "";
        }
    } catch (error) {
        inputValidation.innerHTML = "Please enter the name of the city correctly"
    }
}

// get weather
let tomorrowDate = document.querySelector(".tomorrow-date");
let thirdDate = document.querySelector(".third-day-date");
let fourthDate = document.querySelector(".fourth-day-date");
let fifthDate = document.querySelector(".fifth-day-date");
let sixthDate = document.querySelector(".sixth-day-date");
let seventhDate = document.querySelector(".seventh-day-date");
let tomorrowDateDay = document.querySelector(".tomorrow-date-day");
let thirdDateDay = document.querySelector(".third-date-day");
let fourthDateDay = document.querySelector(".fourth-date-day");
let fifthDateDay = document.querySelector(".fifth-date-day");
let sixthDateDay = document.querySelector(".sixth-date-day");
let seventhDateDay = document.querySelector(".seventh-date-day");
let tomorrowWeather = document.querySelector(".tomorrow-weather");
let thirdDateWeather = document.querySelector(".third-day-weather");
let fourthDateWeather = document.querySelector(".fourth-day-weather");
let fifthDateWeather = document.querySelector(".fifth-day-weather");
let sixthDateWeather = document.querySelector(".sixth-day-weather");
let seventhDateWeather = document.querySelector(".seventh-day-weather");




let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
async function weather(apiKey, lon, lat) {
    let weathers = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)).json();
    mainTemperature.innerHTML = Number(weathers["daily"][0]["temp"]["day"]).toFixed(1) + "°";
    mainCityName.innerHTML = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
    mainCityWeather.innerHTML = weathers["daily"][0]["weather"][0]["main"];
    weekWeathers(weathers);
    today(weathers["daily"]);

    function weekWeathers(wea) {
        let list = [];
        wea["daily"].forEach(e => {
            let week = new Object();
            let date = new Date(e.dt * 1000);
            let min = e["temp"]["min"].toFixed(1);
            let max = e["temp"]["max"].toFixed(1);
            let status = e["weather"][0]["main"];
            week.day = date.getDate();
            week.month = date.getMonth();
            week.min = min;
            week.max = max;
            week.status = status;
            list.push(week)
        });
        tomorrowDate.innerHTML = `${list[1].day} ${months[list[1].month]}`;
        thirdDate.innerHTML = `${list[2].day} ${months[list[2].month]}`;
        fourthDate.innerHTML = `${list[3].day} ${months[list[3].month]}`;
        fifthDate.innerHTML = `${list[4].day} ${months[list[4].month]}`;
        sixthDate.innerHTML = `${list[5].day} ${months[list[5].month]}`;
        seventhDate.innerHTML = `${list[6].day} ${months[list[6].month]}`;
        tomorrowWeather.innerHTML = `${list[1].status}`
        thirdDateWeather.innerHTML = `${list[2].status}`
        fourthDateWeather.innerHTML = `${list[3].status}`
        fifthDateWeather.innerHTML = `${list[4].status}`
        sixthDateWeather.innerHTML = `${list[5].status}`
        seventhDateWeather.innerHTML = `${list[6].status}`
        tomorrowWeather.nextElementSibling.innerHTML = `${list[1].min}° / ${list[1].max}°`;
        thirdDateWeather.nextElementSibling.innerHTML = `${list[2].min}° / ${list[2].max}°`;
        fourthDateWeather.nextElementSibling.innerHTML = `${list[3].min}° / ${list[3].max}°`;
        fifthDateWeather.nextElementSibling.innerHTML = `${list[4].min}° / ${list[4].max}°`;
        sixthDateWeather.nextElementSibling.innerHTML = `${list[5].min}° / ${list[5].max}°`;
        seventhDateWeather.nextElementSibling.innerHTML = `${list[6].min}° / ${list[6].max}°`;
    }

    function today(wea) {

        let city = document.querySelector(".city-value");
        let status = document.querySelector(".status-value");
        let wind = document.querySelector(".wind-speed-value");
        let min = document.querySelector(".min-temperature-value");
        let max = document.querySelector(".max-temperature-value");

        city.innerHTML = mainCityName.innerHTML;
        status.innerHTML = mainCityWeather.innerHTML;
        wind.innerHTML = `${wea[0]["wind_speed"]} k/h`;
        min.innerHTML = `${wea[0]["temp"]["min"].toFixed(1)}°`
        max.innerHTML = `${wea[0]["temp"]["max"].toFixed(1)}°`

    }





    // let Sday = [];
    // let sMonth = [];
    // weathers["daily"].forEach(element => {
    //     convert(element.dt);

    //     function convert(el) {
    //         let date = new Date(el * 1000);
    //         Sday.push(date.getDate());
    //         sMonth.push(date.getMonth());
    //     }
    // });
    // console.log(Sday);
    // console.log(sMonth);

    // function unixConvertToDate(unix) {

    //     new Date(1640334600 * 1000)
    // }


    // tomorrow.children[1].innerHTML = "Trrow";
    // console.log(tomorrowDate.firstChild.childNodes);


}

// function converCelvinTose



// btn.onclick = async function() {
// let weather = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`)).json();
// let cityLat = weather["coord"].lat;
// let cityLon = weather["coord"].lon;
// let time = "daily";
// console.log(cityLon);
// console.log(cityLat);
// we(cityLat, cityLon, time);

// let ee = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-25.04&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)).json();
// console.log(ee);
// ee.daily.forEach(element => {
// console.log(element.dt);
//     console.log(new Date(element.dt * 1000).toISOString().slice(0, 19).replace('T', ' '));


// });
// let date = new Date(ee.daily[0].dt);
// console.log(date.toString());
// let time = await (await fetch("https://www.timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03")).json();
// console.log(time);

// fetch("https://www.timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03")
//     .then(res => res.json())
//     .then(json => console.log(json))


// }