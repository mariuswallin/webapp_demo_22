import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

import type { Response, User } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<User>>
) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      const user = req.body.data.user

      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'Username is missing',
        })
      }

      setCookie({ res }, 'user', user, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      res.status(200).json({
        success: true,
        data: {
          id: '1',
          user,
        },
      })
    default:
      res.status(405).end()
  }
}
