import { NextApiRequest, NextApiResponse } from 'next'
import { Response } from '../../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const id =
        req.query.id instanceof Array
          ? req.query.id.find((i) => i.includes('id'))
          : req.query.id

      if (!id)
        return res.status(400).json({ status: false, error: 'Id is missing' })

      // TODO: Get poll by id
      const poll = null
      if (!poll)
        return res.status(404).json({ status: false, error: 'Poll not found' })

      return res.status(200).json({ status: true, data: poll })
    case 'put':
      return res.status(201).json({ status: true, data: {} })
    case 'delete':
      return res.status(204).json({ status: true, data: {} })
    default:
      return res.status(400).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
