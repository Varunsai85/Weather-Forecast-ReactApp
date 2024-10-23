import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line ,Bar} from 'react-chartjs-2';
import './App.css'

defaults.maintainAspectRatio=false;
defaults.responsive=true;
defaults.plugins.title.display=true;
defaults.plugins.title.align="center";
defaults.plugins.title.font.size=20;
defaults.plugins.title.color="Black";
defaults.plugins.width='100%'
defaults.plugins.height='100%'


function App() {
  const API_KEY = "8bc124a934dd4475a84134551242010";
  const [city, setCity] = useState("New Delhi")
  const [currentDay, setCurrentDay] = useState([])
  const [condition, setCondition] = useState('')
  const [tempc, setTempc] = useState('')
  const [tempf, setTempf] = useState('')
  const [temp, setTemp] = useState('')
  const [deg, setDeg] = useState("C")
  const [humidity, setHumidity] = useState('')
  const [windspeed, setWindSpeed] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [resCity, setResCity] = useState("")
  const [sunset, setSunset] = useState("")
  const [sunrise, setSunrise] = useState("")
  const [days, setDays] = useState([])

  useEffect(() => {
    getWeather()
  }, [city])
  
  const currentTime = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString().slice(0, 5)
    const currentDate = now.toLocaleDateString()
    return { currentTime, currentDate }
  }

  const displayBox = (data, current) => {
    setCondition(data[0].day.condition.text)
    setSunset(data[0].astro.sunset)
    setSunrise(data[0].astro.sunrise)
    setCurrentDay(data[0].hour)
    setTempc(current.temp_c)
    setTempf(current.temp_f)
    setTemp(current.temp_c)
    setHumidity(current.humidity)
    setWindSpeed(current.wind_kph)
    const result = currentTime();
    setTime(result.currentTime)
    setDate(result.currentDate)
    setDays(data)
    console.log(data);
  }
  

  const getWeather = async () => {
    const forecastWeahterURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
    try {
      const forecastResponse = await fetch(forecastWeahterURL);
      const forecastData = await forecastResponse.json();
      displayBox(forecastData.forecast.forecastday, forecastData.current)

    } catch (err) {
      console.log(`Error while loading the data`);
    }
  }
  const handleClickC = () => {
    setTemp(tempc)
    setDeg("C")
  }

  const handleClickF = () => {
    setTemp(tempf)
    setDeg("F")
  }

  const handleChange = (e) => {
    setResCity(e.target.value)
  }

  const handleGet = (getWeather) => {
    setCity((getWeather) ? resCity : "Unable to get weather for the location")
    setResCity('')
  }


  return (
    <>
      <Navbar handleClickC={handleClickC} handleClickF={handleClickF} handleChange={handleChange} city={resCity} handleGet={handleGet} />
      <main className='select-none px-1'>
        <div className='flex my-5 justify-between'>
          <div className="country-temp w-[30%] flex flex-col items-center bg-violet-300 rounded-lg p-3 shadow-box justify-center min-h-40">
            <h1 className="country text-3xl">{city}</h1>
            <div className="temp text-6xl">{temp}<sup>o</sup>{deg}</div>
          </div>
          <div className="relative w-[69%] bg-violet-300 rounded-lg p-3 shadow-box">
            <div className='min-h-64'>
              <Line
                data={{
                  labels: currentDay.map((data) => data.time.slice(11)),
                  datasets: [
                    {
                      label: 'Temperature °C',
                      data: currentDay.map((data) => data.temp_c),
                      backgroundColor: "rgb(134 113 231)",
                      borderColor: "rgb(221 214 254)",
                    }
                  ]
                }}
                options={{
                  
                  elements: {
                    line: {
                      tension: 0.5,
                    }
                  },
                  plugins: {
                    title: {
                      text: "Today Forecast",
                      font:{
                        family:'Rubik',
                        size:18,
                        weight:'500'
                      }
                    },
                    legend: {
                      labels:{
                        color:'black',
                        font:{
                          family:'Rubik',
              
                        }
                      }
                    },
                  },
                  scales: {
                    y: {
                      grid: {
                        display: false
                      },
                      border: {
                        display:false,
                        color: "rgb(221 214 254)",
                        width:4
                      },
                      ticks:{
                        color:"black",
                        font:{
                          family:'Rubik',
                          size:'10',
                          weight:'normal'
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      border: {
                        display:false,
                        color: "rgb(221 214 254)",
                        width:4
                      },
                      ticks:{
                        color:"black",
                        font:{
                          family:'Rubik',
                          size:9.1,
                          weight:'normal'
                        }
                      }
                    }
                  }
                }
                }
              />
            </div>
          </div>
        </div>
        <div className='w-full bg-violet-300 rounded-lg p-3 shadow-box my-5'>
          <div className='mb-3'>WEATHER DETAILS</div>
          <div className='grid grid-cols-4 gap-4'>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>SUNRISE</div>
                <div className="cond text-2xl">{sunrise}</div>
              </div>
              <div className="condicon text-3xl"><FiSunrise /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>SUNSET</div>
                <div className="cond text-2xl">{sunset}</div>
              </div>
              <div className="condicon text-3xl"><FiSunset /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>WEATHER CONDITION</div>
                <div className="cond text-2xl">{condition}</div>
              </div>
              <div className="condicon text-3xl"><TiWeatherPartlySunny /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>TEMPERATURE</div>
                <div className="cond text-2xl">{tempc}<sup>o</sup>C/{tempf}<sup>o</sup>F</div>
              </div>
              <div className="condicon text-3xl"><FaTemperatureHigh /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>HUMIDITY</div>
                <div className="cond text-2xl">{humidity}</div>
              </div>
              <div className="condicon text-3xl"><WiHumidity /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>WIND SPEED</div>
                <div className="cond text-2xl">{windspeed}<sup>kph</sup></div>
              </div>
              <div className="condicon text-3xl"><TiWeatherWindyCloudy /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>DATE</div>
                <div className="cond text-2xl">{date}</div>
              </div>
              <div className="condicon text-3xl"><MdDateRange /></div>
            </div>
            <div className='bg-violet-200 rounded-lg flex items-center justify-between p-2 shadow-box'>
              <div className='flex justify-center flex-col'>
                <div className='text-xs'>TIME</div>
                <div className="cond text-2xl">{time}</div>
              </div>
              <div className="condicon text-3xl"><MdAccessTimeFilled /></div>
            </div>
          </div>
        </div>
        <div className='w-full bg-violet-300 rounded-lg p-3 shadow-box my-5'>
          <div className='mb-3'>7 DAYS WEATHER FORECAST</div>
          <div className='justify-between grid grid-cols-7 gap-3 min-h-44'>
            {days.map((item, index) => {
              return <div key={item.date} className='bg-violet-200 rounded-lg flex flex-col p-2 shadow-box items-center gap-3 w-full justify-between min-h-44'>
                <div className='text-xs'>DAY {index + 1}</div>
                <div className='text-2xl'>{item.day.condition.text}</div>
                <div className='text-xs'>{item.date}</div>
              </div>
            })}
          </div>
        </div>
        <div className="relative w-full bg-violet-300 rounded-lg p-3 shadow-box my-3">
            <div className='min-h-96'>
              <Bar
                data={{
                  labels: days.map((data) => data.date),
                  datasets: [
                    {
                      label: `Temperature °${deg}`,
                      data: days.map((data) => data.day.avgtemp_c),
                      backgroundColor: "rgb(134 113 231)",
                      yAxisID:'y-temp',
                      display:true,
                      borderRadius:10,
                    },
                    {
                      label:'Humidity',
                      data:days.map(data=>data.day.avghumidity),
                      backgroundColor: "rgb(221 214 254)",
                      borderRadius:10,
                      yAxisID:"y-humid"
                    }
                  ]
                }}
                options={{
                  
                  elements: {
                    line: {
                      tension: 0.5,
                    }
                  },
                  plugins: {
                    title: {
                      text: "Temperature and humidity change - 7 day forecast",
                      font:{
                        family:'Rubik',
                          size:18,
                          weight:'normal'
                      }
                    },
                    legend: {
                      display: true,
                      labels:{
                        color:'black',
                        font:{
                          family:'Rubik',
                          size:11,
                          weight:'normal'
                        }
                      }
                    },
                  },
                  scales: {
                    'y-temp': {
                      grid: {
                        display: false
                      },
                      border: {
                        display:false,
                        color: "rgb(221 214 254)",
                        width:4
                      },
                      position:'left',
                      title:{
                        display:true,
                        text:`Temperature °${deg}`,
                        color:'black',
                        font:{
                          family:'Rubik',
                          size:14,
                          weight:'normal'
                        }
                      },
                      ticks:{
                        color:"rgb(0 0 0)",
                      }
                    },
                    'y-humid':{
                      grid: {
                        display: false
                      },
                      border: {
                        display:false,
                        color: "rgb(221 214 254)",
                        width:4
                      },
                      position:'right',
                      title:{
                        display:true,
                        text:"Humidity",
                        color:'black',
                        font:{
                          family:'Rubik',
                          size:14,
                          weight:'normal'
                        }
                      },
                      ticks:{
                        color:"rgb(0 0 0)",
                        font:{
                          family:'Rubik',
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      border: {
                        display:false,
                        color: "rgb(221 214 254)",
                        width:4
                      },
                      ticks:{
                        color:'black',
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
      </main>
    </>
  )
}

export default App