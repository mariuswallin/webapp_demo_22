import { describe, expect, it } from 'vitest'

import { colors, getRemainingColors } from '@/contexts/game-context'

describe('GetRemaningColors', () => {
  it('should have no available colors if no color list provided', () => {
    const availableColors = getRemainingColors([], [], null)
    expect(availableColors).toEqual([])
  })
  it('should have all colors available initially', () => {
    const availableColors = getRemainingColors(colors, [], null)
    expect(availableColors).toEqual(colors)
  })
  it('should not update selected colors if already selected', () => {
    const availableColors = getRemainingColors(colors, ['red'], 'red')
    expect(availableColors).toEqual([
      'green',
      'blue',
      'yellow',
      'orange',
      'pink',
      'cyan',
      'gray',
    ])
  })
  it('should remove selected color if not already selected', () => {
    const availableColors = getRemainingColors(colors, ['red', 'green'], 'blue')

    expect(availableColors).toEqual([
      'yellow',
      'orange',
      'pink',
      'cyan',
      'gray',
    ])
  })
  it('should have no availableColors i all colors are selected', () => {
    const availableColors = getRemainingColors(
      colors,
      ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'cyan', 'gray'],
      null
    )
    expect(availableColors).toEqual([])
  })
})
