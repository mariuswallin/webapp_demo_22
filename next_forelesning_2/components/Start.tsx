import GameForm from "./GameForm";

// TODO: Ta i mot handleSubmit
// TODO: Ta i mot nødvendige props for å vise frem
export default function Start({
  setStep,
  setPlayer,
  setRows,
  player,
  rows,
}: any) {
  return (
    <div className="start">
      <h1>Velkommen til Master Mind</h1>
      <ul>
        <li>
          Spillet går ut på at den ene spilleren bruker fargene for å sette opp
          en skjult kombinasjon (kode) som den andre spilleren skal finne.
        </li>
        <li>
          Etter hver runde får spilleren et antall små sorte og hvite pinner ved
          siden av kombinasjonen. Pinnene viser hvor mange brikker som er av
          riktig farge og på riktig plass (sorte pinner), og hvor mange brikker
          som er av riktig farge, men er feil plass (hvite pinner).
        </li>
        <li>NB: Det er kun lov å bruke en av hver farge</li>
        <li>
          Det er selvsagt om å gjøre å gjette koden ved å bruke færrest mulig
          forsøk.
        </li>
      </ul>
      {/* TODO: 
      
      Sende handleSubmit isteden for setRows, setStep og eventuelt setPlayer
      Kan sende all den infoen via handleSubmit

      <GameForm
          handleSubmit={handleSubmit}
          player={player}
          setPlayer={setPlayer}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

      */}
      <GameForm
        setStep={setStep}
        setPlayer={setPlayer}
        setRows={setRows}
        rows={rows}
        player={player}
      />
    </div>
  );
}
