# Quản Lý Hồ Sơ

Web app quản lý hồ sơ nghiệm thu (BBNT) kết cấu Block 4.5, đồng bộ với sheet DATA của file Excel HSNT và nhật ký đổ bê tông.

## Cấu trúc
- `index.html` — app hoàn chỉnh (1 file), mở trực tiếp bằng Chrome/Edge. Để `sync.js` cùng thư mục nếu có.
- `src/app.js` — logic app · `src/xlpatch.js` — xuất Excel giống file gốc · `src/index_tpl.html` — giao diện, CSS
- `src/seed.json` — dữ liệu ban đầu · `src/sync.js` — dữ liệu đồng bộ từ Excel
- `tools/build.py` — dựng lại `index.html`: `python3 tools/build.py`
- `tools/make_sync.py` — tạo `sync.js` từ file Excel: `python3 tools/make_sync.py <HSNT.xlsm> sync.js <stamp> <tên file> [<file vật tư.xlsx> <tên>]`
- `assets/` — biểu tượng app

Phiên bản: Vương Hữu Thắng
