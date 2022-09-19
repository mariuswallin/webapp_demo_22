import { describe, expect, it } from 'vitest'

import { createCell, createRow, createRows } from '@/lib/utils'

describe('Board', () => {
  describe('Creating cells', () => {
    it('should have 4 cells given 4 as argument', () => {
      const cells = createCell(4)

      expect(cells.length).toBe(4)
      expect(cells[0].name).toBe('cell-0')
      expect(cells[1].name).toBe('cell-1')
      expect(cells[2].name).toBe('cell-2')
      expect(cells[3].name).toBe('cell-3')
    })
  })

  describe('Creating row', () => {
    it('should have a list of 4 cells given 4 as argument', () => {
      const row = createRow(4)

      expect(row.cells.length).toBe(4)
    })
  })

  describe('Creating rows', () => {
    it('should have one row with 4 cells given 1 as argument', () => {
      const rows = createRows(1)

      expect(rows.length).toBe(1)
      expect(rows[0].name).toBe('row-0')
      expect(rows[0].cells.length).toBe(4)
    })

    it('should have 10 rows with 4 cells given 10 as argument', () => {
      const rows = createRows(10)

      expect(rows.length).toBe(10)
      expect(rows[9].name).toBe('row-9')
      expect(rows[9].cells.length).toBe(4)
    })
  })
})
