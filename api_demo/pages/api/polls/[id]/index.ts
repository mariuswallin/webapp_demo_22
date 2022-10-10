import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const id = req.query.id
      return res
        .status(200)
        .json({ status: true, data: { resource: `/polls/${id}/index` } })
    default:
      return res.status(400).json({
        success: false,
        error: {
          type: 'object',
          status: '400',
          message: 'Method not allowed',
        },
      })
  }
}
