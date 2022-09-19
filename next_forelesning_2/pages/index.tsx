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
  const [player, setPlayer] = useState("Joakim");
  const [rows, setRows] = useState(2);

  return (
    <main>
      {/* <p>Spiller: {player}</p>
      <p>Antall forsøk: {rows}</p> */}
      {step === 0 ? (
        <Start
          setStep={setStep}
          setPlayer={setPlayer}
          setRows={setRows}
          rows={rows}
          player={player}
        />
      ) : (
        <Game player={player} rows={rows} />
      )}
    </main>
  );
};

export default Home;
