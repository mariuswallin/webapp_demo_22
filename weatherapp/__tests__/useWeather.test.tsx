import { describe, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useWeather from '../hooks/useWeather'
import { data } from '../data'

describe('useWeather', () => {
  it('should exist', () => {
    const { result } = renderHook(() => useWeather(data))
    expect(result).toBeDefined()
  })
  it('should have weatherData', () => {
    const { result } = renderHook(() => useWeather(data))
    expect(result.current.weatherData).toMatchObject(data)
  })
  it('should have default data', () => {
    const { result } = renderHook(() => useWeather(data))
    expect(result.current.weatherData).toMatchObject(data)
    expect(result.current.currentLocation).toBe(undefined)
    expect(result.current.weather).toBe(undefined)
  })
  it('should update weatherData', () => {
    const { result } = renderHook(() => useWeather(data))

    act(() => {
      result.current.handleUpdateWeather('Fredrikstad')
    })

    expect(result.current.currentLocation).toBe('fredrikstad')
    expect(result.current.weather).toMatchObject({
      id: '1',
      place: 'Fredrikstad',
      weather: 'Sol',
      temperature: 25,
    })
  })
})
