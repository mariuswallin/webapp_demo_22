import { useGameContext } from "../../context/GameContext";

// TODO: Vise "start siden"
export default function GamesPage() {
  const { state } = useGameContext();
  return <h1>Games Page {JSON.stringify(state)}</h1>;
}
