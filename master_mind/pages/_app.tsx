import type { AppProps } from 'next/app'

import { GameProvider } from '@/contexts/game-context'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  )
}

export default MyApp
