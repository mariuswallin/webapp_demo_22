import Row from "./Row";

type GameProps = {
  player: string;
  rows: number;
};

// TODO: Konvertere til game-context, med useRow etc om 2 uker

// TODO: Ta i mot game objekt
// TODO: Ta i mot isCompleted
// TODO: Lage Solution component for å vise løsningen / om vi klarte det og antall forsøk
export default function Game({ player, rows }: GameProps) {
  // TODO: Lage currentRow state => muteres ved handleRowSubmit
  // TODO: Lage handleSubmit
  // TODO: Lage handleRowSubmit, handleSelectedColor
  // TODO: Hente fra useRow og game-context
  return (
    <>
      <h1>Velkommen {player}</h1>
      <p>Antall mulig forsøk er {rows}</p>
      <Row />
    </>
  );
}
