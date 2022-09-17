import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import Cell from '@/components/game/Cell'

describe('Cell component', () => {
  beforeEach(() => {
    render(<Cell />)
  })
  it('should render cell component', () => {
    expect(true).toBe(true)
  })
})
