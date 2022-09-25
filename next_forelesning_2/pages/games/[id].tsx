import { useRouter } from "next/router";
import { useGameContext } from "../../context/GameContext";

// TODO: Gjennomføre et nytt spill
export default function GamePage() {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useGameContext();
  return (
    <>
      <h1>Velkommen til spill med id {id}</h1>
      <p>Du har {state.game.rows.length} forsøk</p>
      <p>Kombinasjonen du skal gjette er {state.game.combination.join(", ")}</p>
    </>
  );
}
