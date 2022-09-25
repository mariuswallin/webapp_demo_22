// TODO: Fjerne props og erstatte med handleSubmit
export default function GameForm({
  setStep,
  setPlayer,
  setRows,
  player,
  rows,
}: any) {
  // Todo: Tilbakeføre intern state

  const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.target.value);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(Number(event.target.value));
  };

  // TODO: Utvide og endre navn på handleSubmit
  // TODO: Sende player og rows tilbake til Start.tsx
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
