import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import PuffLoader from "react-spinners/PuffLoader";
import './App.css'

function App() {

  const [weather, setWeather] = useState({})

  useEffect(() => {


    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=0be7d6755af1460785fd2531101edf5d`)
        .then(res => setWeather(res.data))

      console.log(weather)

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);


  }, [])

  console.log(weather)

const [changetemp, setChangetemp] = useState (true)

const kelvin = `${weather.main?.temp}`
const farenheit = Math.round((kelvin - 273.15) * 9 / 5 + 32)
const celsius = Math.round(kelvin - 273.15)

const change1 = () => {
  setChangetemp(!changetemp)
  console.log("hola")
}

{/*const image = <img src="./src/assets/pexels-photo-2797487.jpeg" alt="" />
const newImage = Math.floor(Math.random() * image.length)

document.body.style = `background: ${image[newImage]}`
 style={{background: image [newImage]}}*/}


const [loader , setLoader] = useState (false)

useEffect  (() => {
  setLoader(true)
  setTimeout(() => {
    setLoader(false)
  }, 2000);
}, [])


  return (
    <div className="App" >

{
  loader ?
  <PuffLoader
  color={" rgb(214, 97, 136)"}
  loading={loader}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
  :

     <div className='container'>
        <h1>Weather App </h1>
        <h3>
          {weather.name}, {""}  
          {weather.sys?.country}
        </h3>
        <br />
        <br />
        <div id='containerd'>

          <div >
            <img src={` http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
          </div>

          <div className='details'>
            <h3>"{weather.weather?.[0].description}"</h3>
            <h3>
              <i className="fa-solid fa-wind"></i> {""}
              Wind speed {""}
              <span>
                {weather.wind?.speed}
              </span>
            </h3>
            <h3>
              <i className="fa-solid fa-cloud"></i> {""}
              Clounds: {""}
              <span>
                {weather.clouds?.all}
              </span>
            </h3>
            <h3>
              <i className="fa-solid fa-temperature-three-quarters"></i> {""}
              Pressure: {""}
              <span>{weather.main?.pressure}</span>
            </h3>
          </div>
        </div>
       
        {/*<h2>{weather.main?.temp}</h2>*/}
          <h2> 
          {changetemp ? farenheit : celsius} {""}
          {changetemp ? "farenheit" : "celsius"}   
          </h2>
        <button onClick={change1}>°F / °C</button>
      </div>
}    

 
    </div>
  )
}

export default App
