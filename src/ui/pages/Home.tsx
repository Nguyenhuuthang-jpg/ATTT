import React from 'react';
import { Link } from 'react-router-dom';
import { SafetyBanner } from '../components/SafetyBanner';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in" aria-label="Trang chủ CipherLab">
      {/* Hero section */}
      <section className="home-hero">
        <div className="home-hero-icon">🔐</div>
        <h1 id="home-title">CipherLab</h1>
        <p id="home-subtitle">
          Hệ thống mô phỏng tấn công mật mã cổ điển
        </p>
        <p className="text-sm text-muted" style={{ marginTop: '0.5rem' }}>
          Mã hóa · Giải mã · Vét cạn · Phân tích tần suất
        </p>
      </section>

      {/* Banner an toàn */}
      <SafetyBanner />

      {/* Hai thẻ chính */}
      <div className="home-cards mt-3">
        <Link to="/caesar" className="card home-card home-card-caesar" id="link-caesar" aria-label="Đến trang Mã Caesar">
          <div className="home-card-icon">🔑</div>
          <h3>Mã Caesar</h3>
          <p className="home-card-eng">Caesar Cipher</p>
          <p>Mã hóa dịch vòng đơn giản nhất — chỉ 25 khóa có thể. Dễ dàng bị phá bằng phương pháp vét cạn.</p>
          <div className="home-card-tags">
            <span className="badge badge-cyan">F1 Mã hóa</span>
            <span className="badge badge-cyan">F2 Giải mã</span>
            <span className="badge badge-cyan">F3 Vét cạn</span>
          </div>
        </Link>

        <Link to="/substitution" className="card home-card home-card-sub" id="link-substitution" aria-label="Đến trang Mã thay thế đơn bảng">
          <div className="home-card-icon">🔐</div>
          <h3>Mã thay thế đơn bảng</h3>
          <p className="home-card-eng">Substitution Cipher</p>
          <p>Thay mỗi chữ cái bằng chữ cái khác. Không gian khóa khổng lồ 26! ≈ 4×10²⁶ nhưng bị phá bởi phân tích tần suất.</p>
          <div className="home-card-tags">
            <span className="badge badge-purple">F4 Tạo khóa</span>
            <span className="badge badge-purple">F5 Mã hóa</span>
            <span className="badge badge-purple">F6 Tần suất</span>
          </div>
        </Link>
      </div>

      {/* Công cụ phân tích */}
      <section className="mt-4" aria-label="Công cụ phân tích">
        <h2 className="mb-2" style={{ fontSize: '1.3rem' }}>Công cụ phân tích</h2>
        <div className="home-tools-grid">
          <Link to="/bruteforce" className="card home-tool-card" id="link-brute">
            <div className="home-tool-icon">⚡</div>
            <h3>Vét cạn</h3>
            <p className="text-sm">Brute Force — Thử tất cả 25 khóa Caesar</p>
          </Link>
          <Link to="/frequency" className="card home-tool-card" id="link-freq">
            <div className="home-tool-icon">📊</div>
            <h3>Phân tích tần suất</h3>
            <p className="text-sm">Frequency Analysis — So sánh phân bố chữ cái</p>
          </Link>
          <Link to="/keyspace" className="card home-tool-card" id="link-keyspace">
            <div className="home-tool-icon">🔢</div>
            <h3>Không gian khóa</h3>
            <p className="text-sm">Key Space — 25 vs 26! khóa</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
