import useRow from '@/hooks/useRow'

import Hint from '../game/Hints'
import Row from '../game/Row'
import RowForm from '../game/RowForm'
import Solution from '../game/Solution'

const Game = () => {
  const { state, isCurrentRow } = useRow()

  if (!state.game) {
    return <p>Finner ikke noe spill. Gå tilbake til start</p>
  }

  if (state.isComplete) {
    return <Solution />
  }

  return (
    <section>
      <h3>Antall forsøk er {state.game.rows.length}</h3>
      <div className="rows">
        {state.game.rows?.map((row, index) => (
          <div className="row-wrapper" key={row?.name}>
            {state.currentRow >= index ? (
              isCurrentRow(row?.number) ? (
                <RowForm row={row} />
              ) : (
                <>
                  <Row row={row} />
                  <Hint hints={state.hints[row?.number]} />
                </>
              )
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Game
