import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { WeatherProvider } from '../context/WeatherContext'
import Home from '../pages'

describe('WeatherDropdown', () => {
  it('should render dropdown', () => {
    const spy = vi.spyOn(console, 'error')
    spy.mockImplementation(() => {})
    expect(() => render(<Home />)).toThrowError(
      'WeatherContext must have av WeatherProvider'
    )
    spy.mockRestore()
  })
  it('should render dropdown', () => {
    render(
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    )

    expect(screen.queryByTestId('weather-dropdown')).toBeInTheDocument()
  })
  it('should not render table', () => {
    render(
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    )

    expect(screen.queryByTestId('weather-table')).not.toBeInTheDocument()
  })
  it('should update dropdown', async () => {
    render(
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement

    await userEvent.selectOptions(dropDown, 'sarpsborg')

    expect(dropDown.value).toBe('sarpsborg')
  })
  it('should render table dropdown when selecting location', async () => {
    render(
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement

    await userEvent.selectOptions(dropDown, 'sarpsborg')
    const weatherTable = await screen.findByTestId('weather-table')

    expect(weatherTable).toBeInTheDocument()
  })
  it('should render weather data when selecting location', async () => {
    render(
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement

    await userEvent.selectOptions(dropDown, 'sarpsborg')
    const weatherData = await screen.findByTestId('weather-data')

    expect(weatherData).toBeInTheDocument()
  })
  it('should update location when selecting item in table', async () => {
    render(
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    )

    const dropDown = (await screen.findByTestId(
      'weather-dropdown'
    )) as HTMLSelectElement

    await userEvent.selectOptions(dropDown, 'sarpsborg')
    const weatherTableButtons = await screen.findAllByRole('button')
    await userEvent.click(weatherTableButtons[0])
    expect(dropDown.value).toBe('fredrikstad')
  })
})
