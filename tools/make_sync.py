#!/usr/bin/env python3
"""Đọc sheet DATA (giá trị + màu tô cột S/T) của file HSNT và ghi sync.js cho app."""
import sys, json, datetime, openpyxl
src, out, stamp, name = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
pour_src = sys.argv[5] if len(sys.argv) > 5 else ""
pour_name = sys.argv[6] if len(sys.argv) > 6 else ""
wb = openpyxl.load_workbook(src, data_only=True, read_only=True, keep_vba=False)
ws = wb['DATA']
def cv(v):
    if v is None: return ''
    if isinstance(v, (datetime.datetime, datetime.date)): return f'{v.day}/{v.month}/{v.year}'
    if isinstance(v, datetime.time): return f'{v.hour}h{v.minute:02d}'
    if isinstance(v, float) and v.is_integer(): return int(v)
    if isinstance(v, str) and v.startswith('#'): return ''
    return v
def color(c):
    try:
        f = c.fill
        if f is None or f.fill_type is None: return ''
        fg = f.fgColor
        if fg.type != 'rgb' or not fg.rgb: return ''
        h = str(fg.rgb)[-6:].upper()
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        if r > 200 and g > 200 and b < 120: return 'y'      # vàng: đã ký, đã mang về
        if b > 180 and r < 120: return 'b'                  # xanh: đã in, đang trình ký
        if g > 150 and r < 150 and b < 150: return 'g'
    except Exception: pass
    return ''
rows, colors = [], {}
for i, r in enumerate(ws.iter_rows(min_row=1, max_col=39)):
    row = [cv(c.value) for c in r]
    while row and row[-1] == '': row.pop()
    rows.append(row)
    if len(r) > 19 and r[18].value:
        k = color(r[18]) or color(r[19])
        if k: colors[i] = k
while rows and not rows[-1]: rows.pop()
n = sum(1 for r in rows[24:] if len(r) > 18 and str(r[18]).strip())
pours = []
if pour_src:
    try:
        pw = openpyxl.load_workbook(pour_src, data_only=True, read_only=True)
        cand = [s for s in pw.worksheets if s.title.strip().lower().startswith('nhật ký đổ bt') and s.sheet_state == 'visible']
        ps = cand[0] if cand else None
        if ps is None: print('CANH BAO: khong thay sheet Nhat ky do BT')
        else:
            def dd(v): return v.strftime('%Y-%m-%d') if isinstance(v, (datetime.datetime, datetime.date)) else ''
            def tx(v):
                if v is None: return ''
                if isinstance(v, datetime.time): return f'{v.hour}h{v.minute:02d}'
                if isinstance(v, float) and v.is_integer(): return int(v)
                if isinstance(v, str) and v.startswith('#'): return ''
                return v if isinstance(v, (int, float)) else str(v).strip()
            for i, r in enumerate(ps.iter_rows(min_row=2, max_col=34, values_only=True), start=2):
                r = list(r) + [None] * 34
                if not r[3] or not dd(r[1]): continue
                pours.append({'row': i, 'stt': tx(r[0]), 'd': dd(r[1]), 'd2': dd(r[2]), 'desc': ' '.join(str(r[3]).split()), 'blk': tx(r[4]), 'tang': tx(r[5]),
                              'mac': tx(r[6]), 'klLT': tx(r[7]), 'klTT': tx(r[8]), 'ntp': tx(r[9]), 'tvgs': tx(r[10]), 'gs': tx(r[11]), 'mau': tx(r[12]),
                              'tBD': tx(r[13]), 'tKT': tx(r[14]), 'ncc': tx(r[15]), 'pp': tx(r[16]), 'doSut': tx(r[17]), 'r7': dd(r[18]), 'r28': dd(r[27])})
            print(f'POUR: {len(pours)} lan do BT tu sheet {ps.title}')
    except Exception as e:
        print('CANH BAO: khong doc duoc file nhat ky do BT:', e)
payload = {'stamp': str(stamp), 'file': name, 'at': datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=7))).strftime('%Y-%m-%dT%H:%M'), 'count': n, 'rows': rows, 'colors': colors, 'pours': pours, 'pourFile': pour_name}
with open(out, 'w', encoding='utf-8') as f:
    f.write('window.SYNC=' + json.dumps(payload, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + ';\n')
print(f'OK: {n} dong ho so, {sum(1 for v in colors.values() if v=="y")} vang (da ky), {sum(1 for v in colors.values() if v=="b")} xanh (dang trinh) -> {out}')
