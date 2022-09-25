import Link from "next/link";
import { useEffect } from "react";
import { useGameContext } from "../../context/GameContext";

// TODO: Vise "start siden"
export default function GamesPage() {
  const { state, handleStartGame } = useGameContext();

  useEffect(() => {
    handleStartGame({
      id: "1",
      user: "marius",
      combination: ["blue", "red", "green", "pink"],
      rows: [
        {
          number: 0,
          name: "row-0",
          cells: [
            { name: "cell-0", background: "transparent" },
            { name: "cell-1", background: "transparent" },
            { name: "cell-2", background: "transparent" },
            { name: "cell-3", background: "transparent" },
          ],
          hints: null,
        },
        {
          number: 1,
          name: "row-1",
          cells: [
            { name: "cell-0", background: "transparent" },
            { name: "cell-1", background: "transparent" },
            { name: "cell-2", background: "transparent" },
            { name: "cell-3", background: "transparent" },
          ],
          hints: null,
        },
        {
          number: 2,
          name: "row-2",
          cells: [
            { name: "cell-0", background: "transparent" },
            { name: "cell-1", background: "transparent" },
            { name: "cell-2", background: "transparent" },
            { name: "cell-3", background: "transparent" },
          ],
          hints: null,
        },
        {
          number: 3,
          name: "row-3",
          cells: [
            { name: "cell-0", background: "transparent" },
            { name: "cell-1", background: "transparent" },
            { name: "cell-2", background: "transparent" },
            { name: "cell-3", background: "transparent" },
          ],
          hints: null,
        },
      ],
    });
  }, [handleStartGame]);

  return (
    <>
      <div className="start">
        <h1>Velkommen til Master Mind</h1>
        <ul>
          <li>
            Spillet går ut på at den ene spilleren bruker fargene for å sette
            opp en skjult kombinasjon (kode) som den andre spilleren skal finne.
          </li>
          <li>
            Etter hver runde får spilleren et antall små sorte og hvite pinner
            ved siden av kombinasjonen. Pinnene viser hvor mange brikker som er
            av riktig farge og på riktig plass (sorte pinner), og hvor mange
            brikker som er av riktig farge, men er feil plass (hvite pinner).
          </li>
          <li>NB: Det er kun lov å bruke en av hver farge</li>
          <li>
            Det er selvsagt om å gjøre å gjette koden ved å bruke færrest mulig
            forsøk.
          </li>
        </ul>
      </div>
      {state?.game?.id ? (
        <Link href={`/games/${state.game.id}`}>Gå til game</Link>
      ) : null}
    </>
  );
}
