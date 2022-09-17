import { NextApiRequest, NextApiResponse } from 'next'

import { createRows } from '@/lib/utils'
import { getUserFromCookie } from '@/lib/utils/api'
import type { Response } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      const user = await getUserFromCookie({ req })

      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'User is missing',
        })
      }

      res.status(200).json({
        success: true,
        data: {
          id: '1',
          user,
          combination: ['red', 'green', 'blue', 'gray'],
          rows: createRows(10),
        },
      })
    default:
      res.status(405).end()
  }
}
