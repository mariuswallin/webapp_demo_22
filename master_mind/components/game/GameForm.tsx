import { useState } from 'react'

type GameFormProps = {
  handleSubmit: (rows: number) => void
  isLoading: boolean
  isError: boolean
  player: string
  setPlayer: (player: string) => void
  error: string
}

export default function GameForm({
  handleSubmit,
  isLoading,
  isError,
  player,
  setPlayer,
  error,
}: GameFormProps) {
  const [rows, setRows] = useState(0)

  const handleStartGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(rows)
  }

  if (isLoading) {
    return <p data-testid="loading">Laster...</p>
  }

  return (
    <form
      data-testid="game-form"
      className="game-form"
      onSubmit={handleStartGame}
    >
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
      {isError ? <p data-testid="error">{error}</p> : null}
    </form>
  )
}
