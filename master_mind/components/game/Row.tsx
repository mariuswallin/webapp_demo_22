import useRow from '@/hooks/useRow'
import { Row as RowType } from 'types'

import Cell from './Cell'

const Row = ({ row }: { row: RowType }) => {
  const { handleCellClick } = useRow()

  return (
    <div className="row-inner-wrapper">
      <div className="row">
        <p>{row?.number + 1}</p>
        <div className="cells">
          {row?.cells?.map((cell) => (
            <Cell
              key={cell?.name}
              cellName={cell?.name}
              background={cell?.background}
              handleCellClick={handleCellClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Row
