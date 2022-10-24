import Link from 'next/link'
import { title } from 'process'
import { useState } from 'react'
import { createPoll } from '../../api/polls'

export default function PollCreate() {
  const [status, setStatus] = useState('idle')
  const [title, setTitle] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setStatus('loading')
    try {
      const result = await createPoll({ title })
      setStatus('success')
      setData(result)
    } catch (error) {
      setStatus('error')
      setError(error as any)
      setTimeout(() => {
        setStatus('idle')
      }, 2000)
    }
  }

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <div className="wrapper">
      <h1>Polls</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {JSON.stringify(error)}</p>
      {data?.data?.id}
      <Link href={`/polls/${data.data.id}`}>Gå til poll</Link>
    </div>
  )
}
