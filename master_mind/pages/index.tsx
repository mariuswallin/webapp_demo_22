import type { NextPage } from 'next'

import { useStepContext } from '@/contexts/step-context'

const Home: NextPage = () => {
  const { step, steps } = useStepContext()

  return <main>{steps?.[step]?.component}</main>
}

export default Home
