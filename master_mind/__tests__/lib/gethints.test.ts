import { describe, expect, it } from 'vitest'

import { Color } from 'types'

import { getHints } from '../../hooks/useRowNoContext'

const correctCombination: [Color, Color, Color, Color] = [
  'red',
  'blue',
  'green',
  'orange',
]

describe('GetHints', () => {
  it('should initially have 0 correct positions and colors', () => {
    const hints = getHints([], ['red', 'blue', 'green', 'orange'])
    expect(hints).toEqual({ positions: 0, colors: 0 })
  })
  it('should have 0 correct positions and colors if no selected colors', () => {
    const hints = getHints([], ['red', 'blue', 'green', 'orange'])
    expect(hints).toEqual({ positions: 0, colors: 0 })
  })
  it('should have 0 correct positions and colors if no selected colors', () => {
    const hints = getHints(
      [undefined, undefined, undefined, undefined] as any,
      ['red', 'blue', 'green', 'orange']
    )
    expect(hints).toEqual({ positions: 0, colors: 0 })
  })
  it('should have 1 correct color and 0 positions', () => {
    const hints = getHints(
      ['cyan', 'pink', 'yellow', 'red'],
      ['red', 'blue', 'green', 'orange']
    )
    expect(hints).toEqual({ positions: 0, colors: 1 })
  })
  it('should have 2 correct color and 0 positions', () => {
    const hints = getHints(
      ['cyan', 'green', 'yellow', 'red'],
      ['red', 'blue', 'green', 'orange']
    )
    expect(hints).toEqual({ positions: 0, colors: 2 })
  })
  it('should have 3 correct color and 0 positions', () => {
    const hints = getHints(
      ['cyan', 'green', 'blue', 'red'],
      ['red', 'blue', 'green', 'orange']
    )
    expect(hints).toEqual({ positions: 0, colors: 3 })
  })
  it('should have 3 correct color and 0 positions', () => {
    const hints = getHints(
      ['orange', 'green', 'blue', 'red'],
      ['red', 'blue', 'green', 'orange']
    )
    expect(hints).toEqual({ positions: 0, colors: 4 })
  })
  it.each([
    [
      ['cyan', 'pink', 'yellow', 'red'],
      correctCombination,
      { positions: 0, colors: 1 },
    ],
    [
      ['cyan', 'green', 'yellow', 'red'],
      correctCombination,
      { positions: 0, colors: 2 },
    ],
    [
      ['cyan', 'green', 'blue', 'red'],
      correctCombination,
      { positions: 0, colors: 3 },
    ],
    [
      ['orange', 'green', 'blue', 'red'],
      correctCombination,
      { positions: 0, colors: 4 },
    ],
  ])('getHints(%s, %s)', (selectedColors, combination, result) => {
    const hints = getHints(selectedColors as Color[], combination)
    expect(hints).toEqual(result)
  })
  it.each([
    [
      ['red', 'pink', 'yellow', 'cyan'],
      correctCombination,
      { positions: 1, colors: 0 },
    ],
    [
      ['red', 'blue', 'yellow', 'cyan'],
      correctCombination,
      { positions: 2, colors: 0 },
    ],
    [
      ['red', 'blue', 'green', 'cyan'],
      correctCombination,
      { positions: 3, colors: 0 },
    ],
    [correctCombination, correctCombination, { positions: 4, colors: 0 }],
  ])('getHints(%s, %s)', (selectedColors, combination, result) => {
    const hints = getHints(selectedColors as Color[], combination)
    expect(hints).toEqual(result)
  })
  it.each([
    [
      ['red', 'pink', 'blue', 'cyan'],
      correctCombination,
      { positions: 1, colors: 1 },
    ],
    [
      ['red', 'blue', 'orange', 'cyan'],
      correctCombination,
      { positions: 2, colors: 1 },
    ],
    [
      ['red', 'blue', 'orange', 'green'],
      correctCombination,
      { positions: 2, colors: 2 },
    ],
  ])('getHints(%s, %s)', (selectedColors, combination, result) => {
    const hints = getHints(selectedColors as Color[], combination)
    expect(hints).toEqual(result)
  })
})
