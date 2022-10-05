import type { NextPage } from 'next'
import StaticText from '../components/StaticText'
import Title from '../components/Title'
import WeatherDropdown from '../components/WeatherDropdown'
import { useWeatherContext } from '../context/WeatherContext'

const About: NextPage = () => {
  const { weatherData, handleUpdateWeather, currentLocation } =
    useWeatherContext()

  return (
    <>
      <Title title={'Om oss'} />
      <StaticText />
      <WeatherDropdown
        weatherData={weatherData}
        handleUpdateWeather={handleUpdateWeather}
        currentLocation={currentLocation}
      />
    </>
  )
}

export default About
