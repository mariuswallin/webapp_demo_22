import { expect } from 'vitest'

import useRow from '@/hooks/useRow'

import '@testing-library/jest-dom'

describe('useRow hook', () => {
  it('should fail when using hook outside of context', () => {
    expect(() => {
      useRow()
    }).toThrow('useGameContext must be used within a GameProvider')
  })
})
