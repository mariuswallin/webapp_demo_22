import { act, renderHook } from '@testing-library/react'
import { expect, it } from 'vitest'

import '@testing-library/jest-dom'
import { colors } from '@/contexts/game-context'
import useRow from '@/hooks/useRowNoContext'
import { createRows } from '@/lib/utils'
import type { Game, GameState } from 'types'

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
  rawHints: [],
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
      result.current.handleSelectedColor('red')
    })
    act(() => {
      result.current.handleCellClick('cell-0')
    })
    expect(result.current.state).toMatchObject({
      ...initialState,
      currentColor: 'red',
    })
  })
  it('should handle cell click if game is started', () => {
    const { result } = renderHook(() => useRow(initialState))
    const rows = createRows(1)
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }

    act(() => {
      result.current.handleStartGame(game)
    })

    act(() => {
      result.current.handleCellClick('cell-0')
    })

    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      currentColor: null,
    })
  })
  it('should update selected colors', () => {
    const { result } = renderHook(() => useRow(initialState))
    const rows = createRows(1)
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }

    act(() => {
      result.current.handleStartGame(game)
    })

    act(() => {
      result.current.handleSelectedColor('red')
    })

    act(() => {
      result.current.handleCellClick('cell-0')
    })

    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      selectedColors: ['red'],
      remaningColors: [
        'green',
        'blue',
        'yellow',
        'orange',
        'pink',
        'cyan',
        'gray',
      ],
      currentColor: null,
    })
  })
  it('should update selected colors (change initialstate)', () => {
    const rows = createRows(1)
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({ ...initialState, game, currentColor: 'red' })
    )

    act(() => {
      result.current.handleCellClick('cell-0')
    })
    expect(rows[0].cells[0].background).toBe('red')
    expect(
      rows[0].cells.filter((cell) => cell.background === 'transparent').length
    ).toBe(3)
    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      selectedColors: ['red'],
      remaningColors: [
        'green',
        'blue',
        'yellow',
        'orange',
        'pink',
        'cyan',
        'gray',
      ],
      currentColor: null,
    })
  })
  it('should update replace already selected color', () => {
    const rows = createRows(1)
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({
        ...initialState,
        game,
      })
    )

    act(() => {
      result.current.state.currentColor = 'red'
      result.current.handleCellClick('cell-0')
    })

    act(() => {
      result.current.state.currentColor = 'blue'
      result.current.handleCellClick('cell-1')
    })

    expect(result.current.state.game.rows[0].cells[0].background).toBe('red')
    expect(
      result.current.state.game.rows[0].cells.filter(
        (cell) => cell.background === 'transparent'
      ).length
    ).toBe(2)
    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      selectedColors: ['red', 'blue'],
      remaningColors: ['green', 'yellow', 'orange', 'pink', 'cyan', 'gray'],
      currentColor: null,
    })
  })
  it('should update replace already selected color', () => {
    const rows = createRows(1)
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({
        ...initialState,
        game,
      })
    )

    act(() => {
      result.current.state.currentColor = 'red'
      result.current.handleCellClick('cell-0')
    })

    act(() => {
      result.current.state.currentColor = 'blue'
      result.current.handleCellClick('cell-0')
    })

    expect(result.current.state.game.rows[0].cells[0].background).toBe('blue')
    expect(
      result.current.state.game.rows[0].cells.filter(
        (cell) => cell.background === 'transparent'
      ).length
    ).toBe(3)
    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      selectedColors: ['blue'],
      remaningColors: [
        'red',
        'green',
        'yellow',
        'orange',
        'pink',
        'cyan',
        'gray',
      ],
      currentColor: null,
    })
  })
  it('should handle cell click if game is started', () => {
    const rows = createRows(2)
    const event = { preventDefault: () => null } as any
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({
        ...initialState,
        game,
        selectedColors: ['cyan', 'green', 'orange', 'pink'],
      })
    )

    act(() => {
      result.current.handleRowSubmit(event)
    })

    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      currentRow: 1,
      currentColor: null,
      hints: [
        [
          {
            name: 'positions-0',
            type: 'positions',
          },
          {
            name: 'colors-0',
            type: 'colors',
          },
        ],
      ],
      rawHints: [{ positions: 1, colors: 1 }],
    })
  })
  it('should complete unsolved game if no more rows', () => {
    const rows = createRows(1)
    const event = { preventDefault: () => null } as any
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({
        ...initialState,
        game,
        selectedColors: ['cyan', 'green', 'orange', 'pink'],
      })
    )

    act(() => {
      result.current.handleRowSubmit(event)
    })

    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      currentRow: 0,
      currentColor: null,
      hints: [
        [
          {
            name: 'positions-0',
            type: 'positions',
          },
          {
            name: 'colors-0',
            type: 'colors',
          },
        ],
      ],
      rawHints: [{ positions: 1, colors: 1 }],
      isComplete: true,
      selectedColors: ['cyan', 'green', 'orange', 'pink'],
    })
  })
  it('should complete resolved game if solution found', () => {
    const rows = createRows(1)
    const event = { preventDefault: () => null } as any
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({
        ...initialState,
        game,
        selectedColors: ['blue', 'red', 'green', 'pink'],
      })
    )

    act(() => {
      result.current.handleRowSubmit(event)
    })

    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      currentRow: 0,
      currentColor: null,
      hints: [
        [
          {
            name: 'positions-0',
            type: 'positions',
          },
          {
            name: 'positions-1',
            type: 'positions',
          },
          {
            name: 'positions-2',
            type: 'positions',
          },
          {
            name: 'positions-3',
            type: 'positions',
          },
        ],
      ],
      rawHints: [{ positions: 4, colors: 0 }],
      isComplete: true,
      selectedColors: ['blue', 'red', 'green', 'pink'],
      foundCombination: true,
    })
  })
  it('should store hints for each round', () => {
    const rows = createRows(3)
    const event = { preventDefault: () => null } as any
    const game: Game = {
      id: '1',
      user: 'marius',
      combination: ['blue', 'red', 'green', 'pink'],
      rows,
    }
    const { result } = renderHook(() =>
      useRow({
        ...initialState,
        game,
        selectedColors: ['orange', 'red', 'green', 'pink'],
      })
    )

    act(() => {
      result.current.handleRowSubmit(event)
    })

    act(() => {
      result.current.state.selectedColors = ['red', 'green', 'blue', 'pink']
      result.current.handleRowSubmit(event)
    })

    act(() => {
      result.current.state.selectedColors = ['blue', 'red', 'green', 'pink']
      result.current.handleRowSubmit(event)
    })

    expect(result.current.state).toMatchObject({
      ...initialState,
      game: {
        ...game,
        rows,
      },
      currentRow: 2,
      currentColor: null,
      hints: [
        [
          {
            name: 'positions-0',
            type: 'positions',
          },
          {
            name: 'positions-1',
            type: 'positions',
          },
          {
            name: 'positions-2',
            type: 'positions',
          },
        ],
        [
          {
            name: 'positions-0',
            type: 'positions',
          },
          {
            name: 'colors-0',
            type: 'colors',
          },
          {
            name: 'colors-1',
            type: 'colors',
          },
          {
            name: 'colors-2',
            type: 'colors',
          },
        ],
        [
          {
            name: 'positions-0',
            type: 'positions',
          },
          {
            name: 'positions-1',
            type: 'positions',
          },
          {
            name: 'positions-2',
            type: 'positions',
          },
          {
            name: 'positions-3',
            type: 'positions',
          },
        ],
      ],
      rawHints: [
        { positions: 3, colors: 0 },
        { positions: 1, colors: 3 },
        { positions: 4, colors: 0 },
      ],
      isComplete: true,
      selectedColors: ['blue', 'red', 'green', 'pink'],
      foundCombination: true,
    })
  })
})
