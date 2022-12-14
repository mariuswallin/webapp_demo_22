import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getPolls } from '../../api/polls'

export default function Polls() {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState({})
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  useEffect(() => {
    const handler = async () => {
      setStatus('loading')
      try {
        const result = await getPolls({})
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
    handler()
  }, [])

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <div className="wrapper">
      <h1>Polls</h1>
      <Link href="/polls/new">
        <a className="link create">Lag ny poll</a>
      </Link>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {JSON.stringify(error)}</p>
    </div>
  )
}
