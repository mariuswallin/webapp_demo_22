import React from "react";
import useRow from "../hooks/useRow";

export const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "pink",
  "cyan",
  "gray",
];

const initialState = {
  game: {
    id: "",
    user: "",
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
};

const GameContext = React.createContext(undefined as any);

export default function GameContextProvider({ children }: any) {
  const row = useRow(initialState as any);
  return (
    <GameContext.Provider value={{ ...row }}>{children}</GameContext.Provider>
  );
}

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("Invalid usage");
  }
  return context;
};
