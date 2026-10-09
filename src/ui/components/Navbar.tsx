import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  onDemoToggle: () => void;
  isDemoMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onDemoToggle, isDemoMode }) => {
  return (
    <nav className="navbar" aria-label="Điều hướng chính">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" id="nav-brand" aria-label="Trang chủ CipherLab">
          <span className="navbar-brand-icon" role="img" aria-label="khóa">🔐</span>
          CipherLab
        </NavLink>
        <div className="navbar-links" id="nav-links">
          <NavLink to="/" end className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`} id="nav-link-home">
            Trang chủ
          </NavLink>
          <NavLink to="/caesar" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`} id="nav-link-caesar">
            Caesar
          </NavLink>
          <NavLink to="/bruteforce" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`} id="nav-link-bruteforce">
            Vét cạn
          </NavLink>
          <NavLink to="/substitution" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`} id="nav-link-substitution">
            Thay thế
          </NavLink>
          <NavLink to="/frequency" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`} id="nav-link-frequency">
            Tần suất
          </NavLink>
          <NavLink to="/keyspace" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`} id="nav-link-keyspace">
            Không gian khóa
          </NavLink>
        </div>
        <button
          className="navbar-demo-btn"
          id="nav-demo-btn"
          onClick={onDemoToggle}
          aria-label={isDemoMode ? 'Thoát chế độ demo' : 'Bắt đầu demo'}
        >
          {isDemoMode ? '✕ Thoát Demo' : '▶ Demo'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
