import { describe, expect, it } from 'vitest'

import { updateSelectedColors } from '@/contexts/game-context'

describe('UpdateSelectedColors', () => {
  it('should not update selected colors if no color is selected', () => {
    const selectedColors = updateSelectedColors(['red'], null, 2)
    expect(selectedColors).toEqual(['red'])
    expect(selectedColors.indexOf('red')).toEqual(0)
  })
  it('should not update color position if already added', () => {
    const selectedColors = updateSelectedColors(['red'], 'red', 2)
    expect(selectedColors).toEqual(['red'])
    expect(selectedColors.indexOf('red')).toEqual(0)
  })
  it('should not update selected colors if position is out of bounds', () => {
    const selectedColors = updateSelectedColors(['red', 'blue'], 'red', 4)
    expect(selectedColors).toEqual(['red', 'blue'])
    expect(selectedColors.indexOf('red')).toEqual(0)
  })
  it('should not update selected colors if position is out of bounds', () => {
    const selectedColors = updateSelectedColors(['red', 'blue'], 'red', -1)
    expect(selectedColors).toEqual(['red', 'blue'])
    expect(selectedColors.indexOf('red')).toEqual(0)
  })
  it('should replace color if color is not already in list', () => {
    const selectedColors = updateSelectedColors(
      ['red', 'blue', 'orange', 'cyan'],
      'yellow',
      1
    )
    expect(selectedColors).toEqual(['red', 'yellow', 'orange', 'cyan'])
    expect(selectedColors.indexOf('yellow')).toEqual(1)
    expect(selectedColors.indexOf('blue')).toEqual(-1)
  })
})
