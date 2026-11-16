# Quản Lý Hồ Sơ

Web app quản lý hồ sơ nghiệm thu (BBNT) kết cấu Block 4.5, đồng bộ với sheet DATA của file Excel HSNT và nhật ký đổ bê tông.

## Dữ liệu
Repo **không chứa dữ liệu dự án**. App lưu và đọc dữ liệu trên máy người dùng (Chrome/Edge, File System Access API):
- `D:\QuanLyHoSo\data\hoso.json` — toàn bộ hồ sơ (tự lưu khi sửa), `data\backup\` — bản sao mỗi ngày
- `D:\QuanLyHoSo\sync.js` — dữ liệu đọc từ file Excel HSNT + nhật ký đổ BT (tác vụ tự động ghi mỗi giờ)

Lần đầu mở app (từ file trên ổ D: hoặc GitHub Pages): bấm **Mở dữ liệu ổ D:** và chọn thư mục `D:\QuanLyHoSo`.

## Cấu trúc
- `index.html` — app hoàn chỉnh (1 file)
- `src/app.js` — logic app · `src/xlpatch.js` — ghi DATA vào file Excel gốc · `src/index_tpl.html` — giao diện, CSS
- `tools/build.py` — dựng lại `index.html`: `python3 tools/build.py`
- `tools/make_sync.py` — tạo `sync.js` từ file Excel
- `assets/` — biểu tượng app

Phiên bản: Vương Hữu Thắng
