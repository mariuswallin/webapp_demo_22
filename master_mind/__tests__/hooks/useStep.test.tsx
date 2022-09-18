import { act, renderHook } from '@testing-library/react'
import { expect, vi } from 'vitest'

import { useStep } from '@/hooks/useStep'

import '@testing-library/jest-dom'

describe('useStep hook', () => {
  it('should exist', () => {
    const component = vi.fn() as unknown as JSX.Element
    const { result } = renderHook(() =>
      useStep({ initialSteps: [{ name: 'Start', component }] })
    )
    expect(result).toBeDefined()
  })

  it('should throw error if no steps is added', () => {
    expect(() =>
      renderHook(() => {
        {
          useStep({} as any)
        }
      })
    ).toThrow('No steps added')
  })
  it('should replace steps if needed', () => {
    const component = vi.fn() as unknown as JSX.Element
    const { result } = renderHook(() =>
      useStep({ initialSteps: [{ name: 'Start', component }] })
    )
    act(() => {
      result.current.setSteps([{ name: 'Spill', component }])
    })

    expect(result.current.steps[0].name).toEqual('Spill')
  })

  it('should have 0 as initial step', () => {
    const component = vi.fn() as unknown as JSX.Element
    const { result } = renderHook(() =>
      useStep({ initialSteps: [{ name: 'Start', component }] })
    )

    expect(result.current.step).toEqual(0)
  })
  it('should not update step if step is more than available steps', async () => {
    const component = vi.fn() as unknown as JSX.Element
    const { result } = renderHook(() =>
      useStep({ initialSteps: [{ name: 'Start', component }] })
    )

    act(() => {
      result.current.updateStep(1)
    })

    expect(result.current.step).toEqual(0)
  })

  it('should not update step if step is less than 0', async () => {
    const component = vi.fn() as unknown as JSX.Element
    const { result } = renderHook(() =>
      useStep({ initialSteps: [{ name: 'Start', component }] })
    )

    act(() => {
      result.current.updateStep(-1)
    })

    expect(result.current.step).toEqual(0)
  })

  it('should update step', async () => {
    const componentOne = vi.fn() as unknown as JSX.Element
    const componentTwo = vi.fn() as unknown as JSX.Element
    const { result } = renderHook(() =>
      useStep({
        initialSteps: [
          { name: 'Start', component: componentOne },
          { name: 'Spill', component: componentTwo },
        ],
      })
    )

    act(() => {
      result.current.updateStep(1)
    })

    expect(result.current.step).toEqual(1)
  })
})
