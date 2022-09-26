import type { NextPage } from "next";
import Game from "../components/Game";
import Start from "../components/Start";
import { useState } from "react";

const colors = [
  "red",
  "green",
  "blue",
  "orange",
  "pink",
  "cyan",
  "grey",
  "yellow",
];

const initialState = {
  game: {
    id: "",
    user: "",
    combination: [],
    rows: [
      {
        number: 0,
        name: "row-0",
        cells: [
          { name: "cell-0", background: "transparent" },
          { name: "cell-1", background: "transparent" },
          { name: "cell-2", background: "transparent" },
          { name: "cell-3", background: "transparent" },
        ],
      },
      {
        number: 1,
        name: "row-1",
        cells: [
          { name: "cell-0", background: "transparent" },
          { name: "cell-1", background: "transparent" },
          { name: "cell-2", background: "transparent" },
          { name: "cell-3", background: "transparent" },
        ],
      },
      {
        number: 2,
        name: "row-2",
        cells: [
          { name: "cell-0", background: "transparent" },
          { name: "cell-1", background: "transparent" },
          { name: "cell-2", background: "transparent" },
          { name: "cell-3", background: "transparent" },
        ],
      },
      {
        number: 3,
        name: "row-3",
        cells: [
          { name: "cell-0", background: "transparent" },
          { name: "cell-1", background: "transparent" },
          { name: "cell-2", background: "transparent" },
          { name: "cell-3", background: "transparent" },
        ],
      },
    ],
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

// TODO: I handleSubmit om 3 uker

// TODO: Lage createGame funksjon som "sender game-objekt tilbake"
// TODO: Ta i mot en props som gjør at vi kan "fake" at den feiler
// TODO: Fake at vi skal sende data
// TODO: Legge til loading, error og data (via createGame)
// TODO: Lage funksjon for handleSubmit
// TODO: Oppdatere step om submit fullføres

const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  const [game, setGame] = useState<any>(initialState);

  // Oppdatere step / Lagre step i game
  const handleSubmit = ({ player, rows }) => {
    setGame((prev) => ({
      ...prev,
      game: {
        ...prev.game,
        id: "1",
        user: player,
        combination: ["red", "blue", "orange", "cyan"],
      },
    }));
  };

  return (
    <main>
      {step === 0 ? (
        <>
          {/* Sende handleSubmit og nødvendige props */}
          <Start handleSubmit={handleSubmit} />
        </>
      ) : (
        <>
          <Game game={game} />
        </>
      )}
    </main>
  );
};

export default Home;
