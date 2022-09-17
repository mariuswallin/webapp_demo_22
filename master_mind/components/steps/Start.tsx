import { useEffect } from 'react'

import axios from 'axios'

import { ActionType, useGameContext } from '@/contexts/game-context'
import { createUser } from '@/lib/utils/api'

const Start = () => {
  const [, dispatch] = useGameContext()
  useEffect(() => {
    createUser()
    const getCombination = async () => {
      try {
        const game = await axios.get('/api/games')
        if (game) {
          dispatch({
            type: ActionType.START_GAME,
            game: game.data.data,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    getCombination()
  }, [dispatch])

  return (
    <div className="start">
      <h1>Velkommen til Master Mind</h1>
      <ul>
        <li>
          Spillet går ut på at den ene spilleren bruker fargene for å sette opp
          en skjult kombinasjon (kode) som den andre spilleren skal finne.
        </li>
        <li>
          Etter hver runde får spilleren et antall små sorte og hvite pinner ved
          siden av kombinasjonen. Pinnene viser hvor mange brikker som er av
          riktig farge og på riktig plass (sorte pinner), og hvor mange brikker
          som er av riktig farge, men er feil plass (hvite pinner).
        </li>
        <li>NB: Det er kun lov å bruke en av hver farge</li>
        <li>
          Det er selvsagt om å gjøre å gjette koden ved å bruke færrest mulig
          forsøk.
        </li>
      </ul>
    </div>
  )
}

export default Start
