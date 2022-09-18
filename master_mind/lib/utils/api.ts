import { faker } from '@faker-js/faker'
import { NextPageContext, NextApiRequest } from 'next'
import { parseCookies, setCookie } from 'nookies'

export const getUserFromCookie = async (
  ctx?:
    | Pick<NextPageContext, 'req'>
    | {
        req: NextApiRequest
      }
): Promise<string | null> => {
  const req = ctx?.req

  const cookie = parseCookies({ req })

  if (cookie?.user) return cookie.user as string

  return null
}

export function setUserCookie(username: string) {
  setCookie(null, 'user', username, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

const createRandomUser = () => {
  return faker.name.firstName().toLowerCase()
}

export const createUser = () => {
  const user = getUserFromCookie()
  if (user) return user
  setUserCookie(createRandomUser())
}
