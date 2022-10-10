// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const polls = [{ id: '1', title: 'Test' }]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return res
        .status(200)
        .json({
          status: true,
          data: { method: req.method, resource: '/polls/index', polls },
        })
    case 'post':
      const postInput = req.body
      polls.push(postInput)
      return res.status(201).json({
        status: true,
        data: { method: req.method, resource: '/polls/index', polls },
      })
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
