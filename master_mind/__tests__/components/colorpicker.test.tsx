import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

import ColorPicker from '@/components/game/ColorPicker'
import { Color } from 'types'

const colors: Color[] = ['red', 'green', 'blue']
const handleSelectedColor = vi.fn()

describe('ColorPicker', () => {
  it('should render color elements', async () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={null}
        handleSelectedColor={handleSelectedColor}
      />
    )

    const listElements = await screen.findAllByTestId('color')
    expect(listElements).toHaveLength(3)
  })
  it('should initially have none disabled buttons', async () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={null}
        handleSelectedColor={handleSelectedColor}
      />
    )

    const buttons = await screen.findAllByRole('button')
    const disabledButtons = (buttons as HTMLButtonElement[]).filter(
      (button) => button.disabled
    )
    expect(buttons).toHaveLength(3)
    expect(disabledButtons).toHaveLength(0)
  })
  it('should handle click on button', async () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={null}
        handleSelectedColor={handleSelectedColor}
      />
    )

    const buttons = await screen.findAllByRole('button')
    const firstButton = buttons[0]
    await userEvent.click(firstButton)
    expect(handleSelectedColor).toHaveBeenCalledTimes(1)
  })
  it('should disabled buttons not selected', async () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={colors[0]}
        handleSelectedColor={handleSelectedColor}
      />
    )

    const buttons = await screen.findAllByRole('button')
    const disabledButtons = (buttons as HTMLButtonElement[]).filter(
      (button) => button.disabled
    )
    expect(disabledButtons).toHaveLength(2)
  })
  it('should not disable selected button', async () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={'red'}
        handleSelectedColor={handleSelectedColor}
      />
    )

    const buttons = await screen.findAllByRole('button')
    const enabledButtons = (buttons as HTMLButtonElement[]).filter(
      (button) => !button.disabled
    )
    expect(enabledButtons).toHaveLength(1)
    expect(enabledButtons[0].style.backgroundColor).toEqual('red')
  })
})
