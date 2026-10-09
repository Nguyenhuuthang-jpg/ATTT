/**
 * Kiểm tra hiệu năng (Performance Benchmarks)
 * 
 * Theo đặc tả:
 * - Mã hóa 10.000 ký tự: dưới 50 ms
 * - Vét cạn 25 khóa trên 1.000 ký tự: dưới 100 ms
 */
import { describe, it, expect } from 'vitest';
import { caesarEncrypt } from '../../src/core/caesar';
import { bruteForceCaesar } from '../../src/core/caesar';
import { substitutionEncrypt, randomSubstitutionKey } from '../../src/core/substitution';

describe('Hiệu năng (Performance)', () => {
  // Tạo chuỗi ngẫu nhiên 10.000 ký tự
  const longText = Array.from({ length: 10000 }, (_, i) => {
    const code = (i % 52);
    if (code < 26) return String.fromCharCode(65 + code);  // A-Z
    return String.fromCharCode(97 + code - 26);             // a-z
  }).join('');

  // Tạo chuỗi 1.000 ký tự cho vét cạn
  const mediumText = longText.slice(0, 1000);

  it('Mã hóa Caesar 10.000 ký tự dưới 50 ms', () => {
    const start = performance.now();
    caesarEncrypt(longText, 13);
    const elapsed = performance.now() - start;
    
    console.log(`Caesar encrypt 10.000 chars: ${elapsed.toFixed(2)} ms`);
    expect(elapsed).toBeLessThan(50);
  });

  it('Mã hóa thay thế 10.000 ký tự dưới 50 ms', () => {
    const key = randomSubstitutionKey(42);
    const start = performance.now();
    substitutionEncrypt(longText, key);
    const elapsed = performance.now() - start;
    
    console.log(`Substitution encrypt 10.000 chars: ${elapsed.toFixed(2)} ms`);
    expect(elapsed).toBeLessThan(50);
  });

  it('Vét cạn 25 khóa trên 1.000 ký tự dưới 100 ms', () => {
    const cipher = caesarEncrypt(mediumText, 7);
    const start = performance.now();
    const results = bruteForceCaesar(cipher);
    const elapsed = performance.now() - start;
    
    console.log(`Brute force 1.000 chars: ${elapsed.toFixed(2)} ms`);
    expect(results).toHaveLength(25);
    expect(elapsed).toBeLessThan(100);
  });
});
