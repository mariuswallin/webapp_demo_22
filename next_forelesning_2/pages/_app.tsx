import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GameContextProvider from "../context/GameContext";

// TODO: Vurdere å ha StepContext
// TODO: Vurdere å ha useStep -> vise denne først og deretter vise med Context (ellers har vi ikke kontrol på staten)
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  );
}

export default MyApp;
