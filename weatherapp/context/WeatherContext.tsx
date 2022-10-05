import React, { createContext } from 'react'
import { data } from '../data'
import useWeather from '../hooks/useWeather'
import { Place, WeatherData as WeatherDataType } from '../types'

export type WeatherContext = {
  weather?: WeatherDataType
  weatherData?: WeatherDataType[]
  handleUpdateWeather: (place: Place) => void
  currentLocation?: Place
  setWeatherData: React.Dispatch<
    React.SetStateAction<WeatherDataType[] | undefined>
  >
}

const WeatherContext = createContext<WeatherContext | undefined>(undefined)

const WeatherData = ({ data }: { data?: WeatherDataType }) => {
  if (!data) return null

  return (
    <aside data-testid="weather-data">
      <span>{data.place}</span> | <span>{data.weather}</span> |{' '}
      <span>{data.temperature}</span>
    </aside>
  )
}

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    weather,
    handleUpdateWeather,
    weatherData,
    currentLocation,
    setWeatherData,
  } = useWeather(data)

  return (
    <WeatherContext.Provider
      value={{
        weather,
        handleUpdateWeather,
        weatherData,
        currentLocation,
        setWeatherData,
      }}
    >
      {children}
      <WeatherData data={weather} />
    </WeatherContext.Provider>
  )
}

const useWeatherContext = () => {
  const context = React.useContext(WeatherContext)
  if (!context) throw new Error('WeatherContext must have av WeatherProvider')
  return context
}

export { useWeatherContext, WeatherProvider }
