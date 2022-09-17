import { useStepContext } from '@/contexts/step-context'

const Stepper = () => {
  const { step, setSteps, steps, updateStep } = useStepContext()
  return (
    <button
      style={{ marginTop: '2rem' }}
      type="button"
      onClick={() => updateStep(step + 1)}
    >
      {steps[step + 1].name}
    </button>
  )
}

export default Stepper
