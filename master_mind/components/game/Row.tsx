import { Row, Cell as CellType } from 'types'

import Cell from './Cell'

type RowProps = Row & { handleCellClick: (cellName: CellType['name']) => void }

const Row = ({ number: rowNumber, cells, handleCellClick }: RowProps) => {
  return (
    <div className="row">
      <p>{rowNumber + 1}</p>
      <div className="cells">
        {cells?.map((cell) => (
          <Cell
            key={cell?.name}
            cellName={cell?.name}
            background={cell?.background ?? 'transparent'}
            handleCellClick={handleCellClick}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
