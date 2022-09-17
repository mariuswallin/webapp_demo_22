import { Cell as CellType } from 'types'

type CellProps = {
  cellName: CellType['name']
  background: string
  handleCellClick: (name: CellType['name']) => void
}

const Cell = ({ cellName, background, handleCellClick }: CellProps) => {
  return (
    <div className="cell">
      <button
        className="cellButton"
        type="button"
        style={{ backgroundColor: background }}
        onClick={() => handleCellClick(cellName)}
      ></button>
    </div>
  )
}

export default Cell
