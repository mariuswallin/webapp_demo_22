import { FormEvent, useState } from 'react'

import axios from 'axios'

import { ActionType, useGameContext } from '@/contexts/game-context'
import { useStepContext } from '@/contexts/step-context'
import { createUser } from '@/lib/utils/api'

const Start = () => {
  const [, dispatch] = useGameContext()
  const { updateStep } = useStepContext()
  const [rows, setRows] = useState(0)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createUser()
    try {
      const game = await axios.post('/api/games', {
        data: { rows },
      })
      if (game) {
        dispatch({
          type: ActionType.START_GAME,
          game: game.data.data,
        })
      }
      updateStep(1)
    } catch (error) {
      console.log(error)
    }
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
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            onChange={(event) => setRows(Number(event.target.value))}
          />
          <button>Start spillet</button>
        </form>
      </ul>
    </div>
  )
}

export default Start
