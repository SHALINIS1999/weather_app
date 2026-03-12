import React, { useState, useEffect } from "react";
import "./Weather.css"
import Header from "./Header";
import Footer from "./Footer";

function Weather() {

    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

useEffect(() => {
    let savedCity = localStorage.getItem("city");

    if (savedCity) {
        setSearch(savedCity);
        getWeather(savedCity);
    }
}, []);

const getWeather = async (cityName) => {

    let city = cityName || search;

    if (city === "") return;

    let apiKey = "2c51be09360d14224ab89aaaf3a67098";

    let weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let weatherResponse = await fetch(weatherURL);
    let weatherData = await weatherResponse.json();

    if (weatherData.cod === 200) {
        setWeather(weatherData);
        setSearch(""); // ✅ this hides the searched city from input
    } 
    else {
        alert("City not found");
        return;
    }

    /* forecast */

let forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

let forecastResponse = await fetch(forecastURL);
let forecastData = await forecastResponse.json();

let dailyData = forecastData.list.filter((item, index) => index % 8 === 0);

setForecast(dailyData.slice(0, 4));
localStorage.setItem("city", city);
};

return (

<div className="weather-container">

<Header search={search}
setSearch={setSearch}
getWeather={getWeather} />

<div className="weather-card">

{/* current weather  */}

<div className="weather-main">

    <img className="weather-icon" src={weather?.weather?.[0]?.main === "Clear"
        ? "https://cdn-icons-png.flaticon.com/512/869/869869.png"
        : "https://cdn-icons-png.flaticon.com/512/414/414825.png"
    }
        alt="weather" />

    <div className="weather-info">

        <p>Today</p>
        <h1>{weather?.name}</h1>
        <p> Temperature: {weather ? Math.round(weather.main.temp) : "--"}°C</p>

    </div>
</div>


{/* forecast */}

<div className="forecast">

{forecast.map((item, index) => {

let date = new Date(item.dt_txt);

let day = date.toLocaleDateString("en-US", { weekday: "long" });

return (

    <div className="forecast-box" key={index}>

        <h4>{day}</h4>

        <img src={item.weather[0].main === "Clear"
            ? "https://cdn-icons-png.flaticon.com/512/869/869869.png"
            : "https://cdn-icons-png.flaticon.com/512/414/414825.png"
        }
            alt="weather" />

        <p>{Math.round(item.main.temp)}°C</p>

    </div>
)
})}

</div>
</div>
<Footer/>

</div>
)
}
export default Weather;