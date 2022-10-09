import { useEffect, useState } from 'react'
import { Place } from '../types'

type FormData = { name: string; email: string; currentLocation?: Place }

type FormProps = {
  handleSubmit: ({ name, email }: FormData) => void
  currentLocation?: Place
}

const isValid = ({ name, email, currentLocation }: FormData) => {
  return name && name.length > 2 && email.includes('@') && currentLocation
}

export default function Form({ handleSubmit, currentLocation }: FormProps) {
  const [data, setData] = useState({ email: '', name: '', currentLocation })
  const [error, setError] = useState('')
  const [isDirty, setDirty] = useState(false)

  useEffect(() => {
    if (!isValid(data) && isDirty) {
      setError('Navn og / eller e-post er ikke gyldig')
    } else {
      setError('')
    }
  }, [data, isDirty])

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target?.id
    if (id && Object.keys(data).includes(id)) {
      setDirty(true)
      setData((prev) => ({ ...prev, [id]: event.target.value }))
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isValid(data)) {
      handleSubmit(data)
    }
  }

  return (
    <form className="comment" onSubmit={handleFormSubmit}>
      <label htmlFor="name">
        <input
          id="name"
          data-testid="name"
          type="text"
          placeholder="Navn"
          onChange={handleData}
          value={data.name}
        />
      </label>
      <label htmlFor="email">
        <input
          id="email"
          data-testid="email"
          type="text"
          placeholder="Email"
          onChange={handleData}
          value={data.email}
        />
      </label>
      {currentLocation ? (
        <input
          id="place"
          data-testid="place"
          disabled
          type="text"
          value={currentLocation}
        />
      ) : null}
      {error ? (
        <span className="error" data-testid="error">
          Noe gikk galt
        </span>
      ) : null}
      <button disabled={!isValid(data)}>Send</button>
    </form>
  )
}
