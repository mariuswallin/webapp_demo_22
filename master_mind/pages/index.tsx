import { useEffect } from 'react'

import type { NextPage } from 'next'

import Game from '@/components/steps/Game'
import Start from '@/components/steps/Start'
import { useStepContext } from '@/contexts/step-context'

const Home: NextPage = () => {
  const { step, steps, setSteps } = useStepContext()

  useEffect(() => {
    setSteps([
      { name: 'Start', component: <Start /> },
      { name: 'Spill', component: <Game /> },
    ])
  }, [])

  return <main>{steps?.[step]?.component}</main>
}

export default Home
