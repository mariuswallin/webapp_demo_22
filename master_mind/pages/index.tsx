import { useState } from 'react'

import type { NextPage } from 'next'

import Stepper from '@/components/game/Stepper'
import Game from '@/components/steps/Game'
import Start from '@/components/steps/Start'
import { Step as StepType } from 'types'

const steps: StepType[] = [
  { name: 'Start', component: <Start /> },
  { name: 'Spill', component: <Game /> },
]

const Home: NextPage = () => {
  const [step, setStep] = useState(0)

  return (
    <main>
      {steps[step]?.component}
      {step + 1 < steps.length ? (
        <Stepper step={step} setStep={setStep} steps={steps} />
      ) : null}
    </main>
  )
}

export default Home
