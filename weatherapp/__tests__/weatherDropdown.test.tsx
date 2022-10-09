import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import WeatherDropdown from '../components/WeatherDropdown'
import { data } from '../data'

const handleUpdateWeather = vi.fn()

describe('WeatherDropdown', () => {
  it('should render dropdown', () => {
    render(
      <WeatherDropdown
        handleUpdateWeather={handleUpdateWeather}
        weatherData={[]}
      />
    )

    expect(screen.queryByTestId('weather-dropdown')).toBeInTheDocument()
  })
  it('should have one option if no weatherdata', async () => {
    render(
      <WeatherDropdown
        handleUpdateWeather={handleUpdateWeather}
        weatherData={[]}
      />
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement
    expect(dropDown.value).toBe('')
    expect(dropDown.options).toHaveLength(1)
  })

  it('should have one option if no weatherdata', async () => {
    render(
      <WeatherDropdown
        handleUpdateWeather={handleUpdateWeather}
        weatherData={data}
      />
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement
    expect(dropDown.value).toBe('')
    expect(dropDown.options).toHaveLength(data.length + 1)
  })
  it('should have select option if currentLocation', async () => {
    render(
      <WeatherDropdown
        handleUpdateWeather={handleUpdateWeather}
        weatherData={data}
        currentLocation={'Fredrikstad'}
      />
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement
    expect(dropDown.value).toBe('fredrikstad')
  })
  it('should call method for updating weather', async () => {
    render(
      <WeatherDropdown
        handleUpdateWeather={handleUpdateWeather}
        weatherData={data}
      />
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement

    await userEvent.selectOptions(dropDown, 'sarpsborg')

    expect(handleUpdateWeather).toBeCalledTimes(1)
    expect(handleUpdateWeather).toBeCalledWith('sarpsborg')
  })
})
