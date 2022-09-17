/* eslint-disable no-ternary */
import { Row } from 'types'

import Cell from './Cell'
import Hints from './Hints'

type SolutionProps = {
  row: Row
  foundCombination: boolean
}

// TODO: Kan bruke useRow
// Kan da fjerne Cell og hints og velge selv hvordan vise frem
// Kan da fjerne foundCombination da den kan vi hente ut basert på antall forsøk og antall steg
const Solution = ({ row, foundCombination }: SolutionProps) => {
  return (
    <>
      <h2>
        {foundCombination
          ? 'Du fant riktig kombinasjon'
          : 'Du fant ikke rett kombinasjon, prøv igjen'}
      </h2>
      <div className="row">
        <p>{row.number + 1}</p>
        <div className="cells">
          {row?.cells?.map((cell) => (
            <Cell
              key={cell?.name}
              cellName={cell?.name}
              background={cell?.background ?? 'transparent'}
            />
          ))}
        </div>
        <div className="pegs">
          <Hints hints={row?.hints ?? null} />
        </div>
      </div>
    </>
  )
}

export default Solution
