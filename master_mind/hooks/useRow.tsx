import { FormEvent, useCallback } from 'react'

import { ActionType, useGameContext } from '@/contexts/game-context'
import { Cell, Color, Game, Hints } from 'types'

const getHints = (selectedColors: Color[], game: Game) => {
  return selectedColors?.reduce(
    (hints: Hints, color: Color, index: number) => {
      if (color === game?.combination[index]) {
        hints.positions += 1
      } else if (game?.combination.includes(color)) {
        hints.colors += 1
      }

      return hints
    },
    { positions: 0, colors: 0 }
  )
}

export default function useRow() {
  const [state, dispatch] = useGameContext()

  const isCurrentRow = useCallback(
    (rowNumber: number) => {
      return rowNumber === state?.currentRow
    },
    [state.currentRow]
  )

  const handleRowSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const hints = getHints(state.selectedColors, state.game)

    dispatch({ type: ActionType.SET_HINTS, hints })
    if (hints?.positions === 4) {
      dispatch({ type: ActionType.SET_COMPLETE })
    } else {
      dispatch({ type: ActionType.INCREASE_ROW })
    }
  }

  const handleCellClick = (cellName: Cell['name']) => {
    if (state.currentColor) {
      dispatch({
        type: ActionType.SET_ROW_COLORS,
        cell: cellName,
        selectedColor: state.currentColor,
      })
    }
  }

  const handleSelectedColor = async (color: Color) => {
    if (state?.currentColor === color) {
      dispatch({ type: ActionType.RESET_PICKED })
    } else {
      dispatch({ type: ActionType.PICKED_COLOR, color })
    }
  }
  return {
    isCurrentRow,
    handleRowSubmit,
    handleCellClick,
    handleSelectedColor,
    state,
  }
}
