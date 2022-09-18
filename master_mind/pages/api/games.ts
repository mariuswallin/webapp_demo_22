import { NextApiRequest, NextApiResponse } from 'next'

import { createRows } from '@/lib/utils'
import { getUserFromCookie } from '@/lib/utils/api'
import type { Game, Response } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Game>>
) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      const user = await getUserFromCookie({ req })
      const rowCount = req.body.data.rows

      if (Number.isNaN(rowCount) || rowCount === 0) {
        return res.status(400).json({
          success: false,
          error: 'Missing rowCount',
        })
      }

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
          rows: createRows(rowCount),
        },
      })
    default:
      res.status(405).end()
  }
}
