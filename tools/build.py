"""Dựng index.html từ src/: chèn app.js + xlpatch.js vào index_tpl.html và nhúng dữ liệu seed.json.
Chạy: python3 tools/build.py   (từ thư mục gốc repo)"""
import os
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(R,'src')
rd=lambda f:open(os.path.join(S,f),encoding='utf-8').read()
t=rd('index_tpl.html');a=t.index('<script>\n/* =================== Helpers');b=t.index('</script>',a)
t=t[:a]+'<script>\n'+rd('app.js')+'\n'+rd('xlpatch.js')+t[b:]
s=rd('seed.json').replace('</','<\\/');x=t.index('/*SEED*/');y=t.index('/*END*/')
open(os.path.join(R,'index.html'),'w',encoding='utf-8').write(t[:x+8]+s+t[y:])
print('OK -> index.html')
