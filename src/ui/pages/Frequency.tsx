import React, { useState, useMemo, useCallback } from 'react';
import { letterFrequency, indexOfCoincidence, suggestMapping } from '../../core/frequency';
import { chiSquared } from '../../core/scoring';
import { FrequencyChart } from '../components/FrequencyChart';
import { MappingGrid } from '../components/MappingGrid';

interface FrequencyProps {
  demoMode?: boolean;
}

const Frequency: React.FC<FrequencyProps> = ({ demoMode = false }) => {
  const [ciphertext, setCiphertext] = useState(
    demoMode
      ? 'GUVF VF N FRPERG ZRFFNTR GUNG JNF RAPELCGRQ HFVAT N FVZCYR FHOFGVGHGVBA PVCURE'
      : ''
  );
  const [mapping, setMapping] = useState<Record<string, string>>({});

  /** Tính tần suất từ bản mã */
  const freqData = useMemo(() => letterFrequency(ciphertext), [ciphertext]);

  /** Tính chỉ số trùng hợp (IC) và chi-squared từ chuỗi gốc */
  const ic = useMemo(() => indexOfCoincidence(ciphertext), [ciphertext]);
  const chi2 = useMemo(() => chiSquared(ciphertext), [ciphertext]);

  /** Gợi ý ánh xạ tự động dựa trên tần suất */
  const handleSuggest = useCallback(() => {
    setMapping(suggestMapping(ciphertext));
  }, [ciphertext]);

  /** Thay đổi ánh xạ từng chữ */
  const handleMapChange = useCallback((letter: string, value: string) => {
    setMapping(prev => ({ ...prev, [letter]: value }));
  }, []);

  /** Giải mã bán tự động: chữ đã gán → cyan, chưa gán → xám */
  const decryptedPreview = useMemo(() => {
    return ciphertext.split('').map((char, i) => {
      const upper = char.toUpperCase();
      if (/[A-Z]/.test(upper)) {
        const mapped = mapping[upper];
        if (mapped) {
          const displayChar = char === upper ? mapped.toUpperCase() : mapped.toLowerCase();
          return (
            <span key={i} className="decoded-char">{displayChar}</span>
          );
        }
        return <span key={i} className="undecoded-char">{char}</span>;
      }
      return <span key={i}>{char}</span>;
    });
  }, [ciphertext, mapping]);

  /** Đếm chữ đã gán */
  const mappedCount = Object.values(mapping).filter(v => v).length;

  return (
    <div className="animate-fade-in" aria-label="Phân tích tần suất">
      <header className="section-header">
        <h1 id="freq-title">Phân tích tần suất (Frequency Analysis)</h1>
        <p id="freq-desc">
          So sánh tần suất chữ cái trong bản mã với tiếng Anh chuẩn để phá mã thay thế đơn bảng.
        </p>
      </header>

      {/* Nhập bản mã */}
      <div className="card-static mb-2">
        <label htmlFor="freq-input" className="label">Bản mã (Ciphertext)</label>
        <textarea
          id="freq-input"
          className="textarea textarea-cipher"
          aria-label="Nhập bản mã để phân tích tần suất"
          value={ciphertext}
          onChange={(e) => { if (e.target.value.length <= 10000) setCiphertext(e.target.value); }}
          maxLength={10000}
          placeholder="Dán bản mã dài vào đây..."
          rows={4}
        />
        <div className={`char-count${ciphertext.length > 9500 ? ' over-limit' : ''}`}>
          {ciphertext.length.toLocaleString()} / 10.000
        </div>
      </div>

      {ciphertext && (
        <>
          {/* Thống kê */}
          <div className="section-grid mb-2">
            <div className="card-static">
              <h3 style={{ color: 'var(--accent-cyan)' }}>Chỉ số trùng hợp (IC)</h3>
              <div className="keyspace-number" style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>
                {ic.toFixed(4)}
              </div>
              <p className="text-sm text-muted">Tiếng Anh ≈ 0.0667 · Ngẫu nhiên ≈ 0.0385</p>
            </div>
            <div className="card-static">
              <h3 style={{ color: 'var(--accent-purple)' }}>Điểm Chi-bình phương (χ²)</h3>
              <div className="keyspace-number" style={{ fontSize: '2rem', color: 'var(--accent-purple)' }}>
                {chi2 === Infinity ? '∞' : chi2.toFixed(2)}
              </div>
              <p className="text-sm text-muted">Càng nhỏ càng giống phân bố tiếng Anh</p>
            </div>
          </div>

          {/* Biểu đồ tần suất */}
          <div className="card-static mb-2">
            <label className="label">Biểu đồ tần suất (Frequency Chart)</label>
            <FrequencyChart cipherFreq={freqData} title="So sánh tần suất bản mã với tiếng Anh" />
          </div>

          {/* Ánh xạ (F7 - Giải bán tự động) */}
          <div className="card-static mb-2">
            <div className="flex justify-between items-center mb-2">
              <div>
                <label className="label" style={{ marginBottom: 0 }}>Gán chữ (Letter Mapping)</label>
                <p className="text-sm text-muted">Đã gán {mappedCount}/26 chữ</p>
              </div>
              <button
                id="btn-suggest-mapping"
                className="btn btn-secondary"
                onClick={handleSuggest}
                aria-label="Gợi ý ánh xạ tự động theo tần suất"
              >
                ✨ Gợi ý tự động
              </button>
            </div>
            <MappingGrid mapping={mapping} onChange={handleMapChange} />
          </div>

          {/* Xem trước giải mã */}
          <div className="card-static">
            <label className="label">Xem trước giải mã (Live Preview)</label>
            <div
              className="cipher-output"
              aria-live="polite"
              role="textbox"
              aria-readonly="true"
              aria-label="Bản rõ dự đoán"
              id="freq-preview"
              style={{ lineHeight: 2 }}
            >
              {decryptedPreview}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Frequency;
