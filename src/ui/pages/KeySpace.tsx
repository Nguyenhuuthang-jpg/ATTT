import React, { useState, useMemo } from 'react';

const FACTORIAL_26 = 4.032914611266056e26; // 26!

const KeySpace: React.FC = () => {
  const [speedPow, setSpeedPow] = useState(9); // 10^9 keys/sec mặc định

  const speed = Math.pow(10, speedPow);

  /** Tính thời gian ước lượng và chuyển sang đơn vị phù hợp */
  const estimatedTime = useMemo(() => {
    const seconds = FACTORIAL_26 / speed;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365.25;

    if (years >= 1e15) return `${(years / 1e15).toFixed(2)} triệu tỷ năm`;
    if (years >= 1e12) return `${(years / 1e12).toFixed(2)} nghìn tỷ năm`;
    if (years >= 1e9) return `${(years / 1e9).toFixed(2)} tỷ năm`;
    if (years >= 1e6) return `${(years / 1e6).toFixed(2)} triệu năm`;
    if (years >= 1e3) return `${(years / 1e3).toFixed(2)} nghìn năm`;
    if (years >= 1) return `${years.toFixed(2)} năm`;
    if (days >= 1) return `${days.toFixed(1)} ngày`;
    if (hours >= 1) return `${hours.toFixed(1)} giờ`;
    if (minutes >= 1) return `${minutes.toFixed(1)} phút`;
    return `${seconds.toFixed(1)} giây`;
  }, [speed]);

  /** Nhãn cho tốc độ */
  const speedLabel = useMemo(() => {
    if (speedPow >= 12) return `${(speed / 1e12).toFixed(0)} nghìn tỷ`;
    if (speedPow >= 9) return `${(speed / 1e9).toFixed(0)} tỷ`;
    if (speedPow >= 6) return `${(speed / 1e6).toFixed(0)} triệu`;
    if (speedPow >= 3) return `${(speed / 1e3).toFixed(0)} nghìn`;
    return speed.toString();
  }, [speed, speedPow]);

  return (
    <div className="animate-fade-in" aria-label="So sánh không gian khóa">
      <header className="section-header">
        <h1 id="ks-title">Không gian khóa (Key Space)</h1>
        <p id="ks-desc">
          Tại sao mã thay thế không thể phá bằng vét cạn dù yếu trước phân tích tần suất?
        </p>
      </header>

      {/* So sánh hai con số */}
      <div className="section-grid">
        <div className="card-static" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Mã Caesar</h2>
          <div className="keyspace-number keyspace-number-small" id="ks-caesar-num">
            25
          </div>
          <p className="keyspace-label">khóa khả dụng</p>
          <div className="divider" />
          <p className="text-sm text-muted">Thời gian vét cạn: <strong style={{ color: 'var(--accent-cyan)' }}>Tức thời</strong></p>
        </div>

        <div className="card-static" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>Mã thay thế</h2>
          <div className="keyspace-number keyspace-number-large" id="ks-sub-num">
            26!
          </div>
          <p className="keyspace-label">≈ 4,03 × 10²⁶ khóa</p>
          <div className="divider" />
          <p className="text-sm text-muted">
            Thời gian vét cạn:{' '}
            <strong style={{ color: 'var(--accent-purple)' }}>{estimatedTime}</strong>
          </p>
        </div>
      </div>

      <div className="keyspace-vs" aria-hidden="true">VS</div>

      {/* Thanh trượt tốc độ */}
      <div className="card-static mt-2">
        <label htmlFor="speed-slider" className="label">
          Tốc độ thử khóa giả định
        </label>
        <div className="slider-container">
          <span className="text-sm text-muted">10³</span>
          <input
            type="range"
            id="speed-slider"
            className="slider"
            aria-label="Chọn tốc độ thử khóa"
            min={3}
            max={12}
            step={1}
            value={speedPow}
            onChange={(e) => setSpeedPow(Number(e.target.value))}
          />
          <span className="text-sm text-muted">10¹²</span>
        </div>
        <div className="text-center mt-1" aria-live="polite">
          <span className="slider-value" style={{ display: 'inline-block' }}>
            10<sup>{speedPow}</sup>
          </span>
          <span className="text-muted" style={{ marginLeft: '0.75rem' }}>
            = {speedLabel} khóa/giây
          </span>
        </div>
      </div>


    </div>
  );
};

export default KeySpace;
