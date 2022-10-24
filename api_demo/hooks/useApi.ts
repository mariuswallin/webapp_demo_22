import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiHandler, Data, Error, Response } from '../types'

type Status = 'loading' | 'idle' | 'error' | 'success'

// TODO: RunInitiallY

function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export default function useApi<T>({
  cb,
  renderOnMount = false,
}: {
  cb?: () => Promise<Response<T>>
  renderOnMount?: boolean
}) {
  const isFirst = useIsFirstRender()
  const cbRef = useRef(cb)

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<Error>()
  const [data, setData] = useState<T>()

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const isFetching = renderOnMount && status === 'loading'

  const run = useCallback(async (fetcher: ApiHandler<T>, inputData: any) => {
    setStatus('loading')
    try {
      const result = (await fetcher(inputData)) as unknown as Data<T>
      setData(result?.data)
      setStatus('success')
      return result
    } catch (error) {
      setError(error as Error)
      setStatus('error')
      setTimeout(() => {
        setStatus('idle')
      }, 1500)
    }
  }, [])

  // TODO: Not handling errors
  useEffect(() => {
    if (isFirst && renderOnMount && cbRef.current) {
      run(cbRef.current, null)
    }
  }, [run, isFirst, renderOnMount])

  return {
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
    run,
    data,
  }
}
