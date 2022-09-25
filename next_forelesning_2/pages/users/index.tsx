import Link from "next/link";
import { useGameContext } from "../../context/GameContext";

// TODO: Vise alle brukere
export default function UsersPage() {
  const { state } = useGameContext();

  return (
    <>
      <h1>Users Page {JSON.stringify(state)}</h1>
      <Link href={"/games"}>Gå til games</Link>
    </>
  );
}
