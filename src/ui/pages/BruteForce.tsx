import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bruteForceCaesar } from '../../core/caesar';
import type { CaesarBruteForceResult } from '../../core/caesar';
import { ResultTable } from '../components/ResultTable';

interface BruteForceProps {
  demoMode?: boolean;
}

/** Ví dụ từ slide cho chế độ demo */
const DEMO_CIPHER = 'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj';

const BruteForce: React.FC<BruteForceProps> = ({ demoMode = false }) => {
  const location = useLocation();
  const initialCipher = (location.state as { ciphertext?: string } | null)?.ciphertext || (demoMode ? DEMO_CIPHER : '');
  
  const [ciphertext, setCiphertext] = useState(initialCipher);
  const [results, setResults] = useState<CaesarBruteForceResult[]>([]);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);

  const handleBruteForce = () => {
    if (!ciphertext.trim()) return;
    const res = bruteForceCaesar(ciphertext);
    setResults(res);
    setSelectedKey(res[0]?.key ?? null);
  };

  /** Đếm số chữ cái để cảnh báo nếu quá ngắn */
  const letterCount = ciphertext.replace(/[^A-Za-z]/g, '').length;
  const showWarning = letterCount > 0 && letterCount < 15;

  /** Tìm kết quả đã chọn */
  const selectedResult = results.find(r => r.key === selectedKey);

  return (
    <div className="animate-fade-in" aria-label="Tấn công vét cạn Caesar">
      <header className="section-header">
        <h1 id="bf-title">Tấn công vét cạn (Brute Force Attack)</h1>
        <p id="bf-desc">
          Thử toàn bộ 25 khóa có thể của mã Caesar. Dòng có điểm χ² nhỏ nhất
          (giống tiếng Anh nhất) sẽ được tô sáng.
        </p>
      </header>

      <div className="card-static mb-2">
        <label htmlFor="bruteforce-input" className="label">
          Bản mã (Ciphertext)
        </label>
        <textarea
          id="bruteforce-input"
          className="textarea textarea-cipher"
          aria-label="Nhập bản mã để thử vét cạn"
          value={ciphertext}
          onChange={(e) => { if (e.target.value.length <= 10000) setCiphertext(e.target.value); }}
          maxLength={10000}
          placeholder="Dán bản mã vào đây..."
          rows={4}
        />

        {showWarning && (
          <div className="warning-text" role="alert" aria-live="assertive">
            ⚠️ Văn bản quá ngắn ({letterCount} chữ cái), kết quả kém tin cậy
          </div>
        )}

        <button
          id="bruteforce-btn"
          className="btn btn-primary mt-2"
          onClick={handleBruteForce}
          disabled={!ciphertext.trim()}
          aria-label="Thử cả 25 khóa"
        >
          ⚡ Thử cả 25 khóa
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-3 animate-fade-in">
          <h2 className="mb-2">Kết quả ({results.length} khóa)</h2>
          <ResultTable results={results} onSelect={(key) => setSelectedKey(key)} />

          {selectedResult && (
            <div className="card-static mt-2" aria-live="polite">
              <h3>
                Khóa k = {selectedResult.key}
                {selectedResult.key === results[0].key && (
                  <span className="badge badge-cyan" style={{ marginLeft: '0.75rem' }}>Khả năng cao nhất</span>
                )}
              </h3>
              <div className="cipher-output mt-1" id="selected-plaintext">
                {selectedResult.plaintext}
              </div>
              <p className="text-sm text-muted mt-1">
                Điểm χ² = {selectedResult.score.toFixed(2)} (càng nhỏ càng giống tiếng Anh)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BruteForce;
