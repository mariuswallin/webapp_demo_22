import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'put':
      // TODO: Get id from query
      // TODO: Get poll
      // TODO: Update poll with publish data
      // TODO: Return updated poll
      return res.status(200).json({})
    default:
      return res.status(400).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}
