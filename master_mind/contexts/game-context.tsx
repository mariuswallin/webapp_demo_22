import * as React from 'react'

import { fillArray } from '@/lib/utils'
import { Cell, Color, Game, GameState, Hints } from 'types'

export const colors: Color[] = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'pink',
  'cyan',
  'gray',
]

export enum ActionType {
  PICKED_COLOR = 'picked_color',
  RESET_PICKED = 'reset_picked_color',
  SET_HINTS = 'set_hints',
  INCREASE_ROW = 'increase_row',
  SET_COMPLETE = 'set_complete',
  SET_ROW_COLOR = 'set_row_color',
  START_GAME = 'start_game',
}

type Action =
  | { type: ActionType.PICKED_COLOR; color: Color }
  | { type: ActionType.RESET_PICKED }
  | { type: ActionType.SET_HINTS; hints: Hints }
  | { type: ActionType.INCREASE_ROW }
  | { type: ActionType.SET_COMPLETE }
  | {
      type: ActionType.SET_ROW_COLOR
      cell: Cell['name']
    }
  | { type: ActionType.START_GAME; game: Game }

const initialState: GameState = {
  game: {
    id: '1',
    user: '',
    combination: [],
    rows: [],
  },
  rawHints: [],
  currentColor: null,
  currentRow: 0,
  hints: [],
  colors,
  selectedColors: [],
  remaningColors: colors,
  foundCombination: false,
  isComplete: false,
}

const GameContext = React.createContext<
  [GameState, React.Dispatch<Action>] | undefined
>(undefined)

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

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ActionType.PICKED_COLOR: {
      return {
        ...state,
        currentColor: action.color,
      }
    }
    case ActionType.RESET_PICKED: {
      return {
        ...state,
        currentColor: null,
      }
    }
    case ActionType.SET_HINTS: {
      const createHints = (hint: Hints) => {
        return Object.keys(hint).flatMap((key) =>
          fillArray(key, Number(hint[key as keyof Hints])).map((hint) => ({
            name: hint.name,
            type: key,
          }))
        )
      }
      return {
        ...state,
        hints: [...state.hints, createHints(action.hints)],
        rawHints: [...state.rawHints, action.hints],
      }
    }
    case ActionType.INCREASE_ROW: {
      if (state.game && state.currentRow + 1 >= state.game.rows.length) {
        return {
          ...state,
          isComplete: true,
        }
      }

      return {
        ...state,
        currentRow: state.currentRow + 1,
        selectedColors: [],
        remaningColors: colors,
      }
    }
    case ActionType.SET_COMPLETE: {
      return {
        ...state,
        foundCombination: true,
        isComplete: true,
      }
    }
    case ActionType.SET_ROW_COLOR: {
      if (!state.game || !state.currentColor) return { ...state }

      const selectedCellName = action.cell
      const selectedColor = state.currentColor
      const currentRow = state.game.rows[state.currentRow]
      const currentCellIndex = currentRow.cells.findIndex(
        (rowCell) => rowCell.name === selectedCellName
      )

      currentRow.cells[currentCellIndex].background =
        state.currentColor ?? 'transparent'
      //state.selectedColors[currentCellIndex] = selectedColor

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

      return {
        ...state,
        remaningColors,
        currentColor: null,
        selectedColors,
      }
    }
    case ActionType.START_GAME: {
      return {
        ...initialState,
        game: action.game,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
    }
  }
}

type GameProviderProps = {
  children: React.ReactNode
}

const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = React.useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  )
}

// Virker bare hvis vi ikke setter context state initielt
function useGameContext() {
  const context = React.useContext(GameContext)

  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider')
  }

  return context
}

export { GameProvider, useGameContext }
