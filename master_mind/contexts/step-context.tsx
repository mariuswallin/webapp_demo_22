import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import Game from '@/components/steps/Game'
import Start from '@/components/steps/Start'
import { useStep } from '@/hooks/useStep'
import { Step } from 'types'

export type StepState = {
  steps: Step[]
  step: number
  setSteps: Dispatch<SetStateAction<Step[]>>
  updateStep: (step: number) => void
}

const initialState: StepState = {
  step: 0,
  steps: [],
  setSteps: () => {},
  updateStep: () => {},
}

const StepContext = createContext(initialState)

export default function StepProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { setSteps, step, steps, updateStep } = useStep({
    initialSteps: [
      { name: 'Start', component: <Start /> },
      { name: 'Spill', component: <Game /> },
    ],
  })

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
