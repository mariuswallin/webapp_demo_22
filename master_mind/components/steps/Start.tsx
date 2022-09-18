import { useState, useEffect } from 'react'

import axios from 'axios'

import { useGameContext, ActionType } from '@/contexts/game-context'
import { useStepContext } from '@/contexts/step-context'
import { getUserFromCookie } from '@/lib/utils/api'

import GameForm from '../game/GameForm'

const Start = () => {
  const [state, dispatch] = useGameContext()
  const { updateStep } = useStepContext()
  const [player, setPlayer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isLoading = loading
  const isError = !isLoading && Boolean(error)

  useEffect(() => {
    getUserFromCookie()
      .then((user) => {
        if (user) {
          setPlayer(user)
        }
      })
      .catch((err) => setError(err))
  }, [])

  const handleSubmit = async (rows: number) => {
    setLoading(true)

    setTimeout(async () => {
      try {
        if (player !== state.game.user) {
          await axios.post('/api/users', {
            data: { user: player },
          })
        }
        const game = await axios.post('/api/games', {
          data: { rows },
        })
        if (game && player) {
          setLoading(false)
          dispatch({
            type: ActionType.START_GAME,
            game: game.data.data,
          })
          updateStep(1)
        }
      } catch (error: any) {
        setLoading(false)
        setError(error?.response?.data?.error || error?.message)
      }
    }, 300)
  }

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
        <GameForm
          handleSubmit={handleSubmit}
          player={player}
          setPlayer={setPlayer}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </ul>
    </div>
  )
}

export default Start
