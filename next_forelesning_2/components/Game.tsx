import useRow from "../hooks/useRow";
import Row from "./Row";

type GameProps = {
  game: Record<string, any>;
};

// TODO: Konvertere til game-context, med useRow etc om 2 uker

// TODO: Lage Solution component for å vise løsningen / om vi klarte det og antall forsøk
export default function Game({ game }: GameProps) {
  const { state, handleCellClick } = useRow(game);
  // TODO: Ha en "rowState" som tar i mot "gameState som initial"
  // Oppdatere denne med funksjonene under
  // TODO: Lage currentRow state
  const isCurrentRow = () => {
    // TODO: Bruke til å sjekke om en vi er på en gitt rad
    // Gjør at vi kan tilpasse visningen av ColorPicker, send knapp m.m
  };

  // TODO: Lage handleRowSubmit
  const handleRowSubmit = () => {
    // TODO: Brukes når vi trykker "send"
    // Generere hint
    // Avgjøre om man har løst oppgaven eller ikke
    // Avgjøre om runden er ferdig eller ikke
    // Oppdatere currentRow
  };

  // TODO: Lage handleSelectedColor
  // Tar i mot fargen
  const handleSelectedColor = () => {
    // TODO: Brukes når vi trykker på en knapp på ColorPicker
    // Sjekker om fargen vi tar i mot er lik "valgt" farge i game state
    // Hvis tilfelle "null"
    // Hvis ikke sette currentColor til fargen sendt inn
  };

  const handleCellClick = () => {};

  if (!game.game.id) {
    return <p>Spill eksisterer ikke</p>;
  }

  return (
    <>
      <h1>Velkommen {game.game.user}</h1>
      <p>Antall mulig forsøk er {game.game.rows.length}</p>
      {game.game.rows.map((row) => (
        <Row
          key={row.number}
          row={row}
          isCurrentRow={isCurrentRow}
          handleRowSubmit={handleRowSubmit}
          handleSelectedColor={handleSelectedColor}
          handleCellClick={handleCellClick}
        />
      ))}
    </>
  );
}
