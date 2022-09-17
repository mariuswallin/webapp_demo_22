import { Hint as HintType } from 'types'

type HintsProps = {
  hints: HintType[]
}

const Hint = ({ hints }: HintsProps) => {
  return (
    <div className="pegs">
      {hints.map(({ type, name }) => (
        <div
          key={name}
          className="peg"
          style={{
            backgroundColor:
              type === 'positions'
                ? 'black'
                : type === 'colors'
                ? 'grey'
                : 'transparent',
          }}
        ></div>
      ))}
    </div>
  )
}

export default Hint
