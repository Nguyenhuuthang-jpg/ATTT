import { describe, it, expect } from 'vitest'
import { caesarEncrypt, caesarDecrypt, bruteForceCaesar } from '../../src/core/caesar'

describe('Caesar Cipher', () => {
  it('caesarEncrypt("HELLO", 3) === "KHOOR"', () => {
    expect(caesarEncrypt('HELLO', 3)).toBe('KHOOR')
  })

  it('caesarEncrypt("Attack at dawn!", 13) === "Nggnpx ng qnja!"', () => {
    expect(caesarEncrypt('Attack at dawn!', 13)).toBe('Nggnpx ng qnja!')
  })

  it('caesarDecrypt("KHOOR", 3) === "HELLO"', () => {
    expect(caesarDecrypt('KHOOR', 3)).toBe('HELLO')
  })

  it('caesarEncrypt("abc XYZ", 29) === "def ABC"', () => {
    expect(caesarEncrypt('abc XYZ', 29)).toBe('def ABC')
  })

  it('bruteForceCaesar finds the correct plaintext', () => {
    const results = bruteForceCaesar('Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj')
    const match = results.find(r => r.key === 3)
    expect(match).toBeDefined()
    expect(match?.plaintext).toBe('The quick brown fox jumps over the lazy dog')
  })

  it('preserves non-letter characters', () => {
    expect(caesarEncrypt('123 !@#', 5)).toBe('123 !@#')
  })

  it('preserves case', () => {
    expect(caesarEncrypt('HeLlo', 1)).toBe('IfMmp')
  })

  it('k=0 returns same text', () => {
    expect(caesarEncrypt('HELLO', 0)).toBe('HELLO')
  })

  it('k=26 returns same text', () => {
    expect(caesarEncrypt('HELLO', 26)).toBe('HELLO')
  })
})
