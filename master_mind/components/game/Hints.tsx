import { fillArray } from '@/lib/utils'
import { Hints as HintType } from 'types'

type HintProps = {
  hint: HintType
}

const createHint = (hint: HintType) => {
  const hintResult = []

  if (Number(hint?.colors) > 0) {
    hintResult.push(
      ...fillArray('color', hint.colors).map((hint) => ({
        name: hint.name,
        type: 'color',
      }))
    )
  }

  if (Number(hint?.positions) > 0) {
    hintResult.push(
      ...fillArray('position', hint.positions).map((hint) => ({
        name: hint.name,
        type: 'position',
      }))
    )
  }

  if (Number(hint?.pegs) > 0) {
    hintResult.push(
      ...fillArray('peg', hint.pegs).map((hint) => ({
        name: hint.name,
        type: 'peg',
      }))
    )
  }

  console.log(hintResult)
  return hintResult
}

const Hint = ({ hint }: HintProps) => {
  const createdHint = createHint(hint)
  return (
    <div className="pegs">
      {createdHint.map(({ type, name }) => (
        <div
          key={name}
          className="peg"
          style={{
            backgroundColor:
              type === 'position'
                ? 'black'
                : type === 'color'
                ? 'grey'
                : 'transparent',
          }}
        ></div>
      ))}
    </div>
  )
}

export default Hint
