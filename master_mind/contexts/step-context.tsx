import { createContext, useContext } from 'react'

import useStep from '@/hooks/useStep'
import { Step } from 'types'

export type StepState = {
  steps: Step[]
  step: number
  setStep: (step: number) => void
  setSteps: () => void
}

const initialState: StepState = {
  step: 0,
  steps: [],
  setSteps: () => {},
  setStep: () => {},
}

const StepContext = createContext(initialState)

export default function StepProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { setSteps, step, steps, updateStep } = useStep()

  return (
    <StepContext.Provider value={{ step, steps, setSteps, updateStep }}>
      {children}
    </StepContext.Provider>
  )
}

export const useStepContext = () => {
  const context = useContext(StepContext)
  if (context === undefined) {
    throw new Error('StepContext must be used inside StepProvider')
  }
  return context
}
