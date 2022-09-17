import { useState } from 'react'

import { Step } from 'types'

export default function useStep(defaultData?: { initialSteps: Step }) {
  const [step, setStep] = useState(0)

  const [steps, setSteps] = useState(defaultData?.initialSteps)

  const updateStep = (step: number) => {
    setStep(step)
  }

  return { step, updateStep, steps, setSteps }
}
