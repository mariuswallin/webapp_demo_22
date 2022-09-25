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

  return (
    <>
      <h1>Velkommen {player}</h1>
      <p>Antall mulig forsøk er {rows}</p>
      <Row />
    </>
  );
}
