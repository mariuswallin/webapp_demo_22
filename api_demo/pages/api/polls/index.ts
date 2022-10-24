import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const polls = await prisma.poll.findMany({
        include: {
          questions: true,
        },
      })
      return res.status(200).json({ status: true, data: polls })
    case 'post':
      const data = req.body
      if (!data.title)
        return res
          .status(400)
          .json({ status: false, error: 'Title is required' })

      const poll = await prisma.poll.create({ data })
      return res.status(201).json({ status: true, data: poll })
    default:
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}
