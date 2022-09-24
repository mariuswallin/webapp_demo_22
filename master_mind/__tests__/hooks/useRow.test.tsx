import { act, renderHook } from '@testing-library/react'
import { expect, it } from 'vitest'

import '@testing-library/jest-dom'
import { colors } from '@/contexts/game-context'
import useRow from '@/hooks/useRowNoContext'
import { createRows } from '@/lib/utils'
import type { GameState } from 'types'

const initialState: GameState = {
  game: {
    id: '',
    user: '',
    combination: [],
    rows: [],
  },
  currentColor: null,
  currentRow: 0,
  hints: [],
  colors,
  selectedColors: [],
  remaningColors: colors,
  foundCombination: false,
  isComplete: false,
}

describe('useStep hook', () => {
  it('should exist', () => {
    const { result } = renderHook(() => useRow(initialState))
    expect(result).toBeDefined()
  })
  it('should initally have currentrow as 0', () => {
    const { result } = renderHook(() => useRow(initialState))
    expect(result.current.isCurrentRow(0)).toBeTruthy()
  })
  it('should initally have invalid game', () => {
    const { result } = renderHook(() => useRow(initialState))
    expect(() =>
      result.current.handleStartGame({
        id: '1',
        rows: [],
        combination: [],
        user: '',
      })
    ).toThrow('Game is not valid')
  })

  it.each([
    {
      rows: createRows(2),
      combination: ['red', 'blue', null, 'cyan'],
      expected: 'Game is not valid',
    },
    {
      rows: createRows(0),
      combination: ['red', 'blue', 'orange', 'cyan'],
      expected: 'Game is not valid',
    },
    {
      rows: [],
      combination: ['red', 'blue', 'orange', 'cyan'],
      expected: 'Game is not valid',
    },
    {
      rows: createRows(3),
      combination: ['red', 'blue', 'orange', 'indigo'],
      expected: 'Game is not valid',
    },
    {
      rows: createRows(3),
      combination: [],
      expected: 'Game is not valid',
    },
    {
      rows: createRows(3),
      combination: ['red', 'blue', 'orange', 'indigo', 'cyan'],
      expected: 'Game is not valid',
    },
  ])(
    'should have invalid game handleStartGame($rows, $combination) if not valid data',
    ({ rows, combination, expected }) => {
      const { result } = renderHook(() => useRow(initialState))
      expect(() =>
        result.current.handleStartGame({
          id: '1',
          rows,
          combination: combination as any,
          user: '1',
        })
      ).toThrow(expected)
    }
  )

  it('should initally have no selected color', () => {
    const { result } = renderHook(() => useRow(initialState))
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: null,
    })
  })
  it('should update selected color', () => {
    const { result } = renderHook(() => useRow(initialState))
    act(() => {
      result.current.handleSelectedColor('red')
    })
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: 'red',
    })
  })
  it('should revert already selected color', () => {
    const { result } = renderHook(() => useRow(initialState))
    act(() => {
      result.current.handleSelectedColor('red')
    })
    act(() => {
      result.current.handleSelectedColor('red')
    })
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: null,
    })
  })
  it('should update selected color', () => {
    const { result } = renderHook(() => useRow(initialState))
    act(() => {
      result.current.handleSelectedColor('red')
    })
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: 'red',
    })
  })

  it('should not handle cell click if no currentColor', () => {
    const { result } = renderHook(() => useRow(initialState))
    act(() => {
      result.current.handleCellClick('cell-0')
    })
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: null,
    })
  })
  it('should not handle cell click if game is not started', () => {
    const { result } = renderHook(() => useRow(initialState))
    act(() => {
      result.current.handleStartGame({
        id: '1',
        user: 'marius',
        combination: ['blue', 'red', 'green', 'pink'],
        rows: createRows(1),
      })
    })
    act(() => {
      result.current.handleCellClick('cell-0')
    })
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: null,
    })
  })
})
