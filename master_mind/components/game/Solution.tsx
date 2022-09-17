import useRow from '@/hooks/useRow'

const Solution = () => {
  const { state } = useRow()

  const resultMessage = state.foundCombination
    ? 'Du fant rett kombinasjon. Start et nytt spill.'
    : 'Du fant ikke rett kombinasjon, prøv igjen.'

  return (
    <>
      <h2>{resultMessage}</h2>
      <div>
        <p>Du brukte {state.currentRow + 1} forsøk</p>
        <p>Kombinasjonen var {JSON.stringify(state.game.combination)}</p>
      </div>
    </>
  )
}

export default Solution
