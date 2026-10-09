import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { caesarEncrypt, caesarDecrypt } from '../../core/caesar';
import { AlphabetStrip } from '../components/AlphabetStrip';

interface CaesarLabProps {
  demoMode?: boolean;
}

/** Ví dụ từ slide cho chế độ demo */
const DEMO_TEXT = 'The quick brown fox jumps over the lazy dog';
const DEMO_K = 3;

const CaesarLab: React.FC<CaesarLabProps> = ({ demoMode = false }) => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [inputText, setInputText] = useState(demoMode ? DEMO_TEXT : '');
  const [kValue, setKValue] = useState(demoMode ? DEMO_K : 3);
  const navigate = useNavigate();

  /** Tính kết quả mã hóa / giải mã theo thời gian thực */
  const outputText = useMemo(() => {
    if (!inputText) return '';
    return mode === 'encrypt'
      ? caesarEncrypt(inputText, kValue)
      : caesarDecrypt(inputText, kValue);
  }, [inputText, kValue, mode]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 10000) {
      setInputText(val);
    }
  };

  const navigateToBruteForce = () => {
    navigate('/bruteforce', { state: { ciphertext: mode === 'encrypt' ? outputText : inputText } });
  };

  return (
    <div className="animate-fade-in" aria-label="Mô phỏng Mã Caesar">
      <header className="section-header">
        <h1 id="caesar-title">Mã Caesar (Caesar Cipher)</h1>
        <p id="caesar-desc">
          Mã hóa bằng cách dịch chuyển mỗi chữ cái một khoảng <strong>k</strong> cố định trong bảng chữ cái.
        </p>
      </header>

      {/* Tab chọn chế độ */}
      <div className="tabs" role="tablist" aria-label="Chế độ mã hóa">
        <button
          role="tab"
          aria-selected={mode === 'encrypt'}
          onClick={() => setMode('encrypt')}
          id="tab-encrypt"
          className={`tab${mode === 'encrypt' ? ' active' : ''}`}
        >
          🔒 Mã hóa (Encrypt)
        </button>
        <button
          role="tab"
          aria-selected={mode === 'decrypt'}
          onClick={() => setMode('decrypt')}
          id="tab-decrypt"
          className={`tab${mode === 'decrypt' ? ' active' : ''}`}
        >
          🔓 Giải mã (Decrypt)
        </button>
      </div>

      <div className="section-grid">
        {/* Cột trái: Nhập liệu */}
        <div>
          <label htmlFor="caesar-input" className="label">
            {mode === 'encrypt' ? 'Văn bản gốc (Plaintext)' : 'Bản mã (Ciphertext)'}
          </label>
          <textarea
            id="caesar-input"
            className="textarea textarea-cipher"
            aria-label={mode === 'encrypt' ? 'Nhập văn bản gốc' : 'Nhập bản mã'}
            value={inputText}
            onChange={handleInput}
            maxLength={10000}
            placeholder={mode === 'encrypt' ? 'Nhập văn bản cần mã hóa...' : 'Nhập bản mã cần giải...'}
            rows={5}
          />
          <div className={`char-count${inputText.length > 9500 ? ' over-limit' : ''}`}>
            {inputText.length.toLocaleString()} / 10.000
          </div>

          {/* Thanh trượt khóa k */}
          <div className="mt-2">
            <label htmlFor="caesar-k" className="label">Giá trị khóa k</label>
            <div className="slider-container">
              <input
                type="range"
                id="caesar-k"
                className="slider"
                aria-label="Chọn giá trị khóa k"
                min={1}
                max={25}
                value={kValue}
                onChange={(e) => setKValue(Number(e.target.value))}
              />
              <span className="slider-value">{kValue}</span>
            </div>
          </div>
        </div>

        {/* Cột phải: Kết quả */}
        <div>
          <label className="label">
            {mode === 'encrypt' ? 'Bản mã (Ciphertext)' : 'Văn bản gốc (Plaintext)'}
          </label>
          <div
            className="cipher-output"
            role="textbox"
            aria-readonly="true"
            aria-label="Kết quả"
            id="caesar-output"
          >
            {outputText || <span className="text-muted">Kết quả sẽ hiện ở đây...</span>}
          </div>

          <button
            className="btn btn-outline mt-2"
            onClick={navigateToBruteForce}
            id="btn-to-bruteforce"
            aria-label="Chuyển sang trang vét cạn"
          >
            ⚡ Thử vét cạn bản mã này
          </button>
        </div>
      </div>

      {/* Dải chữ cái */}
      <div className="mt-3">
        <label className="label">Bảng ánh xạ chữ cái (Alphabet Mapping)</label>
        <AlphabetStrip shift={kValue} />
      </div>
    </div>
  );
};

export default CaesarLab;
