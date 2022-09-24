import { FormEvent, useCallback, useState } from 'react'

import { Cell, Color, Game, GameState, Hints } from '../types'

const colors: Color[] = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'pink',
  'cyan',
  'gray',
]

// export const initialState: GameState = {
//   game: {
//     id: '1',
//     user: '',
//     combination: [],
//     rows: [],
//   },
//   currentColor: null,
//   currentRow: 0,
//   hints: [],
//   colors,
//   selectedColors: [],
//   remaningColors: colors,
//   foundCombination: false,
//   isComplete: false,
// }

export const getHints = (
  selectedColors: Color[],
  combination: Game['combination']
) => {
  const initialHints = { positions: 0, colors: 0 }
  if (selectedColors.length === 0) return initialHints
  return selectedColors?.reduce((hints: Hints, color: Color, index: number) => {
    if (color === combination[index]) {
      hints.positions += 1
    } else if (combination.includes(color)) {
      hints.colors += 1
    }

    return hints
  }, initialHints)
}

export const getRemainingColors = (
  allColors = colors,
  selectedColors: GameState['selectedColors'],
  currentColor: GameState['currentColor']
) => {
  const availableColors = allColors
    .filter((color) => !selectedColors?.includes(color))
    .filter((color) => color !== currentColor)

  return availableColors
}

export const updateSelectedColors = (
  selectedColors: GameState['selectedColors'],
  selectedColor: GameState['currentColor'],
  selectedColorPosition: number
) => {
  const selectedColorsCopy = [...selectedColors]

  if (!selectedColor || selectedColorsCopy.includes(selectedColor))
    return selectedColorsCopy

  if (selectedColorPosition < 0 || selectedColorPosition > 3)
    return selectedColorsCopy

  selectedColorsCopy[selectedColorPosition] = selectedColor

  return selectedColorsCopy
}

const createHints = (hint: Hints) => {
  return Object.keys(hint).flatMap((key) =>
    Array(Number(hint[key as keyof Hints]))
      .fill(null)
      .map((_, i) => ({ name: `${key}-${i}` }))
      .map((hint) => ({
        name: hint.name,
        type: key,
      }))
  )
}

export const isValidGame = (colors: Color[], game: Game) => {
  return Boolean(
    game.combination.length === 4 &&
      game.combination.every((combination) => colors.includes(combination)) &&
      game.id &&
      game.rows.length > 0 &&
      game.user
  )
}

export default function useRow(initialState: GameState) {
  const [state, setState] = useState(initialState)

  const isCurrentRow = useCallback(
    (rowNumber: number) => {
      return rowNumber === state?.currentRow
    },
    [state.currentRow]
  )

  const handleRowSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const hints = getHints(state.selectedColors, state.game.combination)
    const createdHints = createHints(hints)

    setState((prev) => ({ ...prev, hints: { ...prev.hints, createdHints } }))
    if (hints?.positions === 4) {
      setState((prev) => ({
        ...prev,
        isComplete: true,
        foundCombination: true,
      }))
    } else {
      if (state.game && state.currentRow + 1 >= state.game.rows.length) {
        setState((prev) => ({ ...prev, isComplete: true }))
      } else {
        setState((prev) => ({
          ...prev,
          currentRow: state.currentRow + 1,
          selectedColors: [],
          remaningColors: colors,
        }))
      }
    }
  }

  const handleCellClick = (cellName: Cell['name']) => {
    if (state.currentColor && isValidGame(state.colors, state.game)) {
      const selectedCellName = cellName
      const selectedColor = state.currentColor
      const currentRow = state.game.rows[state.currentRow]
      const currentCellIndex = currentRow.cells.findIndex(
        (rowCell) => rowCell.name === selectedCellName
      )

      // TODO: OBS: Mutating global state
      currentRow.cells[currentCellIndex].background =
        state.currentColor ?? 'transparent'

      const selectedColors = updateSelectedColors(
        state.selectedColors,
        selectedColor,
        currentCellIndex
      )

      const remaningColors = getRemainingColors(
        colors,
        selectedColors,
        state.currentColor
      )

      setState((prev) => ({
        ...prev,
        remaningColors,
        currentColor: null,
        selectedColors,
      }))
    }
  }

  const handleSelectedColor = async (color: Color) => {
    if (state?.currentColor === color) {
      setState((prev) => ({ ...prev, currentColor: null }))
    } else {
      setState((prev) => ({ ...prev, currentColor: color }))
    }
  }

  const handleStartGame = (game: Game) => {
    if (!isValidGame(state.colors, game)) throw new Error('Game is not valid')
    setState({ ...initialState, game })
  }

  return {
    isCurrentRow,
    handleRowSubmit,
    handleCellClick,
    handleSelectedColor,
    handleStartGame,
    state,
  }
}
