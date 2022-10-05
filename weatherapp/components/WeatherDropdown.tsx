import { WeatherContext } from '../context/WeatherContext'
import { Place } from '../types'

type WeatherDropdownProps = Pick<
  WeatherContext,
  'currentLocation' | 'weatherData' | 'handleUpdateWeather'
>

export default function WeatherDropdown({
  weatherData,
  handleUpdateWeather,
  currentLocation,
}: WeatherDropdownProps) {
  if (!weatherData) return null

  return (
    <select
      className="weather"
      data-testid="weather-dropdown"
      value={currentLocation ?? ''}
      onChange={(event) => handleUpdateWeather(event.target.value as Place)}
    >
      <option value="" disabled>
        Velg sted
      </option>
      {weatherData.map((data) => (
        <option key={data.id} value={data.place.toLowerCase()}>
          {data.place}
        </option>
      ))}
    </select>
  )
}
