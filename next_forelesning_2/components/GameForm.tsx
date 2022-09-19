export default function GameForm({
  setStep,
  setPlayer,
  setRows,
  player,
  rows,
}: any) {
  const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.target.value);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!player || !Number(rows) || rows <= 0) return;
    setStep(1);
  };

  return (
    <form className="game-form" onSubmit={handleSubmit}>
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
