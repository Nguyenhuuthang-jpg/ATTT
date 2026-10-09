import { charToIndex, isLetter } from './alphabet';
import { ENGLISH_FREQ_ORDER } from '../data/englishFreq';

export interface LetterFrequency {
  letter: string;
  count: number;
  percent: number;
}

/**
 * Tính toán tần suất xuất hiện của từng chữ cái trong văn bản
 */
export function letterFrequency(text: string): LetterFrequency[] {
  const counts: number[] = new Array(26).fill(0);
  let totalLetters = 0;

  // Đếm số lần xuất hiện của mỗi chữ cái (không phân biệt hoa thường)
  for (const char of text) {
    if (isLetter(char)) {
      counts[charToIndex(char)]++;
      totalLetters++;
    }
  }

  const result: LetterFrequency[] = [];

  // Tính phần trăm và định dạng kết quả trả về
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const count = counts[i];
    const percent = totalLetters > 0 ? (count / totalLetters) * 100 : 0;
    result.push({ letter, count, percent });
  }

  return result;
}

/**
 * Tính toán chỉ số trùng khớp (Index of Coincidence - IC)
 */
export function indexOfCoincidence(text: string): number {
  const counts: number[] = new Array(26).fill(0);
  let n = 0; // tổng số lượng chữ cái (N)

  for (const char of text) {
    if (isLetter(char)) {
      counts[charToIndex(char)]++;
      n++;
    }
  }

  // Nếu số chữ cái nhỏ hơn 2, IC = 0 để tránh chia cho 0
  if (n < 2) {
    return 0;
  }

  // Tính IC = tổng(ni * (ni - 1)) / (N * (N - 1))
  let sum = 0;
  for (const count of counts) {
    sum += count * (count - 1);
  }

  return sum / (n * (n - 1));
}

/**
 * Gợi ý bảng đối chiếu thay thế bằng cách sắp xếp theo tần suất
 * Trả về Record ánh xạ từ chữ cái trong mật mã sang chữ cái gốc
 */
export function suggestMapping(cipher: string): Record<string, string> {
  // Lấy danh sách tần suất chữ cái trong đoạn mật mã
  const freqs = letterFrequency(cipher);

  // Sắp xếp giảm dần theo số lượng (count)
  freqs.sort((a, b) => b.count - a.count);

  const mapping: Record<string, string> = {};

  // Gắn kết từng chữ cái được mã hóa nhiều nhất với chữ cái tiếng Anh thông dụng nhất
  for (let i = 0; i < 26; i++) {
    mapping[freqs[i].letter] = ENGLISH_FREQ_ORDER[i];
  }

  return mapping;
}
