import { useStepContext } from '@/contexts/step-context'
import useRow from '@/hooks/useRow'

const Solution = () => {
  const { state } = useRow()
  const { updateStep } = useStepContext()

  const resultMessage = state.foundCombination
    ? 'Du fant rett kombinasjon. Start et nytt spill.'
    : 'Du fant ikke rett kombinasjon, prøv igjen.'

  return (
    <>
      <h2>{resultMessage}</h2>
      <div>
        <p>Du brukte {state.currentRow + 1} forsøk</p>
        <p>Kombinasjonen var {JSON.stringify(state.game.combination)}</p>
        <button type="button" onClick={() => updateStep(0)}>
          Start nytt spill
        </button>
      </div>
    </>
  )
}

export default Solution
