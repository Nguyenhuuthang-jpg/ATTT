import { describe, it, expect } from 'vitest'
import { letterFrequency, indexOfCoincidence, suggestMapping } from '../../src/core/frequency'
import { chiSquared } from '../../src/core/scoring'

describe('Frequency Analysis', () => {
  it('letterFrequency("HELLO")', () => {
    const freqs = letterFrequency('HELLO')
    const l = freqs.find(f => f.letter === 'L')
    expect(l?.count).toBe(2)
    expect(l?.percent).toBe(40)
    
    const h = freqs.find(f => f.letter === 'H')
    expect(h?.count).toBe(1)
    expect(h?.percent).toBe(20)
  })

  it('indexOfCoincidence("AAAA") === 1', () => {
    expect(indexOfCoincidence('AAAA')).toBe(1)
  })

  it('chiSquared("") === Infinity', () => {
    expect(chiSquared('')).toBe(Infinity)
  })

  it('letterFrequency returns 26 elements', () => {
    expect(letterFrequency('ABC').length).toBe(26)
  })

  it('indexOfCoincidence of 1 char returns 0', () => {
    expect(indexOfCoincidence('A')).toBe(0)
  })

  it('suggestMapping returns a Record', () => {
    const mapping = suggestMapping('TEST')
    expect(typeof mapping).toBe('object')
    expect(mapping).not.toBeNull()
  })
})
