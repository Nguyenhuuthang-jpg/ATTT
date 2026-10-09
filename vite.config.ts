import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// viteSingleFile gộp JS và CSS vào dist/index.html để mở trực tiếp bằng file://
// (trình duyệt chặn script module tải từ file khi mở không qua máy chủ).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
})
