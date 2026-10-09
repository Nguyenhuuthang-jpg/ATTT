/**
 * Chuyển đổi ký tự thành chỉ số (A/a -> 0, Z/z -> 25)
 */
export function charToIndex(c: string): number {
  return c.toUpperCase().charCodeAt(0) - 65;
}

/**
 * Chuyển đổi chỉ số thành ký tự in hoa (0 -> A, 25 -> Z)
 */
export function indexToChar(i: number): string {
  return String.fromCharCode(i + 65);
}

/**
 * Phép chia lấy dư cho 26, luôn trả về số không âm
 */
export function mod26(n: number): number {
  return ((n % 26) + 26) % 26;
}

/**
 * Kiểm tra xem ký tự có phải là chữ cái (A-Z, a-z) hay không
 */
export function isLetter(c: string): boolean {
  return /^[a-zA-Z]$/.test(c);
}
