import '../styles/main.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { WeatherProvider } from '../context/WeatherContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WeatherProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WeatherProvider>
  )
}

export default MyApp
