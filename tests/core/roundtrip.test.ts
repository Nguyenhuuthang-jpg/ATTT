import { describe, it, expect } from 'vitest'
import { caesarEncrypt, caesarDecrypt } from '../../src/core/caesar'
import { substitutionEncrypt, substitutionDecrypt, randomSubstitutionKey } from '../../src/core/substitution'

function seededRandom(seed: number) {
  let s = seed
  return function() {
    s = Math.sin(s) * 10000
    return s - Math.floor(s)
  }
}

function generateRandomString(seed: number, length: number): string {
  const rand = seededRandom(seed)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !@#$%^&*()'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(rand() * chars.length))
  }
  return result
}

describe('Roundtrip tests', () => {
  it('Caesar Cipher roundtrip', () => {
    for (let i = 1; i <= 100; i++) {
      const text = generateRandomString(i, 50)
      const key = i % 26
      const encrypted = caesarEncrypt(text, key)
      const decrypted = caesarDecrypt(encrypted, key)
      expect(decrypted).toBe(text)
    }
  })

  it('Substitution Cipher roundtrip', () => {
    for (let i = 1; i <= 100; i++) {
      const text = generateRandomString(i, 50)
      const key = randomSubstitutionKey(i)
      const encrypted = substitutionEncrypt(text, key)
      const decrypted = substitutionDecrypt(encrypted, key)
      expect(decrypted).toBe(text)
    }
  })
})
