import { charToIndex, indexToChar, mod26, isLetter } from './alphabet';
import { chiSquared } from './scoring';

/**
 * Mã hóa Caesar một đoạn văn bản với khóa k
 */
export function caesarEncrypt(text: string, k: number): string {
  // Đảm bảo khóa luôn dương và trong khoảng 0-25
  const normalizedKey = mod26(k);
  let result = '';

  for (const char of text) {
    if (isLetter(char)) {
      // Giữ nguyên kiểu chữ hoa hay thường
      const isUpperCase = char === char.toUpperCase();
      const index = charToIndex(char);
      
      // Tính toán chỉ số mới (dịch k đơn vị) và chuyển thành chữ cái
      const newIndex = mod26(index + normalizedKey);
      const newChar = indexToChar(newIndex);
      
      result += isUpperCase ? newChar : newChar.toLowerCase();
    } else {
      // Bỏ qua và giữ nguyên các ký tự không phải chữ cái
      result += char;
    }
  }

  return result;
}

/**
 * Giải mã Caesar một đoạn văn bản với khóa k
 */
export function caesarDecrypt(text: string, k: number): string {
  // Giải mã là quá trình mã hóa với khóa -k
  return caesarEncrypt(text, -k);
}

export interface CaesarBruteForceResult {
  key: number;
  plaintext: string;
  score: number;
}

/**
 * Phá mã Caesar bằng phương pháp vét cạn (brute-force), 
 * thử tất cả 25 khóa và đánh giá bằng độ đo chi-bình phương.
 */
export function bruteForceCaesar(cipher: string): CaesarBruteForceResult[] {
  const results: CaesarBruteForceResult[] = [];

  // Thử mọi khóa k từ 1 đến 25
  for (let k = 1; k <= 25; k++) {
    const plaintext = caesarDecrypt(cipher, k);
    const score = chiSquared(plaintext);
    results.push({ key: k, plaintext, score });
  }

  // Sắp xếp kết quả theo điểm chi-bình phương tăng dần
  // (điểm càng nhỏ nghĩa là càng giống với văn bản tiếng Anh thông thường)
  results.sort((a, b) => a.score - b.score);

  return results;
}
