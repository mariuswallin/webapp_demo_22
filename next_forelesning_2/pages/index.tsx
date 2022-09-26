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

// TODO: I handleSubmit om 3 uker

// TODO: Lage createGame funksjon som "sender game-objekt tilbake"
// TODO: Ta i mot en props som gjør at vi kan "fake" at den feiler
// TODO: Fake at vi skal sende data
// TODO: Legge til loading, error og data (via createGame)
// TODO: Lage funksjon for handleSubmit
// TODO: Oppdatere step om submit fullføres

const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  const [game, setGame] = useState(initialState);

  // Ha en "game-state" som lagrer denne infoen
  // Oppdatere step / Lagre step i game
  const handleSubmit = ({ player, rows }) => {
    console.log(player, rows);
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
          {/* Erstatte med "game" prop (for å unngå for mange props) */}
          <Game player={""} rows={0} />
        </>
      )}
    </main>
  );
};

export default Home;
