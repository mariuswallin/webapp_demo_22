import { useState } from "react";

export default function GameForm({ handleSubmit }: any) {
  const [player, setPlayer] = useState("");
  const [rows, setRows] = useState(0);

  const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.target.value);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(Number(event.target.value));
  };

  const handleGameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!player || !Number(rows) || rows <= 0) return;
    handleSubmit({ player, rows });
  };

  return (
    <form className="game-form" onSubmit={handleGameSubmit}>
      <label htmlFor="player">
        <span>Spiller</span>
        <input
          id="player"
          type="text"
          value={player}
          onChange={handlePlayerChange}
        />
      </label>
      <label htmlFor="rows">
        <span>Antall rader</span>
        <input
          id="rows"
          type="number"
          value={rows}
          onChange={handleRowsChange}
        />
      </label>
      <button>Start spillet</button>
    </form>
  );
}
