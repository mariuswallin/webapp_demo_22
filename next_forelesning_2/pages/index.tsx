import type { NextPage } from "next";
import Game from "../components/Game";
import Start from "../components/Start";
import { useState } from "react";

// const steps = [
//   { name: "Spill", component: <Start /> },
//   { name: "Game", component: <Game /> },
// ];

const Home: NextPage = () => {
  const [step, setStep] = useState(1);
  // TODO: Flytte player og rows ned til GameForm
  // Legge til gameState (se GameContext)
  const [player, setPlayer] = useState("Joakim");
  const [rows, setRows] = useState(2);

  // TODO: Lage handleSubmit
  // Mottar player og rows
  // Ha en "game-state" som lagrer denne infoen
  // Oppdatere step / Lagre step i game

  // TODO: I handleSubmit om 3 uker

  // TODO: Lage createGame funksjon som "sender game-objekt tilbake"
  // TODO: Ta i mot en props som gjør at vi kan "fake" at den feiler
  // TODO: Fake at vi skal sende data
  // TODO: Legge til loading, error og data (via createGame)
  // TODO: Lage funksjon for handleSubmit
  // TODO: Oppdatere step om submit fullføres

  return (
    <main>
      {/* <p>Spiller: {player}</p>
      <p>Antall forsøk: {rows}</p> */}
      {step === 0 ? (
        <>
          {/* Sende handleSubmit og nødvendige props */}
          <Start
            setStep={setStep}
            setPlayer={setPlayer}
            setRows={setRows}
            rows={rows}
            player={player}
          />
        </>
      ) : (
        <>
          {/* Erstatte med "game" prop (for å unngå for mange props) */}
          <Game player={player} rows={rows} />
        </>
      )}
    </main>
  );
};

export default Home;
