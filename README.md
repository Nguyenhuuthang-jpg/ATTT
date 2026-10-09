# CipherLab — Hệ thống mô phỏng tấn công mật mã cổ điển

> ⚠️ **Chỉ dùng để học.** Không dùng các mã này để bảo vệ dữ liệu thật.

CipherLab là ứng dụng web chạy hoàn toàn trên trình duyệt, cho phép người dùng tự tay mã hóa bằng **mã Caesar** và **mã thay thế đơn bảng**, rồi tự phá chúng bằng **tấn công vét cạn** và **phân tích tần suất**.

Ứng dụng phục vụ môn **Nhập môn An toàn thông tin**, khớp từng bước với bộ slide "Mật mã cổ điển và tấn công vét cạn" và dùng để demo trực tiếp khi thuyết trình.

## 🚀 Cách chạy

```bash
# 1. Cài đặt
npm install

# 2. Chạy ở chế độ phát triển
npm run dev

# 3. Chạy kiểm thử
npm test

# 4. Tạo bản build tĩnh (mở offline được)
npm run build
```

Sau khi build, mở file `dist/index.html` trực tiếp trong trình duyệt — không cần máy chủ, không cần mạng.

## 📁 Cấu trúc thư mục

```
cipherlab/
├── src/
│   ├── core/                 # Hàm thuần (pure functions), không phụ thuộc React/DOM
│   │   ├── alphabet.ts       # Chỉ số chữ cái, mod 26, giữ hoa/thường
│   │   ├── caesar.ts         # Mã hóa, giải mã, vét cạn Caesar
│   │   ├── substitution.ts   # Mã thay thế đơn bảng
│   │   ├── frequency.ts      # Đếm tần suất, IC, gợi ý ánh xạ
│   │   └── scoring.ts        # Chi-bình phương (chi-squared)
│   ├── data/
│   │   └── englishFreq.ts    # Tần suất 26 chữ cái tiếng Anh
│   ├── ui/
│   │   ├── pages/            # Home, CaesarLab, BruteForce, Substitution, Frequency, KeySpace
│   │   └── components/       # AlphabetStrip, FrequencyChart, MappingGrid, ResultTable, ...
│   ├── App.tsx               # Routing + chế độ demo
│   ├── main.tsx              # Entry point
│   └── index.css             # Design system
├── tests/
│   └── core/                 # Test cho từng module trong src/core
├── README.md
├── DEMO.md
├── package.json
└── vite.config.ts
```

## 🎯 Chức năng

| Mã | Chức năng | Ưu tiên |
|----|-----------|---------|
| F1 | Mã hóa Caesar | Must ✅ |
| F2 | Giải mã Caesar | Must ✅ |
| F3 | Vét cạn Caesar (brute force) | Must ✅ |
| F4 | Tạo và kiểm tra khóa thay thế | Must ✅ |
| F5 | Mã hóa / giải mã thay thế đơn bảng | Must ✅ |
| F6 | Phân tích tần suất | Must ✅ |
| F7 | Giải bán tự động | Should ✅ |
| F9 | Chế độ demo (phím mũi tên chuyển bước) | Should ✅ |
| F10 | So sánh không gian khóa (25 vs 26!) | Should ✅ |
| F12 | Giao diện tiếng Việt | Must ✅ |

## 🔧 Công nghệ

- **TypeScript** + **React** — giao diện
- **Vite** — bundler, dev server
- **Vitest** — kiểm thử
- **React Router** (MIT) — điều hướng
- Không máy chủ, không gọi mạng — build tĩnh, mở offline

## 📄 Giấy phép

Mã nguồn: MIT License

### Thư viện sử dụng

| Thư viện | Phiên bản | Giấy phép |
|----------|-----------|-----------|
| React | ^19.x | MIT |
| React DOM | ^19.x | MIT |
| React Router DOM | ^7.x | MIT |
| Vite | ^8.x | MIT |
| Vitest | ^5.x | MIT |
| TypeScript | ~6.x | Apache-2.0 |
| vite-plugin-singlefile | ^2.x | MIT |

## 👥 Nhóm thực hiện

- **Nguyễn Hữu Thắng**
- **Nguyễn Xuân Thành**
- Giảng viên: **Đoàn Trung Sơn**
- Môn: Nhập môn An toàn thông tin
