import { useState } from 'react'

import type { Step } from 'types'

export function useStep(options: { initialSteps: Step[] }) {
  if (!options?.initialSteps) {
    throw new Error('No steps added')
  }

  const [step, setStep] = useState(0)

  const [steps, setSteps] = useState(options.initialSteps)

  const updateStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setStep(step)
    }
  }

  return { step, updateStep, steps, setSteps }
}
