import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

import GameForm from '@/components/game/GameForm'

const setPlayer = vi.fn()
const handleSubmit = vi.fn()

describe('GameForm', () => {
  it('should render form', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={false}
        player="player"
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const form = await screen.findByTestId('game-form')
    expect(form).toBeInTheDocument()
  })
  it('should render loading screen', async () => {
    render(
      <GameForm
        isLoading={true}
        isError={false}
        player="player"
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const form = await screen.queryByTestId('game-form')
    const loadingText = await screen.findByTestId('loading')
    expect(form).not.toBeInTheDocument()
    expect(loadingText).toBeInTheDocument()
  })
  it('should handle submit', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={false}
        player="player"
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const button = await screen.findByRole('button')
    await userEvent.click(button)
    expect(handleSubmit).toBeCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith(0)
  })
  it('should show player name initially', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={false}
        player="player"
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const playerInput = await screen.findByLabelText(/spiller/i)
    //await userEvent.click(button)
    expect(playerInput).toBeInTheDocument()
    expect((playerInput as HTMLInputElement).value).toBe('player')
  })
  it('should trigger player handler', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={false}
        player=""
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const playerInput = await screen.findByLabelText(/spiller/i)
    await userEvent.type(playerInput, 's')
    expect(setPlayer).toBeCalledTimes(1)
    expect(setPlayer).toHaveBeenCalledWith('s')
  })
  it('should update rows', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={false}
        player=""
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const rowsInput = await screen.findByLabelText(/rader/i)
    await userEvent.type(rowsInput, '5')
    expect((rowsInput as HTMLInputElement).value).toBe('5')
  })
  it('should submit with updated rows count', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={false}
        player=""
        error=""
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const rowsInput = await screen.findByLabelText(/rader/i)
    const button = await screen.findByRole('button')
    await userEvent.type(rowsInput, '5')
    expect((rowsInput as HTMLInputElement).value).toBe('5')
    await userEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledWith(5)
  })
  it('should show form error', async () => {
    render(
      <GameForm
        isLoading={false}
        isError={true}
        player=""
        error="Error"
        setPlayer={setPlayer}
        handleSubmit={handleSubmit}
      />
    )
    const error = await screen.findByTestId('error')
    expect(error).toBeInTheDocument()
    expect(error.textContent).toBe('Error')
  })
})
