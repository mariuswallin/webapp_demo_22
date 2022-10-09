import { WeatherContext } from '../context/WeatherContext'

type WeatherTableProps = Pick<
  WeatherContext,
  'currentLocation' | 'weatherData' | 'handleUpdateWeather'
>

export default function WeatherTable({
  weatherData,
  currentLocation,
  handleUpdateWeather,
}: WeatherTableProps) {
  if (!weatherData || !currentLocation) return null

  return (
    <section className="weather-table" data-testid="weather-table">
      <h2>Oversikt</h2>
      <ul>
        {weatherData.map((data) => (
          <li key={data.id}>
            <div>
              <span>{data.place}</span>
              <span>{data.weather}</span>
              <span>{data.temperature}</span>
            </div>
            {currentLocation !== data.place.toLowerCase() ? (
              <button
                type="button"
                onClick={() => handleUpdateWeather(data.place)}
              >
                Velg sted
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
