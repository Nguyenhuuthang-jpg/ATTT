# DEMO.md — Kịch bản demo 5 phút CipherLab

> Kịch bản này bám theo thứ tự slide 3 → 4 → 5 → 6 → 9.
> Bật chế độ demo bằng nút **▶ Demo** trên thanh điều hướng. Dùng phím **← →** để chuyển bước.

---

## Bước 1 — Mã Caesar (Slide 3) ⏱️ ~1 phút

**Trang:** `/caesar`

1. Giới thiệu: _"Mã Caesar dịch mỗi chữ cái đi k vị trí trong bảng chữ cái."_
2. Nhập văn bản sau vào ô **Văn bản gốc**:

   ```
   The quick brown fox jumps over the lazy dog
   ```

3. Kéo thanh trượt **k = 3**. Quan sát:
   - Dải chữ cái dưới trượt sang phải 3 vị trí
   - Bản mã hiện ngay: `Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj`

4. Thử thay đổi k (ví dụ k = 13) để thấy ROT13: `Gur dhvpx oebja sbk whzcf bire gur ynml qbt`

5. Chuyển sang tab **Giải mã**, dán bản mã `KHOOR`, đặt k = 3 → ra `HELLO`.

6. Bấm **"Thử vét cạn bản mã này"** để chuyển sang bước tiếp theo.

---

## Bước 2 — Tấn công vét cạn (Slide 4) ⏱️ ~1 phút

**Trang:** `/bruteforce`

1. Bản mã từ bước trước đã được điền sẵn (hoặc dán lại):

   ```
   Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj
   ```

2. Bấm nút **⚡ Thử cả 25 khóa**.

3. Quan sát bảng 25 dòng:
   - Dòng đầu tiên (viền cyan) có **k = 3** và bản rõ `The quick brown fox jumps over the lazy dog`
   - Điểm χ² nhỏ nhất → giống tiếng Anh nhất

4. Nhấn mạnh: _"Với chỉ 25 khóa, máy tính thử hết trong tích tắc. Đây là lý do mã Caesar không an toàn."_

---

## Bước 3 — Mã thay thế đơn bảng (Slide 5) ⏱️ ~1 phút

**Trang:** `/substitution`

1. Giới thiệu: _"Thay mỗi chữ cái bằng một chữ cái khác theo bảng hoán vị."_

2. Bấm **🎲 Ngẫu nhiên** để tạo khóa ngẫu nhiên. Hoặc nhập khóa:

   ```
   QWERTYUIOPASDFGHJKLZXCVBNM
   ```

3. Nhập văn bản:

   ```
   ATTACK AT DAWN
   ```

4. Quan sát:
   - Bảng ánh xạ hai hàng hiện rõ A→Q, B→W, C→E, ...
   - Bản mã: `QZZQEA QZ RQVF` (với khóa QWERTY...)

5. Chuyển tab sang **Giải mã**, dán bản mã vào, dùng cùng khóa → ra lại bản rõ.

6. Nhấn mạnh: _"Bây giờ ta không thể vét cạn vì có 26! ≈ 4×10²⁶ khóa."_

---

## Bước 4 — Phân tích tần suất (Slide 6) ⏱️ ~1.5 phút

**Trang:** `/frequency`

1. Giới thiệu: _"Dù không thể vét cạn, mã thay thế vẫn giữ nguyên tần suất chữ cái → ta dùng phân tích tần suất để phá."_

2. Dán bản mã dài sau (ROT13 của một đoạn tiếng Anh):

   ```
   GUVF VF N FRPERG ZRFFNTR GUNG JNF RAPELCGRQ HFVAT N FVZCYR FHOFGVGHGVBA PVCURE GURER NER ZNAL JNLF GB OERNX GUVF PVCURE OHG GUR RNFVRFG VF GB HFR SERDHRAPL NANYLFVF
   ```

3. Quan sát:
   - **Biểu đồ tần suất**: thanh tím (bản mã) so với thanh cyan (tiếng Anh chuẩn)
   - **IC ≈ 0.0667**: xác nhận là mã thay thế đơn bảng (giữ nguyên IC)
   - **Gợi ý ánh xạ**: chữ xuất hiện nhiều nhất trong mã → E

4. Bấm **✨ Gợi ý tự động** — lưới 26 ô được điền tự động.

5. Quan sát phần **Xem trước giải mã**:
   - Chữ đã gán: hiện màu **cyan**
   - Chữ chưa gán: hiện màu **xám**

6. Chỉnh sửa vài ô nếu cần (ví dụ hoán đổi hai chữ bị sai).

7. Nhấn mạnh: _"Phân tích tần suất cho ta giải mã mà không cần biết khóa."_

---

## Bước 5 — Bài học rút ra (Slide 9) ⏱️ ~30 giây

**Trang:** `/keyspace`

1. Chỉ vào hai con số lớn:
   - **Caesar: 25 khóa** → Tức thời
   - **Thay thế: 26! ≈ 4×10²⁶ khóa** → Không thể vét cạn

2. Kéo thanh trượt tốc độ sang **10⁹ khóa/giây** → thời gian ≈ **1,3 × 10¹⁰ năm**.

3. Kết luận: _"Không gian khóa lớn là điều kiện cần nhưng chưa đủ. Cả hai mã đều yếu trước phân tích tần suất vì giữ nguyên phân bố thống kê."_

---

## Kết thúc

Bấm **✕ Thoát Demo** hoặc phím **Esc** để trở lại chế độ bình thường.

---

### Ghi chú cho người trình bày

- Bật chế độ demo để chữ lớn hơn (≥ 28px), nút lớn, dễ nhìn trên màn chiếu.
- Bản build tĩnh (`npm run build` → `dist/index.html`) chạy offline, không cần mạng.
- Thời lượng tổng: ~5 phút. Có thể rút ngắn bằng cách bỏ qua bước chỉnh sửa thủ công ở bước 4.
