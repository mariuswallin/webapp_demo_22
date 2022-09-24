import { FormEvent, useCallback, useState } from "react";

import { Cell, Color, Game, GameState, Hints } from "../types";

const colors: Color[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "pink",
  "cyan",
  "gray",
];

// const initialState: GameState = {
//   game: {
//     id: "1",
//     user: "",
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
// };

const getHints = (
  selectedColors: Color[],
  combination: Game["combination"]
) => {
  return selectedColors?.reduce(
    (hints: Hints, color: Color, index: number) => {
      if (color === combination[index]) {
        hints.positions += 1;
      } else if (combination.includes(color)) {
        hints.colors += 1;
      }

      return hints;
    },
    { positions: 0, colors: 0 }
  );
};

export const getRemainingColors = (
  allColors = colors,
  selectedColors: GameState["selectedColors"],
  currentColor: GameState["currentColor"]
) => {
  if (!currentColor) return allColors;

  const availableColors = colors.filter((color) => color !== currentColor);

  if (selectedColors?.length === 0) return availableColors;

  const alreadySelectedIndex = selectedColors?.findIndex(
    (color) => color === currentColor
  );

  if (alreadySelectedIndex >= 0 && currentColor) {
    selectedColors[alreadySelectedIndex] = currentColor;
  }

  return availableColors.filter((color) => !selectedColors?.includes(color));
};

const createHints = (hint: Hints) => {
  return Object.keys(hint).flatMap((key) =>
    Array(Number(hint[key as keyof Hints]))
      .fill(null)
      .map((_, i) => ({ name: `${key}-${i}` }))
      .map((hint) => ({
        name: hint.name,
        type: key,
      }))
  );
};

export default function useRow(initialState: GameState) {
  const [state, setState] = useState(initialState);

  const isCurrentRow = useCallback(
    (rowNumber: number) => {
      return rowNumber === state?.currentRow;
    },
    [state.currentRow]
  );

  const handleRowSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hints = getHints(state.selectedColors, state.game.combination);
    const createdHints = createHints(hints);

    setState((prev) => ({ ...prev, hints: { ...prev.hints, createdHints } }));
    if (hints?.positions === 4) {
      setState((prev) => ({
        ...prev,
        isComplete: true,
        foundCombination: true,
      }));
    } else {
      if (state.game && state.currentRow + 1 >= state.game.rows.length) {
        setState((prev) => ({ ...prev, isComplete: true }));
      }
      setState((prev) => ({
        ...prev,
        currentRow: state.currentRow + 1,
        selectedColors: [],
        remaningColors: colors,
      }));
    }
  };

  const handleCellClick = (cellName: Cell["name"]) => {
    if (state.currentColor) {
      if (!state.game) return { ...state };

      const selectedCellName = cellName;
      const selectedColor = state.currentColor;
      const currentRow = state.game.rows[state.currentRow];
      const currentCellIndex = currentRow.cells.findIndex(
        (rowCell) => rowCell.name === selectedCellName
      );

      currentRow.cells[currentCellIndex].background =
        state.currentColor ?? "transparent";
      state.selectedColors[currentCellIndex] = selectedColor;
      setState((prev) => ({
        ...prev,
        remaningColors: getRemainingColors(
          colors,
          state.selectedColors,
          state.currentColor
        ),
        currentColor: null,
        selectedColors: [...state.selectedColors],
      }));
    }
  };

  const handleSelectedColor = async (color: Color) => {
    if (state?.currentColor === color) {
      setState((prev) => ({ ...prev, currentColor: null }));
    } else {
      setState((prev) => ({ ...prev, currentColor: color }));
    }
  };

  const handleStartGame = (game: Game) => {
    setState({ ...initialState, game });
  };

  return {
    isCurrentRow,
    handleRowSubmit,
    handleCellClick,
    handleSelectedColor,
    handleStartGame,
    state,
  };
}
