import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return res.status(200).json({})
    case 'post':
      return res.status(201).json({})
    default:
      return res.status(400).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}
