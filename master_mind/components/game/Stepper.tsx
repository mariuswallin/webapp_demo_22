import { Step } from 'types'

type StepperProps = {
  steps: Step[]
  step: number
  setStep: (step: number) => void
}

const Stepper = ({ steps, step, setStep }: StepperProps) => {
  return (
    <button
      style={{ marginTop: '2rem' }}
      type="button"
      onClick={() => setStep(step + 1)}
    >
      {steps[step + 1].name}
    </button>
  )
}

export default Stepper
