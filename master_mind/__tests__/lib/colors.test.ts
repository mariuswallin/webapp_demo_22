import { Color } from '@faker-js/faker/modules/color'
import { describe, expect } from 'vitest'

import { getRemainingColors } from '@/contexts/game-context'

const colors: Color[] = ['red', 'blue', 'green']

describe('Colors util', () => {
  it('should return if no currentColor', () => {
    const result = getRemainingColors(colors, [], null)
    expect(result).toEqual(colors)
  })
})
