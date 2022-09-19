import GameForm from "./GameForm";

export default function Start({
  setStep,
  setPlayer,
  setRows,
  player,
  rows,
}: any) {
  return (
    <>
      <h1 className="main-heading">Velkommen til Mastermind</h1>
      <ul>
        <li>Her kommer info</li>
        <li>Her kommer mer info</li>
      </ul>
      <GameForm
        setStep={setStep}
        setPlayer={setPlayer}
        setRows={setRows}
        rows={rows}
        player={player}
      />
    </>
  );
}
