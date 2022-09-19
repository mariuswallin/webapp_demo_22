import Row from "./Row";

type GameProps = {
  player: string;
  rows: number;
};

export default function Game({ player, rows }: GameProps) {
  return (
    <>
      <h1>Velkommen {player}</h1>
      <p>Antall mulig forsøk er {rows}</p>
      <Row />
    </>
  );
}
