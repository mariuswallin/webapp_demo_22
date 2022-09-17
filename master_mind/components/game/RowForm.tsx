import useRow from '@/hooks/useRow'
import { Row as RowType } from 'types'

import ColorPicker from './ColorPicker'
import Row from './Row'

export default function RowForm({ row }: { row: RowType }) {
  const { state, handleRowSubmit, handleSelectedColor } = useRow()

  return (
    <>
      <form onSubmit={handleRowSubmit}>
        <Row row={row} />
        <button
          disabled={state.selectedColors.filter(Boolean).length !== 4}
          type="submit"
        >
          Send
        </button>
      </form>
      <ColorPicker
        colors={state?.remaningColors}
        selectedColor={state?.currentColor}
        handleSelectedColor={handleSelectedColor}
      />
    </>
  )
}
