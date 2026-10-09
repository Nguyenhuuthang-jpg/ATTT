import { describe, it, expect } from 'vitest'
import { substitutionEncrypt, substitutionDecrypt, validateSubstitutionKey, randomSubstitutionKey } from '../../src/core/substitution'

describe('Substitution Cipher', () => {
  it('substitutionEncrypt("HELLO", "QWERTYUIOPASDFGHJKLZXCVBNM") === "ITSSG"', () => {
    expect(substitutionEncrypt('HELLO', 'QWERTYUIOPASDFGHJKLZXCVBNM')).toBe('ITSSG')
  })

  it('substitutionEncrypt("ATTACK", "QWERTYUIOPASDFGHJKLZXCVBNM") === "QZZQEA"', () => {
    expect(substitutionEncrypt('ATTACK', 'QWERTYUIOPASDFGHJKLZXCVBNM')).toBe('QZZQEA')
  })

  it('substitutionDecrypt("ITSSG", "QWERTYUIOPASDFGHJKLZXCVBNM") === "HELLO"', () => {
    expect(substitutionDecrypt('ITSSG', 'QWERTYUIOPASDFGHJKLZXCVBNM')).toBe('HELLO')
  })

  it('validateSubstitutionKey("ABC") is invalid for wrong length', () => {
    const res = validateSubstitutionKey('ABC')
    expect(res.valid).toBe(false)
    expect(res.error).toMatch(/26|length|count/i)
  })

  it('validateSubstitutionKey("QQERTYUIOPASDFGHJKLZXCVBNM") is invalid for duplicates', () => {
    const res = validateSubstitutionKey('QQERTYUIOPASDFGHJKLZXCVBNM')
    expect(res.valid).toBe(false)
    expect(res.error).toMatch(/duplicate|Q/i)
  })

  it('valid key returns { valid: true }', () => {
    expect(validateSubstitutionKey('QWERTYUIOPASDFGHJKLZXCVBNM').valid).toBe(true)
  })

  it('randomSubstitutionKey with same seed returns same key', () => {
    const key1 = randomSubstitutionKey(123)
    const key2 = randomSubstitutionKey(123)
    expect(key1).toBe(key2)
  })

  it('throws on invalid key during encryption', () => {
    expect(() => substitutionEncrypt('HELLO', 'INVALID')).toThrow()
  })
})
