import type { Cell, FillArray, Peg, Row } from 'types'

export const fillArray = <T extends string>(
  name: string,
  size: number
): FillArray<T> =>
  Array(size)
    .fill(null)
    .map((_, i) => ({ name: `${name as T}-${i}` }))

// export const createCell = (size: number): Cell[] => fillArray<'cell'>('cell', size)

export const createCell = (size: number): Cell[] =>
  Array(size)
    .fill(null)
    .map((_, i) => ({ name: `cell-${i}`, background: 'transparent' }))

export const createPegs = (pegs: number): Peg[] =>
  Array(pegs)
    .fill(null)
    .map((_, i) => ({ name: `peg-${i}` }))

export const createRow = (n = 4) => {
  return {
    pegs: createPegs(n),
    cells: createCell(n),
    hints: null,
  }
}

export const createRows = (rows: number): Row[] =>
  Array(rows)
    .fill(null)
    .map((_, rowIndex) => ({
      number: rowIndex,
      name: `row-${rowIndex}`,
      ...createRow(),
    }))
