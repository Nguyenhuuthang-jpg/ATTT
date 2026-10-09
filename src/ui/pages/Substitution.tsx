import React, { useState, useMemo } from 'react';
import {
  substitutionEncrypt,
  substitutionDecrypt,
  validateSubstitutionKey,
  randomSubstitutionKey,
} from '../../core/substitution';

interface SubstitutionProps {
  demoMode?: boolean;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const Substitution: React.FC<SubstitutionProps> = ({ demoMode = false }) => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [inputText, setInputText] = useState(demoMode ? 'HELLO WORLD' : '');
  const [key, setKey] = useState(demoMode ? 'QWERTYUIOPASDFGHJKLZXCVBNM' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  /** Kiểm tra tính hợp lệ của khóa */
  const validation = useMemo(() => validateSubstitutionKey(key), [key]);

  /** Tính kết quả mã hóa / giải mã */
  const outputText = useMemo(() => {
    if (!inputText || !validation.valid) return '';
    try {
      return mode === 'encrypt'
        ? substitutionEncrypt(inputText, key)
        : substitutionDecrypt(inputText, key);
    } catch {
      return '';
    }
  }, [inputText, key, mode, validation.valid]);

  const handleGenerateKey = () => {
    setKey(randomSubstitutionKey());
  };

  return (
    <div className="animate-fade-in" aria-label="Mã thay thế đơn bảng">
      <header className="section-header">
        <h1 id="sub-title">Mã thay thế đơn bảng (Substitution Cipher)</h1>
        <p id="sub-desc">
          Thay mỗi chữ cái bằng một chữ cái khác theo bảng hoán vị 26 ký tự.
        </p>
      </header>

      {/* Tab chọn chế độ */}
      <div className="tabs" role="tablist" aria-label="Chế độ">
        <button
          role="tab"
          aria-selected={mode === 'encrypt'}
          onClick={() => setMode('encrypt')}
          id="tab-sub-encrypt"
          className={`tab${mode === 'encrypt' ? ' active' : ''}`}
        >
          🔒 Mã hóa
        </button>
        <button
          role="tab"
          aria-selected={mode === 'decrypt'}
          onClick={() => setMode('decrypt')}
          id="tab-sub-decrypt"
          className={`tab${mode === 'decrypt' ? ' active' : ''}`}
        >
          🔓 Giải mã
        </button>
      </div>

      {/* Khóa thay thế */}
      <div className="card-static mb-2">
        <label htmlFor="sub-key" className="label">Khóa thay thế (26 chữ cái không trùng)</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            id="sub-key"
            className="input input-cipher"
            aria-label="Nhập khóa thay thế 26 ký tự"
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase().slice(0, 26))}
            maxLength={26}
            style={{ flex: 1 }}
          />
          <button
            id="btn-rand-key"
            className="btn btn-secondary"
            onClick={handleGenerateKey}
            aria-label="Tạo khóa ngẫu nhiên"
          >
            🎲 Ngẫu nhiên
          </button>
        </div>
        <div
          className={validation.valid ? 'text-sm mt-1' : 'error-text'}
          role="alert"
          aria-live="polite"
          style={validation.valid ? { color: '#4caf50' } : undefined}
        >
          {validation.valid ? '✅ Khóa hợp lệ' : `❌ ${validation.error}`}
        </div>
      </div>

      {/* Bảng ánh xạ */}
      {validation.valid && (
        <div className="card-static mb-2 animate-fade-in" aria-label="Bảng ánh xạ khóa">
          <label className="label">Bảng ánh xạ (Mapping Table)</label>
          <div style={{ overflowX: 'auto' }}>
            <table className="result-table" style={{ minWidth: '700px' }}>
              <thead>
                <tr>
                  <th style={{ width: '60px', color: 'var(--accent-cyan)' }}>Gốc</th>
                  {ALPHABET.split('').map(c => (
                    <th key={c} style={{ textAlign: 'center', padding: '0.4rem', minWidth: '28px' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>Thay</td>
                  {key.split('').map((c, i) => (
                    <td key={i} style={{
                      textAlign: 'center',
                      fontFamily: 'var(--font-code)',
                      fontWeight: 700,
                      color: c !== ALPHABET[i] ? 'var(--accent-purple)' : 'var(--text-muted)',
                      padding: '0.4rem',
                    }}>
                      {c}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Nhập / Xuất */}
      <div className="section-grid">
        <div>
          <label htmlFor="sub-input" className="label">
            {mode === 'encrypt' ? 'Văn bản gốc' : 'Bản mã'}
          </label>
          <textarea
            id="sub-input"
            className="textarea textarea-cipher"
            aria-label={mode === 'encrypt' ? 'Nhập văn bản gốc' : 'Nhập bản mã'}
            value={inputText}
            onChange={(e) => { if (e.target.value.length <= 10000) setInputText(e.target.value); }}
            maxLength={10000}
            placeholder="Nhập văn bản..."
            rows={5}
          />
          <div className={`char-count${inputText.length > 9500 ? ' over-limit' : ''}`}>
            {inputText.length.toLocaleString()} / 10.000
          </div>
        </div>

        <div>
          <label className="label">
            {mode === 'encrypt' ? 'Bản mã' : 'Văn bản gốc'}
          </label>
          <div className="cipher-output" role="textbox" aria-readonly="true" aria-label="Kết quả" id="sub-output">
            {outputText || (
              <span className="text-muted">
                {!validation.valid ? 'Khóa chưa hợp lệ...' : 'Kết quả sẽ hiện ở đây...'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Substitution;
