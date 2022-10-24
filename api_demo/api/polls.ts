import fetcher from '../lib/fetch'

const BASE_URL = '/api'
const POLLS_URL = `${BASE_URL}/polls`

export const getPolls = (options: any) => {
  return fetcher(POLLS_URL, {
    method: 'GET',
    ...options,
  })
}

export const getPoll = (id: string, options: any) => {
  return fetcher(`${POLLS_URL}/${id}`, {
    method: 'GET',
    ...options,
  })
}

export const createPoll = (data: any, options: any) => {
  return fetcher(POLLS_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}

export const updatePoll = (id: string, data: any, options: any) => {
  return fetcher(POLLS_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}
