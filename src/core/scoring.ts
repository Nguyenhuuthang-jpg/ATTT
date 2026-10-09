import { charToIndex, isLetter } from './alphabet';
import { ENGLISH_FREQ } from '../data/englishFreq';

/**
 * Tính toán độ đo chi-bình phương (chi-squared) của một đoạn văn bản
 * so với tần suất chữ cái tiếng Anh chuẩn.
 */
export function chiSquared(text: string): number {
  // Khởi tạo mảng đếm tần suất các chữ cái
  const counts: number[] = new Array(26).fill(0);
  let totalLetters = 0;

  // Tính tổng số lượng chữ cái và số lần xuất hiện của mỗi chữ cái
  for (const char of text) {
    if (isLetter(char)) {
      counts[charToIndex(char)]++;
      totalLetters++;
    }
  }

  // Nếu không có chữ cái nào, trả về vô cùng (Infinity)
  if (totalLetters === 0) {
    return Infinity;
  }

  // Tính tổng chi-bình phương
  let chi = 0;
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i);
    // Tính tần suất kỳ vọng (số lượng dự kiến)
    const expected = (totalLetters * ENGLISH_FREQ[char]) / 100;
    const observed = counts[i];
    
    if (expected > 0) {
      chi += Math.pow(observed - expected, 2) / expected;
    }
  }

  return chi;
}
