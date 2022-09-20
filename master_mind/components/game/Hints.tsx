import { Hint as HintType } from 'types'

type HintsProps = {
  hints: HintType[]
}

const hintColor = (type: string) => {
  switch (type) {
    case 'positions':
      return 'black'
    case 'colors':
      return 'grey'
    default:
      return 'transparent'
  }
}

const Hint = ({ hints }: HintsProps) => {
  return (
    <div className="pegs">
      {hints.map(({ type, name }) => (
        <div
          key={name}
          className="peg"
          style={{
            backgroundColor: hintColor(type),
          }}
        ></div>
      ))}
    </div>
  )
}

export default Hint
