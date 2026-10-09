import { charToIndex, indexToChar, isLetter } from './alphabet';

/**
 * Hàm sinh số giả ngẫu nhiên có seed (thuật toán Mulberry32)
 */
function mulberry32(a: number): () => number {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Kiểm tra tính hợp lệ của khóa thay thế (substitution key)
 */
export function validateSubstitutionKey(key: string): ValidationResult {
  // Kiểm tra độ dài phải đúng bằng 26
  if (key.length !== 26) {
    return { valid: false, error: `Khóa phải có đúng 26 ký tự, hiện có ${key.length} ký tự` };
  }

  const seen = new Set<string>();

  for (const char of key) {
    // Chỉ cho phép chứa các chữ cái
    if (!isLetter(char)) {
      return { valid: false, error: 'Khóa chỉ được chứa chữ cái A-Z' };
    }

    const upperChar = char.toUpperCase();
    
    // Kiểm tra không có ký tự bị lặp lại
    if (seen.has(upperChar)) {
      return { valid: false, error: `Khóa chứa chữ "${upperChar}" bị trùng` };
    }
    seen.add(upperChar);
  }

  return { valid: true };
}

/**
 * Tạo một khóa thay thế ngẫu nhiên
 * Có thể cung cấp seed để tạo ra khóa ổn định (cùng seed -> cùng khóa)
 */
export function randomSubstitutionKey(seed?: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Lấy hàm random tương ứng
  const prng = seed !== undefined ? mulberry32(seed) : Math.random;

  // Dùng thuật toán Fisher-Yates để xáo trộn mảng chữ cái
  for (let i = alphabet.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    const temp = alphabet[i];
    alphabet[i] = alphabet[j];
    alphabet[j] = temp;
  }

  return alphabet.join('');
}

/**
 * Mã hóa bằng mật mã thay thế (substitution cipher)
 */
export function substitutionEncrypt(text: string, key: string): string {
  const validation = validateSubstitutionKey(key);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const upperKey = key.toUpperCase();
  let result = '';

  for (const char of text) {
    if (isLetter(char)) {
      const isUpperCase = char === char.toUpperCase();
      // Ánh xạ chữ cái gốc sang chữ cái trong khóa
      const newChar = upperKey[charToIndex(char)];
      result += isUpperCase ? newChar : newChar.toLowerCase();
    } else {
      // Bỏ qua ký tự không phải chữ cái
      result += char;
    }
  }

  return result;
}

/**
 * Giải mã bằng mật mã thay thế
 */
export function substitutionDecrypt(text: string, key: string): string {
  const validation = validateSubstitutionKey(key);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const upperKey = key.toUpperCase();
  let result = '';

  for (const char of text) {
    if (isLetter(char)) {
      const isUpperCase = char === char.toUpperCase();
      // Tìm vị trí của chữ cái bị mã hóa để khôi phục lại chữ gốc
      const index = upperKey.indexOf(char.toUpperCase());
      const newChar = indexToChar(index);
      result += isUpperCase ? newChar : newChar.toLowerCase();
    } else {
      // Bỏ qua ký tự không phải chữ cái
      result += char;
    }
  }

  return result;
}
