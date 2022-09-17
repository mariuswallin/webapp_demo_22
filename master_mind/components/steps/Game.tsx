import useRow from '@/hooks/useRow'

import ColorPicker from '../game/ColorPicker'
import Hint from '../game/Hints'
import Row from '../game/Row'
import Solution from '../game/Solution'

const Game = () => {
  const {
    state,
    handleRowSubmit,
    isCurrentRow,
    handleCellClick,
    handleSelectedColor,
  } = useRow()

  if (!state.game) {
    return <p>Finner ikke noe spill. Gå tilbake til start</p>
  }

  return (
    <div className="rows">
      {state?.isComplete ? (
        <Solution
          row={state.game.rows[state.currentRow]}
          foundCombination={state?.foundCombination}
        />
      ) : null}
      {!state?.isComplete &&
        state.game.rows?.map((row, index) => (
          <>
            {state.currentRow >= index ? (
              <div className="row-wrapper" key={row?.name}>
                <form onSubmit={(event) => handleRowSubmit(event, row.number)}>
                  <div
                    style={{
                      pointerEvents: !isCurrentRow(row?.number)
                        ? 'none'
                        : 'auto',
                    }}
                    className="row-inner-wrapper"
                  >
                    <Row
                      number={row.number}
                      cells={row.cells}
                      handleCellClick={handleCellClick}
                    />
                    <Hint hint={state.hints[row.number]} />
                  </div>
                  {isCurrentRow(row?.number) ? (
                    <button
                      disabled={state.selectedColors.length !== 4}
                      type="submit"
                    >
                      Send
                    </button>
                  ) : null}
                </form>
                {isCurrentRow(row?.number) ? (
                  <ColorPicker
                    colors={state?.remaningColors}
                    selectedColor={state?.currentColor}
                    handleSelectedColor={handleSelectedColor}
                  />
                ) : null}
              </div>
            ) : null}
          </>
        ))}
    </div>
  )
}

export default Game
