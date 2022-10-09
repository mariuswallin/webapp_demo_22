import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import Form from '../components/Form'

const handleSubmit = vi.fn()

describe('Form', () => {
  describe('When rendering form', () => {
    // let placeInput: any
    // let nameInput: any
    // let emailInput: any
    // let button: any

    // beforeEach(() => {
    //   render(<Form handleSubmit={handleSubmit} />)
    //   placeInput = screen.queryByTestId('place')
    //   nameInput = screen.queryByTestId('name')
    //   emailInput = screen.queryByTestId('email')
    //   button = screen.queryByRole('button')
    // })

    it('should render form', () => {
      render(<Form handleSubmit={handleSubmit} />)
      const placeInput = screen.queryByTestId('place')
      const nameInput = screen.queryByTestId('name')
      const emailInput = screen.queryByTestId('email')
      const button = screen.queryByRole('button')

      expect(placeInput).not.toBeInTheDocument()
      expect(nameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })
    it('should render form with current location', () => {
      render(
        <Form handleSubmit={handleSubmit} currentLocation={'Fredrikstad'} />
      )

      const placeInput = screen.queryByTestId('place')
      const nameInput = screen.queryByTestId('name')
      const emailInput = screen.queryByTestId('email')
      const button = screen.queryByRole('button')

      expect(placeInput).toBeInTheDocument()
      expect(nameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })
    it('should enable button when valid form', async () => {
      render(<Form handleSubmit={handleSubmit} currentLocation="Fredrikstad" />)
      const nameInput = await screen.findByTestId('name')
      const emailInput = await screen.findByTestId('email')
      const button = await screen.findByRole('button')
      expect(button).toBeDisabled()

      await userEvent.type(emailInput, 'test@test.no')
      await userEvent.type(nameInput, 'marius')
      expect(button).toBeEnabled()
    })
    it.each([
      { email: 'test', name: 'name', currentLocation: 'Oslo' },
      { email: 'test', name: 'n', currentLocation: 'Oslo' },
      { email: 'test@', name: 'n', currentLocation: 'Oslo' },
      { email: 'test@', name: 'name', currentLocation: '' },
    ])(
      'should not enable button when invalid form',
      async ({ email, currentLocation, name }) => {
        render(
          <Form
            handleSubmit={handleSubmit}
            currentLocation={currentLocation as any}
          />
        )
        const nameInput = await screen.findByTestId('name')
        const emailInput = await screen.findByTestId('email')
        const button = await screen.findByRole('button')

        await userEvent.type(emailInput, email)
        await userEvent.type(nameInput, name)
        expect(button).toBeDisabled()
      }
    )
    it.each([
      { email: 'test', name: 'name', currentLocation: 'Oslo' },
      { email: 'test', name: 'n', currentLocation: 'Oslo' },
      { email: 'test@', name: 'n', currentLocation: 'Oslo' },
      { email: 'test@', name: 'name', currentLocation: '' },
    ])(
      'should show error if data %s is invalid and form is dirty',
      async ({ email, name, currentLocation }) => {
        render(
          <Form
            handleSubmit={handleSubmit}
            currentLocation={currentLocation as any}
          />
        )
        const nameInput = await screen.findByTestId('name')
        const emailInput = await screen.findByTestId('email')
        await userEvent.type(emailInput, email)
        await userEvent.type(nameInput, name)
        const error = await screen.findByTestId('error')
        expect(error).toBeInTheDocument()
      }
    )
    it('should remove error if form input becomes valid', async () => {
      render(<Form handleSubmit={handleSubmit} currentLocation={'Oslo'} />)
      const nameInput = await screen.findByTestId('name')
      const emailInput = await screen.findByTestId('email')
      await userEvent.type(emailInput, 'test')
      await userEvent.type(nameInput, 'te')
      const error = await screen.findByTestId('error')
      expect(error).toBeInTheDocument()

      await userEvent.type(emailInput, 'test@test.no')
      await userEvent.type(nameInput, 'name')
      expect(error).not.toBeInTheDocument()
    })
  })

  describe('When submitting form', () => {
    it('should handle submitting form', async () => {
      render(<Form handleSubmit={handleSubmit} currentLocation={'Oslo'} />)

      const emailInput = await screen.findByTestId('email')
      const nameInput = await screen.findByTestId('name')
      const button = await screen.findByRole('button')

      await userEvent.type(emailInput, 'test@test.no')
      await userEvent.type(nameInput, 'name')
      await userEvent.click(button)
      expect(handleSubmit).toBeCalledTimes(1)
      expect(handleSubmit).toHaveBeenCalledWith({
        currentLocation: 'Oslo',
        email: 'test@test.no',
        name: 'name',
      })
    })
  })
})
