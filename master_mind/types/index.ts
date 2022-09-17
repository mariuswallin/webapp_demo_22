export type Color =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'cyan'
  | 'gray'

export type Game = {
  id: string
  combination: Color[]
  rows: Row[]
  user: string
}

export type Data<T> = {
  success: boolean
  data: Record<keyof T, T[keyof T]>
}

export type Error = {
  success: boolean
  error: string
}

export type Response = Data<Game> | Error

export type Cell = {
  name: `cell-${number}`
  background: Color | 'transparent'
}

export type FillArray<T extends string> = { name: `${T}-${number}` }[]

export type Row = {
  cells: Cell[]
  number: number
  name?: `row-${number}`
}

export type Hints = {
  positions: number
  colors: number
  pegs: number
}

export type Step = { name: 'Start' | 'Spill'; component: JSX.Element }
