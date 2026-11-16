"""Dựng index.html từ src/: chèn app.js + xlpatch.js vào index_tpl.html.
Không nhúng dữ liệu dự án: dữ liệu nằm trên máy người dùng (D:\\QuanLyHoSo\\data\\hoso.json, D:\\QuanLyHoSo\\sync.js).
Chạy: python3 tools/build.py   (từ thư mục gốc repo). Có src/seed.json thì nhúng làm dữ liệu ban đầu."""
import os
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(R,'src')
rd=lambda f:open(os.path.join(S,f),encoding='utf-8').read()
t=rd('index_tpl.html');a=t.index('<script>\n/* =================== Helpers');b=t.index('</script>',a)
t=t[:a]+'<script>\n'+rd('app.js')+'\n'+rd('xlpatch.js')+t[b:]
x=t.index('/*SEED*/');y=t.index('/*END*/')
seed=rd('seed.json').replace('</','<\\/') if os.path.exists(os.path.join(S,'seed.json')) else 'null'
open(os.path.join(R,'index.html'),'w',encoding='utf-8').write(t[:x+8]+seed+t[y:])
print('OK -> index.html')
