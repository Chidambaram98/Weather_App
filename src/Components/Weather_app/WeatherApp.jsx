import React, { useState } from "react";
import "./weatherApp.css";
import clouds from "../Assest/clouds.png";
import cloudy from "../Assest/cloudy.png";
import raining from "../Assest/raining.png";
import snow from "../Assest/snow.png";
import snowflake from "../Assest/snowflake.png";
import sun from "../Assest/sun.png";
import wind from "../Assest/wind.png";
import seach from "../Assest/search-interface-symbol.png";

export const WeatherApp = () => {
  let api_key = "eb0fb07758eab632f90f7046ced2a3c8";
  const [wicon, setWicon] = useState(sun);
  let temprature;
  let location;
  let humidity;
  let wind;
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let responce = await fetch(url);
    let data = await responce.json();
    humidity = document.getElementsByClassName("humidity_percentage");
    wind = document.getElementsByClassName("wind_rate");
    temprature = document.getElementsByClassName("weather_temp");
    location = document.getElementsByClassName("weather_location");

    humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temprature[0].innerHTML = Math.floor(data.main.temp) + " " + "&deg;" + "c";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clouds);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloudy);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(snow);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(snow);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(raining);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(raining);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow);
    } else {
      setWicon(sun);
    }
  };

  return (
    <div className="container">
      <div className="top_bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}>
          <img src={seach} alt="" />
        </div>
      </div>
      <div className="weather_img">
        <img src={wicon} alt="" />
      </div>
      <div className="weather_temp">{temprature}0 c</div>
      <div className="weather_location">{location} india</div>
      <div className="data_container">
        <div className="element">
          <img src="" alt="" className="icon" />
          <div className="data">
            <div className="humidity_percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
          <div className="element">
            <img src={wind} alt="" className="icon" />
            <div className="data">
              <div className="wind_rate">{wind} km/h</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherApp;
