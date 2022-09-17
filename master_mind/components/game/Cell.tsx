import { Cell as CellType } from 'types'

type CellProps = {
  cellName: CellType['name']
  background: string
  handleCellClick?: (name: CellType['name']) => void
}

const Cell = ({ cellName, background, handleCellClick }: CellProps) => {
  return (
    <div className="cell">
      {handleCellClick ? (
        <button
          className="cellButton"
          type="button"
          style={{ backgroundColor: background ?? 'transparent' }}
          onClick={() => handleCellClick(cellName)}
        ></button>
      ) : null}
    </div>
  )
}

export default Cell
