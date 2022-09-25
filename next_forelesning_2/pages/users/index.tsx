import Link from "next/link";
import { useGameContext } from "../../context/GameContext";

// TODO: Vise alle brukere
export default function UsersPage() {
  const { state, handleStartGame } = useGameContext();
  handleStartGame({
    id: "1",
    user: "marius",
    combination: ["blue", "red", "green", "pink"],
    rows: [{ id: 1 }],
  });
  return (
    <>
      <h1>Users Page {JSON.stringify(state)}</h1>
      <Link href={"/games"}>Gå til games</Link>
    </>
  );
}
