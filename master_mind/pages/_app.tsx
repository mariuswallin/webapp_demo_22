import type { AppProps } from 'next/app'

import { GameProvider } from '@/contexts/game-context'
import '../styles/globals.scss'
import StepProvider from '@/contexts/step-context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StepProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </StepProvider>
  )
}

export default MyApp
