import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GameContextProvider from "../context/GameContext";

// TODO: GameContext for å kunne ha "state" på alle sidene våre
// TODO: useRow løser funksjonaliteten, men lager en ny funksjon som ikke "beholder" staten
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  );
}

export default MyApp;
