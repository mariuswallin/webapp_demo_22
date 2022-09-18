import { useState, useEffect, FormEvent } from 'react'

import axios from 'axios'

import { useGameContext, ActionType } from '@/contexts/game-context'
import { useStepContext } from '@/contexts/step-context'
import { getUserFromCookie } from '@/lib/utils/api'

export default function GameForm() {
  const [state, dispatch] = useGameContext()
  const { updateStep } = useStepContext()
  const [rows, setRows] = useState(0)
  const [player, setPlayer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isLoading = loading
  const isError = !isLoading && error

  useEffect(() => {
    getUserFromCookie()
      .then((user) => {
        if (user) {
          setPlayer(user)
        }
      })
      .catch((err) => setError(err))
  }, [])

  const handleStartGame = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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

  if (isLoading) {
    return <p>Laster...</p>
  }

  return (
    <form className="game-form" onSubmit={handleStartGame}>
      <label htmlFor="user">
        <span>Spiller</span>
        <input
          id="user"
          type="text"
          onChange={(event) => setPlayer(event.target.value)}
          value={player}
        />
      </label>
      <label htmlFor="rows">
        <span>Antall rader</span>
        <input
          id="rows"
          type="number"
          onChange={(event) => setRows(Number(event.target.value))}
          value={rows}
        />
      </label>
      <button>Start spillet</button>
      {isError ? <p>{error}</p> : null}
    </form>
  )
}
