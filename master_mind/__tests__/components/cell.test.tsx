import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import '@testing-library/jest-dom'

import Cell from '@/components/game/Cell'

describe('Cell component', () => {
  // beforeEach(() => {
  //   render(
  //     <Cell
  //       cellName="cell-1"
  //       background="transparent"
  //       handleCellClick={handleCellClick}
  //     />
  //   )
  // })
  it('should render cell button if handleClick is provided', () => {
    const handleCellClick = vi.fn()

    render(
      <Cell
        cellName="cell-1"
        background="transparent"
        handleCellClick={handleCellClick}
      />
    )

    const button = screen.queryByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should render handle cell button click', async () => {
    const handleCellClick = vi.fn()

    render(
      <Cell
        cellName="cell-1"
        background="transparent"
        handleCellClick={handleCellClick}
      />
    )

    const button = await screen.findByRole('button')
    await user.click(button)
    expect(handleCellClick).toBeCalledTimes(1)
  })

  it('should not render cell button if handleClick is not provided', () => {
    render(
      <Cell
        cellName="cell-1"
        background="transparent"
        handleCellClick={null as any}
      />
    )

    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })
})
