import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getPoll } from '../../../api/polls'

export default function Poll() {
  const router = useRouter()
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState({})
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  useEffect(() => {
    const pollId = router.query.id
    if (!pollId) return
    const handler = async () => {
      setStatus('loading')
      try {
        const result = await getPoll(pollId)
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
  }, [router.query])

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <div className="wrapper">
      <h1>Poll</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {JSON.stringify(error)}</p>
    </div>
  )
}
