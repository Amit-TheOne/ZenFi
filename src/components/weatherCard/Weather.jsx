import React, { useEffect, useState } from "react";
import { newShade } from "../../utils/newShade";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Dialog } from "@mui/material";
import styles from "./weather.module.css"
import { useSelector, useDispatch } from 'react-redux'

// ab2b6979519f319ec9fbf465af790cb0  --------api_key
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}   -----Location Co-ordinatesa
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}    ----weather api

export let weatherCardStyle = {
  fontSize: "30px",
  marginBottom: "2px",
  // boxShadow: "2px 2px 2px rgb(52, 51, 51)",
  width: "300px",
  padding: "10px 10px",
  borderRadius: "10px",
  marginTop: "2px",
  textAlign: "center",
  // height: "120px",
  display: "grid",
  position:"relative"
};
export default function Weather() {
  const reduxtheme= useSelector((state)=>state.theme.theme)
  const theme = reduxtheme.color
  const [currLoc, setCurrLoc] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const getWeather = async (lon, lan) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}&units=metric`
    );
    setWeatherData(res.data);
    // console.log(res.data);
  };
  const getLoc = async () => {
    const res = await axios.get("https://ipapi.co/json");
    setCurrLoc(res.data);
    // console.log(res.data);
    getWeather(res.data.longitude, res.data.latitude);
  };
  useEffect(() => {
    getLoc();
  }, []);


  const WeatherDetails = ({weatherData}) => {
      return(
        <div style={{height:"500px",width:"500px"}}>
             Weather Details
             <button onClick={()=>setOpen(false)}>close</button>
        </div>
      )
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true)

  return (
    <div className={styles.weatherCard} style={{backgroundColor: newShade(theme,-10)}} >
      {weatherData ? (
        <>
          <span>
            <div
              className={styles.location}
              style={{backgroundColor: newShade(theme, -30),}}
            >
              <Icon
                style={{ verticalAlign: "middle", fontSize: "20px" }}
                icon="mdi:location"
              />{" "}
              {weatherData.name}
            </div>
           
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              style={{ height: "50px" }}
              alt="weather icon"
            />
             <div>{weatherData.main.temp} C</div>
            <div style={{ fontSize: "23px",marginTop:"10px" }}>
              {weatherData.weather[0].description}
            </div>
          </span>
        </>
      ) : (
        <span>loading...</span>
      )}
      {/* <Dialog open={open} onClose={()=>setOpen(false)}>
          <WeatherDetails weatherData={weatherData}/>
      </Dialog> */}
    </div>
  );
}
