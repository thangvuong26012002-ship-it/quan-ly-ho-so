/* =================== Helpers =================== */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-3);
const toISO=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const nowISO=()=>toISO(new Date());
const fmtDT=s=>{if(!s)return'';const d=new Date(s);if(isNaN(d))return s;return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`};
const fmtD=s=>{if(!s)return'';const d=new Date(s);if(isNaN(d))return s;return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`};
const parts=s=>{if(!s)return null;const d=new Date(s);if(isNaN(d))return null;return{h:pad(d.getHours()),mi:pad(d.getMinutes()),d:pad(d.getDate()),m:pad(d.getMonth()+1),y:d.getFullYear()}};
const addDays=(iso,n)=>{const d=new Date(iso);d.setDate(d.getDate()+n);return toISO(d)};
const UP=s=>String(s||'').toLocaleUpperCase('vi');
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('on'),2600)}

const ICON={
dash:'<path d="M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 13h7v8H3z"/>',
flow:'<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/>',
users:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
box:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/>',
grid:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
doc:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 15l2 2 4-4"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
wallet:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2M7 6V4h10v2"/>',
tree:'<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-3h14v3"/>',
archive:'<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v13h16V8M10 12h4"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
check:'<path d="M20 6 9 17l-5-5"/>',
print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
word:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
expand:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
};
const ic=(n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[n]||''}</svg>`;

/* =================== Status & orgs =================== */
const ST={none:{t:'Chưa lập BBNT',c:'gray'},overdue:{t:'Quá hạn',c:'red'},draft:{t:'Nháp',c:'gray'},check:{t:'Chờ kiểm tra',c:'amber'},approve:{t:'Chờ phê duyệt',c:'amber'},returned:{t:'Trả lại',c:'red'},approved:{t:'Đã duyệt',c:'green'}};
const chip=k=>`<span class="chip c-${(ST[k]||{c:'gray'}).c}">${(ST[k]||{t:k}).t}</span>`;
const ORG={CDT:{lab:'Chủ đầu tư / Ban QLDA',up:'BAN QLDA',k:'investor'},TVGS:{lab:'Tư vấn giám sát',up:'TƯ VẤN GIÁM SÁT',k:'supervisor'},NTC:{lab:'Nhà thầu chính',up:'NHÀ THẦU CHÍNH',k:'mainC'},NTP:{lab:'Nhà thầu phụ',up:'NHÀ THẦU PHỤ',k:'subC'}};
const SIGROLE=[['TVGS','TVGS – giám sát viên','TVGS'],['NTC','Nhà thầu chính – giám sát BĐH','NTC'],['NTP','Nhà thầu phụ – cán bộ kỹ thuật','NTP'],['CHT','Chỉ huy trưởng / phó','NTP']];

/* =================== Checklist library (from company forms) =================== */
const BASIS=[['Bản vẽ tham chiếu','Bản vẽ liên quan được phê duyệt'],['Qui trình/ Biện pháp','Theo biện pháp thi công được duyệt'],['Tiêu chuẩn/ Qui phạm','Theo đặc tính kỹ thuật của dự án và các tiêu chuẩn hiện hành']];
function CL(id,code,name,title2,numStyle,txt,extra){return{id,kind:'cl',code,name,title1:'PHIẾU KIỂM TRA',title2,numStyle,dateLabel:'Ngày phát hành:',groups:parseGroups(txt),extra:extra||[],use:true}}
function parseGroups(txt){const G=[];let cur=null;String(txt).split('\n').map(s=>s.trim()).filter(Boolean).forEach(l=>{if(l.startsWith('#')){cur={g:l.replace(/^#\s*/,''),items:[]};G.push(cur)}else{if(!cur){cur={g:'',items:[]};G.push(cur)}const[a,...b]=l.split('|');cur.items.push([a.trim(),b.join('|').trim()])}});return G}
const groupsText=G=>G.map(g=>(g.g?'# '+g.g+'\n':'')+g.items.map(i=>i[0]+(i[1]?' | '+i[1]:'')).join('\n')).join('\n');
function defaultTemplates(){return[
 {id:'PYCNT',kind:'pyc',name:'Phiếu yêu cầu nghiệm thu / lấy mẫu',title:'PHIẾU YÊU CẦU NGHIỆM THU CÔNG VIỆC XÂY DỰNG',use:true},
 {id:'NTCV',kind:'ntcv',name:'Biên bản nghiệm thu công việc',title:'BIÊN BẢN NGHIỆM THU CÔNG VIỆC XÂY DỰNG',use:true},
 {id:'PYC_DBT',kind:'dbt',name:'Phiếu yêu cầu đổ bê tông',title1:'PHIẾU YÊU CẦU/ CHẤP THUẬN',title2:'CÔNG TÁC ĐỔ BÊ TÔNG',use:true},
 {id:'BBLM_BT',kind:'lm',name:'Biên bản lấy mẫu thí nghiệm bê tông',title:'LẤY MẪU BÊ TÔNG TẠI HIỆN TRƯỜNG',use:true},
 CL('CL_DAODAT','DD','Checklist kiểm tra công tác đào đất','CÔNG TÁC ĐÀO ĐẤT/ ĐẦM CHẶT','AB',`# Kiểm tra công tác chuẩn bị
Biện pháp thi công | Bằng mắt
Cao trình mặt đất hiện hữu | Máy trắc đạc
Thông số của đất tại vị trí đáy móng | Kết quả thí nghiệm
Máy móc, thiết bị phục vụ thi công | Bằng mắt
# Kiểm tra kỹ thuật
Vị trí và Kích thước hố đào | Bằng mắt, thước thép
Độ dốc mái Taluy | Bằng mắt, thước thép
Cao trình đáy hố đào | Máy trắc đạc, thước thép
Theo dõi sự sạt lở của công tác đào đất | Mắt thường
An toàn | Mắt thường
Các hố thu và rãnh gom nước mặt | Mắt thường
Đầm chặt đáy hố đào theo biện pháp thi công | Bằng mắt
Cao trình đáy hố đào sau khi hoàn thành đầm chặt | Máy trắc đạc, thước thép
Kết quả kiểm tra độ chặt của đáy hố đào (nếu có, theo BPTC được duyệt) | Kết quả thí nghiệm`),
 CL('CL_DAPDAT','DAP','Checklist kiểm tra công tác đắp đất','CÔNG TÁC ĐẮP ĐẤT','AB',`# Kiểm tra công tác chuẩn bị
Biện pháp thi công | Bằng mắt
Vật liệu đất sử dụng để đắp | Máy trắc đạc
Máy móc, thiết bị phục vụ thi công | Bằng mắt
# Kiểm tra kỹ thuật
Chất lượng của vật liệu sử dụng đắp đất | Bằng mắt, kết quả thí nghiệm
Chiều dày từng lớp đắp | Bằng mắt, thước thép
Vị trí và kích thước khu vực đắp | Máy trắc đạc, thước thép
Kết quả kiểm tra độ chặt của đất đắp (nếu có, theo BPTC được duyệt) | Kết quả thí nghiệm
Cao trình lớp đắp hoàn thiện | Máy trắc đạc, thước thép`),
 CL('CL_THEP','CT','Checklist kiểm tra công tác cốt thép','CÔNG TÁC GIA CÔNG LẮP DỰNG CỐT THÉP','num',`# Kiểm tra công tác chuẩn bị
Kết quả thí nghiệm thép: Kéo, uốn, giới hạn chảy… | Bằng mắt
Chứng chỉ xuất xưởng vật liệu thép | Bằng mắt
# Kiểm tra gia công và lắp dựng
Đường kính, chủng loại thép | Thước kẹp cơ khí, nhãn mác
Vệ sinh bề mặt thép | Bằng mắt
Độ thẳng của thanh thép | Bằng mắt, dây rọi
Sai lệch chiều dài của thanh thép | Bằng thước thép
Sai lệch về vị trí điểm uốn | Bằng thước thép
Chiều dài, hình dạng thanh thép neo | Bằng mắt, thước thép
Chiều dài, hình dạng thanh thép cấu tạo | Bằng mắt, thước thép
Vị trí lắp đặt các thanh thép | Bằng mắt, thước thép
Thép đỡ, thép giá, con kê | Bằng mắt, thước thép
Khoảng cách các thanh thép | Bằng mắt, thước thép
Số lượng các thanh thép | Bằng mắt
Lắp đặt V mương | Bằng mắt
Cốt thép chờ | Bằng mắt, thước thép
Liên kết, độ ổn định của các thanh thép | Bằng mắt`),
 CL('CL_VANKHUON','VK','Checklist kiểm tra công tác ván khuôn','CÔNG TÁC GIA CÔNG LẮP DỰNG VÁN KHUÔN','num',`# Kiểm tra công tác chuẩn bị
Theo biện pháp thi công được duyệt | Biện pháp được duyệt
Chủng loại ván khuôn | Bằng thước thép, nhãn mác
Chủng loại hệ giằng | Bằng thước thép, nhãn mác
Chủng loại cây chống | Bằng thước thép, nhãn mác
Chống dính bề mặt: Biện pháp/ vật liệu chống dính | Bằng mắt
# Kiểm tra gia công và lắp dựng
Hình dạng bề mặt ván khuôn hoàn thành | Bằng mắt, thước thép
Kích thước theo các phương | Bằng thước thép
Số lượng hệ giằng, cây chống | Bằng mắt
Độ phẳng, độ thẳng bề mặt ván khuôn | Bằng dây dọi
Cao trình hoàn thiện lắp đặt ván khuôn | Thước thép, máy thủy bình
Độ kín, khít của mối nối | Bằng mắt, thước thép
Độ ổn định hệ giằng, cây chống | Bằng mắt, gõ búa
Độ ổn định các liên kết | Bằng mắt, gõ búa
Chi tiết chờ, đặt sẵn, lỗ mở | Bằng mắt, thước thép
Độ ổn định của sàn thao tác | Bằng mắt
Vệ sinh sau khi gia công lắp dựng | Bằng mắt`),
 CL('CL_BTLOT','BTLOT','Checklist kiểm tra công tác bê tông lót','CÔNG TÁC ĐỔ BÊ TÔNG LÓT','num',`# Kiểm tra công tác tổ chức thi công
Theo biện pháp thi công được duyệt | Bằng mắt
Hoạt động của máy móc, thiết bị, dụng cụ thi công | Bằng mắt
Nguồn điện phục vụ thi công | Bằng mắt
Nguồn sáng phục vụ thi công | Bằng mắt
Thiết bị/ vật tư che phủ bề mặt Bê tông sau khi đổ | Bằng mắt
Tưới nước trước khi đổ Bê tông | Bằng mắt
Số lượng nhân công phục vụ thi công | Bằng mắt
# Kiểm tra kỹ thuật
Công tác lấy mẫu, kiểm tra độ sụt Bê tông tại hiện trường | Bằng mắt, thước thép
Cao trình, lưới trục khu vực đổ Bê tông | Máy thủy bình, máy toàn đạc
Biện pháp đổ, đầm Bê tông | Bằng mắt
Khối lượng Bê tông được đổ | Bằng mắt
Công tác bảo dưỡng Bê tông đã đổ | Bằng mắt
Vệ sinh cốt thép chờ sau khi đổ Bê tông | Bằng mắt
Vệ sinh khu vực sau khi đổ Bê tông | Bằng mắt`),
 CL('CL_BETONG','BT','Checklist kiểm tra công tác bê tông','CÔNG TÁC BÊ TÔNG','num',`# Kiểm tra công tác tổ chức thi công
Theo biện pháp thi công được duyệt | Biện pháp được duyệt
Hoạt động của máy móc, thiết bị, dụng cụ thi công | Bằng mắt
Nguồn điện phục vụ thi công | Bằng mắt
Nguồn sáng phục vụ thi công | Bằng mắt
Thiết bị/ vật tư che phủ bề mặt Bê tông sau khi đổ | Bằng mắt
Sàn thao tác phục vụ thi công | Bằng mắt
Tưới nước, vệ sinh trước khi đổ Bê tông | Bằng mắt
Số lượng nhân công phục vụ thi công | Bằng mắt
Vệ sinh ván khuôn, bê tông lót trước khi đổ bê tông | Bằng mắt
# Kiểm tra kỹ thuật
Công tác lấy mẫu, kiểm tra độ sụt, nhiệt độ Bê tông tại hiện trường | Bằng mắt, thước thép
Cao trình, lưới trục khu vực đổ Bê tông | Máy thủy bình, máy toàn đạc
Chiều dày lớp Bê tông bảo vệ cốt thép | Máy thủy bình, máy toàn đạc, thước thép
Chi tiết, liên kết tại mạch ngừng Bê tông | Bằng mắt, thước thép
Xử lý tại mạch ngừng Bê tông | Bằng mắt, thước thép
Biện pháp đổ, đầm, hoàn thiện bề mặt Bê tông | Bằng mắt
Khối lượng Bê tông được đổ | Thước đo, tính toán
Công tác bảo dưỡng Bê tông đã đổ | Bằng mắt
Vệ sinh cốt thép chờ sau khi đổ Bê tông | Bằng mắt
Vệ sinh khu vực sau khi đổ Bê tông | Bằng mắt`,['lm']),
 CL('CL_THAOVK','TVK','Checklist kiểm tra tháo dỡ ván khuôn','CÔNG TÁC THÁO DỠ VÁN KHUÔN','num',`# Kiểm tra công tác tổ chức thi công
Phiếu KQTN cường độ bê tông của phòng thí nghiệm | Biện pháp được duyệt
Giá trị cường độ cần thiết cho phép tháo dỡ ván khuôn theo quy định | Bằng mắt
Biện pháp tháo dỡ coppha | Bằng mắt
# Kiểm tra kỹ thuật
Tuân thủ trình tự tháo dỡ được chấp thuận | Bằng mắt, thước thép
An toàn lao động cho công nhân trực tiếp tháo dỡ | Máy thủy bình, máy toàn đạc
Bề mặt bê tông và hình dạng của các cấu kiện sau khi tháo dỡ | Máy thủy bình, máy toàn đạc, thước thép
Giữ lại tất cả các đà giáo, cột chống của cấu kiện sắp đổ bê tông | Bằng mắt, thước thép
Kiểm tra bê tông sau khi tháo ván khuôn | Bằng mắt, thước thép
Vệ sinh dọn dẹp mặt bằng, vị trí thi công | Bằng mắt
Dưỡng hộ bê tông sau khi đổ | Thước đo, tính toán
Xử lý bê tông vỡ và các vết nứt thấy được | Bằng mắt
Độ chính xác & kích thước của các cấu kiện | Bằng mắt
Độ sạch của thép chờ | Bằng mắt
Vệ sinh dọn dẹp mặt bằng, vị trí thi công | Bằng mắt`),
 CL('CL_R28','R28','Checklist kiểm tra chất lượng bê tông sau 28 ngày','CHẤT LƯỢNG BÊ TÔNG','flat',`Cấp phối bê tông | Thiết kế cấp phối
Kích thước hình học | Bằng thước thép
Bề mặt bê tông không nứt, không rỗ mặt | Bằng mắt
Số lượng mẫu nén thí nghiệm kiểm tra chất lượng bê tông đúng theo quy định. | Bằng mắt
Kết quả nén kiểm tra chất lượng bê tông | Kết quả
Kết quả kiểm tra chống thấm của bê tông (nếu có) | Kết quả`),
 CL('CL_BANGCN','BCN','Checklist kiểm tra lắp đặt băng cản nước','CÔNG TÁC LẮP ĐẶT BĂNG CẢN NƯỚC','num',`# Kiểm tra công tác chuẩn bị
Theo biện pháp thi công được duyệt | Bằng mắt
Các kết quả kiểm tra chất lượng vật liệu | Bằng mắt
Hồ sơ nghiệm thu vật liệu | Bằng mắt
# Kiểm tra lắp đặt trước khi đổ bê tông
Chủng loại vật tư, hình dáng, kích thước, màu sắc | Bằng mắt, thước thép, nhãn mác
Vị trí và cao độ lắp đặt băng cản nước đúng theo thiết kế | Thước thép, máy thủy bình
Băng cản nước được cố định chắc chắn, đảm bảo không dịch chuyển trong quá trình đổ bê tông | Bằng mắt
Băng cản nước được lắp đặt tạo thành một hệ liên tục và còn nguyên vẹn không rách và không có khuyết tật | Bằng mắt
Độ thẳng và độ phẳng của băng cản nước sau khi lắp đặt | Bằng mắt, thước thép, dây rọi
Chất lượng mối nối | Bằng mắt
Vệ sinh sau khi lắp đặt | Bằng mắt`),
 CL('CL_VKBTLOT','BTL','Checklist kiểm tra ván khuôn và đổ bê tông lót','CÔNG TÁC VÁN KHUÔN VÀ ĐỔ BÊ TÔNG LÓT','AB',`# Công tác copha
Vật liệu làm ván khuôn, cây chống, giàn giáo | Quan sát
Biện pháp thi công ván khuôn, cây chống, giàn giáo của NT | BPTC
Định vị, kích thước | Thước thép
Kiểm tra công tác chống dính bề mặt coffa | Quan sát
Kích thước lọt lòng các chiều và tim trục có đúng theo bản vẽ thiết kế | Thước thép
Sự ổn định, vững chắc của hệ văng-chống-giằng | Quan sát
Độ phẳng, thẳng, kín khít mí nối | Quan sát (≤ 3mm)
Cao độ đổ BT: đánh dấu cao độ | Thước thép
# Công tác bê tông
Vệ sinh, trải nilon | Quan sát
Cao độ chuẩn bị đổ bê tông | Máy thủy bình
Cấp phối bê tông cho hạng mục, công trình | Thành phần cấp phối được duyệt
Các thiết bị cần thiết: đèn, bạt che mưa, khuôn đúc mẫu, máy đầm… | Quan sát
Xuất trình phiếu giao nhận mỗi xe bê tông | Bằng mắt
Kiểm tra độ sụt và lấy mẫu bê tông | Côn và thước thép (± 2cm)
Hoàn thiện bề mặt | Quan sát`,['lm']),
 CL('CL_SAUBT','SBT','Checklist kiểm tra công tác sau khi đổ bê tông','CÔNG TÁC SAU KHI ĐỔ BÊ TÔNG','flat',`Bảo dưỡng bê tông sau khi đổ | Quan sát, BPTC
Xử lý bê tông vỡ và các vết nứt thấy được (nếu có) | Thực tế
Độ chính xác & kích thước của các cấu kiện | Bản vẽ, thước
Kiểm tra tim trục | Máy toàn đạc
Kiểm tra cao độ | Máy thủy bình
Độ sạch của thép chờ | Quan sát
Ống chờ/lỗ mở của điện & nước bị sai lệch | Quan sát
Kết quả mẫu nén | Theo kết quả thí nghiệm (đạt tối thiểu 50% R28)`),
 CL('CL_TRACDAC','TĐ','Checklist kiểm tra cao độ, tim trục trước khi đổ bê tông','CÔNG TÁC TRẮC ĐẠC CAO ĐỘ, TIM TRỤC','num',`# Công tác chuẩn bị
Nguồn gốc xuất xứ thiết bị | Hồ sơ
Thời hạn sử dụng | Hồ sơ
Tem/phiếu kiểm định thiết bị | Hồ sơ
Chứng chỉ vận hành thiết bị | Hồ sơ
# Công tác thi công chính
Tọa độ, cao độ điểm số 01 (X, Y, Z) | Máy toàn đạc
Tọa độ, cao độ điểm số 02 (X, Y, Z) | Máy toàn đạc
Tọa độ, cao độ điểm số 03 (X, Y, Z) | Máy toàn đạc
Tọa độ, cao độ điểm số 04 (X, Y, Z) | Máy toàn đạc`),
 CL('CL_HOANCONG','HCTĐ','Checklist hoàn công cao độ, tim trục sau khi đổ bê tông','HOÀN CÔNG CAO ĐỘ, TIM TRỤC SAU KHI ĐỔ BÊ TÔNG','num',`# Công tác chuẩn bị
Tem/phiếu kiểm định thiết bị | Hồ sơ
Chứng chỉ vận hành thiết bị | Hồ sơ
# Công tác hoàn công
Tim trục cấu kiện sau khi đổ bê tông | Máy toàn đạc
Cao độ mặt bê tông sau khi đổ | Máy thủy bình
Kích thước hình học cấu kiện | Thước thép
Độ phẳng bề mặt | Thước, máy thủy bình`),
 CL('CL_SANSUA','SSTPDC','Checklist san sửa, tạo phẳng, đầm chặt, trải nilong','CÔNG TÁC SAN SỬA, TẠO PHẲNG, ĐẦM CHẶT, TRẢI NILONG','num',`# Công tác chuẩn bị
Biện pháp thi công phê duyệt | Bằng mắt
Các thay đổi so với thiết kế ban đầu (nếu có) | Bằng mắt
# Công tác thi công chính
Tình trạng địa chất lớp đáy so với thiết kế | Bằng mắt
Cắm mốc tim trục, ranh giới khu thi công | Máy trắc đạc
Kích thước cấu kiện (dài, rộng) | Bằng thước
Hệ thống rãnh và bơm thoát nước | Bằng mắt
Độ bằng phẳng | Bằng mắt
Đầm chặt nền đất | Bằng mắt, kết quả thí nghiệm
Trải nilong lót | Bằng mắt
Vệ sinh khu vực thi công | Bằng mắt`),
 CL('CL_DUCCOC','DDC','Checklist đục, cắt đầu cọc','CÔNG TÁC ĐỤC, CẮT ĐẦU CỌC','num',`# Công tác chuẩn bị
Biện pháp thi công phê duyệt | Hồ sơ
Biện pháp an toàn thi công | Hồ sơ
Chuẩn bị máy và thiết bị thi công | Quan sát
# Công tác thi công chính
Tọa độ cọc | Máy toàn đạc
Cao độ cắt cọc | Máy thủy bình
Bề mặt bê tông sau khi đục | Quan sát
Vệ sinh bề mặt bê tông | Quan sát
Nắn chỉnh, vệ sinh thép chờ sau khi đục | Quan sát`),
]}
const isCL=t=>t&&t.kind==='cl';

/* =================== Data model =================== */
function blankProject(){return{name:'Khu Đô Thị Hỗn Hợp Du Lịch Sinh Thái Núi Ông Quán',hangMuc:'Thi công phần thô kết cấu Block 4.5',location:'An Thới, Đặc Khu Phú Quốc, Tỉnh An Giang',city:'Phú Quốc',
  investor:'Công ty TNHH Mặt Trời Phú Quốc',qlda:'Ban Quản lý dự án',supervisor:'Công Ty Cổ Phần Tư Vấn Công Nghệ, Thiết Bị Và Kiểm Định Xây Dựng – CONINCO',supShort:'CONINCO',
  mainC:'Công ty TNHH Xây dựng Nam Đảo',subC:'Công ty Cổ phần Xây dựng Central',contract:'333A/2025/HĐ/PCC-CENTRAL',lab:'',place:'Công trường thi công',numPrefix:'NOQ/CEN/KC',xeM3:8,tanSuat:20}}
function buildDemo(){
  if(typeof SEED!=='undefined'&&SEED)return JSON.parse(JSON.stringify(SEED));
  return{v:3,project:blankProject(),hms:[{id:'h1',name:'Block 4.5',code:'4.5'}],people:[],templates:defaultTemplates(),wbs:[],tasks:[],plans:[],bbnt:[],payments:[]};
}
const leadNo=s=>parseInt(String(s||''),10)||0;
function genNos(S,t){
  const hm=S.hms.find(h=>h.name===t.hm)||S.hms[0]||{code:''};const P=S.project;
  const same=S.bbnt.filter(b=>{const tt=S.tasks.find(x=>x.id===b.taskId);return tt&&tt.code===t.code&&tt.hm===t.hm});
  const n=Math.max(0,...same.map(b=>leadNo(b.no)))+1;
  const base=[n,P.numPrefix,hm.code,t.code].filter(x=>x!==''&&x!=null).join('/');
  const tps=(t.tpls||[]).map(id=>S.templates.find(x=>x.id===id)).filter(Boolean);
  return{seq:n,no:`${base}/BBNT`,pycNo:`${base}/YCNT`,lmNo:`${base}/BBLM`,dbtNo:`${base}/PYC-ĐBT`,
    clNos:tps.map(tp=>`${base}/BBKT/${tps.length>1&&tps.some(x=>x.code==='BT')?'BT':tp.code}`)};
}
function defSig(S){
  const last=S.bbnt[S.bbnt.length-1];if(last&&last.sig)return Object.assign({},last.sig);
  const f=o=>(S.people.find(p=>p.org===o&&p.sign)||S.people.find(p=>p.org===o)||{}).id||'';
  return{TVGS:f('TVGS'),NTC:f('NTC'),NTP:(S.people.find(p=>p.org==='NTP'&&!/chỉ huy/i.test(p.title))||{}).id||f('NTP'),CHT:(S.people.find(p=>/chỉ huy/i.test(p.title))||{}).id||''};
}
function mkCls(S,tpls,nos){return(tpls||[]).map((id,i)=>{const tp=S.templates.find(x=>x.id===id);if(!isCL(tp))return null;const checks=[];tp.groups.forEach(g=>g.items.forEach(([item,method])=>checks.push({g:g.g,item,method,result:'',note:''})));
  return{tpl:id,no:(nos&&nos[i])||'',numStyle:tp.numStyle,checks}}).filter(Boolean)}
function newBbntObj(S,taskId,planId,title,zone){
  const t=S.tasks.find(x=>x.id===taskId)||{};const N=genNos(S,t);const cls=mkCls(S,t.tpls,N.clNos);
  const ex=cls.flatMap(c=>(S.templates.find(x=>x.id===c.tpl)||{}).extra||[]);
  const d=nowISO();
  return{id:uid(),planId:planId||null,taskId,title:title||t.name||'',viTri:zone||'',place:S.project.place||'Công trường thi công',ck:t.ck||'',
    seq:N.seq,no:N.no,pycNo:N.pycNo,lmNo:N.lmNo,dbtNo:N.dbtNo,cls,
    docs:{pyc:true,ntcv:true,cl:cls.length>0,dbt:ex.includes('dbt'),lm:ex.includes('lm')},
    pycDate:d,start:'',end:'',clDate:d,lmDate:d,created:d,sig:defSig(S),
    mac:'',doSut:'',banVe:'',klLT:'',klTT:'',r7:'',r28:'',
    note:'',conclusion:'',dbt:{time:'',capPhoi:'',doSut:'',kl:'',ycMau:'',slMau:'',ykien:'',concl:''},
    lm:{phuongPhap:'',size:'150*150*150 (mm)',rows:[]},
    status:'draft',returnReason:'',archived:false,archiveLoc:'',sign:{st:'chua'},history:[]};
}
/* ---------- Nhập sheet DATA (Excel) ---------- */
const CLMAP=x=>{x=x.toLowerCase();
  if(/đục|cắt đầu cọc/.test(x))return['CL_DUCCOC'];
  if(/san sửa|trải nilong/.test(x))return['CL_SANSUA'];
  if(/hoàn công/.test(x))return['CL_HOANCONG'];
  if(/cao độ.*trước khi đổ/.test(x))return['CL_TRACDAC'];
  if(/tháo ván khuôn/.test(x))return['CL_THAOVK'];
  if(/sau khi đổ bê tông/.test(x))return['CL_R28'];
  if(/bê tông lót/.test(x))return['CL_VKBTLOT'];
  if(/cốt thép/.test(x)&&/bê tông/.test(x))return['CL_THEP','CL_VANKHUON','CL_BETONG'].concat(/băng cản nước/.test(x)?['CL_BANGCN']:[]);
  if(/cốt thép/.test(x))return['CL_THEP','CL_VANKHUON'];
  if(/bê tông/.test(x))return['CL_BETONG'];
  return[]};
function xlDate(v){if(v==null||v==='')return null;if(v instanceof Date){const t=new Date(v.getTime()+12*3600e3);return new Date(t.getFullYear(),t.getMonth(),t.getDate())}if(typeof v==='number'){const d=new Date(Math.round((v-25569)*864e5));return new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())}const m=String(v).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{2,4}))?$/);if(m){let y=+(m[3]||new Date().getFullYear());if(y<100)y+=2000;return new Date(y,+m[2]-1,+m[1])}const d=new Date(v);return isNaN(d)?null:d}
function withTime(d,t){if(!d)return'';const x=new Date(d);const m=String(t||'').match(/(\d{1,2})\s*[h:]\s*(\d{0,2})/i);if(m){x.setHours(+m[1],+(m[2]||0),0,0)}else x.setHours(8,0,0,0);return toISO(x)}
function numCode(no,blk){const p=String(no||'').split('/').map(s=>s.trim());p.pop();let i=p.indexOf(blk);if(i<0)i=p.indexOf('CEN');return p.slice(i+1).filter(x=>!/^(BBNT|YCNT|BBKT)$/.test(x)).join('/')}
function importDATA(S,rows,opts){
  const P=S.project;const secN={};let occ=1;let section='',added=0,skipped=0,updated=0;const key=(n,w)=>n+'|'+String(w||'').replace(/\s+/g,' ').trim();const nos=new Set(S.bbnt.map(b=>key(b.no,b.viTri)));
  const person=(name,org,title,duty)=>{name=String(name||'').trim();if(!name)return'';let p=S.people.find(x=>x.name===name&&x.org===org);
    if(!p){p={id:uid(),name,org,title,duty,sign:true};S.people.push(p)}return p.id};
  for(let r=(opts&&opts.from!=null?opts.from:21);r<rows.length;r++){const R=rows[r]||[];const g=i=>R[i]==null?'':R[i];
    const S18=String(g(18)).trim();
    if(!S18){const a=String(g(0)).trim();if(a&&isNaN(+a)){section=a;secN[a]=(secN[a]||0)+1;occ=secN[a]}continue}
    const T=String(g(19)).trim()||S18.replace(/YCNT$/,'BBNT');
    const blk=String(g(24)).trim()||'4.5';const hmName='Block '+blk;
    if(!S.hms.some(h=>h.name===hmName))S.hms.push({id:uid(),name:hmName,code:blk});
    const X=String(g(23)).replace(/\s+/g,' ').trim();const W=String(g(22)).replace(/\s+/g,' ').trim();
    if(nos.has(key(T,W))){
      if(opts&&opts.update){const ex=S.bbnt.find(b=>key(b.no,b.viTri)===key(T,W));
        if(ex&&ex.imported&&!['check','approve'].includes(ex.status)){const snap=()=>JSON.stringify(['title','pycNo','start','end','pycDate','clDate','lmDate','lmNo','mac','doSut','banVe','klLT','klTT','r7','r28','sig'].map(k=>ex[k]).concat([!!ex.startNoTime,!!ex.endNoTime,ex.cls.map(c=>c.no)]));const before=snap();
          const dY=xlDate(g(2)),dN=xlDate(g(6))||dY,dK=xlDate(g(10))||dN,dO=xlDate(g(14))||dN;
          const st=withTime(dN,g(28));let en=withTime(dN,g(29));if(en&&st&&en<st)en=addDays(en,1);
          const num=v=>{const n=parseFloat(String(v).replace(',','.'));return isNaN(n)?'':n};
          const per=(name,org,title,duty)=>{name=String(name||'').trim();if(!name)return'';let p=S.people.find(x=>x.name===name&&x.org===org);if(!p){p={id:uid(),name,org,title,duty,sign:true};S.people.push(p)}return p.id};
          Object.assign(ex,{title:X,pycNo:S18,start:st,end:en,startNoTime:!g(28),endNoTime:!g(29),pycDate:dY?toISO(dY):st,clDate:dK?toISO(dK):st,lmDate:dO?toISO(dO):st,
            lmNo:String(g(21)).trim(),mac:String(g(25)).trim(),doSut:String(g(27)).trim(),banVe:String(g(26)).trim(),klLT:num(g(35)),klTT:num(g(36)),
            r7:xlDate(g(37))?toISO(xlDate(g(37))).slice(0,10):'',r28:xlDate(g(38))?toISO(xlDate(g(38))).slice(0,10):'',
            sig:{TVGS:per(g(34),'TVGS','Giám sát viên','Phê duyệt'),NTC:per(g(32),'NTC','Giám sát BĐH','Kiểm tra'),NTP:per(g(33),'NTP','Cán bộ kỹ thuật','Thực hiện'),CHT:per(g(31),'NTP','Chỉ huy trưởng','Thực hiện')}});
          ex.docs.lm=!!ex.lmNo;const U=String(g(20)).trim();if(U)ex.cls.forEach(c=>c.no=U);
          const p=S.plans.find(x=>x.id===ex.planId);if(p&&st)p.date=st;
          const cst=opts.colors&&CLR2SG[opts.colors[r]];let sgCh=false;if(cst){const g=sg(ex);if(g.auto||SGK.indexOf(cst)>SGK.indexOf(g.st)){if(g.st!==cst){g.st=cst;sgCh=true}delete g.auto;g.fromExcel=true;if(cst==='trinh'&&!g.trinhAt)g.trinhAt=st}}
          if(snap()!==before||sgCh){updated++;(ex.history=ex.history||[]).push({t:nowISO(),who:'Đồng bộ Excel',a:'Cập nhật từ sheet DATA'})}}}
      skipped++;continue}
    const code=numCode(S18,blk);const tname=section||X;
    let t=(!section&&opts&&opts.task)?S.tasks.find(x=>x.id===opts.task):S.tasks.find(x=>x.name===tname&&x.hm===hmName&&(x.occ||1)===(section?occ:1));
    if(!t){t={id:uid(),occ:section&&occ>1?occ:undefined,congTac:X,wbs:code.split('/').pop()||code,name:tname,hm:hmName,bm:'Kết cấu',nhom:X.replace(/^Nghiệm thu (công tác )?/i,''),ck:'',itp:'',tpls:CLMAP(X),code};S.tasks.push(t);
      if(!S.wbs.some(w=>w.code===t.wbs))S.wbs.push({id:uid(),code:t.wbs,name:tname,hm:hmName,bm:'Kết cấu',unit:'m3',qty:0})}
    const dY=xlDate(g(2)),dN=xlDate(g(6))||dY,dK=xlDate(g(10))||dN,dO=xlDate(g(14))||dN;
    const start=withTime(dN,g(28));let end=withTime(dN,g(29));if(end&&start&&end<start)end=addDays(end,1);
    const U=String(g(20)).trim(),V=String(g(21)).trim();
    const tp2=CLMAP(X);const cls=tp2.map(id=>({tpl:id,no:U,numStyle:(S.templates.find(x=>x.id===id)||{}).numStyle||'num',checks:null}));
    const plan={id:uid(),taskId:t.id,date:start,zone:W,title:`${X} ${W}`.trim()};S.plans.push(plan);
    const sig={TVGS:person(g(34),'TVGS','Giám sát viên','Phê duyệt'),NTC:person(g(32),'NTC','Giám sát BĐH','Kiểm tra'),NTP:person(g(33),'NTP','Cán bộ kỹ thuật','Thực hiện'),CHT:person(g(31),'NTP','Chỉ huy trưởng','Thực hiện')};
    const num=v=>{const n=parseFloat(String(v).replace(',','.'));return isNaN(n)?'':n};
    const b={id:uid(),planId:plan.id,taskId:t.id,title:X,viTri:W,place:P.place||'Công trường thi công',ck:'',seq:leadNo(S18),no:T,pycNo:S18,lmNo:V,dbtNo:'',cls,
      docs:{pyc:true,ntcv:true,cl:cls.length>0,dbt:false,lm:!!V},
      pycDate:dY?toISO(dY):start,start,end,clDate:dK?toISO(dK):start,lmDate:dO?toISO(dO):start,created:start,sig,
      mac:String(g(25)).trim(),doSut:String(g(27)).trim(),banVe:String(g(26)).trim(),klLT:num(g(35)),klTT:num(g(36)),
      r7:xlDate(g(37))?toISO(xlDate(g(37))).slice(0,10):'',r28:xlDate(g(38))?toISO(xlDate(g(38))).slice(0,10):'',
      note:'',conclusion:'',dbt:{time:'',capPhoi:'',doSut:'',kl:'',ycMau:'',slMau:'',ykien:'',concl:''},lm:{phuongPhap:'',size:'150*150*150 (mm)',rows:[]},
      status:opts&&opts.status||'approved',returnReason:'',archived:false,archiveLoc:'',imported:true,
      tLM:String(g(30)).trim(),history:[{t:start||nowISO(),who:'Nhập từ Excel',a:'Nhập từ sheet DATA'}]};
    if(!g(28))b.startNoTime=true;if(!g(29))b.endNoTime=true;
    const cst=opts&&opts.colors&&CLR2SG[opts.colors[r]];if(cst){b.sign={st:cst,fromExcel:true};if(cst==='trinh')b.sign.trinhAt=start||''}else sgDefaultImported(b);
    S.bbnt.push(b);nos.add(key(T,W));added++;
  }
  return{added,skipped,updated};
}

/* =================== State =================== */
const LS='hsnt_app_v4';
let S;
function load(){if(typeof FS_ON!=='undefined'&&FS_ON){S=buildDemo();return}try{const r=localStorage.getItem(LS);if(r){S=JSON.parse(r);return}}catch(e){}S=buildDemo()}
/* =================== Đồng bộ đám mây: web ↔ desktop ↔ máy khác (cùng tài khoản) =================== */
var CLD={db:null,uid:null,ready:false,busy:false,again:false,t:null,boot:false,pulling:false,
  dev:(()=>{try{let d=localStorage.getItem(LS+'_dev');if(!d){d=Math.random().toString(36).slice(2,10);localStorage.setItem(LS+'_dev',d)}return d}catch(e){return 'dev'}})()};
const clRef=k=>CLD.db.doc('data/users/'+CLD.uid+'/'+k);
function clStat(t){CLD.stat=t;const e=document.getElementById('cloudSt');if(e)e.innerHTML=t}
async function clGz(str){const cs=new Blob([str]).stream().pipeThrough(new CompressionStream('gzip'));const u=new Uint8Array(await new Response(cs).arrayBuffer());
  let b='';for(let i=0;i<u.length;i+=32768)b+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(b)}
async function clUngz(b64){const bin=atob(b64);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const ds=new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'));return await new Response(ds).text()}
function clLocalSave(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
function cloudSoon(){if(!CLD.ready)return;clearTimeout(CLD.t);clStat('⟳ Chờ đồng bộ…');CLD.t=setTimeout(clPush,2500)}
async function clPush(){if(!CLD.ready)return;if(CLD.busy){CLD.again=true;return}CLD.busy=true;clStat('⟳ Đang đồng bộ…');
  try{const rev=(S._rev||0)+1;S._rev=rev;S._dirty=false;const z=await clGz(JSON.stringify(S));const N=180000;const n=Math.max(1,Math.ceil(z.length/N));
    for(let i=0;i<n;i++)await clRef('c'+i).set({d:z.slice(i*N,(i+1)*N)});
    await clRef('meta').set({rev,n,at:nowISO(),by:CLD.dev,cnt:S.bbnt.length});CLD.lastRev=rev;clLocalSave();clStat('☁ Đã đồng bộ');await clPushXl();await clPushSigns()}
  catch(e){S._dirty=true;clLocalSave();clStat('<span style="color:#b45309">☁ Chưa đồng bộ được</span>');console.error(e)}
  CLD.busy=false;if(CLD.again){CLD.again=false;clPush()}}
async function clPull(m){CLD.pulling=true;clStat('⟳ Đang tải dữ liệu đồng bộ…');
  try{let z='';for(let i=0;i<m.n;i++){const d=await clRef('c'+i).get();if(!d.exists)throw new Error('thiếu phần '+i);z+=d.data().d}
    const obj=JSON.parse(await clUngz(z));if(!obj||!Array.isArray(obj.bbnt))throw new Error('dữ liệu hỏng');
    try{localStorage.setItem(LS+'_bak',JSON.stringify(S))}catch(e){}
    S=obj;S._rev=m.rev;S._dirty=false;CLD.lastRev=m.rev;CLD.boot=true;postLoad();CLD.boot=false;clLocalSave();render();clStat('☁ Đã đồng bộ');await clPushXl();await clPushSigns()}
  catch(e){clStat('<span style="color:#b45309">☁ Chưa tải được dữ liệu đồng bộ</span>');console.error(e)}
  CLD.pulling=false}
function clChoose(m){const loc=S.bbnt.length;
  $('#modal').innerHTML=`<h3>Đồng bộ dữ liệu giữa các máy</h3><p>Đã có dữ liệu đồng bộ từ máy khác (cập nhật ${fmtDT(m.at)}, <b>${m.cnt||'?'}</b> hồ sơ). Máy này đang có <b>${loc}</b> hồ sơ.</p><p>Chọn bản dùng chung cho mọi máy (web, desktop):</p>
  <div class="acts"><button class="btn" data-act="clUseRemote">Dùng bản đã đồng bộ</button><button class="btn p" data-act="clUseLocal">Dùng bản trên máy này</button></div>`;
  CLD.pendMeta=m;$('#modalBg').classList.add('on')}
const CLOUD_OFF=true;/* đã chuyển lưu dữ liệu sang ổ D: */
async function cloudInit(){try{if(CLOUD_OFF||!(window.claude&&typeof window.claude.use==='function'))return;clStat('⟳ Đang kết nối đồng bộ…');
  const db=await window.claude.use('db');const us=await window.claude.use('user');if(!db||!us){clStat('<span style="color:#b45309">☁ Cửa sổ này không hỗ trợ đồng bộ</span>');return}const uid=await us.id();if(!uid){clStat('<span style="color:#b45309">☁ Chưa đăng nhập – không đồng bộ</span>');return}
  CLD.db=db;CLD.uid=uid;const ms=await clRef('meta').get();CLD.ready=true;
  if(!ms.exists){await clPush()}
  else{const m=ms.data();if(S._rev==null)clChoose(m);else if(m.rev>S._rev){if(S._dirty&&String(S._at||'')>String(m.at||''))await clPush();else await clPull(m)}else if(S._dirty)await clPush();else{clStat('☁ Đã đồng bộ');await clPushXl();await clPushSigns()}}
  clRef('meta').onSnapshot(sn=>{if(!sn.exists)return;const m=sn.data();if(m.by===CLD.dev||m.rev<=(S._rev||0)||CLD.pendMeta)return;
    if(S._dirty||CLD.busy||X.ed||$('#modalBg').classList.contains('on'))return;clPull(m)},e=>console.error(e))}
  catch(e){console.error(e);clStat('<span style="color:#b45309">☁ Lỗi đồng bộ: '+esc((e&&(e.code||e.message))||'')+'</span>')}}
/* =================== Lưu dữ liệu trên máy: D:\QuanLyHoSo\data\hoso.json =================== */
var FS={dir:null,ok:false,t:null,busy:false,again:false,pend:null};
window.addEventListener('focus',()=>{if(typeof FS!=='undefined'&&FS.ok)fsExternal().then(()=>fsInbox())});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&typeof FS!=='undefined'&&FS.ok)fsExternal().then(()=>fsInbox())});setInterval(()=>{if(typeof FS!=='undefined'&&FS.ok&&!document.hidden)fsInbox()},20000);
const FS_ON=!(window.claude&&typeof window.claude.use==='function')&&typeof window.showDirectoryPicker==='function';
function idb(){return new Promise((res,rej)=>{const q=indexedDB.open('hsnt_fs',1);q.onupgradeneeded=()=>q.result.createObjectStore('h');q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function idbGet(k){const d=await idb();return new Promise(r=>{const q=d.transaction('h').objectStore('h').get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)})}
async function idbSet(k,v){const d=await idb();return new Promise(r=>{const t=d.transaction('h','readwrite');t.objectStore('h').put(v,k);t.oncomplete=()=>r();t.onerror=()=>r()})}
function fsStat(t){const e=document.getElementById('cloudSt');if(e)e.innerHTML=t}
function fsGate(show,msg){let g=document.getElementById('fsGate');if(!show){if(g)g.remove();return}
  if(!g){g=document.createElement('div');g.id='fsGate';document.body.appendChild(g)}
  g.innerHTML=`<div class="box"><h3 style="margin:0 0 8px">📁 Dữ liệu hồ sơ lưu trên máy</h3><p style="margin:0 0 12px;line-height:1.5">${msg||'Bấm nút dưới đây và chọn thư mục <b>D:\\QuanLyHoSo</b> (thư mục chứa file app này).'}</p><button class="btn p" data-act="fsOpen">Mở dữ liệu ổ D:</button></div>`}
async function fsInit(){if(!FS_ON)return;try{const h=await idbGet('dir');
  if(h){const p=await h.queryPermission({mode:'readwrite'});if(p==='granted'){FS.dir=h;await fsLoad();return}FS.pend=h;fsGate(true,`Cho phép app đọc/ghi thư mục <b>${esc(h.name)}</b> để mở dữ liệu hồ sơ.`);return}
  fsGate(true)}catch(e){console.error(e);fsGate(true)}}
async function fsOpen(){try{let h=null;
  if(FS.pend){const p=await FS.pend.requestPermission({mode:'readwrite'});if(p==='granted')h=FS.pend}
  if(!h){h=await window.showDirectoryPicker({id:'hsnt',mode:'readwrite'});await idbSet('dir',h)}
  FS.dir=h;FS.pend=null;await fsLoad()}catch(e){if(e&&e.name==='AbortError')return;console.error(e);toast('Không mở được thư mục: '+(e.message||e))}}
async function fsRead(dir,name){try{const f=await (await dir.getFileHandle(name)).getFile();return await f.text()}catch(e){return null}}
async function fsWrite(dir,name,text){const fh=await dir.getFileHandle(name,{create:true});const w=await fh.createWritable();await w.write(text);await w.close()}
async function fsSync(){/* đọc sync.js trong thư mục dữ liệu (D:\QuanLyHoSo\sync.js) – dùng được cả khi mở app từ GitHub Pages */
  try{const t=await fsRead(FS.dir,'sync.js');if(!t)return;const i=t.indexOf('{'),j=t.lastIndexOf('}');const Y=JSON.parse(t.slice(i,j+1));
    const cur=window.SYNC;if(!cur||!cur.stamp||String(Y.at||'')>=String(cur.at||''))window.SYNC=Y}catch(e){console.error(e)}}
async function fsLoad(){const dd=await FS.dir.getDirectoryHandle('data',{create:true});const txt=await fsRead(dd,'hoso.json');await fsSync();FS.ok=true;
  let obj=null;if(txt){try{obj=JSON.parse(txt)}catch(e){toast('File hoso.json bị lỗi – đang dùng bản sao lưu gần nhất');obj=await fsLatestBackup(dd)}}
  if(obj&&Array.isArray(obj.bbnt)){S=obj;if(S._syncStamp==null&&window.SYNC&&S.syncInfo&&S.syncInfo.stamp===window.SYNC.stamp)S._syncStamp=String(window.SYNC.stamp)}
  CLD.boot=true;postLoad();CLD.boot=false;
  FS.ok=true;fsGate(false);FS.lastMod=await fsMod();await fsInbox();await fsSaveNow();render();fsStat('💾 Lưu tại '+esc(FS.dir.name)+'\\data')}
async function fsLatestBackup(dd){try{const b=await dd.getDirectoryHandle('backup',{create:true});let best=null;for await(const [n,h] of b.entries()){if(/^hoso_.*\.json$/.test(n)&&(!best||n>best[0]))best=[n,h]}if(!best)return null;return JSON.parse(await (await best[1].getFile()).text())}catch(e){return null}}
function fsSoon(){if(!FS.ok)return;clearTimeout(FS.t);fsStat('⟳ Đang lưu…');FS.t=setTimeout(fsSaveNow,1200)}
async function fsMod(){try{const dd=await FS.dir.getDirectoryHandle('data');return (await (await dd.getFileHandle('hoso.json')).getFile()).lastModified}catch(e){return 0}}
async function fsInbox(){/* D:\QuanLyHoSo\data\inbox\*.json: dữ liệu gửi vào app (vd. kỳ thanh toán) – nạp rồi xóa file */
  if(!FS.dir)return 0;let n=0;try{const dd=await FS.dir.getDirectoryHandle('data',{create:true});const ib=await dd.getDirectoryHandle('inbox',{create:true});const done=[];
    for await(const [name,h] of ib.entries()){if(!/\.json$/i.test(name)||h.kind!=='file')continue;try{const o=JSON.parse(await (await h.getFile()).text());
      if(o.replacePayments&&Array.isArray(o.payments)){S.payments=o.payments;n+=o.payments.length;o.payments=[]}
      (o.payments||[]).forEach(p=>{if(p&&p.id&&!S.payments.some(x=>x.id===p.id)){S.payments.push(p);n++}});done.push(name)}catch(e){console.error(e)}}
    for(const nm of done)await ib.removeEntry(nm)}catch(e){console.error(e)}
  if(n){save();render();toast('Đã cập nhật '+n+' kỳ thanh toán')}return n}
async function fsExternal(){/* file hoso.json bị sửa từ bên ngoài (Claude, máy khác…) sau lần đọc/ghi cuối của app → nạp lại thay vì ghi đè */
  if(!FS.ok||!FS.dir||FS.lastMod==null)return false;const m=await fsMod();if(!m||m<=FS.lastMod+500)return false;
  try{const dd=await FS.dir.getDirectoryHandle('data');const obj=JSON.parse(await (await (await dd.getFileHandle('hoso.json')).getFile()).text());if(!obj||!Array.isArray(obj.bbnt))return false;
    S=obj;CLD.boot=true;postLoad();CLD.boot=false;FS.lastMod=m;render();toast('Đã nạp dữ liệu mới trong ổ D: (file vừa được cập nhật)');return true}catch(e){console.error(e);return false}}
async function fsSaveNow(){if(!FS.ok||!FS.dir)return;if(FS.busy){FS.again=true;return}FS.busy=true;
  try{if(await fsExternal()){FS.busy=false;return}const dd=await FS.dir.getDirectoryHandle('data',{create:true});const j=JSON.stringify(S);await fsWrite(dd,'hoso.json',j);FS.lastMod=await fsMod();
    const bd=await dd.getDirectoryHandle('backup',{create:true});const nm='hoso_'+nowISO().slice(0,10)+'.json';await fsWrite(bd,nm,j);
    const L=[];for await(const [n] of bd.entries())if(/^hoso_.*\.json$/.test(n))L.push(n);L.sort();for(const n of L.slice(0,Math.max(0,L.length-30)))await bd.removeEntry(n);
    const d=new Date();fsStat(`💾 Đã lưu ổ D ${pad(d.getHours())}:${pad(d.getMinutes())}`)}
  catch(e){console.error(e);fsStat('<span style="color:#b45309">⚠ Chưa lưu được vào ổ D – '+esc(e.message||'')+'</span>')}
  FS.busy=false;if(FS.again){FS.again=false;fsSaveNow()}}
function save(){
  if(typeof CLD!=='undefined'&&!CLD.boot&&!CLD.pulling){S._dirty=true;S._at=nowISO();cloudSoon()}
  if(FS_ON){if(!CLD.boot)fsSoon();renderNav();return}
  try{localStorage.setItem(LS,JSON.stringify(S));const d=new Date();$('#saved').innerHTML=`✓ Đã lưu ${pad(d.getHours())}:${pad(d.getMinutes())}`}
  catch(e){$('#saved').innerHTML='<span style="color:#b45309">Chưa lưu được trên trình duyệt – hãy sao lưu JSON</span>'}
  renderNav();
}
load();
const UI={view:'data',user:'',role:'Thực hiện',sel:null,doc:'ntcv',f:{q:'',hm:'',nhom:'',ck:'',wbs:'',st:''},zoom:0.8,prev:true,expand:false,inTab:'wbs',planF:'all',planQ:'',libSel:'CL_DAODAT'};
try{const u=JSON.parse(localStorage.getItem(LS+'_ui')||'{}');if(u.user)UI.user=u.user;if(u.role)UI.role=u.role}catch(e){}
const saveUI=()=>{try{localStorage.setItem(LS+'_ui',JSON.stringify({user:UI.user,role:UI.role}))}catch(e){}};
const task=id=>S.tasks.find(t=>t.id===id);
const tplOf=id=>S.templates.find(t=>t.id===id);
function ensureCls(b){(b.cls||[]).forEach(c=>{if(!c.checks){c.checks=mkCls(S,[c.tpl],[c.no])[0]?.checks||[]}});return b}
const curB=()=>{const b=S.bbnt.find(b=>b.id===UI.sel);return b?ensureCls(b):b};
const me=()=>S.people.find(p=>p.id===UI.user)||{name:'Người dùng'};
const bOfPlan=pid=>S.bbnt.find(b=>b.planId===pid);
function planStatus(p){const b=bOfPlan(p.id);if(b)return b.status;return p.date<nowISO()?'overdue':'none'}
const editable=b=>b&&['draft','returned'].includes(b.status)&&UI.role==='Thực hiện';
const clCodes=ids=>(ids||[]).map(id=>(tplOf(id)||{}).code).filter(Boolean).join('+');
function docList(b){const L=[];if(b.docs.pyc)L.push(['pyc','Phiếu YCNT']);if(b.docs.ntcv)L.push(['ntcv','BB nghiệm thu']);
  if(b.docs.cl)b.cls.forEach((c,i)=>L.push(['cl'+i,'Phiếu KT '+((tplOf(c.tpl)||{}).code||'')]));if(b.docs.dbt)L.push(['dbt','PYC đổ BT']);if(b.docs.lm)L.push(['lm','BB lấy mẫu']);return L}
function sigP(b,k){return S.people.find(p=>p.id===(b.sig||{})[k])||null}

/* =================== Nav =================== */
const NAV=[
  ['TỔNG QUAN',[['dashboard','Dashboard','dash'],['flow','Lưu đồ quy trình','flow']]],
  ['CHUẨN BỊ',[['project','Thông tin dự án','users'],['library','Kho biểu mẫu','box'],['input','Nhập dữ liệu','grid']]],
  ['THỰC HIỆN',[['data','Data','grid'],['bbnt','Lập hồ sơ nghiệm thu','doc'],['register','Sổ theo dõi, xuất','list']]],
  ['TẬP HỢP HỒ SƠ',[['sign','Theo dõi ký hồ sơ','check'],['archive','Lưu trữ file gốc','archive'],['payment','Hồ sơ thanh toán','wallet'],['asbuilt','Hồ sơ hoàn công (WBS)','tree']]],
  ['HỆ THỐNG',[['system','Dữ liệu, hướng dẫn','gear']]],
];
function pendingForRole(){const m={'Thực hiện':'returned','Kiểm tra':'check','Phê duyệt':'approve'}[UI.role];return S.bbnt.filter(b=>b.status===m).length}
function renderNav(){
  $('#nav').innerHTML=NAV.map(([h,items])=>`<h6>${h}</h6>`+items.map(([k,l,i])=>{
    let bd='';
    if(k==='plan'){const n=S.plans.filter(p=>planStatus(p)==='overdue').length;if(n)bd=`<span class="bdg r">${n}</span>`}
    if(k==='sign'){const n=S.bbnt.filter(b=>['in','trinh'].includes(sg(b).st)).length;if(n)bd=`<span class="bdg y">${n}</span>`}
    if(k==='bbnt'){const n=pendingForRole();if(n)bd=`<span class="bdg y">${n}</span>`}
    return `<a class="${UI.view===k?'on':''}" data-act="go" data-id="${k}">${ic(i)}<span>${l}</span>${bd}</a>`}).join('')).join('');
}
function renderTop(){
  $('#pname').textContent=UP(S.project.name);$('#ppkg').textContent=S.project.hangMuc;
  $('#selUser').innerHTML=S.people.map(p=>`<option value="${p.id}" ${p.id===UI.user?'selected':''}>${esc(p.name)} · ${p.org==='CDT'?'BQLDA':p.org}</option>`).join('');
  $('#selRole').value=UI.role;
}

/* =================== Views =================== */
const V={};
V.dashboard=()=>{
  const all=S.bbnt;const cnt=k=>all.filter(b=>sg(b).st===k).length;const N=all.length;
  const pc=(a,b)=>b?Math.round(a/b*100):0;
  const nKy=cnt('ky'),nTr=cnt('trinh'),nIn=cnt('in'),nCh=cnt('chua');
  const age=b=>{const g=sg(b);return daysSince(g.st==='trinh'?(g.trinhAt||b.start):g.st==='in'?(g.inAt||b.start):b.start)};
  const months={};all.forEach(b=>{const m=(b.start||'').slice(0,7)||'—';(months[m]=months[m]||[]).push(b)});
  const mk=Object.keys(months).sort().reverse();
  const mName=m=>m==='—'?'Chưa có ngày':'Tháng '+(+m.slice(5,7))+'/'+m.slice(0,4);
  const wait=all.filter(b=>['in','trinh'].includes(sg(b).st)).sort((x,y)=>(age(y)||0)-(age(x)||0));
  const late=wait.filter(b=>age(b)>7).length;
  const kd=b=>sg(b).kyAt||b.start||'';const recent=all.filter(b=>sg(b).st==='ky').sort((x,y)=>kd(y).localeCompare(kd(x))).slice(0,15);
  const today=nowISO().slice(0,10),wk=addDays(nowISO(),-7).slice(0,10);
  const kyWk=all.filter(b=>(sg(b).kyAt||'').slice(0,10)>=wk).length;
  const col=k=>({green:'var(--green)',blue:'var(--pri)',amber:'var(--amber)',gray:'var(--ink2)'})[SG[k].c];
  const stat=(k,v,sub,bar)=>`<div class="card stat" style="cursor:pointer" data-act="dashSg" data-id="${k}"><div class="k">${k==='all'?'Tổng hồ sơ nghiệm thu':k==='chua'?'Chưa trình ký':SG[k].t}</div><div class="v" style="color:${k==='all'?'inherit':col(k)}">${v}</div><div class="s">${sub}</div>${bar!=null?`<div class="bar"><i style="width:${bar}%;background:${k==='all'?'var(--pri)':col(k)}"></i></div>`:''}</div>`;
  const rowW=b=>{const g=sg(b),a=age(b),red=a>7;return `<div class="it"><div class="dt" ${red?'style="color:#b91c1c"':''}>${a??'—'} ngày</div><div class="tx"><b>${esc(b.no)}</b> <span class="chip c-${SG[g.st].c}" style="font-size:11px">${SG[g.st].t}</span><div class="mut small">${esc(b.title)} · ${esc(b.viTri)}</div></div><button class="btn sm g" data-act="sgOne" data-id="${b.id}:ky">${ic('check',14)} Đã ký</button></div>`};
  const rowK=b=>`<div class="it"><div class="dt" style="color:var(--green)">${sg(b).kyAt?'Ký '+fmtD(sg(b).kyAt):'NT '+fmtD(b.start)}</div><div class="tx"><b>${esc(b.no)}</b><div class="mut small">${esc(b.title)} · ${esc(b.viTri)}</div></div><button class="btn sm ghost" data-act="open" data-id="${b.id}">${ic('doc',14)}</button></div>`;
  const mx=Math.max(1,...SGK.map(cnt));
  return `<div class="head"><div><h1>Dashboard</h1></div>
  <div class="mut small" style="margin-top:20px">${esc(S.project.hangMuc||'')} · cập nhật ${fmtD(today)}</div></div>
  <div class="grid g4">
    ${stat('all',N,`${mk.filter(m=>m!=='—').length} tháng · ${kyWk} bộ ký về trong 7 ngày qua`,100)}
    ${stat('ky',nKy,`${pc(nKy,N)}% đã ký, mang về`,pc(nKy,N))}
    ${stat('trinh',nTr,`${pc(nTr,N)}% đang nằm ở TVGS/BĐH`,pc(nTr,N))}
    ${stat('chua',nCh+nIn,`${nCh} chưa in · ${nIn} đã in, chưa gửi`,pc(nCh+nIn,N))}
  </div>
  
  ${(()=>{const W=waitList();return W.length?`<div class="card" style="margin-top:16px;border:2px solid var(--pri)"><div class="head" style="margin:0 0 10px"><h3 style="margin:0">🖨 Hồ sơ mới chưa in <span class="mut">${W.length}</span></h3><button class="btn p" data-act="waitPrint">${ic('print',15)} In các hồ sơ đã chọn</button></div>${waitTable(W,300)}</div>`:''})()}
  <div class="grid g2" style="margin-top:16px;grid-template-columns:1.4fr 1fr">
    <div class="card"><h3>Tiến độ ký theo tháng nghiệm thu</h3><div class="tbox" style="max-height:340px"><table class="t"><tr><th>Tháng</th><th>Tổng</th><th>Đã ký</th><th>Đang trình</th><th>Chưa ký</th><th style="width:30%">Đã ký</th></tr>
    ${mk.map(m=>{const L=months[m];const k=L.filter(b=>sg(b).st==='ky').length,tr=L.filter(b=>sg(b).st==='trinh').length,c=L.length-k-tr,r=pc(k,L.length);
      return `<tr><td><b>${mName(m)}</b></td><td>${L.length}</td><td style="color:var(--green)">${k}</td><td style="color:var(--pri)">${tr||''}</td><td style="color:${c?'var(--red)':'inherit'}">${c||''}</td><td><div class="bar" style="margin:0"><i style="width:${r}%;background:var(--green)"></i></div><span class="mut small">${r}%</span></td></tr>`}).join('')||'<tr><td colspan="6" class="empty">Chưa có hồ sơ</td></tr>'}
    </table></div></div>
    <div class="card"><h3>Tình trạng ký</h3>${SGK.slice().reverse().map(k=>`<div class="sbar" style="cursor:pointer" data-act="dashSg" data-id="${k}"><span class="chip c-${SG[k].c}">${SG[k].t}</span><div class="bar"><i style="width:${cnt(k)/mx*100}%;background:${col(k)}"></i></div><b>${cnt(k)}</b></div>`).join('')}
    <p class="mut small" style="margin-top:12px">Lấy theo màu tô cột S/T trong file Excel: xanh = đang trình ký, vàng = đã ký mang về.</p></div>
  </div>`;
};

V.flow=()=>{
  const ov=S.plans.filter(p=>planStatus(p)==='overdue').length;const tplN=S.templates.filter(t=>t.use).length;
  const noTpl=S.tasks.filter(t=>!(t.tpls||[]).length).length;
  const chk=S.bbnt.filter(b=>b.status==='check').length,apv=S.bbnt.filter(b=>b.status==='approve').length,ok=S.bbnt.filter(b=>b.status==='approved');
  const ret=S.bbnt.filter(b=>b.status==='returned').length;const arch=ok.filter(b=>b.archived).length;
  const pays=S.payments,payOk=pays.filter(p=>p.status==='approved').length;
  const asb=asbuiltData();const full=asb.reduce((s,w)=>s+w.tasks.filter(t=>t.full).length,0),tot=asb.reduce((s,w)=>s+w.tasks.length,0);
  const step=(n,title,sub,role,go,done,cls='')=>`<div class="fstep ${done?'done':''} ${cls}" data-act="go" data-id="${go}">
    ${done?`<div class="fnum ok">${ic('check',16)}</div>`:`<div class="fnum">${n}</div>`}
    <b>${title}</b><div class="mut">${sub}</div><span class="chip ${role==='Kiểm tra'?'c-amber':role==='Phê duyệt'?'c-green':role==='Cả nhóm'?'c-gray':'c-blue'}">${role}</span></div>`;
  const dn='<div class="fdown">⌄</div>';
  return `<div class="head"><div><h1>Lưu đồ quy trình</h1></div></div>
  <div class="card"><div class="flow">
    <div class="fcol"><h4>1. CHUẨN BỊ</h4>${step(1,'Thông tin dự án',S.people.length+' nhân sự','Thực hiện','project',S.people.length>0)}${dn}${step(2,'Kho biểu mẫu',tplN+' mẫu đang dùng','Thực hiện','library',tplN>0)}</div>
    <div class="fcol"><h4>2. NHẬP LIỆU</h4>${step(3,'WBS, dự toán',S.wbs.length+' dòng','Thực hiện','input',S.wbs.length>0)}${dn}${step(4,'Công việc nghiệm thu',`${S.tasks.length} việc, ${noTpl} chưa gắn checklist`,'Thực hiện','input:tasks',S.tasks.length>0)}</div>
    <div class="fcol"><h4>3. NGHIỆM THU</h4>${step(5,'Kế hoạch nghiệm thu',`${S.plans.length} lần, ${ov} quá hạn`,'Thực hiện','plan',S.plans.length>0)}${dn}${step(6,'Lập hồ sơ NT',S.bbnt.length+' bộ hồ sơ','Thực hiện','bbnt',S.bbnt.length>0)}
      <div class="fret">↩ trả lại kèm lý do: quay về Lập hồ sơ${ret?` (${ret})`:''}</div>${dn}
      ${step(7,'Kiểm tra',chk+' chờ','Kiểm tra','bbnt:check',false,'warn')}${dn}${step(8,'Phê duyệt',`${ok.length} đã duyệt${apv?', '+apv+' chờ':''}`,'Phê duyệt','bbnt:approve',false,'ok')}</div>
    <div class="fcol"><h4>4. TẬP HỢP, LƯU TRỮ</h4>${step(9,'Lưu trữ file gốc',`${arch}/${ok.length} đã lưu`,'Thực hiện','archive',ok.length>0&&arch===ok.length)}${dn}${step(10,'Hồ sơ thanh toán',`${payOk}/${pays.length} kỳ đã duyệt`,'Cả nhóm','payment',pays.length>0&&payOk===pays.length)}${dn}${step(11,'Hồ sơ hoàn công',`${full}/${tot} việc đủ`,'Cả nhóm','asbuilt',tot>0&&full===tot)}</div>
  </div></div>`;
};

V.project=()=>{
  const P=S.project;const f=(k,l,ph='')=>`<div><label class="f">${l}</label><input class="in" data-bind="p:${k}" value="${esc(P[k])}" placeholder="${esc(ph)}"></div>`;
  return `<div class="head"><div><h1>Thông tin dự án</h1></div></div>
  <div class="card"><h3>Dự án &amp; các bên</h3><div class="row r2">${f('name','Dự án')}${f('hangMuc','Hạng mục (in trên phiếu)')}${f('location','Địa điểm xây dựng')}${f('city','Địa danh ghi ngày tháng','Phú Quốc')}
  ${f('investor','Chủ đầu tư')}${f('qlda','Kính gửi (dòng 1) – Ban QLDA')}${f('supervisor','Tư vấn giám sát (tên đầy đủ)')}${f('supShort','Tư vấn giám sát (tên ngắn)','CONINCO')}${f('mainC','Nhà thầu chính')}${f('subC','Nhà thầu phụ')}${f('contract','Số hợp đồng (góc phải phiếu kiểm tra)')}${f('lab','Nơi gửi mẫu thí nghiệm (BB lấy mẫu)','Phòng thí nghiệm …')}${f('place','Địa điểm / vị trí in trên phiếu','Công trường thi công')}${f('numPrefix','Tiền tố số hồ sơ','NOQ/CEN/KC')}<div class="row r2">${f('xeM3','m³ mỗi xe (BB lấy mẫu)')}${f('tanSuat','m³ / 1 tổ mẫu')}</div><div style="margin-top:10px"><label class="f">Biển số xe bồn (BB lấy mẫu) – mỗi dòng 1 xe; app chọn ngẫu nhiên, không trùng trong 1 biên bản</label><textarea class="in" rows="5" data-bind="p:plates" placeholder="51G-69762">${esc(plateList().join('\n'))}</textarea></div></div></div>
  <div class="card" style="margin-top:16px"><div class="head"><h3>Khu vực &amp; ký hiệu số hồ sơ</h3><button class="btn sm" data-act="addHm">${ic('plus',15)} Thêm khu vực</button></div>
   <div class="tbox"><table class="t"><tr><th>Khu vực / Block</th><th style="width:180px">Ký hiệu trong số hồ sơ</th><th style="width:60px"></th></tr>
   ${S.hms.map(h=>`<tr><td><input class="tin" data-bind="row:hms:${h.id}:name" value="${esc(h.name)}"></td><td><input class="tin" data-bind="row:hms:${h.id}:code" value="${esc(h.code)}"></td><td><button class="btn sm ghost d" data-act="del" data-id="hms:${h.id}">${ic('trash',15)}</button></td></tr>`).join('')}</table></div>
   <p class="mut small">Số tự sinh theo mẫu bên bạn: STT/NOQ/CEN/KC/4.5/mã cấu kiện/YCNT – BBNT – BBKT/BT – BBLM. Mã cấu kiện (M, CVB2, DST1…) đặt ở cột “Mã” của công việc. Sửa tay được trong từng hồ sơ.</p></div>
  <div class="card" style="margin-top:16px"><div class="head"><h3>Nhân sự (${S.people.length})</h3><button class="btn sm" data-act="addPerson">${ic('plus',15)} Thêm người</button></div>
   <div class="tbox"><table class="t"><tr><th>Họ tên</th><th>Đơn vị</th><th>Chức vụ</th><th>Vai trò trên app</th><th>Ký</th><th></th></tr>
   ${S.people.map(p=>`<tr><td><input class="tin" data-bind="row:people:${p.id}:name" value="${esc(p.name)}"></td>
   <td><select class="tin" data-bind="row:people:${p.id}:org">${Object.keys(ORG).map(o=>`<option value="${o}" ${p.org===o?'selected':''}>${ORG[o].lab}</option>`).join('')}</select></td>
   <td><input class="tin" data-bind="row:people:${p.id}:title" value="${esc(p.title)}"></td>
   <td><select class="tin" data-bind="row:people:${p.id}:duty">${['Thực hiện','Kiểm tra','Phê duyệt'].map(o=>`<option ${p.duty===o?'selected':''}>${o}</option>`).join('')}</select></td>
   <td><input type="checkbox" data-bind="row:people:${p.id}:sign" ${p.sign?'checked':''}></td>
   <td><button class="btn sm ghost d" data-act="del" data-id="people:${p.id}">${ic('trash',15)}</button></td></tr>`).join('')}</table></div>
   <p class="mut small">Mỗi hồ sơ chọn 4 người ký: TVGS (giám sát viên), nhà thầu chính (giám sát BĐH), nhà thầu phụ (cán bộ kỹ thuật), chỉ huy trưởng. Chức vụ ở đây được in lên phiếu.</p></div>`;
};

V.library=()=>{
  const fixed=S.templates.filter(t=>!isCL(t)),cls=S.templates.filter(isCL);
  const sel=tplOf(UI.libSel)||cls[0];
  const used=id=>S.tasks.filter(x=>(x.tpls||[]).includes(id)).length;
  return `<div class="head"><div><h1>Kho biểu mẫu</h1></div>
  <button class="btn p" data-act="addCl">${ic('plus',16)} Thêm checklist</button></div>
  <div class="card"><h3>Biểu mẫu chung</h3><div class="tbox"><table class="t"><tr><th style="width:110px">Mã</th><th>Tên biểu mẫu</th><th>Tiêu đề in</th></tr>
  ${fixed.map(t=>`<tr><td><code>${t.id}</code></td><td>${esc(t.name)}</td><td>${t.kind==='dbt'?`<input class="tin" data-bind="row:templates:${t.id}:title1" value="${esc(t.title1)}"><input class="tin" data-bind="row:templates:${t.id}:title2" value="${esc(t.title2)}">`:`<input class="tin" data-bind="row:templates:${t.id}:title" value="${esc(t.title)}">`}</td></tr>`).join('')}</table></div></div>
  <div class="grid" style="grid-template-columns:300px minmax(0,1fr);margin-top:16px;align-items:start">
   <div class="card" style="padding:10px">${cls.map(t=>`<div class="bitem ${sel&&t.id===sel.id?'on':''}" data-act="libSel" data-id="${t.id}"><b>${esc(t.code)}</b> <span class="mut small">· ${t.groups.reduce((s,g)=>s+g.items.length,0)} dòng · ${used(t.id)} việc</span><div class="nm" style="margin:2px 0 0">${esc(t.name)}</div></div>`).join('')}</div>
   ${sel?`<div class="card"><div class="head"><h3 style="margin:0">${esc(sel.name)}</h3>${used(sel.id)?'':`<button class="btn sm ghost d" data-act="del" data-id="templates:${sel.id}">${ic('trash',15)} Xóa</button>`}</div>
    <div class="row r3" style="margin-top:10px"><div><label class="f">Tên checklist</label><input class="in" data-bind="row:templates:${sel.id}:name" value="${esc(sel.name)}"></div>
    <div><label class="f">Ký hiệu (trong số phiếu)</label><input class="in" data-bind="row:templates:${sel.id}:code" value="${esc(sel.code)}"></div>
    <div><label class="f">Cách đánh số</label><select class="in" data-bind="row:templates:${sel.id}:numStyle" data-rr="1"><option value="AB" ${sel.numStyle==='AB'?'selected':''}>Nhóm A, B – mục 1, 2…</option><option value="num" ${sel.numStyle==='num'?'selected':''}>Nhóm 1, 2 – mục 1.1, 1.2…</option><option value="flat" ${sel.numStyle==='flat'?'selected':''}>Không nhóm – 1, 2…</option></select></div></div>
    <div class="row r2" style="margin-top:8px"><div><label class="f">Tiêu đề dòng 1</label><input class="in" data-bind="row:templates:${sel.id}:title1" value="${esc(sel.title1)}"></div><div><label class="f">Tiêu đề dòng 2 (tên công tác)</label><input class="in" data-bind="row:templates:${sel.id}:title2" value="${esc(sel.title2)}"></div></div>
    <div class="small" style="margin-top:10px">Kèm theo mặc định: <label style="margin-right:12px"><input type="checkbox" data-act="extra" data-id="${sel.id}:dbt" ${sel.extra.includes('dbt')?'checked':''}> Phiếu yêu cầu đổ bê tông</label><label><input type="checkbox" data-act="extra" data-id="${sel.id}:lm" ${sel.extra.includes('lm')?'checked':''}> BB lấy mẫu bê tông</label></div>
    <label class="f" style="margin-top:12px">Nội dung kiểm tra – dòng bắt đầu bằng <b>#</b> là tên nhóm; mỗi dòng khác: <b>Nội dung | Phương pháp kiểm tra</b></label>
    <textarea class="in" rows="18" style="font-family:ui-monospace,Consolas,monospace;font-size:12.5px" data-bind="tgroups:${sel.id}">${esc(groupsText(sel.groups))}</textarea>
    <p class="mut small">Sửa ở đây chỉ áp dụng cho hồ sơ lập mới; hồ sơ đã lập giữ nguyên nội dung.</p></div>`:''}
  </div>`;
};

V.input=()=>{
  const tab=UI.inTab;const cls=S.templates.filter(isCL);
  const tabs=`<div class="tabs"><button class="${tab==='wbs'?'on':''}" data-act="intab" data-id="wbs">WBS, dự toán (${S.wbs.length})</button><button class="${tab==='tasks'?'on':''}" data-act="intab" data-id="tasks">Công việc nghiệm thu (${S.tasks.length})</button><button class="${tab==='paste'?'on':''}" data-act="intab" data-id="paste">Dán từ Excel</button></div>`;
  const hmOpts=v=>S.hms.map(h=>`<option ${h.name===v?'selected':''}>${esc(h.name)}</option>`).join('');
  let body='';
  if(tab==='wbs'){
    body=`<div class="card"><div class="head"><h3>Bảng WBS / dự toán</h3><button class="btn sm" data-act="addWbs">${ic('plus',15)} Thêm dòng</button></div>
    <div class="tbox"><table class="t"><tr><th style="width:120px">Mã WBS</th><th>Tên công tác</th><th>Khu vực</th><th>Bộ môn</th><th style="width:70px">ĐVT</th><th style="width:110px">Khối lượng</th><th>Việc NT</th><th></th></tr>
    ${S.wbs.map(w=>`<tr><td><input class="tin" data-bind="row:wbs:${w.id}:code" value="${esc(w.code)}"></td><td><input class="tin" data-bind="row:wbs:${w.id}:name" value="${esc(w.name)}"></td>
    <td><select class="tin" data-bind="row:wbs:${w.id}:hm">${hmOpts(w.hm)}</select></td><td><input class="tin" data-bind="row:wbs:${w.id}:bm" value="${esc(w.bm)}"></td>
    <td><input class="tin" data-bind="row:wbs:${w.id}:unit" value="${esc(w.unit)}"></td><td><input class="tin" type="number" step="any" data-num="1" data-bind="row:wbs:${w.id}:qty" value="${w.qty}"></td>
    <td class="mut">${S.tasks.filter(t=>t.wbs===w.code).length}</td><td><button class="btn sm ghost d" data-act="del" data-id="wbs:${w.id}">${ic('trash',15)}</button></td></tr>`).join('')}</table></div></div>`;
  }else if(tab==='tasks'){
    body=`<div class="toolbar"><button class="btn p sm" data-act="addTask">${ic('plus',15)} Thêm công việc</button><span class="mut small">Mỗi công việc gắn một hay nhiều checklist, ví dụ CT+VK+BT. Ký hiệu: ${esc(cls.map(x=>x.code).join(', '))}.</span></div>
    <div class="card" style="padding:0"><div class="tbox" style="border:0"><table class="t"><tr><th>Tên công việc nghiệm thu</th><th style="width:150px">Mã WBS</th><th style="width:120px">Khu vực</th><th style="width:300px">Công tác (in trên phiếu)</th><th style="width:110px">Mã (số HS)</th><th style="width:170px">Checklist (ký hiệu, nối bằng +)</th><th></th></tr>
    ${S.tasks.map(t=>`<tr><td><input class="tin" data-bind="row:tasks:${t.id}:name" value="${esc(t.name)}"></td>
    <td><select class="tin" data-bind="row:tasks:${t.id}:wbs">${S.wbs.map(w=>`<option value="${esc(w.code)}" ${w.code===t.wbs?'selected':''}>${esc(w.code)}</option>`).join('')}</select></td>
    <td><select class="tin" data-bind="row:tasks:${t.id}:hm">${hmOpts(t.hm)}</select></td>
    <td><input class="tin" data-bind="row:tasks:${t.id}:congTac" value="${esc(t.congTac||'')}"></td><td><input class="tin" data-bind="row:tasks:${t.id}:code" value="${esc(t.code)}"></td>
    <td><input class="tin" data-bind="ttpl:${t.id}" value="${esc(clCodes(t.tpls))}" title="${esc(cls.map(x=>x.code+' = '+x.name).join('\n'))}"></td>
    <td><button class="btn sm ghost d" data-act="del" data-id="tasks:${t.id}">${ic('trash',15)}</button></td></tr>`).join('')}</table></div></div>`;
  }else{
    body=`<div class="grid g2"><div class="card" style="grid-column:1/-1"><h3>Nhập từ file Excel hồ sơ (sheet DATA)</h3><p class="mut small">Chọn file .xlsm/.xlsx có sheet <b>DATA</b> như file “HSNT kết cấu Block 4.5”. Mỗi dòng có số YCNT thành một bộ hồ sơ (kèm kế hoạch, người ký, mác, độ sụt, khối lượng). Dòng có số BBNT đã có trong app sẽ bỏ qua – nhập lại file mới chỉ thêm dòng mới.</p><input type="file" class="in" accept=".xlsm,.xlsx,.xls" id="xlsFile" style="max-width:420px"></div>
      <div class="card"><h3>Dán WBS / dự toán</h3><p class="mut small">Copy từ Excel các cột: <b>Mã WBS | Tên công tác | Khu vực | Bộ môn | ĐVT | Khối lượng</b>. Mã đã có sẽ được cập nhật.</p>
      <textarea class="in" id="pasteWbs" rows="9" placeholder="DST2	Dầm sàn tầng 2	Block 4.5	Kết cấu	m3	180"></textarea><div class="toolbar" style="margin-top:10px"><button class="btn p" data-act="pasteWbs">Nhập WBS</button></div></div>
      <div class="card"><h3>Dán công việc nghiệm thu</h3><p class="mut small">Cột: <b>Mã WBS | Tên công việc | Khu vực | Công tác in trên phiếu | Mã số HS | Checklist</b> (ký hiệu nối bằng +, ví dụ CT+VK+BT).</p>
      <textarea class="in" id="pasteTask" rows="9" placeholder="DST2	Ván khuôn, cốt thép và bê tông dầm sàn tầng 2	Block 4.5	Nghiệm thu công tác ván khuôn, cốt thép và đổ bê tông	DST2	CT+VK+BT"></textarea><div class="toolbar" style="margin-top:10px"><button class="btn p" data-act="pasteTask">Nhập công việc</button></div></div></div>`;
  }
  return `<div class="head"><div><h1>Nhập dữ liệu</h1></div></div>${tabs}${body}`;
};

V.plan=()=>{
  const F=UI.planF,q=UI.planQ.toLowerCase();
  let ps=S.plans.slice().sort((a,b)=>a.date.localeCompare(b.date));
  ps=ps.filter(p=>{const s=planStatus(p);if(F==='overdue'&&s!=='overdue')return false;if(F==='todo'&&s!=='none')return false;if(F==='made'&&!bOfPlan(p.id))return false;if(q&&!p.title.toLowerCase().includes(q))return false;return true});
  const c=k=>S.plans.filter(p=>k==='made'?bOfPlan(p.id):planStatus(p)===(k==='todo'?'none':k)).length;
  return `<div class="head"><div><h1>Kế hoạch nghiệm thu</h1></div><button class="btn p" data-act="addPlan">${ic('plus',16)} Thêm kế hoạch</button></div>
  <div class="toolbar"><div class="tabs" style="margin:0">${[['all','Tất cả',S.plans.length],['overdue','Quá hạn',c('overdue')],['todo','Sắp tới',c('todo')],['made','Đã lập',c('made')]].map(([k,l,n])=>`<button class="${F===k?'on':''}" data-act="planF" data-id="${k}">${l} (${n})</button>`).join('')}</div>
  <input class="in" style="width:240px;margin-left:auto" placeholder="Tìm công việc…" data-pq="1" value="${esc(UI.planQ)}"></div>
  <div class="card" style="padding:0"><div class="tbox" style="border:0"><table class="t"><tr><th style="width:190px">Ngày giờ dự kiến</th><th>Nội dung nghiệm thu</th><th>Khu vực</th><th>Checklist</th><th>Trạng thái</th><th style="width:150px"></th></tr>
  ${ps.map(p=>{const t=task(p.taskId)||{};const b=bOfPlan(p.id);const s=planStatus(p);return `<tr><td><input class="tin" type="datetime-local" data-bind="row:plans:${p.id}:date" data-rr="1" value="${p.date}"></td>
   <td><input class="tin" data-bind="row:plans:${p.id}:title" value="${esc(p.title)}"></td><td>${esc(t.hm||'')}</td><td class="mut">${esc(clCodes(t.tpls)||'—')}</td><td>${chip(s)}${b?` <span class="mut small">${esc(b.no)}</span>`:''}</td>
   <td style="text-align:right">${b?`<button class="btn sm" data-act="open" data-id="${b.id}">Mở</button>`:`<button class="btn sm p" data-act="make" data-id="${p.id}">${ic('doc',14)} Lập</button> <button class="btn sm ghost d" data-act="del" data-id="plans:${p.id}">${ic('trash',15)}</button>`}</td></tr>`}).join('')||`<tr><td colspan="6" class="empty">Không có dòng nào</td></tr>`}
  </table></div></div>`;
};

/* ---------- Hồ sơ nghiệm thu ---------- */
const PLATES_DEF=["51G-69762", "51B-25691", "51F-52474", "51H-27784", "51B-50962", "51B-27917", "51B-26075", "51K-52182", "51B-27915", "51B-26201", "51G-75462", "T12-07846", "51C-74207", "51B-41365", "51K-35892", "51H-11478", "72A-36203", "51K-38424", "51G-68949", "51B-73571", "51M-97612", "51G-51044", "51H-27571", "51G-67153", "51B-73644", "51M-97539", "51B-73570", "T12-07853", "51H-17528", "51B-50457", "51B-26124", "51B-88473", "51B-73375", "51B-25606", "51B-27968", "51B-19455", "72A-36363", "51G-73012", "84C-09975", "51B-88259", "T12-07927", "72C-16400", "T12-07851", "72A-32978", "51M-93180", "T12-95370", "51B-88175", "51M-97752", "51M-97746", "51M-97353", "51N-15343", "T12-07931", "51B-88393", "51B-73317", "51B-73387", "51B-88113", "51B-73267", "51B-73508", "51H-66579", "T12-00861", "T12-07933", "51M-97747", "51N-15121", "T12-07928", "51E-05200", "51B-88429", "51N-14996", "51D-64198", "T12-07854", "51E-05689", "51B-29502", "T12-06465", "51E-05306", "51B-26915", "51E-05604", "51B-73516", "72A-36325", "51G-74570", "51B-88230", "72A-36381"];
function plateList(){const p=S.project.plates;const L=(Array.isArray(p)?p:String(p||'').split(/[\n,;]+/)).map(x=>String(x).trim()).filter(Boolean);return L.length?L:PLATES_DEF}
function seedRnd(s){let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h=Math.imul(h^(h>>>15),2246822507);h=Math.imul(h^(h>>>13),3266489909);h^=h>>>16;return(h>>>0)/4294967296}}
function sutParse(s){const m=String(s||'').match(/(\d+(?:[.,]\d+)?)\s*(?:±|\+-|\+\/-)\s*(\d+(?:[.,]\d+)?)/);if(m)return{b:+m[1].replace(',','.'),t:+m[2].replace(',','.')};const n=parseFloat(String(s||'').replace(',','.'));return isNaN(n)?null:{b:n,t:0}}
function lmRows(b){
  const xe=+S.project.xeM3||8,ts=+S.project.tanSuat||20;
  const tot=parseFloat(String(b.klTT).replace(',','.'))||0;
  let R=b.lm.rows.length?b.lm.rows.map(r=>Object.assign({},r)):[];
  if(!R.length&&tot>0){let left=tot;while(left>0.001&&R.length<60){const k=Math.min(xe,left);R.push({xe:'',kl:+k.toFixed(2),sut:''});left-=k}}
  /* như file Excel: số xe lấy ngẫu nhiên (không trùng) trong danh sách biển số; độ sụt = thiết kế ± dao động – cố định theo từng biên bản */
  const rnd=seedRnd((b.id||'')+'|'+(b.lmNo||b.no||''));const pool=plateList().slice();const sp=sutParse(b.doSut);
  R.forEach(r=>{if(!String(r.xe||'').trim()&&pool.length){r.xe=pool.splice(Math.floor(rnd()*pool.length),1)[0]}else rnd();
    if(!String(r.sut||'').trim()&&sp){r.sut=String(Math.round(sp.b+(Math.floor(rnd()*(2*sp.t+1))-sp.t)))}else rnd()});
  const sum=R.reduce((s,r)=>s+(parseFloat(String(r.kl).replace(',','.'))||0),0);
  const to=Math.ceil((sum||tot)/ts);
  R.forEach((r,i)=>{r.mau=i===0&&to?`${to} tổ mẫu (1 tổ mẫu / 9 viên )`:'';r.size=b.lm.size;r.vt=i===0?(r.vt||b.place):(r.vt||'')});
  return{rows:R,sum,to};}
function allChecks(b){return(b.docs.cl?b.cls:[]).flatMap(c=>c.checks)}
function validate(b){
  const blocks=[],warns=[];const C=allChecks(b);
  if(!b.conclusion)blocks.push('Chưa có kết luận nghiệm thu');
  if(b.conclusion==='yes'&&C.some(c=>c.result==='Không đạt'))blocks.push('Có dòng kiểm tra “Không đạt” nhưng kết luận chấp thuận nghiệm thu');
  if(!b.start)blocks.push('Chưa nhập thời gian bắt đầu nghiệm thu');
  if(b.start&&b.end&&b.end<b.start)blocks.push('Thời gian kết thúc trước thời gian bắt đầu');
  if(!b.end)warns.push('Chưa nhập thời gian kết thúc nghiệm thu');
  if(!b.viTri)warns.push('Chưa nhập vị trí nghiệm thu');
  ['TVGS','NTC','NTP'].forEach(k=>{if(!sigP(b,k))warns.push('Chưa chọn người ký '+ORG[k].lab)});
  const n=C.filter(c=>!c.result).length;if(n)warns.push(`Còn ${n} dòng kiểm tra chưa đánh giá Đạt, Không đạt`);
  if(b.docs.dbt&&!b.dbt.capPhoi)warns.push('Phiếu yêu cầu đổ bê tông: chưa nhập cấp phối bê tông');
  if(b.docs.lm&&!lmRows(b).rows.length)warns.push('Biên bản lấy mẫu: chưa nhập khối lượng bê tông thực tế');
  return{blocks,warns};
}
function gidxMap(){const M={};let n=0;dataGroups().forEach(g=>g.rows.forEach(b=>{M[b.id]=++n}));return M}
function filteredB(){
  const f=UI.f,q=f.q.toLowerCase().trim();
  if(/^\d+$/.test(q)){const M=gidxMap();const n=+q;return S.bbnt.filter(b=>M[b.id]===n)}
  return S.bbnt.filter(b=>{const t=task(b.taskId)||{};
    if(q&&!(b.no+' '+b.pycNo+' '+b.title+' '+b.viTri).toLowerCase().includes(q))return false;
    if(f.hm&&t.hm!==f.hm)return false;if(f.nhom&&t.nhom!==f.nhom)return false;if(f.ck&&b.ck!==f.ck)return false;if(f.wbs&&t.wbs!==f.wbs)return false;if(f.st&&b.status!==f.st)return false;return true;
  }).sort((a,b)=>(b.created||'').localeCompare(a.created||'')||(b.seq||0)-(a.seq||0));
}
function bListHTML(){if(!String(UI.f.q||'').trim())return '';const M=gidxMap();return filteredB().map(b=>`<div class="bitem ${b.id===UI.sel?'on':''}" data-act="open" data-id="${b.id}"><span class="mut small" style="float:right">#${M[b.id]||''}</span><b>${esc(b.no)}</b><div class="nm">${esc(b.title)}</div><div class="mut small" style="margin:-3px 0 5px">${esc(b.viTri)}</div>${chip(b.status)} <span class="mut small">${fmtD(b.start)}</span></div>`).join('')||'<div class="empty">Không có hồ sơ phù hợp</div>'}
function selOpts(key,label,vals){return `<select class="in" data-filter="${key}"><option value="">${label}: tất cả</option>${[...new Set(vals)].filter(Boolean).map(v=>`<option ${UI.f[key]===v?'selected':''}>${esc(v)}</option>`).join('')}</select>`}
V.bbnt=()=>{
  if(UI.sel&&!curB())UI.sel=null;
  if(!UI.sel){const L=filteredB();if(L.length)UI.sel=L[0].id}
  const b=curB();
  const left=`<div class="pane" id="bListPane" style="${UI.expand?'display:none':''}"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><b style="font-size:15px">Hồ sơ <span class="mut">${S.bbnt.length}</span></b></div>
    <input class="in" placeholder="Gõ số thứ tự (cột B) hoặc số BB, công việc, vị trí" data-filter="q" value="${esc(UI.f.q)}" style="margin-bottom:8px">
    <div class="row" style="gap:7px;margin-bottom:10px">
    
    ${selOpts('hm','Khu vực',S.tasks.map(t=>t.hm))}</div>
    <div id="bList">${bListHTML()}</div></div>`;
  const nf=UI.noForm!==false&&UI.prev&&!!b;const cls=`bb ${UI.prev?'':'noprev'} ${UI.expand?'expand':''} ${nf?'noform':''}`;
  return `<div class="head"><div><h1>Lập hồ sơ nghiệm thu</h1></div>
  <button class="btn p" data-act="adhoc">${ic('plus',16)} Lập hồ sơ ngoài kế hoạch</button></div>
  <div class="${cls}">${left}<div class="pane" id="formPane" style="${nf?'display:none':''}">${b?formHTML(b):'<div class="empty">Chưa có hồ sơ. Vào Kế hoạch nghiệm thu bấm “Lập”, hoặc lập hồ sơ ngoài kế hoạch.</div>'}</div>
  ${UI.prev&&b?`<div class="pane prevpane" id="prevPane">${prevHTML(b)}</div>`:''}</div>`;
};
function numbered(cl){
  const out=[];let gi=0,ii=0,lastG=null;const L='ABCDEFGHIJ';
  cl.checks.forEach((c,idx)=>{
    if(cl.numStyle!=='flat'&&c.g!==lastG){lastG=c.g;gi++;ii=0;out.push({type:'g',no:cl.numStyle==='AB'?L[gi-1]:String(gi),text:c.g})}
    ii++;out.push({type:'i',idx,no:cl.numStyle==='num'?`${gi}.${ii}`:String(ii),c});
  });return out;
}
function formHTML(b){
  const t=task(b.taskId)||{};const ed=editable(b);const dis=ed?'':'disabled';const v=validate(b);
  let actions='';
  if(UI.role==='Thực hiện'&&ed)actions=`<button class="btn g" data-act="send" ${v.blocks.length?'disabled title="Còn lỗi chặn gửi"':''}>${ic('send',15)} Gửi kiểm tra</button>`;
  if(UI.role==='Kiểm tra'&&b.status==='check')actions=`<button class="btn g" data-act="pass">${ic('check',15)} Đạt – chuyển phê duyệt</button><button class="btn d" data-act="ret">${ic('back',15)} Trả lại</button>`;
  if(UI.role==='Phê duyệt'&&b.status==='approve')actions=`<button class="btn g" data-act="approve">${ic('check',15)} Phê duyệt</button><button class="btn d" data-act="ret">${ic('back',15)} Trả lại</button>`;
  let roleNote='';
  if(!ed&&!actions){
    if(b.status==='approved')roleNote=`<div class="alert g">Hồ sơ đã duyệt${b.imported?' (nhập từ Excel)':''} – chỉ xem, xuất Word. <button class="btn sm" data-act="reopen" style="margin-left:6px">Mở lại để sửa</button></div>`;
    else if(['draft','returned'].includes(b.status))roleNote=`<div class="alert b">Hồ sơ đang ở bước Lập. Chọn vai trò “Thực hiện” để sửa.</div>`;
    else roleNote=`<div class="alert b">Hồ sơ ${ST[b.status].t.toLowerCase()}. Chọn vai trò “${b.status==='check'?'Kiểm tra':'Phê duyệt'}” ở góc trên để xử lý.</div>`;
  }
  const docChk=[['pyc','Phiếu YCNT'],['ntcv','BB nghiệm thu'],['cl','Phiếu kiểm tra'],['dbt','PYC đổ bê tông'],['lm','BB lấy mẫu BT']].map(([k,l])=>k==='cl'&&!b.cls.length?'':`<label class="small" style="margin-right:12px;white-space:nowrap"><input type="checkbox" data-bind="bd:${k}" ${b.docs[k]?'checked':''} ${dis}> ${l}</label>`).join('');
  const noF=(k,l)=>`<div><label class="f">${l}</label><input class="in" data-bind="b:${k}" value="${esc(b[k])}" ${dis}></div>`;
  const nums=[b.docs.pyc&&noF('pycNo','Số Phiếu YCNT'),b.docs.ntcv&&noF('no','Số BB nghiệm thu'),...(b.docs.cl?b.cls.map((c,i)=>`<div><label class="f">Số phiếu KT ${esc((tplOf(c.tpl)||{}).code||'')}</label><input class="in" data-bind="bcl:${i}" value="${esc(c.no)}" ${dis}></div>`):[]),b.docs.dbt&&noF('dbtNo','Số PYC đổ BT'),b.docs.lm&&noF('lmNo','Số BB lấy mẫu')].filter(Boolean).join('');
  const sigSel=SIGROLE.map(([k,l,o])=>`<div><label class="f">${l}</label><select class="in" data-bind="sig:${k}" ${dis}><option value="">—</option>${S.people.filter(p=>p.org===o).map(p=>`<option value="${p.id}" ${(b.sig||{})[k]===p.id?'selected':''}>${esc(p.name)} – ${esc(p.title)}</option>`).join('')}</select></div>`).join('');
  let checksHTML='';
  if(b.docs.cl)b.cls.forEach((cl,ci)=>{const tp=tplOf(cl.tpl)||{};
    checksHTML+=`<div class="sect">Phiếu kiểm tra ${esc(tp.code||'')} – ${esc(tp.title2||'')} (${cl.checks.length} dòng)</div>`+numbered(cl).map(r=>r.type==='g'?`<div style="font-weight:600;margin:10px 0 6px">${r.no}. ${esc(r.text)}</div>`:
     `<div class="chk"><div class="q">${r.no}. ${esc(r.c.item)}</div><div class="rq">Phương pháp: ${esc(r.c.method)}</div>
     <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div class="seg"><button class="${r.c.result==='Đạt'?'on ok':''}" data-act="res" data-id="${ci}:${r.idx}:Đạt" ${dis}>Đạt</button><button class="${r.c.result==='Không đạt'?'on ng':''}" data-act="res" data-id="${ci}:${r.idx}:Không đạt" ${dis}>Không đạt</button></div>
     <input class="in" style="flex:1;min-width:120px;margin-top:6px;padding:5px 9px" placeholder="Số đo / ghi chú (in kèm nội dung)" data-bind="bc:${ci}:${r.idx}:note" value="${esc(r.c.note)}" ${dis}></div></div>`).join('')+
     (ed?`<div class="toolbar"><button class="btn sm" data-act="allOk" data-id="${ci}">Đánh dấu cả phiếu Đạt</button></div>`:'')});
  const btHTML=`<div class="sect">Bê tông &amp; khối lượng</div><div class="row r3">${noF('mac','Mác bê tông (VD B35R28)')}${noF('doSut','Độ sụt (VD 14±2)')}${noF('banVe','Bản vẽ số')}${noF('klLT','KL lý thuyết (m³)')}${noF('klTT','KL thực tế (m³)')}<div><label class="f">Ngày TN R7 / R28</label><div class="mut small" style="padding-top:9px">${fmtD(b.r7||(b.start?addDays(b.start,7):''))} / ${fmtD(b.r28||(b.start?addDays(b.start,28):''))}</div></div></div>`;
  let dbtHTML='';
  if(b.docs.dbt){const d=b.dbt;const fd=(k,l,ty='text')=>`<div><label class="f">${l}</label><input class="in" type="${ty}" data-bind="bx:dbt:${k}" value="${esc(d[k])}" ${dis}></div>`;
    dbtHTML=`<div class="sect">Phiếu yêu cầu / chấp thuận đổ bê tông</div><div class="row r3">${fd('time','Dự kiến bắt đầu đổ','datetime-local')}${fd('capPhoi','Cấp phối bê tông')}${fd('doSut','Độ sụt yêu cầu')}${fd('kl','KL BT theo thiết kế (m3)')}${fd('ycMau','Yêu cầu lấy mẫu')}${fd('slMau','Số lượng mẫu / tổ mẫu')}</div>
    <label class="f" style="margin-top:8px">Ý kiến của kỹ sư giám sát</label><textarea class="in" data-bind="bx:dbt:ykien" ${dis}>${esc(d.ykien)}</textarea>`}
  let lmHTML='';
  if(b.docs.lm){const L=lmRows(b);const manual=b.lm.rows.length>0;
    lmHTML=`<div class="sect">Biên bản lấy mẫu bê tông</div><div class="row r2"><div><label class="f">Ngày lấy mẫu</label><input class="in" type="date" data-bind="b:lmDate" value="${(b.lmDate||'').slice(0,10)}" ${dis}></div><div><label class="f">Phương pháp lấy mẫu</label><input class="in" data-bind="bx:lm:phuongPhap" value="${esc(b.lm.phuongPhap)}" ${dis}></div></div>
    <div class="tbox" style="margin-top:8px"><table class="t"><tr><th>#</th><th>Số xe</th><th>KL (m³)</th><th>Độ sụt (cm)</th>${manual&&ed?'<th></th>':''}</tr>
    ${L.rows.map((r,i)=>manual?`<tr><td>${i+1}</td><td><input class="tin" data-bind="lr:${i}:xe" value="${esc(r.xe)}" ${dis}></td><td><input class="tin" data-bind="lr:${i}:kl" data-rr="1" value="${esc(r.kl)}" ${dis} style="width:70px"></td><td><input class="tin" data-bind="lr:${i}:sut" value="${esc(r.sut)}" placeholder="đo thực tế" ${dis} style="width:90px"></td>${ed?`<td><button class="btn sm ghost d" data-act="lmDel" data-id="${i}">${ic('trash',14)}</button></td>`:''}</tr>`
      :`<tr><td>${i+1}</td><td class="mut">—</td><td>${r.kl}</td><td class="mut">—</td></tr>`).join('')||'<tr><td colspan="5" class="empty">Nhập KL thực tế để tự chia xe</td></tr>'}
    </table></div><div class="toolbar" style="margin-top:8px">${ed?(manual?`<button class="btn sm" data-act="lmAdd">${ic('plus',14)} Thêm xe</button><button class="btn sm" data-act="lmAuto">Về tự động</button>`:`<button class="btn sm" data-act="lmMake">Sửa từng xe (số xe, độ sụt đo)</button>`):''}<span class="mut small">Tổng ${+L.sum.toFixed(2)} m³ · ${L.to} tổ mẫu · tự chia ${esc(S.project.xeM3||8)} m³/xe khi chưa sửa tay</span></div>`}
  return `<div class="sect" style="margin-top:0">Số BB nghiệm thu</div>
  <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><input class="in bno" style="width:300px;font-size:16px" data-bind="b:no" value="${esc(b.no)}" ${dis}>${chip(b.status)}</div>
  <div style="margin:12px 0 4px;font-weight:600;font-size:15.5px" id="fTitle">${esc(b.title)}</div>
  <div class="mut small">${esc(b.viTri)} . ${esc(t.name||'')} . ${esc(clCodes(b.cls.map(c=>c.tpl))||'không phiếu KT')}${b.planId?'':' . <b>ngoài kế hoạch</b>'}</div>
  <div class="toolbar" style="margin-top:12px">${actions}
   <button class="btn sm ghost" data-act="togPrev">${ic('eye',15)} ${UI.prev?'Ẩn xem trước':'Hiện xem trước'}</button>
   <button class="btn sm ghost" data-act="togExp">${ic('expand',15)} ${UI.expand?'Thu gọn':'Mở rộng tối đa'}</button>
   ${ed&&b.status==='draft'?`<button class="btn sm ghost d" data-act="delB" title="Xóa hồ sơ nháp">${ic('trash',15)}</button>`:''}</div>
  ${b.status==='returned'&&b.returnReason?`<div class="alert r"><b>Bị trả lại:</b> ${esc(b.returnReason)}</div>`:''}
  ${roleNote}<div id="valid">${validHTML(b)}</div>
  <div class="sect">Bộ hồ sơ gồm</div><div>${docChk}</div>
  <div class="row r2" style="margin-top:8px">${nums}</div>
  <div class="sect">Công tác &amp; vị trí</div>
  <div><label class="f">Công tác (đối tượng nghiệm thu)</label><input class="in" data-bind="b:title" value="${esc(b.title)}" ${dis}></div>
  <div style="margin-top:8px"><label class="f">Vị trí (in vào “Vị trí nghiệm thu”, “Cấu kiện”)</label><input class="in" data-bind="b:viTri" value="${esc(b.viTri)}" ${dis}></div>
  <div class="sect">Thời gian</div>
  <div class="row r2"><div><label class="f">Ngày phiếu YCNT</label><input class="in" type="date" data-bind="b:pycDate" value="${(b.pycDate||'').slice(0,10)}" ${dis}></div><div><label class="f">Ngày phát hành phiếu kiểm tra</label><input class="in" type="date" data-bind="b:clDate" value="${(b.clDate||'').slice(0,10)}" ${dis}></div>
  <div><label class="f">Bắt đầu nghiệm thu</label><input class="in" type="datetime-local" data-bind="b:start" value="${b.start||''}" ${dis}></div><div><label class="f">Kết thúc</label><input class="in" type="datetime-local" data-bind="b:end" value="${b.end||''}" ${dis}></div></div>
  <div class="sect">Người ký</div><div class="row r2">${sigSel}</div>
  ${btHTML}${checksHTML}${dbtHTML}${lmHTML}
  <div class="sect">Kết luận nghiệm thu</div>
  <select class="in" data-bind="b:conclusion" ${dis}><option value="">— Để trống (đánh dấu tay khi ký) —</option><option value="yes" ${b.conclusion==='yes'?'selected':''}>Chấp thuận nghiệm thu, đồng ý cho triển khai các công việc xây dựng tiếp theo</option><option value="no" ${b.conclusion==='no'?'selected':''}>Không đồng ý nghiệm thu</option></select>
  <label class="f" style="margin-top:8px">Ghi chú / yêu cầu sửa chữa (dòng chấm dưới kết luận BBNT)</label><textarea class="in" data-bind="b:note" ${dis}>${esc(b.note)}</textarea>
  <div class="sect">Lịch sử</div><div class="hist">${(b.history||[]).map(h=>`<div><b>${fmtDT(h.t)}</b> · ${esc(h.who)} · ${esc(h.a)}${h.note?` – <i>${esc(h.note)}</i>`:''}</div>`).join('')||'<div class="mut">Chưa có</div>'}</div>`;
}
function validHTML(b){const v=validate(b);if(b.status==='approved')return'';
  return (v.blocks.length?`<div class="alert r"><b>Chặn gửi duyệt, xuất chính thức (${v.blocks.length}):</b><br>${v.blocks.map(esc).join('<br>')}</div>`:'')+(v.warns.length?`<div class="alert y">${v.warns.map(esc).join('<br>')}</div>`:'')+(!v.blocks.length&&!v.warns.length?'<div class="alert g">Đủ thông tin để gửi kiểm tra.</div>':'')}
function prevHTML(b){
  const L=docList(b);if(!L.some(([k])=>k===UI.doc))UI.doc=(L[0]||['ntcv'])[0];
  return `<div class="prevbar"><b>Xem trước A4</b><button class="btn sm ghost" data-act="zoom" data-id="-">−</button><span class="small" id="zv">${Math.round(UI.zoom*100)}%</span><button class="btn sm ghost" data-act="zoom" data-id="+">+</button><button class="btn sm ghost" data-act="zoom" data-id="fit">Vừa</button>
  <button class="btn sm" data-act="word" data-id="all">${ic('word',15)} Word cả bộ</button><button class="btn sm" data-act="word" data-id="one">Word trang này</button><button class="btn sm" data-act="copyDoc">${ic('copy',15)} Sao chép</button><button class="btn sm ghost" data-act="toggleForm">${UI.noForm!==false?'Sửa chi tiết':'Ẩn khung sửa'}</button></div>
  <div class="tabs" style="margin-bottom:10px">${L.map(([k,l])=>`<button class="${UI.doc===k?'on':''}" data-act="doc" data-id="${k}">${l}</button>`).join('')}</div>
  <div class="paper-wrap" id="paperWrap"><div class="a4" id="a4" style="zoom:${UI.zoom}">${buildDoc(b,UI.doc)}</div></div>`;
}

/* ---------- Documents (theo biểu mẫu công ty) ---------- */
const BX='border:1px solid #000;padding:2px 5px;vertical-align:middle';
const DOT='…………';
const box=on=>on?'☑':'☐';
function dateLine(iso){const d=parts(iso);return d?`${esc(S.project.city)}, ngày ${d.d} tháng ${d.m} năm ${d.y}`:`${esc(S.project.city)}, ngày .... tháng .... năm 20…`}
function hmB(b,k){return b[k+'NoTime']?'….h......':hhmm(b[k])}
function hhmm(iso){const d=parts(iso);return d?`${d.h}h${d.mi}`:'….h......'}
function dmy(iso){const d=parts(iso);return d?`ngày ${d.d} tháng ${d.m} năm ${d.y}`:'ngày …. tháng … năm 20…'}
function quocHieu(){return `<div style="text-align:center;font-weight:bold;font-size:12pt">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div style="text-align:center;font-weight:bold;font-size:12pt">Độc lập – Tự do - Hạnh phúc</div><div style="text-align:center">----------o0o----------</div>`}
function projTable(bold){const P=S.project;const r=(l,v)=>`<tr><td style="width:27%;padding:3px 0;font-weight:bold">${l}</td><td style="padding:3px 0;${bold?'font-weight:bold':''}">${esc(v)}</td></tr>`;
  return `<table style="width:100%;border-collapse:collapse;margin:8px 0">${r('Dự án',P.name)}${r('Hạng mục',P.hangMuc)}${r('Địa điểm xây dựng',P.location)}</table>`}
function signRow(b,orgs,sub='(Ký ghi rõ họ tên)',gap){gap=gap||(sub==='(Ký, ghi rõ họ tên)'?3:5);return `<table style="width:100%;border-collapse:collapse;margin-top:14px;text-align:center"><tr>${orgs.map(o=>{const p=sigP(b,o);return `<td style="vertical-align:top;width:${Math.floor(100/orgs.length)}%"><b>${ORG[o].up}</b><br><i>${sub}</i>${'<br>'.repeat(gap)}<b>${p?esc(p.name):''}</b></td>`}).join('')}</tr></table>`}
function people2(b,o){const p=sigP(b,o);const dots='........................................';
  return [p,null].map(x=>`<tr><td style="width:4%">-</td><td style="width:9%">Ông :</td><td style="width:40%">${x?esc(x.name):dots}</td><td style="width:12%">Chức vụ :</td><td>${x?esc(x.title):dots}</td></tr>`).join('')}
function clHeader(no,dateLabel,date,t1,t2,rh){const H=rh?Math.round(Math.max(rh,18)*1.25):0;const P=S.project;
  const rows=[['DỰ ÁN',P.name],['ĐỊA ĐIỂM',P.location],['CHỦ ĐẦU TƯ',P.investor],['TƯ VẤN GIÁM SÁT',P.supervisor],['NHÀ THẦU CHÍNH',P.mainC],['NHÀ THẦU PHỤ',P.subC]];
  const d=parts(date);
  return `<table style="width:100%;border-collapse:collapse;font-size:10pt;table-layout:fixed"><colgroup><col style="width:19%"><col style="width:23%"><col style="width:44%"><col style="width:14%"></colgroup>
  <tr style="${H?`height:${H}pt`:''}"><td colspan="2" style="${BX};font-weight:bold;font-size:9pt">SỐ: ${esc(no)}</td><td colspan="2" style="${BX};text-align:center;font-weight:bold;font-size:13pt">${esc(t1)}</td></tr>
  <tr style="${H?`height:${H}pt`:''}"><td colspan="2" style="${BX};font-weight:bold;font-size:9pt">${esc(dateLabel)} ${d?`${d.d} / ${d.m} / ${d.y}`:''}</td><td colspan="2" style="${BX};text-align:center;font-weight:bold;font-size:12pt">${esc(t2)}</td></tr></table>`}
function clBasis(b,rh){const TR=rh?`<tr style="height:${rh}pt">`:'<tr>';
  return `<table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:11pt">
  ${TR}<td style="${BX};width:6%;text-align:center;font-weight:bold">I</td><td colspan="2" style="${BX};font-weight:bold">Các căn cứ để kiểm tra :</td></tr>
  ${BASIS.map((r,i)=>`${TR}<td style="${BX};text-align:center">${i+1}</td><td style="${BX};width:30%">${r[0]}</td><td style="${BX}">${r[1]}</td></tr>`).join('')}</table>
  <table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:11pt">
  ${TR}<td style="${BX};width:6%;text-align:center;font-weight:bold">II</td><td colspan="2" style="${BX};font-weight:bold">Đối tượng kiểm tra :</td></tr>
  ${TR}<td style="${BX};text-align:center">1</td><td style="${BX};width:24%">Hạng mục</td><td style="${BX}">${esc(S.project.hangMuc)}</td></tr>
  ${TR}<td style="${BX};text-align:center">2</td><td style="${BX}">Cấu kiện</td><td style="${BX}">${esc(b.viTri)}</td></tr>
  ${TR}<td style="${BX};text-align:center">3</td><td style="${BX}">Vị trí</td><td style="${BX}">${esc(b.place)}</td></tr></table>`}
function clConcl(v,rh){const TR=rh?`<tr style="height:${rh}pt">`:'<tr>';return `<table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:11pt">${TR}<td colspan="2" style="${BX};font-weight:bold">IV.Kết luận :</td></tr>
  ${TR}<td style="${BX};width:6%;text-align:center;font-size:12pt">${box(v==='yes')}</td><td style="${BX}">Chấp thuận nghiệm thu, đồng ý cho triển khai các công việc xây dựng tiếp theo.</td></tr>
  ${TR}<td style="${BX};text-align:center;font-size:12pt">${box(v==='no')}</td><td style="${BX}">Không chấp thuận nghiệm thu</td></tr></table>`}
const SIGN3=['TVGS','NTC','NTP'];
function docPYC(b){const P=S.project;const T=tplOf('PYCNT')||{};const nP=sigP(b,'NTP'),nC=sigP(b,'NTC'),tv=sigP(b,'TVGS');
  return `<div data-ln="312" data-lnt="288" data-sa="60" style="line-height:1.35">${quocHieu()}<p style="text-align:right;font-style:italic;margin-top:6px">${dateLine(b.pycDate)}</p>
  <p style="text-align:center;font-weight:bold;font-size:14pt;margin:6px 0 2px">${esc(T.title)}</p><p style="text-align:center;font-weight:bold;margin:0">Số: ${esc(b.pycNo)||'…........................'}</p>
  ${projTable(true)}
  <table style="width:100%;border-collapse:collapse"><tr><td style="width:27%;text-align:right;padding-right:14px;vertical-align:top;font-weight:bold"><i>Kính gửi:</i></td><td style="font-weight:bold">- ${esc(P.qlda)}<br>- Tư vấn giám sát ${esc(P.supShort)}</td></tr></table>
  <p><b>1. Đối tượng nghiệm thu:</b></p><p style="margin-left:22px">${esc(b.title)}</p>
  <p><b>2. Vị trí nghiệm thu:</b> ${esc(b.viTri)||'…...............................'}</p>
  <p><b>3. Thời gian nghiệm thu:</b></p><p style="margin-left:22px">Bắt đầu : &nbsp; ${hmB(b,'start')} &nbsp; ${dmy(b.start)}</p><p style="margin-left:22px">Địa điểm: ${esc(b.place)}</p>
  <p><b>4. Đánh giá công việc:</b></p>
  <p style="text-align:justify">- Nhà thầu cam kết hạng mục trên đã đáp ứng yêu cầu chất lượng theo hồ sơ thiết kế, chỉ dẫn kỹ thuật, Hợp đồng xây dựng và các tài liệu có liên quan khác</p>
  <p>- Công việc chuẩn bị hồ sơ, thủ tục đã đầy đủ sẵn sàng để kiểm tra nghiệm thu.</p>
  <p style="text-align:justify">- Đề nghị Tư vấn giám sát đến công trường kiểm tra, nghiệm thu các công việc trên để nhà thầu triển khai các công việc tiếp theo.</p>
  <table style="width:100%;border-collapse:collapse;margin-top:14px;text-align:center"><tr>
   <td style="width:50%;vertical-align:top"><b>NHÀ THẦU PHỤ</b><br>(${esc(P.subC)})<br><br><br><br><br><br></td><td style="vertical-align:top"><b>NHÀ THẦU CHÍNH</b><br>(${esc(P.mainC)})<br><br><br><br><br><br></td></tr>
   <tr><td style="font-style:italic;font-weight:bold">Tên: ${nP?esc(nP.name):'…......................'}<br>Chức vụ: ${nP?esc(nP.title):'…..................'}</td><td style="font-style:italic;font-weight:bold">Tên: ${nC?esc(nC.name):'…..............'}<br>Chức vụ: ${nC?esc(nC.title):'...............'}</td></tr></table>
  <table style="width:100%;border-collapse:collapse;margin-top:16px;text-align:center"><tr style="height:34pt"><td rowspan="2" style="${BX};width:15%;font-weight:bold;padding:8px">TƯ VẤN<br>GIÁM SÁT</td><td style="${BX};width:15%;padding:10px">Người nhận:</td><td style="${BX};width:30%">${tv?esc(tv.name):''}</td><td style="${BX};width:12%">Chức vụ:</td><td style="${BX}">${tv?esc(tv.title):''}</td></tr>
  <tr style="height:34pt"><td style="${BX};padding:10px">Ngày nhận:</td><td style="${BX}">${fmtD(b.start)}</td><td style="${BX}">Chữ ký:</td><td style="${BX}"></td></tr></table></div>`}
function docNTCV(b){const P=S.project;const T=tplOf('NTCV')||{};
  const sec=(n,lab,name,o)=>`<p style="margin-top:4px"><b>${n} ${lab}: ${esc(name)}</b></p><table style="width:100%;border-collapse:collapse;margin-left:8px">${people2(b,o)}</table>`;
  return `<div data-ln="252" data-lnt="246" data-sa="20" style="line-height:1.15">${quocHieu()}<p style="text-align:right;font-style:italic;margin-top:6px">${dateLine(b.start)}</p>
  <p style="text-align:center;font-weight:bold;font-size:14pt;margin:6px 0 2px">${esc(T.title)}</p><p style="text-align:center;font-weight:bold;margin:0">Số: ${esc(b.no)||'…........................'}</p>
  ${projTable(false)}
  <p><b>1. Đối tượng nghiệm thu:</b></p><p style="margin-left:22px">${esc(b.title)} ${esc(b.viTri)}</p>
  <p><b>2. Thời gian và địa điểm nghiệm thu:</b></p>
  <table style="margin-left:18px;border-collapse:collapse"><tr><td style="width:90px">Bắt đầu :</td><td style="width:80px">${hmB(b,'start')}</td><td>${dateLine(b.start)}</td></tr><tr><td>Kết thúc :</td><td>${hmB(b,'end')}</td><td>${dateLine(b.end||b.start)}</td></tr></table>
  <p style="margin-left:22px">Vị trí: ${esc(b.place)}</p>
  <p><b>3. Thành phần ký biên bản nghiệm thu:</b></p>
  ${sec('3.1.','Tư vấn giám sát',P.supervisor,'TVGS')}${sec('3.2.','Nhà thầu chính',P.mainC,'NTC')}${sec('3.3.','Nhà thầu phụ',P.subC,'NTP')}
  <p><b>4. Kết luận:</b></p>
  <table style="width:100%;border-collapse:collapse;margin-left:8px"><tr><td style="width:4%">-</td><td>Chấp thuận nghiệm thu, đồng ý cho triển khai các công việc xây dựng tiếp theo</td><td style="width:8%;font-size:13pt">${box(b.conclusion==='yes')}</td></tr><tr><td>-</td><td>Không đồng ý nghiệm thu.</td><td style="font-size:13pt">${box(b.conclusion==='no')}</td></tr></table>
  <p>${esc(b.note)||'..............................................................................................................'}</p>
  <p><b>5. Chữ ký các bên tham gia nghiệm thu:</b></p>${signRow(b,SIGN3,undefined,6)}</div>
  <div data-ln="252" data-sa="0" style="margin-top:14pt;margin-left:24px">Hồ sơ nghiệm thu bao gồm:<div style="margin-left:24px">1. Phiếu yêu cầu nghiệm thu số: ${esc(b.pycNo)}</div><div style="margin-left:24px">2. Phiếu kết quả thí nghiệm;</div><div style="margin-left:24px">3. Các tài liệu kèm theo.</div></div>`}
function docCL(b,ci){const cl=b.cls[ci]||b.cls[0];if(!cl)return'';const tp=tplOf(cl.tpl)||{title1:'PHIẾU KIỂM TRA',title2:'',dateLabel:'Ngày phát hành:'};
  const NB=numbered(cl);const nr=NB.length+11;const rh=Math.max(14,Math.min(30,Math.floor(470/nr)));
  const rows=NB.map(r=>r.type==='g'?`<tr style="height:${rh}pt"><td style="${BX};text-align:center;font-weight:bold">${r.no}</td><td style="${BX};font-weight:bold">${esc(r.text)}</td><td style="${BX}"></td><td style="${BX}"></td><td style="${BX}"></td></tr>`:
   `<tr style="height:${rh}pt"><td style="${BX};text-align:center">${r.no}</td><td style="${BX}">${esc(r.c.item)}${r.c.note?` <i>(${esc(r.c.note)})</i>`:''}</td><td style="${BX};text-align:center">${esc(r.c.method)}</td><td style="${BX};text-align:center;font-size:12pt">${box(r.c.result==='Đạt')}</td><td style="${BX};text-align:center;font-size:12pt">${box(r.c.result==='Không đạt')}</td></tr>`).join('');
  return `${clHeader(cl.no,tp.dateLabel||'Ngày phát hành:',b.clDate,tp.title1,tp.title2,rh)}${clBasis(b,rh)}
  <table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:11pt">
  <tr style="height:${Math.round(rh*0.8)}pt"><td rowspan="2" style="${BX};width:6%;text-align:center;font-weight:bold">III</td><td rowspan="2" style="${BX};font-weight:bold">Nội dung kiểm tra</td><td rowspan="2" style="${BX};width:24%;text-align:center;font-weight:bold">Phương pháp<br>kiểm tra</td><td colspan="2" style="${BX};text-align:center;font-weight:bold">Kết luận</td></tr>
  <tr style="height:${Math.round(rh*0.8)}pt"><td style="${BX};width:9%;text-align:center;font-weight:bold">Đạt</td><td style="${BX};width:11%;text-align:center;font-weight:bold">Không đạt</td></tr>${rows}</table>
  ${clConcl(b.conclusion,rh)}${signRow(b,SIGN3,'(Ký, ghi rõ họ tên)',6)}`}
function docDBT(b){const T=tplOf('PYC_DBT')||{title1:'PHIẾU YÊU CẦU/ CHẤP THUẬN',title2:'CÔNG TÁC ĐỔ BÊ TÔNG'};const d=b.dbt;const dt=parts(d.time);
  const lines=(d.ykien?esc(d.ykien).split('\n').map(l=>`<tr><td colspan="5" style="${BX};height:20px">${l}</td></tr>`).join(''):'')+Array.from({length:Math.max(0,4-(d.ykien?d.ykien.split('\n').length:0))},()=>`<tr><td colspan="5" style="${BX};height:20px"></td></tr>`).join('');
  return `${clHeader(b.dbtNo,'Ngày phát hành:',b.clDate,T.title1,T.title2)}${clBasis(b)}
  <table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:11pt">
  <tr><td colspan="5" style="${BX}">Nhà thầu xin thông báo tại vị trí nêu trên đã hoàn thành các công tác kiểm tra gia công lắp dựng ván khuôn, cốt thép và các công tác liên quan. Công tác đổ bê tông dự kiến được bắt đầu từ lúc: <b>${dt?`${dt.h}h${dt.mi} ngày ${dt.d}/${dt.m}/${dt.y}`:'……………………'}</b></td></tr>
  <tr><td colspan="5" style="${BX};text-align:center;font-weight:bold">Các yêu cầu kỹ thuật của Bê tông</td></tr>
  <tr style="text-align:center;font-weight:bold"><td style="${BX};width:20%">Cấp phối bê tông</td><td style="${BX};width:20%">Độ sụt yêu cầu</td><td style="${BX};width:18%">Khối lượng BT<br>theo thiết kế (m3)</td><td style="${BX};width:20%">Yêu cầu lấy mẫu</td><td style="${BX}">Số lượng mẫu<br>hoặc tổ mẫu</td></tr>
  <tr style="text-align:center"><td style="${BX};height:22px">${esc(d.capPhoi||b.mac)||'…'}</td><td style="${BX}">${esc(d.doSut||b.doSut)||'…'}</td><td style="${BX}">${esc(d.kl||b.klLT)||'…'}</td><td style="${BX}">${esc(d.ycMau)||'…'}</td><td style="${BX}">${esc(d.slMau)||'…'}</td></tr>
  <tr><td colspan="5" style="${BX};font-weight:bold">Ý kiến của Kỹ sư giám sát thuộc đơn vị giám sát thi công:</td></tr>
  <tr><td colspan="5" style="${BX}">Chúng tôi đã kiểm tra tất cả các công tác trước khi đổ bê tông và có yêu cầu như sau:</td></tr>${lines}</table>
  ${clConcl(d.concl)}${signRow(b,SIGN3,'(Ký, ghi rõ họ tên)',6)}`}
function docLM(b){const P=S.project;const T=tplOf('BBLM_BT')||{title:'LẤY MẪU BÊ TÔNG TẠI HIỆN TRƯỜNG'};const L=lmRows(b);
  const sec=(lab,name,o)=>`<p style="margin-top:2px">- ${lab}: ${esc(name)}</p><table style="width:100%;border-collapse:collapse;margin-left:8px">${people2(b,o)}</table>`;
  const R=L.rows.slice();
  while(R.length<10)R.push({});const N=R.length,sz=String(b.lm.size||'').replace(/\s*\(mm\)\s*$/i,'');
  const rows=R.map((r,i)=>`<tr style="text-align:center;height:${N>10?13:16}pt"><td style="${BX}">${i<L.rows.length?i+1:''}</td>${i===0?`<td rowspan="${N}" style="${BX};vertical-align:middle;text-align:center">${esc(L.rows.length?sz:'')}</td>`:''}<td style="${BX};white-space:nowrap">${esc(r.xe||'')}</td><td style="${BX}">${esc(r.kl??'')}</td><td style="${BX}">${esc(r.sut||'')}</td>${i===0?`<td rowspan="${N}" style="${BX};vertical-align:middle;text-align:center">${esc(r.mau||'')}</td><td rowspan="${N}" style="${BX};vertical-align:middle;text-align:center">${esc(r.vt||'')}</td>`:''}</tr>`).join('');
  return `<div data-ln="${L.rows.length>10?240:252}" data-lnt="${L.rows.length>10?220:232}" data-sa="${L.rows.length>10?0:10}">${quocHieu()}<p style="text-align:right;font-style:italic;margin-top:6px">${dateLine(b.lmDate||b.start)}</p>
  <p style="text-align:center;font-weight:bold;font-size:14pt;margin:6px 0 2px">${esc(T.title)}</p><p style="text-align:center;font-weight:bold;margin:0">Số: ${esc(b.lmNo)}</p>
  ${projTable(false)}<p><b>1. Thành phần tham gia</b></p>
  ${sec('Tư vấn giám sát',P.supervisor,'TVGS')}${sec('Nhà thầu chính',P.mainC,'NTC')}${sec('Nhà thầu phụ',P.subC,'NTP')}
  <p>Cùng nhau lấy mẫu bê tông theo đúng tiêu chuẩn hiện hành để kiểm tra chất lượng thi công công trình với những nội dung sau</p>
  <p><b>2. Quy cách lấy mẫu:</b></p><p>- Đối tượng lấy mẫu thí nghiệm: ${esc(b.viTri)}${b.mac?` – Bê tông ${esc(b.mac)}${b.doSut?`, độ sụt ${esc(b.doSut)}`:''}`:''}</p><p>- Phương pháp lấy mẫu: ${esc(b.lm.phuongPhap)}</p>
  <table style="width:100%;border-collapse:collapse;margin-top:4px;font-size:${R.length>14?9:R.length>8?10:11}pt"><tr style="text-align:center;font-weight:bold"><td style="${BX};width:6%">STT</td><td style="${BX};width:15%">Kích thước mẫu<br>(mm)</td><td style="${BX};width:15%">Số xe</td><td style="${BX};width:10%">Khối lượng<br>(m3)</td><td style="${BX};width:9%">Độ sụt<br>(cm)</td><td style="${BX};width:21%">Số lượng mẫu<br>(viên)</td><td style="${BX}">Vị trí lấy mẫu</td></tr>${rows}
  <tr><td colspan="3" style="${BX};font-weight:bold">Tổng Khối Lượng:</td><td style="${BX};text-align:center;font-weight:bold">${L.rows.length?+L.sum.toFixed(2):'…'}</td><td colspan="2" style="${BX}">Tần suất lấy mẫu</td><td style="${BX};text-align:center">${esc(P.tanSuat||20)}m³/1 tổ mẫu</td></tr></table>
  <p><b>3. Mục đích lấy mẫu:</b> Kiểm tra cường độ bê tông</p><p><b>4. Nơi gửi mẫu thí nghiệm:</b> Phòng thí nghiệm ${esc(P.lab)}</p><p style="font-style:italic">(Kết quả thí nghiệm chính xác sẽ kèm theo biên bản này)</p>
  ${signRow(b,SIGN3,undefined,6)}</div>`}
function buildDoc(b,k){if(/^cl\d+$/.test(k))return docCL(b,+k.slice(2));return({pyc:docPYC,ntcv:docNTCV,dbt:docDBT,lm:docLM}[k]||docNTCV)(b)}
function refreshPreview(){const b=curB();const a=$('#a4');if(a&&b)a.innerHTML=buildDoc(b,UI.doc)}
function refreshValid(){const b=curB();const v=$('#valid');if(v&&b)v.innerHTML=validHTML(b);const s=document.querySelector('[data-act="send"]');if(s&&b)s.disabled=validate(b).blocks.length>0}

V.register=()=>{
  const L=S.bbnt.slice().sort((a,b)=>(a.start||'').localeCompare(b.start||''));
  return `<div class="head"><div><h1>Sổ theo dõi, xuất</h1></div>
  <div class="toolbar"><button class="btn" data-act="csvReg">${ic('word',15)} Xuất CSV (Excel)</button></div></div>
  <div class="card" style="padding:0"><div class="tbox" style="border:0;max-height:calc(100vh - 230px)"><table class="t"><tr><th>STT</th><th>Ngày NT</th><th>Số YCNT</th><th>Số BBNT</th><th>Công tác</th><th>Vị trí</th><th>Mác</th><th>Độ sụt</th><th>KL TT</th><th>Giờ</th><th>TVGS</th><th>Trạng thái</th></tr>
  ${L.map((b,i)=>{const tv=sigP(b,'TVGS');return `<tr class="click" data-act="open" data-id="${b.id}"><td>${i+1}</td><td>${fmtD(b.start)}</td><td class="small">${esc(b.pycNo)}</td><td class="small"><b>${esc(b.no)}</b></td><td class="small">${esc(b.title)}</td><td class="small">${esc(b.viTri)}</td><td>${esc(b.mac)}</td><td>${esc(b.doSut)}</td><td>${esc(b.klTT)}</td><td class="small">${hhmm(b.start)}–${hhmm(b.end)}</td><td class="small">${tv?esc(tv.name):''}</td><td>${chip(b.status)}</td></tr>`}).join('')||'<tr><td colspan="12" class="empty">Chưa có hồ sơ</td></tr>'}
  </table></div></div>`;
};
V.sign=()=>{
  const all=S.bbnt;const cnt=k=>all.filter(b=>sg(b).st===k).length;const tab=UI.sgTab||'in';
  const age=b=>{const g=sg(b);return daysSince(g.st==='trinh'?g.trinhAt:g.st==='in'?g.inAt:b.start)};
  let L=all.filter(b=>sg(b).st===tab);
  L.sort((a,b)=>(tab==='ky'?(sg(b).kyAt||'').localeCompare(sg(a).kyAt||''):(age(b)||0)-(age(a)||0)));
  const late=all.filter(b=>['in','trinh'].includes(sg(b).st)&&age(b)>7).length;
  const card=(k,sub)=>`<div class="card stat" style="cursor:pointer;${tab===k?'outline:2px solid var(--pri)':''}" data-act="sgTab" data-id="${k}"><div class="k">${SG[k].t}</div><div class="v" style="color:var(--${SG[k].c==='green'?'green':SG[k].c==='amber'?'amber':SG[k].c==='blue'?'pri':'ink2'})">${cnt(k)}</div><div class="s">${sub}</div></div>`;
  const nxt={chua:'in',in:'trinh',trinh:'ky',ky:'ky'}[tab];
  return `<div class="head"><div><h1>Theo dõi ký hồ sơ</h1></div></div>
  <div class="grid g4">${card('chua','Chưa xuất phiếu')}${card('in','Đã in, chưa gửi ký')}${card('trinh','Đang nằm ở TVGS/BĐH')}${card('ky','Đã đủ chữ ký')}</div>
  ${late?`<div class="alert y" style="margin-top:14px"><b>${late} bộ hồ sơ</b> đã in/trình ký quá 7 ngày mà chưa lấy về – nằm đầu danh sách, tô đỏ.</div>`:''}
  <div class="card" style="margin-top:14px;padding:0"><div class="toolbar" style="padding:12px 14px;margin:0;border-bottom:1px solid var(--line)"><b>${SG[tab].t} · ${L.length}</b>
   <button class="btn sm ghost" data-act="sgAll">Chọn / bỏ chọn tất cả</button>
   <span style="margin-left:auto"></span>${tab!=='ky'?`<button class="btn sm g" data-act="sgBulk" data-id="${nxt}">${ic('check',14)} Chuyển các hồ sơ đã chọn → ${SG[nxt].t}</button>`:''}<button class="btn sm" data-act="sgBulk" data-id="">Đổi tình trạng…</button>${tab==='chua'||tab==='in'?`<button class="btn sm" data-act="sgPrintChecked">${ic('print',14)} In các hồ sơ đã chọn</button>`:''}</div>
  <div class="tbox" style="border:0;max-height:calc(100vh - 380px)"><table class="t"><tr><th style="width:34px"></th><th>Số BBNT</th><th>Công tác</th><th>Vị trí</th><th>Ngày NT</th><th>${tab==='ky'?'Ngày ký':tab==='trinh'?'Ngày trình':tab==='in'?'Ngày in':'—'}</th><th>${tab==='ky'?'Lưu gốc':'Số ngày'}</th><th></th></tr>
  ${L.map(b=>{const g=sg(b);const a=age(b);const red=['in','trinh'].includes(tab)&&a>7;return `<tr${red?' style="background:#fff1f1"':''}><td><input type="checkbox" class="sgck" value="${b.id}" data-st="${g.st}"></td><td class="small"><b>${esc(b.no)}</b></td><td class="small">${esc(b.title)}</td><td class="small">${esc(b.viTri)}</td><td>${fmtD(b.start)}</td>
    <td>${fmtD(tab==='ky'?g.kyAt:tab==='trinh'?g.trinhAt:tab==='in'?g.inAt:'')||'<span class="mut">—</span>'}</td><td>${tab==='ky'?(b.archived?'<span class="chip c-green">Đã lưu</span>':'<span class="mut small">chưa</span>'):`<b style="color:${red?'var(--red)':'inherit'}">${a??''}</b>`}</td>
    <td style="text-align:right;white-space:nowrap">${tab!=='ky'?`<button class="btn sm g" data-act="sgOne" data-id="${b.id}:${nxt}">→ ${SG[nxt].t}</button>`:''} <button class="btn sm ghost" data-act="open" data-id="${b.id}">${ic('doc',14)}</button></td></tr>`}).join('')||`<tr><td colspan="8" class="empty">Không có hồ sơ ở bước này</td></tr>`}
  </table></div></div>
  <p class="mut small" style="margin-top:10px">Trên trang <b>DATA</b> cũng có cột “Tình trạng ký” và “Ngày ký” (gõ hoặc chọn), lọc “Ký: Chưa ký”, và nút <b>Đánh dấu ký…</b> cho nhiều dòng đang chọn.</p>`;
};
V.archive=()=>{
  const L=S.bbnt.filter(b=>sg(b).st==='ky').sort((a,b)=>(a.archived?1:0)-(b.archived?1:0)||(a.start||'').localeCompare(b.start||''));
  return `<div class="head"><div><h1>Lưu trữ file gốc</h1></div></div>
  <div class="card" style="padding:0"><div class="tbox" style="border:0"><table class="t"><tr><th>Số BB NTCV</th><th>Công việc</th><th>Ngày duyệt</th><th style="width:110px">Đã lưu gốc</th><th>Vị trí lưu</th></tr>
  ${L.map(b=>{const h=(b.history||[]).filter(x=>x.a==='Phê duyệt').pop();return `<tr><td><a href="#bbnt" data-act="open" data-id="${b.id}"><b>${esc(b.no)}</b></a></td><td>${esc(b.title)}</td><td>${h?fmtD(h.t):''}</td><td><input type="checkbox" data-bind="row:bbnt:${b.id}:archived" data-rr="1" ${b.archived?'checked':''}></td><td><input class="tin" placeholder="VD: Tủ 2 / Hộp B4.7-01 / scan …" data-bind="row:bbnt:${b.id}:archiveLoc" value="${esc(b.archiveLoc)}"></td></tr>`}).join('')||'<tr><td colspan="5" class="empty">Chưa có hồ sơ đã ký</td></tr>'}
  </table></div></div>`;
};
/* =================== Hồ sơ thanh toán: Danh mục hồ sơ quản lý chất lượng theo kỳ =================== */
const dd2=iso=>{const d=parts(iso);return d?`${String(d.d).padStart(2,'0')}/${String(d.m).padStart(2,'0')}/${d.y}`:''};
function payDef(p){const P=S.project;if(p.contract==null)p.contract=P.contract||'';if(p.duAn==null)p.duAn=P.name||'';if(p.diaDiem==null)p.diaDiem=(P.location||'').replace(/^An Thới,\s*/,'');if(p.goiThau==null)p.goiThau=P.hangMuc||'';if(!p.excl)p.excl=[];if(!p.tasks){const T=new Set();if(p.from&&p.to)S.bbnt.forEach(b=>{const d=dmDay(b);if(d&&d>=p.from&&d<=p.to)T.add(b.taskId)});p.tasks=[...T]}return p}
function dmDay(b){return ymd(b.start||b.pycDate||b.dueAt||'')}
function dmOrder(){/* thứ tự đúng như sheet DATA trong Excel; hồ sơ app tự tạo xếp ngay sau nhóm của nó */
  const Y=window.SYNC,nz=x=>String(x??'').replace(/\s+/g,' ').trim(),M={};
  if(Y&&Array.isArray(Y.rows))Y.rows.forEach((r,i)=>{if(r&&r.length>22&&String(r[18]||'').trim())M[nz(String(r[19]||'').trim()||String(r[18]).replace(/YCNT$/,'BBNT'))+'|'+nz(r[22])]=i});
  const pos=new Map(),tMax={},ti=new Map(S.tasks.map((t,i)=>[t.id,i]));
  S.bbnt.forEach(b=>{const k=M[nz(b.no)+'|'+nz(b.viTri)];if(k!=null){pos.set(b.id,k);tMax[b.taskId]=Math.max(tMax[b.taskId]??-1,k)}});
  S.bbnt.forEach((b,i)=>{if(!pos.has(b.id)){const m=b.sbtFor||b.tvkFor;const base=tMax[b.taskId]!=null?tMax[b.taskId]:(m&&pos.has(m)?pos.get(m):1e6+(ti.get(b.taskId)||0)*1000);pos.set(b.id,base+0.001*(i+1))}});
  return pos}
function dmCand(p){const T=new Set(p.tasks||[]);return S.bbnt.filter(b=>T.has(b.taskId)&&(!p.onlySigned||sg(b).st==='ky'))}
function dmUsedBefore(p){/* hồ sơ đã đưa vào các kỳ trước (theo thứ tự kỳ): id -> tên kỳ */
  const used=new Map();for(const q of S.payments){if(q===p)break;payDef(q);const ex=new Set(q.excl||[]);dmCand(q).forEach(b=>{if(!used.has(b.id)&&!ex.has(b.id))used.set(b.id,q.name)})}return used}
function dmSorter(p){const pos=dmOrder();const o=new Map((p.order||[]).map((id,i)=>[id,i]));const k=b=>o.has(b.id)?o.get(b.id):1e7+pos.get(b.id);return(a,b)=>k(a)-k(b)}
function dmAll(p){const used=dmUsedBefore(p);return dmCand(p).filter(b=>!used.has(b.id)).sort(dmSorter(p))}
function dmTaskList(){/* các công tác (nhóm trong sheet DATA) theo đúng thứ tự Excel */
  const pos=dmOrder(),m={};S.bbnt.forEach(b=>{const v=pos.get(b.id);const o=m[b.taskId]||(m[b.taskId]={n:0,ky:0,min:v});o.n++;if(sg(b).st==='ky')o.ky++;if(v<o.min)o.min=v});
  return S.tasks.filter(t=>m[t.id]).map(t=>Object.assign({t},m[t.id])).sort((a,b)=>a.min-b.min)}
function payTaskModal(pid){const p=S.payments.find(x=>x.id===pid);if(!p)return;payDef(p);const sel=new Set(p.tasks||[]);
  const other={};S.payments.forEach(q=>{if(q!==p)(q.tasks||[]).forEach(id=>(other[id]=other[id]||[]).push(q.name))});
  const L=dmTaskList();
  $('#modal').innerHTML=`<h3 style="margin-top:0">Chọn công tác cho ${esc(p.name)}</h3>
   <div class="toolbar" style="margin:0 0 8px"><input class="in" id="ptq" placeholder="Tìm công tác, vị trí…" style="flex:1"><button class="btn sm" data-act="ptAll">Chọn hết</button><button class="btn sm" data-act="ptNone">Bỏ hết</button></div>
   <div id="ptList" style="max-height:58vh;overflow:auto;border:1px solid var(--line);border-radius:8px">${L.map(x=>`<label class="ptRow" data-q="${esc((x.t.name+' '+(x.t.code||'')).toLowerCase())}" style="display:flex;gap:10px;align-items:flex-start;padding:7px 10px;border-bottom:1px solid var(--line);cursor:pointer"><input type="checkbox" class="ptk" value="${x.t.id}" ${sel.has(x.t.id)?'checked':''} style="margin-top:3px"><span style="flex:1"><b style="font-weight:600">${esc(x.t.name)}</b><span class="mut small"> · ${x.n} bộ, ${x.ky} đã ký${other[x.t.id]?` · <span style="color:var(--amber)">đã có ở ${esc(other[x.t.id].join(', '))}</span>`:''}</span></span></label>`).join('')||'<div class="empty">Chưa có công tác</div>'}</div>
   <div class="acts"><button class="btn" data-act="mClose">Hủy</button><button class="btn p" data-act="ptOk" data-id="${p.id}">Xong</button></div>`;
  $('#modalBg').classList.add('on');const q=$('#ptq');q.oninput=()=>{const v=q.value.toLowerCase().trim();document.querySelectorAll('#ptList .ptRow').forEach(r=>r.style.display=!v||r.dataset.q.includes(v)?'':'none')};q.focus()}
function dmRecs(p){const ex=new Set(p.excl||[]);return dmAll(p).filter(b=>!ex.has(b.id))}
const DMB='border:1px solid #000;padding:2px 4px;vertical-align:middle';
function dmHasTN(b){return !!(b.docs&&b.docs.lm)||!!b.lmNo}
function dmRows(b,p){const rows=[['Phiếu yêu cầu nghiệm thu',b.pycNo,b.pycDate],['Biên bản nghiệm thu công việc xây dựng',b.no,b.start],['Checklist công việc nghiệm thu',(b.cls&&b.cls[0]||{}).no||'',b.clDate]];
  if(p&&p.tnFull){if(isSBT(b)){rows.push(['Biên bản thí nghiệm 28 ngày','',''])}else if(dmHasTN(b)&&(p.tnLot||!/lót/i.test(b.title||''))){rows.push(['Biên bản lấy mẫu thí nghiệm','',''],['Biên bản thí nghiệm 7 ngày','',''])}else if(dmHasTN(b)){rows.push(['Biên bản thí nghiệm 7 ngày','',''])}}
  else if(dmHasTN(b))rows.push(['Biên bản thí nghiệm 7 ngày','','']);return rows}
function dmBlock(b,n,p){const rows=dmRows(b,p);
  return `<tbody class="dmb"><tr><td rowspan="${rows.length+1}" style="${DMB};text-align:center;vertical-align:middle;font-weight:bold">${n}</td><td colspan="3" style="${DMB};font-weight:bold">${esc((String(b.title||'').trim()+' '+String(b.viTri||'').trim()).trim())}</td></tr>`+
    rows.map(r=>`<tr><td style="${DMB};padding-left:6px">${r[0]}</td><td style="${DMB};font-size:9.5pt;word-break:break-all">${esc(r[1]||'')}</td><td style="${DMB};text-align:center">${dd2(r[2])}</td></tr>`).join('')+'</tbody>'}
const DMCOL='<colgroup><col style="width:6%"><col style="width:43%"><col style="width:38%"><col style="width:13%"></colgroup>';
const DMHEAD=`<tbody><tr style="background:#d9d9d9"><td style="${DMB};text-align:center;font-weight:bold">STT</td><td style="${DMB};text-align:center;font-weight:bold">Nội dung hồ sơ nghiệm thu</td><td style="${DMB};text-align:center;font-weight:bold">Số biên bản</td><td style="${DMB};text-align:center;font-weight:bold">Ngày</td></tr></tbody>`;
function dmTitle(p){const L=(k,v)=>`<tr><td colspan="4" style="${DMB};font-weight:bold;padding:4px 6px">${k}${esc(String(v||'').toUpperCase())}</td></tr>`;
  return `<tbody><tr><td colspan="4" style="${DMB};text-align:center;font-weight:bold;font-size:14pt;padding:10px 4px">DANH MỤC HỒ SƠ QUẢN LÝ CHẤT LƯỢNG</td></tr>${L('DỰ ÁN: ',p.duAn)}${L('ĐỊA ĐIỂM: ',p.diaDiem)}${L('GÓI THẦU: ',p.goiThau)}<tr><td colspan="4" style="${DMB};height:8px"></td></tr>${L('THEO HỢP ĐỒNG: ',p.contract)}</tbody>`}
const dmTable=inner=>`<table style="width:100%;border-collapse:collapse;table-layout:fixed;font-family:'Times New Roman',serif;font-size:10.5pt;line-height:1.25">${DMCOL}${inner}</table>`;
function dmPages(p){/* chia trang A4: mỗi trang lặp dòng tiêu đề cột, không cắt đôi một bộ hồ sơ */
  const R=dmRecs(payDef(p));const blocks=R.map((b,i)=>dmBlock(b,i+1,p));
  let pa=document.getElementById('printArea');if(!pa){pa=document.createElement('div');pa.id='printArea';document.body.appendChild(pa)}
  pa.classList.add('measure');pa.innerHTML='<div class="pp"></div>';const box=pa.firstChild;
  const mm=document.createElement('div');mm.style.height='262mm';box.appendChild(mm);const H=mm.getBoundingClientRect().height;mm.remove();
  box.innerHTML=dmTable(dmTitle(p)+DMHEAD+blocks.join(''));const tb=[...box.querySelectorAll('tbody')];const hT=tb[0].getBoundingClientRect().height,hH=tb[1].getBoundingClientRect().height;
  const hs=tb.slice(2).map(x=>x.getBoundingClientRect().height);pa.innerHTML='';pa.classList.remove('measure');
  const pages=[];let cur=[],used=hT+hH+6;
  blocks.forEach((bl,i)=>{if(cur.length&&used+hs[i]>H-18){pages.push(cur);cur=[];used=hH+6}cur.push(bl);used+=hs[i]});pages.push(cur);
  return pages.map((pg,k)=>`<div style="position:relative;min-height:262mm">${dmTable((k?'':dmTitle(p))+DMHEAD+pg.join(''))}<div style="position:absolute;left:0;right:0;bottom:0;text-align:center;font:10pt 'Times New Roman',serif">${k+1}/${pages.length}</div></div>`)}
function dmName(p){return ('Danh_muc_HSCL_'+String(p.name||'ky')).replace(/[\\\/:*?"<>|\s]+/g,'_')}
V.payment=()=>{
  return `<div class="head"><div><h1>Hồ sơ thanh toán</h1></div><button class="btn p" data-act="addPay">${ic('plus',16)} Thêm kỳ</button></div>
  ${S.payments.slice().reverse().map(p=>{payDef(p);const all=dmAll(p),ex=new Set(p.excl),R=all.filter(b=>!ex.has(b.id));const lock=p.status==='approved';
    const nKy=R.filter(b=>sg(b).st==='ky').length,nCh=R.length-nKy;const dis=lock?'disabled':'';
    const f=(k,l,w)=>`<label class="small" style="display:flex;flex-direction:column;gap:2px;${w?'flex:'+w:''}">${l}<input class="in" data-bind="row:payments:${p.id}:${k}" value="${esc(p[k]||'')}" ${dis}></label>`;
    return `<div class="card" style="margin-bottom:16px">
    <div class="head" style="gap:10px;flex-wrap:wrap"><div style="flex:1;min-width:240px"><input class="in" style="font-weight:600;font-size:15px" data-bind="row:payments:${p.id}:name" value="${esc(p.name)}" ${dis}></div>
     <div class="toolbar" style="margin:0;flex-wrap:wrap"><button class="btn sm" data-act="payTasks" data-id="${p.id}" ${dis}>☰ Chọn công tác (${(p.tasks||[]).length})</button>
     <label class="small"><input type="checkbox" data-act="payOnly" data-id="${p.id}" ${p.onlySigned?'checked':''} ${dis}> Chỉ hồ sơ đã ký</label><label class="small" title="Bê tông: thêm dòng Biên bản lấy mẫu thí nghiệm; sau khi đổ BT: Biên bản thí nghiệm 28 ngày"><input type="checkbox" data-act="payTn" data-id="${p.id}" ${p.tnFull?'checked':''} ${dis}> BB lấy mẫu + TN 28 ngày</label>
     ${lock?`<span class="chip c-green">Đã chốt</span><button class="btn sm ghost" data-act="payUnlock" data-id="${p.id}">Mở chốt</button>`:`<button class="btn sm g" data-act="payOk" data-id="${p.id}">${ic('check',14)} Chốt kỳ</button>`}
     ${lock?'':`<button class="btn sm ghost d" data-act="del" data-id="payments:${p.id}">${ic('trash',15)}</button>`}</div></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 10px">${f('duAn','Dự án',3)}${f('diaDiem','Địa điểm',2)}${f('goiThau','Gói thầu',2)}${f('contract','Theo hợp đồng',1.5)}</div>
    <div class="toolbar" style="margin:0 0 10px;flex-wrap:wrap"><button class="btn p sm" data-act="dmPrint" data-id="${p.id}">🖨 In danh mục</button><button class="btn sm" data-act="dmWord" data-id="${p.id}">${ic('word',14)} Tải Word</button><button class="btn sm" data-act="dmXlsx" data-id="${p.id}">Tải Excel</button>
     <span class="chip c-blue">${R.length} bộ hồ sơ</span><span class="chip c-green">${nKy} đã ký</span>${nCh?`<span class="chip c-amber">${nCh} chưa ký</span>`:''}${ex.size?`<span class="chip c-gray">${ex.size} bỏ ra</span>`:''}${(()=>{const u=dmUsedBefore(p);const h=dmCand(p).filter(b=>u.has(b.id)).length;return h?`<span class="chip c-gray">${h} bộ đã thanh toán kỳ trước</span>`:''})()}</div>
    <div class="tbox" style="max-height:460px;overflow:auto"><table class="t"><tr><th style="width:34px"></th><th style="width:44px">STT</th><th>Nội dung hồ sơ nghiệm thu</th><th>Số biên bản nghiệm thu</th><th>Ngày NT</th><th>Tình trạng ký</th></tr>
    ${(()=>{let n=0;const u=dmUsedBefore(p);return dmCand(p).sort(dmSorter(p)).map(b=>{const paid=u.get(b.id);const off=!!paid||ex.has(b.id);if(!off)n++;return `<tr style="${off?'opacity:.5':''}"><td><input type="checkbox" data-act="payTog" data-id="${p.id}:${b.id}" ${off?'':'checked'} ${dis||paid?'disabled':''} title="${paid?'Đã thanh toán ở '+esc(paid):'Đưa vào / bỏ khỏi danh mục'}"></td><td>${off?'':n}</td><td>${esc(b.title||'')} <span class="mut">${esc(b.viTri||'')}</span>${paid?` <span class="chip c-gray">Đã TT · ${esc(paid)}</span>`:''}</td><td><a href="#" data-act="open" data-id="${b.id}">${esc(b.no)}</a></td><td>${dd2(b.start||b.pycDate)}</td><td>${sgChip(b)}</td></tr>`}).join('')})()||'<tr><td colspan="6" class="empty">Chưa chọn công tác – bấm “Chọn công tác”</td></tr>'}
    </table></div></div>`}).join('')||'<div class="card empty">Chưa có kỳ thanh toán – bấm “Thêm kỳ”.</div>'}`;
};
function asbuiltData(){
  return S.wbs.map(w=>{const ts=S.tasks.filter(t=>t.wbs===w.code).map(t=>{
    const ps=S.plans.filter(p=>p.taskId===t.id);const bs=S.bbnt.filter(b=>b.taskId===t.id);
    const appr=ps.filter(p=>planStatus(p)==='approved').length;const apprB=bs.filter(b=>b.status==='approved').length;
    return{t,ps:ps.length,appr,apprB,bs:bs.length,full:ps.length?appr===ps.length:apprB>0}});return{w,tasks:ts}});
}
V.asbuilt=()=>{
  const D=asbuiltData();
  return `<div class="head"><div><h1>Hồ sơ hoàn công theo WBS</h1></div></div>
  ${D.map(({w,tasks})=>{const f=tasks.filter(x=>x.full).length;const pc=tasks.length?Math.round(f/tasks.length*100):0;return `<div class="wbsnode"><div class="hd"><b>${esc(w.code)}</b><span>${esc(w.name)}</span><span class="mut small">${esc(w.hm)} . ${w.qty} ${esc(w.unit)}</span><span style="margin-left:auto" class="chip ${f===tasks.length&&tasks.length?'c-green':'c-gray'}">${f}/${tasks.length} việc đủ</span><div class="bar" style="width:120px;margin:0"><i style="width:${pc}%;background:var(--green)"></i></div></div>
   ${tasks.length?`<table class="t"><tr><th>Công việc nghiệm thu</th><th>Checklist</th><th>Lần theo KH</th><th>Đã duyệt</th><th>Hồ sơ (tổng)</th><th>Tình trạng</th></tr>${tasks.map(x=>`<tr><td>${esc(x.t.name)}</td><td class="mut">${esc(clCodes(x.t.tpls)||'—')}</td><td>${x.ps}</td><td>${x.ps?x.appr:x.apprB}</td><td>${x.bs}</td><td>${x.full?'<span class="chip c-green">Đủ</span>':'<span class="chip c-amber">Thiếu</span>'}</td></tr>`).join('')}</table>`:'<div class="empty small">Chưa gắn công việc nghiệm thu</div>'}</div>`}).join('')}`;
};
V.system=()=>`<div class="head"><div><h1>Dữ liệu, hướng dẫn</h1></div></div>
  <div class="grid g2">
   <div class="card"><h3>Sao lưu</h3><p class="mut small">Tải toàn bộ dữ liệu (dự án, nhân sự, biểu mẫu, WBS, công việc, kế hoạch, hồ sơ) ra một file .json.</p><button class="btn p" data-act="backup">${ic('word',15)} Tải file sao lưu</button><button class="btn" style="margin-top:8px" data-act="copyJson">${ic('copy',15)} Sao chép JSON</button></div>
   <div class="card"><h3>Nhập từ Excel (sheet DATA)</h3><p>${syncBadge()}</p><p class="mut small">Tác vụ tự động trên máy đọc file HSNT mỗi giờ và đẩy vào app; mở lại app là có dòng mới. Hoặc chọn file để nhập ngay (chỉ thêm dòng chưa có):</p><input type="file" class="in" accept=".xlsm,.xlsx,.xls" id="xlsFile"></div>
   <div class="card"><h3>Khôi phục</h3><p class="mut small">Chọn file .json đã sao lưu. Dữ liệu hiện tại sẽ được thay thế.</p><input type="file" accept=".json,application/json" id="restoreFile" class="in"></div>
   <div class="card"><h3>Làm mới</h3><p class="mut small">Nạp lại 387 hồ sơ Block 4.5 từ file Excel đã gửi, hoặc xóa hồ sơ để nhập lại từ đầu.</p><div class="toolbar"><button class="btn" data-act="resetDemo">Nạp lại dữ liệu Block 4.5 ban đầu</button><button class="btn d" data-act="wipe">Xóa toàn bộ hồ sơ</button></div></div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Hướng dẫn nhanh</h3><ol class="guide">
   <li><b>Thông tin dự án</b>: kiểm tra tên dự án, hạng mục, các bên, số hợp đồng; thay tên nhân sự mẫu bằng tên thật và tích “Ký”.</li>
   <li><b>Kho biểu mẫu</b>: 4 biểu mẫu chung + 9 checklist theo file công ty. Sửa nội dung, phương pháp kiểm tra, hoặc thêm checklist mới (VD trắc đạc).</li>
   <li><b>Nhập dữ liệu</b>: nhập WBS và công việc nghiệm thu, mỗi việc gắn 1 checklist. Có thể dán thẳng từ Excel.</li>
   <li><b>Kế hoạch nghiệm thu</b>: thêm các lần nghiệm thu dự kiến (tạo hàng loạt theo vị trí). Dòng quá hạn hiện đỏ.</li>
   <li><b>Lập hồ sơ</b>: bấm “Lập” → nhập vị trí, giờ thực tế, đánh giá từng dòng Đạt/Không đạt, chọn kết luận → “Gửi kiểm tra”. Công tác bê tông nhập thêm cấp phối, độ sụt và các xe lấy mẫu.</li>
   <li>Đổi vai trò ở góc trên: <b>Kiểm tra</b> chuyển phê duyệt hoặc trả lại kèm lý do; <b>Phê duyệt</b> duyệt hoặc trả lại.</li>
   <li><b>Word cả bộ</b>: một file .docx gồm đủ các phiếu, mỗi phiếu một trang, để in ký. Mở bằng Microsoft Word.</li>
  </ol></div>`;

/* =================== Theo dõi ký hồ sơ =================== */
const SG={chua:{t:'Chưa in',c:'gray'},in:{t:'Đã in – chờ ký',c:'amber'},trinh:{t:'Đang trình ký',c:'blue'},ky:{t:'Đã ký',c:'green'}};
const SGK=['chua','in','trinh','ky'];
function sg(b){if(!b.sign)b.sign={st:'chua'};return b.sign}
const sgChip=b=>{const x=SG[sg(b).st]||SG.chua;return `<span class="chip c-${x.c}">${x.t}</span>`};
function sgSet(b,st,dateISO){const g=sg(b);if(!SG[st])return;const d=dateISO||nowISO();g.st=st;
  if(st==='in'&&!g.inAt)g.inAt=d;if(st==='trinh'){g.trinhAt=d;if(!g.inAt)g.inAt=d}if(st==='ky'){g.kyAt=d;if(!g.inAt)g.inAt=d}if(st==='chua'){delete g.inAt;delete g.trinhAt;delete g.kyAt}
  log(b,'Tình trạng ký: '+SG[st].t)}
function sgParse(v){v=String(v||'').toLowerCase().trim();if(!v)return'chua';if(/đã ký|da ky|^ký|^ky$|lấy về/.test(v))return'ky';if(/trình/.test(v))return'trinh';if(/in|chờ/.test(v))return'in';if(/chưa/.test(v))return'chua';return null}
const daysSince=iso=>iso?Math.floor((Date.now()-new Date(iso).getTime())/864e5):null;
const CLR2SG={y:'ky',b:'trinh',g:'ky'};
function sgDefaultImported(b){if(b.sign)return;const d=daysSince(b.start);b.sign=d!=null&&d>14?{st:'ky',kyAt:'',inAt:'',auto:true}:{st:'in',inAt:b.start||nowISO(),auto:true}}

/* =================== Đồng bộ từ Excel trên máy =================== */
function splitDupSec(rows){/* nhóm trùng tên trong Excel (VD "Hoàn công móng" B3 và B2) → tách thành nhóm riêng */
  if(S.splitSec1)return;S.splitSec1=true;const secN={};let sec='',occ=1,prevT=null;let moved=0;
  for(let r=21;r<rows.length;r++){const R=rows[r]||[];const S18=String(R[18]==null?'':R[18]).trim();
    if(!S18){const a=String(R[0]==null?'':R[0]).trim();if(a&&isNaN(+a)){sec=a;secN[a]=(secN[a]||0)+1;occ=secN[a]}continue}
    const T=String(R[19]==null?'':R[19]).trim()||S18.replace(/YCNT$/,'BBNT');const W=String(R[22]==null?'':R[22]).replace(/\s+/g,' ').trim();
    const b=S.bbnt.find(x=>x.no===T&&String(x.viTri||'').replace(/\s+/g,' ').trim()===W);if(!b)continue;const t=task(b.taskId);
    if(t&&occ>1&&t.name===sec&&(t.occ||1)!==occ){let nt=S.tasks.find(x=>x.name===sec&&x.hm===t.hm&&x.occ===occ);
      if(!nt){nt=Object.assign({},t,{id:uid(),occ,wbs:(numCode(S18,'4.5')||t.wbs)});const i=prevT?S.tasks.indexOf(prevT):-1;if(i>=0)S.tasks.splice(i+1,0,nt);else S.tasks.push(nt)}
      b.taskId=nt.id;const p=S.plans.find(x=>x.id===b.planId);if(p)p.taskId=nt.id;moved++}
    prevT=task(b.taskId)}
  if(moved)save()}
function sbtR28Fix(){/* hồ sơ sau khi đổ BT dùng phiếu "Chất lượng bê tông" như file Excel */
  if(S.sbtR28)return;S.sbtR28=true;if(!S.templates.some(t=>t.id==='CL_R28'))return;
  S.bbnt.forEach(b=>(b.cls||[]).forEach(c=>{if(c.tpl==='CL_SAUBT'){c.tpl='CL_R28';c.checks=null;c.numStyle='flat'}}));
  S.tasks.forEach(t=>{if(Array.isArray(t.tpls))t.tpls=t.tpls.map(x=>x==='CL_SAUBT'?'CL_R28':x)});save()}
function applySync(){
  if(typeof FS_ON!=='undefined'&&FS_ON&&!FS.ok)return;/* chờ đọc dữ liệu ổ D: rồi mới nạp Excel */
  const Y=window.SYNC;if(!Y||!Array.isArray(Y.rows))return;
  if(S.manualPours&&String(S.manualPours.at||'')>String(Y.at||''))Y.pours=S.manualPours.pours;else if(S.manualPours)delete S.manualPours;
  splitDupSec(Y.rows);
  let last='';if(FS_ON)last=S._syncStamp||'';else try{last=localStorage.getItem(LS+'_sync')||''}catch(e){}
  S.syncInfo={file:Y.file,at:Y.at,count:Y.count,stamp:Y.stamp};
  if(last===String(Y.stamp)){applyPours(Y);return}
  const r=importDATA(S,Y.rows,{update:true,status:'approved',colors:Y.colors||{}});
  S.syncInfo.added=r.added;S.syncInfo.updated=r.updated;
  if(FS_ON)S._syncStamp=String(Y.stamp);else try{localStorage.setItem(LS+'_sync',String(Y.stamp))}catch(e){}
  applyPours(Y);save();
  if(r.added||r.updated)setTimeout(()=>toast(`Đã đồng bộ từ Excel: thêm ${r.added}, cập nhật ${r.updated} dòng`),400);
}
function syncBadge(){const I=S.syncInfo;if(!I)return'<span class="mut small">Chưa có đồng bộ tự động từ Excel</span>';
  return `<span class="chip c-green" title="${esc(I.file)}">⟳ Excel: ${esc(I.file)} · ${fmtDT(I.at)} · ${I.count} dòng</span>`}

/* =================== Nhật ký đổ bê tông → DATA =================== */
const pNorm=s=>String(s||'').toLowerCase().replace(/bê\s*tông/g,'').replace(/block\s*b?4\.\d/g,'').replace(/tầm/g,'tầng').replace(/[^0-9a-zà-ỹđ\/'\-]/g,'');
const pKey=p=>p.d+'|'+pNorm(p.desc);
const pTok=s=>new Set((String(s||'').toLowerCase().match(/[0-9a-z']+(?:-[0-9a-z']+)?(?:\/[0-9a-z'\-]+)*/g)||[]).filter(x=>/\d/.test(x)));
function pSim(a,b){const A=pNorm(a),B=pNorm(b);if(!A||!B)return 0;if(A.includes(B)||B.includes(A))return 1;const x=pTok(a),y=pTok(b);if(!x.size||!y.size)return 0;let n=0;x.forEach(t=>{if(y.has(t))n++});return n/Math.max(x.size,y.size)}
const isBT=b=>/đổ bê tông/i.test(b.title||'')&&!/sau khi|tháo|hoàn công|trước khi/i.test(b.title||'');
const pKind=s=>String(s||'').toLowerCase().replace(/^\s*bê\s*tông\s*/,'').replace(/^lót\s*/,'').replace(/dầm\s*(định|dẫn)\s*(hướng|dướng)/,'dầm dẫn').replace(/[^a-zà-ỹđ ]/g,' ').trim().split(/\s+/).slice(0,2).join(' ');
const noTail=no=>{const s=String(no||'');const i=s.indexOf('/');return i<0?s:s.slice(i)};
const reNo=(s,n)=>String(s||'').replace(/^\s*\d+/,String(n));
const ymd=iso=>String(iso||'').slice(0,10);
const dDiff=(a,b)=>Math.round((new Date(ymd(a))-new Date(ymd(b)))/864e5);
const shiftISO=(iso,n)=>iso?addDays(iso,n).slice(0,10)+String(iso).slice(10):iso;
function pPerson(name,org,title,duty){name=String(name||'').trim();if(!name)return'';let p=S.people.find(x=>x.name===name&&x.org===org);if(!p){p={id:uid(),name,org,title,duty,sign:true};S.people.push(p)}return p.id}
function pCodeOf(b){return (numCode(b.no,String((S.hms.find(h=>h.name===(task(b.taskId)||{}).hm)||{}).code||'4.5'))||'').split('/').filter(Boolean)[0]||''}
function pNextNo(tail){let m=0;S.bbnt.forEach(b=>{if(noTail(b.no)===tail)m=Math.max(m,leadNo(b.no))});return m+1}
function pLink(P){/* trả về bbnt chính đã có cho lần đổ P */
  const L=S.pourLink||{};const k=pKey(P);if(L[k]){const b=S.bbnt.find(x=>x.id===L[k]);return b||null}
  const used=new Set(Object.values(L));
  const C=S.bbnt.filter(b=>isBT(b)&&!used.has(b.id)&&Math.abs(dDiff(b.start,P.d))<=1&&pKind(b.viTri)===pKind(P.desc)&&!(b.mac&&P.mac&&(String(b.mac).match(/B\d+/i)||[''])[0].toUpperCase()!==(String(P.mac).match(/B\d+/i)||[''])[0].toUpperCase()&&pSim(P.desc,b.viTri)<0.99));
  let best=null,bs=0;C.forEach(b=>{const s=pSim(P.desc,b.viTri)-(ymd(b.start)===P.d?0:0.2);if(s>bs){bs=s;best=b}});
  if(best&&bs>=0.5)return best;
  const same=C.filter(b=>ymd(b.start)===P.d);return same.length===1&&bs>0?same[0]:null}

const isSBT=b=>/sau khi đổ bê tông/i.test(b.title||'')&&!/hoàn công|trước khi/i.test(b.title||'');
function sbtOf(m){return S.bbnt.find(b=>b!==m&&isSBT(b)&&(b.sbtFor===m.id||pSim(b.viTri,m.viTri)>=0.99&&dDiff(b.start||b.dueAt,m.start)>=10))||null}
function restoreGrp1(){if(S.restoreGrp1)return;S.restoreGrp1=true;const mt=S.tasks.find(x=>x.name==='Ván khuôn, cốt thép và bê tông dầm sàn tầng 1');if(!mt)return;
  const like=(re)=>{const b=S.bbnt.filter(re).sort((a,b)=>(b.start||'').localeCompare(a.start||''))[0];return b?task(b.taskId):null};
  const tv=like(b=>isTVK(b)&&/^dầm sàn/i.test(b.viTri||'')),sb=like(b=>isSBT(b));const add=[];
  [['Tháo ván khuôn dầm sàn tầng 1',tv,'DST1/TVK'],['Biên bản kiểm tra bề mặt sau khi đổ bê tông dầm sàn tầng 1',sb,'DST1/SBT']].forEach(([nm,src,cd])=>{
    if(S.tasks.some(x=>x.name===nm))return;add.push(Object.assign({},src||mt,{id:uid(),name:nm,hm:mt.hm,code:cd,wbs:cd}))});
  if(!add.length)return;const i=S.tasks.indexOf(mt);S.tasks.splice(i+1,0,...add);save()}
function delDst1(){if(S.delDst1)return;S.delDst1=true;const m=S.bbnt.find(b=>/^1\/NOQ\/CEN\/KC\/4\.5\/DST1\/BBNT$/.test(b.no));if(!m)return;
  const rm=S.bbnt.filter(b=>(b.tvkFor===m.id||b.sbtFor===m.id)&&sg(b).st==='chua');if(!rm.length)return;const ids=new Set(rm.map(b=>b.id)),pl=new Set(rm.map(b=>b.planId)),tk=new Set(rm.map(b=>b.taskId));
  S.bbnt=S.bbnt.filter(b=>!ids.has(b.id));S.plans=S.plans.filter(p=>!pl.has(p.id));S.tasks=S.tasks.filter(x=>!tk.has(x.id)||S.bbnt.some(b=>b.taskId===x.id));(S.sbtSkip=S.sbtSkip||{})[m.id]=1;save()}
function blankComp(b){/* hồ sơ chưa làm: để trống ngày giờ, giữ ngày dự kiến để nhắc in */
  b.dueAt=b.dueAt||ymd(b.start);['pycDate','start','end','clDate','lmDate'].forEach(k=>b[k]='');b.startNoTime=true;b.endNoTime=true;b.tLM='';b.r7='';b.r28='';return b}
function sbtDateFix(){/* hồ sơ sau khi đổ BT đã để trống: điền lại ngày theo ngày đổ + 28 */
  if(S.sbtDate1)return;S.sbtDate1=true;let n=0;const tpl=S.bbnt.filter(b=>isSBT(b)&&b.start&&!b.sbtFor);
  S.bbnt.forEach(b=>{if(!b.sbtFor||b.start||!b.dueAt)return;const m=S.bbnt.find(x=>x.id===b.sbtFor);
    const T=tpl.filter(x=>pCodeOf(x)===pCodeOf(m||b))[0]||tpl.sort((a,c)=>(c.start||'').localeCompare(a.start||''))[0];if(!T)return;
    const delta=dDiff(b.dueAt,T.start);['pycDate','start','end','clDate','lmDate'].forEach(k=>b[k]=shiftISO(T[k],delta));b.startNoTime=!!T.startNoTime;b.endNoTime=!!T.endNoTime;
    const p=S.plans.find(x=>x.id===b.planId);if(p)p.date=b.start;n++});if(n)save()}
function sbtNoFix(){/* đánh số lại hồ sơ sau khi đổ BT tự tạo: .../<mã>/SBT/YCNT, /SBT/BBNT, /SBT/BBKT[/BT]; không có biên bản lấy mẫu */
  if(S.sbtNo1)return;S.sbtNo1=true;let n=0;const lead0=s=>String(s||'').replace(/^\s*\d+/,'').replace(/^\//,'');
  const L=S.bbnt.filter(b=>b.sbtFor).sort((a,c)=>String(a.dueAt||a.start||'').localeCompare(String(c.dueAt||c.start||'')));
  L.forEach(b=>{const m=S.bbnt.find(x=>x.id===b.sbtFor);if(!m)return;const base=lead0(m.no).replace(/\/BBNT$/,'');if(/\/SBT$/.test(base))return;
    const pb=lead0(m.pycNo||m.no).replace(/\/(YCNT|BBNT)$/,'');const sameTpl=S.bbnt.find(x=>x!==b&&!x.sbtFor&&isSBT(x)&&(x.cls||[]).length&&noTail(x.no)==='/'+base+'/SBT/BBNT');
    const bt=sameTpl?/\/BT$/.test(sameTpl.cls[0].no):/\/BBKT\/BT$/.test(((m.cls||[])[0]||{}).no||'');
    const tail='/'+base+'/SBT/BBNT';if(noTail(b.no)===tail&&!b.lmNo&&(b.cls||[]).every(c=>/\/SBT\/BBKT/.test(c.no)))return;
    let k=0;S.bbnt.forEach(x=>{if(x!==b&&noTail(x.no)===tail)k=Math.max(k,leadNo(x.no))});k++;
    b.seq=k;b.no=k+tail;b.pycNo=k+'/'+pb+'/SBT/YCNT';(b.cls||[]).forEach(c=>c.no=k+'/'+base+'/SBT/BBKT'+(bt?'/BT':''));b.lmNo='';b.docs=Object.assign({},b.docs,{lm:false});n++});
  if(n)save()}
function compOrder(){/* hồ sơ tự tạo (sau khi đổ BT, tháo VK) theo đúng thứ tự hồ sơ VK-CT-BT gốc */
  let ch=false;const lead0=s=>String(s||'').replace(/^\s*\d+/,'');const byTail={};
  S.bbnt.forEach(b=>{const f=b.sbtFor||b.tvkFor;if(!f)return;(byTail[noTail(b.no)]=byTail[noTail(b.no)]||[]).push(b)});
  Object.values(byTail).forEach(L=>{if(L.length<2)return;const M=b=>S.bbnt.find(x=>x.id===(b.sbtFor||b.tvkFor))||{};
    const key=b=>{const m=M(b);return ymd(m.start||'9999')+'|'+String(leadNo(m.no)).padStart(5,'0')};
    const sorted=L.slice().sort((a,c)=>key(a).localeCompare(key(c)));if(sorted.every((b,i)=>b===L[i]))return;
    if(L.some(b=>sg(b).st==='ky'||sg(b).st==='trinh'))return;
    const nums=L.map(b=>leadNo(b.no)).sort((a,c)=>a-c);const slots=L.map(b=>S.bbnt.indexOf(b)).sort((a,c)=>a-c);
    sorted.forEach((b,i)=>{const n=nums[i];if(leadNo(b.no)!==n){b.seq=n;b.no=reNo(b.no,n);b.pycNo=reNo(b.pycNo,n);(b.cls||[]).forEach(c=>c.no=reNo(c.no,n));if(b.lmNo)b.lmNo=reNo(b.lmNo,n)}S.bbnt[slots[i]]=b});ch=true});
  if(ch)save()}
function blankCompFix(){if(S.blankComp1)return;S.blankComp1=true;let n=0;S.bbnt.forEach(b=>{if((b.sbtFor||b.tvkFor)&&sg(b).st==='chua'&&b.start){blankComp(b);n++}});if(n)save()}
function pMakeSBT(m,why){/* tạo hồ sơ "Nghiệm thu sau khi đổ bê tông" cho lần đổ m: ngày đổ + 28 */
  if(!m||sbtOf(m))return null;const code=pCodeOf(m);
  const all=S.bbnt.filter(isSBT).sort((a,b)=>(b.start||'').localeCompare(a.start||''));
  const same=all.find(b=>pCodeOf(b)===code);const T=same||all[0];if(!T)return null;
  const lead=s=>String(s||'').replace(/^\s*\d+/,'0');
  const fixNo=same?(s=>s):(s=>{const base=lead(m.no).replace(/\/BBNT$/,'');const k=String(s||'');
    return /YCNT$/.test(k)?lead(m.pycNo||m.no).replace(/\/(BBNT|YCNT)$/,'')+'/SBT/YCNT':/BBNT$/.test(k)?base+'/SBT/BBNT':base+'/SBT/BBKT'+(/\/BBKT\/BT$/.test(k)?'/BT':'')});
  let taskId=T.taskId;if(!same){const mt=task(m.taskId)||{};const tt=task(T.taskId)||{};const nm='Biên bản kiểm tra bề mặt sau khi đổ bê tông '+String(mt.name||m.viTri).replace(/^.*?bê tông,?\s*/i,'');
    let nt=S.tasks.find(x=>x.name===nm&&x.hm===tt.hm);if(!nt){nt=Object.assign({},tt,{id:uid(),name:nm,code:code+'/SBT',wbs:code+'/SBT'});S.tasks.push(nt)}taskId=nt.id}
  const target=addDays(ymd(m.start)+'T00:00',28).slice(0,10);const delta=dDiff(target,T.start);
  const b=JSON.parse(JSON.stringify(T));const tail=noTail(fixNo(T.no));const n=pNextNo(tail);
  Object.assign(b,{id:uid(),taskId,viTri:m.viTri,seq:n,no:reNo(fixNo(T.no),n),pycNo:reNo(fixNo(T.pycNo),n),lmNo:'',
    pycDate:shiftISO(T.pycDate,delta),start:shiftISO(T.start,delta),end:shiftISO(T.end,delta),clDate:shiftISO(T.clDate,delta),lmDate:shiftISO(T.lmDate,delta),created:nowISO(),
    mac:'',doSut:'',klLT:'',klTT:'',r7:'',r28:'',sign:{st:'chua'},archived:false,archiveLoc:'',imported:true,fromPour:m.fromPour||('sbt:'+m.id),sbtFor:m.id,
    history:[{t:nowISO(),who:'Nhật ký đổ BT',a:why||'Tạo tự động hồ sơ sau khi đổ bê tông (ngày đổ + 28)'}]});
  b.docs=Object.assign({},T.docs,{lm:false});(b.cls||[]).forEach(c=>{c.no=reNo(fixNo(c.no),n);c.checks=null});
  b.sig=Object.assign({},T.sig,{TVGS:m.sig&&m.sig.TVGS||T.sig.TVGS,NTP:m.sig&&m.sig.NTP||T.sig.NTP});
  const pl={id:uid(),taskId:b.taskId,date:b.start,zone:b.viTri,title:`${b.title} ${b.viTri}`.trim()};S.plans.push(pl);b.planId=pl.id;
  b.dueAt=ymd(b.start);S.bbnt.push(b);return b}

const isTVK=b=>/tháo (dỡ )?ván khuôn/i.test(b.title||'');
function tvkOf(m){return S.bbnt.find(b=>b!==m&&isTVK(b)&&(b.tvkFor===m.id||pSim(b.viTri,m.viTri)>=0.99&&dDiff(b.start||b.dueAt,m.start)>=0&&dDiff(b.start||b.dueAt,m.start)<=40))||null}
function tvkTpl(m){/* mẫu tháo ván khuôn: cùng mã trước, rồi cùng loại cấu kiện (VD dầm sàn) */
  const code=pCodeOf(m),kind=pKind(m.viTri);const L=S.bbnt.filter(isTVK).sort((a,b)=>(b.start||'').localeCompare(a.start||''));
  const withMain=b=>{const mm=S.bbnt.find(x=>isBT(x)&&pSim(x.viTri,b.viTri)>=0.99&&dDiff(b.start,x.start)>=0&&dDiff(b.start,x.start)<=40);return mm?{T:b,off:dDiff(b.start,mm.start)}:null};
  for(const f of [b=>pCodeOf(b)===code,b=>pKind(b.viTri)===kind]){for(const b of L.filter(f)){const r=withMain(b);if(r)return r}}return null}
function pMakeTVK(m,why){if(!m||tvkOf(m))return null;const r=tvkTpl(m);if(!r)return null;const T=r.T;const tc=pCodeOf(T),code=pCodeOf(m),swap=tc!==code;
  const fixNo=s=>swap&&s?String(s).replace('/'+tc+'/','/'+code+'/'):s;
  const ph=s=>String(s||'').replace(/^\s*bê\s*tông\s*/i,'').split(/\s+trục\s+/i)[0].trim();
  let taskId=T.taskId;if(swap){const tt=task(T.taskId)||{};const op=ph(T.viTri),np=ph(m.viTri);const nm=op&&tt.name&&tt.name.includes(op)?tt.name.replace(op,np):'Tháo ván khuôn '+np;
    let nt=S.tasks.find(x=>x.name===nm&&x.hm===tt.hm);if(!nt){nt=Object.assign({},tt,{id:uid(),name:nm,code:String(tt.code||'').replace(tc,code),wbs:String(tt.wbs||'').replace(tc,code)});S.tasks.push(nt)}taskId=nt.id}
  const target=addDays(ymd(m.start)+'T00:00',r.off).slice(0,10);const delta=dDiff(target,T.start);
  const b=JSON.parse(JSON.stringify(T));const n=pNextNo(noTail(fixNo(T.no)));
  Object.assign(b,{id:uid(),taskId,viTri:m.viTri,seq:n,no:reNo(fixNo(T.no),n),pycNo:reNo(fixNo(T.pycNo),n),lmNo:'',
    pycDate:shiftISO(T.pycDate,delta),start:shiftISO(T.start,delta),end:shiftISO(T.end,delta),clDate:shiftISO(T.clDate,delta),lmDate:shiftISO(T.lmDate,delta),created:nowISO(),
    mac:'',doSut:'',klLT:'',klTT:'',r7:'',r28:'',sign:{st:'chua'},archived:false,archiveLoc:'',imported:true,fromPour:m.fromPour||('tvk:'+m.id),tvkFor:m.id,
    history:[{t:nowISO(),who:'Nhật ký đổ BT',a:why||'Tạo hồ sơ tháo ván khuôn'}]});
  b.docs=Object.assign({},T.docs,{lm:false});(b.cls||[]).forEach(c=>{c.no=reNo(fixNo(c.no),n);c.checks=null});
  b.sig=Object.assign({},T.sig,{TVGS:m.sig&&m.sig.TVGS||T.sig.TVGS,NTP:m.sig&&m.sig.NTP||T.sig.NTP});
  const pl={id:uid(),taskId:b.taskId,date:b.start,zone:b.viTri,title:`${b.title} ${b.viTri}`.trim()};S.plans.push(pl);b.planId=pl.id;blankComp(b);S.bbnt.push(b);return b}
function dst1Fix(){if(S.dst1Fix)return;S.dst1Fix=true;const m=S.bbnt.find(b=>/^1\/NOQ\/CEN\/KC\/4\.5\/DST1\/BBNT$/.test(b.no));if(!m){return}
  const a=pMakeTVK(m,'Bổ sung tháo ván khuôn dầm sàn tầng 1'),c=pMakeSBT(m,'Bổ sung hồ sơ sau khi đổ bê tông dầm sàn tầng 1');if(a||c)save()}
function pCreate(P,code){/* tạo bộ hồ sơ cho lần đổ P theo mẫu lần đổ gần nhất cùng mã */
  const byDate=(a,b)=>(b.start||'').localeCompare(a.start||'');
  let T=S.bbnt.filter(b=>isBT(b)&&pCodeOf(b)===code).sort(byDate)[0];
  if(!T){/* mã mới (VD DST2): lấy mẫu cùng loại gần nhất (DST1) rồi đổi mã, mở nhóm công việc mới */
    const pre=code.replace(/\d+[A-Z]?$/,'');if(pre)T=S.bbnt.filter(b=>isBT(b)&&pCodeOf(b).replace(/\d+[A-Z]?$/,'')===pre).sort(byDate)[0]}
  if(!T)return null;const fromCode=pCodeOf(T),swap=fromCode!==code;
  const fixNo=s=>swap&&s?String(s).replace('/'+fromCode+'/','/'+code+'/'):s;
  const ph=s=>String(s||'').replace(/^\s*bê\s*tông\s*/i,'').split(/\s+trục\s+/i)[0].trim();
  const oldPh=ph(T.viTri),newPh=ph(P.desc);
  const taskFor=t0=>{if(!swap)return t0.taskId;const tt=task(t0.taskId)||{};const nm=oldPh&&tt.name&&tt.name.includes(oldPh)?tt.name.replace(oldPh,newPh):(tt.name||'')+' '+code;
    let nt=S.tasks.find(x=>x.name===nm&&x.hm===tt.hm);if(!nt){nt=Object.assign({},tt,{id:uid(),name:nm,code:String(tt.code||'').replace(fromCode,code),wbs:String(tt.wbs||'').replace(fromCode,code)});S.tasks.push(nt)}return nt.id};
  const comp=S.bbnt.filter(b=>b!==T&&!isBT(b)&&pSim(b.viTri,T.viTri)>=0.99&&dDiff(b.start,T.start)>=-3&&dDiff(b.start,T.start)<=5);
  const delta=dDiff(P.d,T.start);const vt=String(P.desc).replace(/^\s*bê\s*tông\s*/i,'').trim();const out=[];
  [T,...comp].forEach((t,i)=>{
    const b=JSON.parse(JSON.stringify(t));const n=pNextNo(noTail(fixNo(t.no)));
    Object.assign(b,{id:uid(),taskId:taskFor(t),viTri:vt,seq:n,no:reNo(fixNo(t.no),n),pycNo:reNo(fixNo(t.pycNo),n),lmNo:t.lmNo?reNo(fixNo(t.lmNo),n):'',
      pycDate:shiftISO(t.pycDate,delta),start:shiftISO(t.start,delta),end:shiftISO(t.end,delta),clDate:shiftISO(t.clDate,delta),lmDate:shiftISO(t.lmDate,delta),created:nowISO(),
      r7:t.r7?shiftISO(t.r7,delta):'',r28:t.r28?shiftISO(t.r28,delta):'',sign:{st:'chua'},archived:false,archiveLoc:'',imported:true,fromPour:pKey(P),
      history:[{t:nowISO(),who:'Nhật ký đổ BT',a:'Tạo tự động từ Nhật ký đổ BT (dòng '+P.row+')'}]});
    (b.cls||[]).forEach(c=>{c.no=reNo(fixNo(c.no),n);c.checks=null});
    if(i===0){b.start=withTime(new Date(P.d+'T00:00'),P.tBD);let e=withTime(new Date((P.d2||P.d)+'T00:00'),P.tKT);if(e&&e<b.start)e=addDays(e,1);b.end=e;b.startNoTime=!P.tBD;b.endNoTime=!P.tKT;b.tLM=P.tBD?String(P.tBD):b.tLM;
      if(P.mac)b.mac=String(P.mac);if(P.doSut)b.doSut=String(P.doSut);if(P.klLT!=='')b.klLT=+P.klLT;const kt=P.klTT!==''?+P.klTT:+P.klLT;if(kt)b.klTT=kt;}
    b.sig=Object.assign({},t.sig);if(P.tvgs)b.sig.TVGS=pPerson(P.tvgs,'TVGS','Giám sát viên','Phê duyệt');if(P.gs)b.sig.NTP=pPerson(P.gs,'NTP','Cán bộ kỹ thuật','Thực hiện');
    const pl={id:uid(),taskId:b.taskId,date:b.start,zone:vt,title:`${b.title} ${vt}`.trim()};S.plans.push(pl);b.planId=pl.id;
    S.bbnt.push(b);out.push(b)});
  if(!out.some(isTVK)){const tv=pMakeTVK(out[0]);if(tv)out.push(tv)}const sb=pMakeSBT(out[0]);if(sb)out.push(sb);
  return out}
function applyPours(Y){
  const PS=(Y&&Y.pours)||[];if(!PS.length)return;S.pourLink=S.pourLink||{};const L=S.pourLink;
  const maxP=PS.reduce((m,p)=>p.d>m?p.d:m,'');
  if(!S.pourV2){/* dọn các dòng đã tự tạo ở bản trước, chỉ tự tạo cho lần đổ nhập mới từ nay */
    const rm=new Set(S.bbnt.filter(b=>b.fromPour).map(b=>b.id));
    if(rm.size){const pl=new Set(S.bbnt.filter(b=>rm.has(b.id)).map(b=>b.planId));S.bbnt=S.bbnt.filter(b=>!rm.has(b.id));S.plans=S.plans.filter(p=>!pl.has(p.id))}
    Object.keys(L).forEach(k=>{if(rm.has(L[k]))delete L[k]});
    S.pourSince=maxP;S.pourV2=true;save()}
  if(!S.pourSince)S.pourSince=maxP;
  const codeMap={};let maxD='',changed=false;const res=[];
  PS.forEach(P=>{const b=pLink(P);if(b){if(!L[pKey(P)]){L[pKey(P)]=b.id;changed=true}const c=pCodeOf(b);if(P.tang&&c&&!codeMap[P.tang])codeMap[P.tang]=c;if(P.d>maxD)maxD=P.d}res.push({P,b})});
  const codeFor=P=>codeMap[P.tang]||(/^[A-Z0-9]{2,8}$/.test(String(P.tang||'').trim())?String(P.tang).trim():'');
  let made=0;const madeNos=[];
  res.forEach(r=>{if(r.b||L[pKey(r.P)])return;if(r.P.d<=maxD||r.P.d<=S.pourSince)return;const c=codeFor(r.P);if(!c)return;const o=pCreate(r.P,c);if(o&&o.length){L[pKey(r.P)]=o[0].id;r.b=o[0];made+=o.length;madeNos.push(o[0].no);changed=true}});
  res.forEach(({P,b})=>{if(!b||b.fromPour)return;let ch=false;if(!b.mac&&P.mac){b.mac=String(P.mac);ch=true}if(!b.doSut&&P.doSut){b.doSut=String(P.doSut);ch=true}if(b.klTT===''&&(P.klTT!==''||P.klLT!=='')){b.klTT=P.klTT!==''?+P.klTT:+P.klLT;ch=true}if(ch)changed=true});
  S.pourInfo={file:Y.pourFile||'',n:PS.length,at:Y.at};
  if(changed)save();
  if(made)setTimeout(()=>toast(`Nhật ký đổ BT: đã tạo ${made} dòng hồ sơ mới (${madeNos.join(', ')})`),900);
}
function pourState(){const Y=window.SYNC;const PS=(Y&&Y.pours)||[];const L=S.pourLink||{};
  const codeMap={};PS.forEach(P=>{const b=S.bbnt.find(x=>x.id===L[pKey(P)]);if(b&&P.tang&&!codeMap[P.tang])codeMap[P.tang]=pCodeOf(b)});
  const miss=[],diff=[],auto=[];
  PS.forEach(P=>{const k=pKey(P);const id=L[k];if(id==='x')return;const b=id&&S.bbnt.find(x=>x.id===id);
    if(!id){miss.push({P,code:codeMap[P.tang]||(/^[A-Z0-9]{2,8}$/.test(String(P.tang||''))?P.tang:'')});return}if(!b)return;
    if(b.fromPour){auto.push({P,b});return}
    const d=[];if(P.mac&&b.mac&&String(P.mac).replace(/\s/g,'')!==String(b.mac).replace(/\s/g,''))d.push(['Mác',b.mac,P.mac,'mac']);
    if(P.doSut&&b.doSut&&String(P.doSut).replace(/\s/g,'')!==String(b.doSut).replace(/\s/g,''))d.push(['Độ sụt',b.doSut,P.doSut,'doSut']);
    {const kc=P.klTT!==''?+P.klTT:+P.klLT;if(b.klTT!==''&&kc&&Math.abs(kc-+b.klTT)>0.1&&!(P.klLT!==''&&Math.abs(+P.klLT-+b.klTT)<=0.1))d.push(['KL',b.klTT,kc,'klTT'])}
    if(d.length)diff.push({P,b,d})});
  const noSbt=[];PS.forEach(P=>{const id=L[pKey(P)];const b=id&&id!=='x'&&S.bbnt.find(x=>x.id===id);if(!b||(S.sbtSkip||{})[b.id])return;const ms=!sbtOf(b),cd=pCodeOf(b),mt=S.bbnt.some(x=>isTVK(x)&&pCodeOf(x)===cd)&&!tvkOf(b)&&!S.bbnt.some(x=>isTVK(x)&&pCodeOf(x)===cd&&dDiff(x.start||x.dueAt,b.start)>=0&&dDiff(x.start||x.dueAt,b.start)<=40);if(ms||mt)noSbt.push({P,b,ms,mt})});
  return {n:PS.length,miss,diff,auto,noSbt}}
function pourBadge(){const Y=window.SYNC;if(!Y||!(Y.pours||[]).length)return'';const s=pourState();
  return `<button class="btn sm" data-act="xlReload" title="Chọn file HSNT và/hoặc file vật tư trên ổ Z: để cập nhật ngay">⟳ Cập nhật từ Excel</button> <button class="btn sm" data-act="pourOpen" title="Đối chiếu với file Nhật ký đổ BT">🧱 Nhật ký đổ BT: ${s.n} lần${s.auto.length?` · <b style="color:var(--green)">${s.auto.length} tự tạo</b>`:''}${s.miss.length?` · <b style="color:var(--red)">${s.miss.length} chưa có HS</b>`:''}${s.diff.length?` · <b style="color:var(--amber)">${s.diff.length} lệch</b>`:''}${s.noSbt.length?` · <b style="color:var(--red)">${s.noSbt.length} thiếu hồ sơ đi kèm</b>`:''}</button>`}
function pourModal(){const s=pourState();const I=S.pourInfo||{};
  const row=(P,extra)=>`<tr><td class="small">${fmtD(P.d)}</td><td class="small">${esc(P.desc)}</td><td class="small">${esc(P.tang)}</td><td class="small">${esc(P.mac)}</td><td class="small" style="text-align:right">${esc(P.klLT)}</td><td style="white-space:nowrap;text-align:right">${extra}</td></tr>`;
  const h=`<h3 style="display:flex;align-items:center;gap:10px">Đối chiếu Nhật ký đổ bê tông → DATA ${(S.pourUndo||[]).length?`<button class="btn sm" data-act="pourUndo" style="margin-left:auto">↶ Hoàn tác (${esc(S.pourUndo[S.pourUndo.length-1].label)})</button>`:''}</h3><p class="mut small">File: <b>${esc(I.file)}</b> · ${s.n} lần đổ. Lần đổ mới (sau lần đổ cuối đã có hồ sơ) được tự tạo bộ hồ sơ theo mẫu lần đổ gần nhất cùng mã (số BBNT nối tiếp, kèm tháo VK / hoàn công nếu mẫu có). Dòng tự tạo mang trạng thái “Chưa in”.</p>
  <div style="max-height:62vh;overflow:auto">
  <h4 style="margin:12px 0 6px">Chưa có hồ sơ trong DATA · ${s.miss.length}</h4>
  <table class="t"><tr><th>Ngày đổ</th><th>Cấu kiện</th><th>Tầng</th><th>Mác</th><th>KL</th><th></th></tr>${s.miss.map(({P,code})=>row(P,`${code?`<button class="btn sm g" data-act="pourMake" data-id="${esc(pKey(P))}">Tạo hồ sơ (${esc(code)})</button>`:'<span class="mut small">chưa rõ mã</span>'} <button class="btn sm ghost" data-act="pourSkip" data-id="${esc(pKey(P))}">Bỏ qua</button>`)).join('')||'<tr><td colspan="6" class="empty">Không có</td></tr>'}</table>
  <h4 style="margin:16px 0 6px">Số liệu DATA khác Nhật ký · ${s.diff.length}</h4>
  <table class="t"><tr><th>Ngày đổ</th><th>Số BBNT</th><th>Khác nhau (DATA → Nhật ký)</th><th></th></tr>${s.diff.map(({P,b,d})=>`<tr><td class="small">${fmtD(P.d)}</td><td class="small"><b>${esc(b.no)}</b><div class="mut">${esc(b.viTri)}</div></td><td class="small">${d.map(x=>`${x[0]}: <s class="mut">${esc(x[1])}</s> → <b>${esc(x[2])}</b>`).join('<br>')}</td><td style="text-align:right"><button class="btn sm" data-act="pourFix" data-id="${b.id}">Lấy theo nhật ký</button></td></tr>`).join('')||'<tr><td colspan="4" class="empty">Khớp hết</td></tr>'}</table>
  <h4 style="margin:16px 0 6px">Thiếu hồ sơ đi kèm (tháo ván khuôn / sau khi đổ bê tông) · ${s.noSbt.length} ${s.noSbt.length?`<button class="btn sm g" data-act="sbtAll" style="margin-left:8px">Tạo tất cả</button>`:''}</h4>
  <table class="t"><tr><th>Ngày đổ</th><th>Số BBNT</th><th>Cấu kiện</th><th>Ngày SBT (đổ + 28)${''}</th><th></th></tr>${s.noSbt.map(({P,b,ms,mt})=>{const due=addDays(ymd(b.start)+'T00:00',28).slice(0,10);return `<tr><td class="small">${fmtD(b.start)}</td><td class="small"><b>${esc(b.no)}</b></td><td class="small">${esc(b.viTri)}</td><td class="small" style="${due<=nowISO().slice(0,10)?'color:var(--red);font-weight:600':''}">${fmtD(due)}</td><td style="white-space:nowrap;text-align:right">${mt?`<button class="btn sm" data-act="tvkMake" data-id="${b.id}">Tạo tháo VK</button> `:''}${ms?`<button class="btn sm g" data-act="sbtMake" data-id="${b.id}">Tạo SBT</button>`:''} <button class="btn sm ghost" data-act="sbtSkip" data-id="${b.id}">Bỏ qua</button></td></tr>`}).join('')||'<tr><td colspan="5" class="empty">Lần đổ nào cũng đã có SBT</td></tr>'}</table>
  <h4 style="margin:16px 0 6px">Đã tự tạo từ Nhật ký · ${s.auto.length}</h4>
  <table class="t"><tr><th>Ngày đổ</th><th>Cấu kiện</th><th>Tầng</th><th>Mác</th><th>KL</th><th>Số BBNT</th></tr>${s.auto.map(({P,b})=>row(P,`<a href="#" data-act="open" data-id="${b.id}"><b>${esc(b.no)}</b></a>`)).join('')||'<tr><td colspan="6" class="empty">Chưa có</td></tr>'}</table></div>`;
  modal(h,()=>{},'Đóng');$('#modal').style.maxWidth='1000px';$('#modal').style.width='94vw'}


/* =================== Hoàn tác thao tác trong bảng đối chiếu nhật ký =================== */
function pUndoSnap(label){/* lưu trạng thái trước khi bấm, để hoàn tác */
  const snap={label,at:nowISO(),pourLink:JSON.parse(JSON.stringify(S.pourLink||{})),sbtSkip:JSON.parse(JSON.stringify(S.sbtSkip||{})),ids:S.bbnt.map(b=>b.id),plans:S.plans.map(p=>p.id),tasks:S.tasks.map(x=>x.id),vals:{}};
  S.bbnt.forEach(b=>{snap.vals[b.id]=[b.mac,b.doSut,b.klTT,b.history?b.history.length:0]});
  (S.pourUndo=S.pourUndo||[]).push(snap);if(S.pourUndo.length>20)S.pourUndo.shift()}
function pUndo(){const u=(S.pourUndo||[]).pop();if(!u)return false;
  const keep=new Set(u.ids);S.bbnt=S.bbnt.filter(b=>keep.has(b.id));const kp=new Set(u.plans);S.plans=S.plans.filter(p=>kp.has(p.id));const kt=new Set(u.tasks);S.tasks=S.tasks.filter(x=>kt.has(x.id));
  S.bbnt.forEach(b=>{const v=u.vals[b.id];if(!v)return;[b.mac,b.doSut,b.klTT]=v;if(b.history)b.history.length=Math.min(b.history.length,v[3])});
  S.pourLink=u.pourLink;S.sbtSkip=u.sbtSkip;save();return u.label}
/* lần này: trả lại các thao tác bấm nhầm trước khi có nút hoàn tác */
function pUndoLegacy(){if(S.pourUndoV1)return;S.pourUndoV1=true;const Y=window.SYNC;if(!Y||!Y.pours){return}
  let n=0;const L=S.pourLink||{};
  Object.keys(L).forEach(k=>{if(L[k]==='x'){delete L[k];n++}});
  const since=S.pourSince||'';const rm=new Set();
  S.bbnt.forEach(b=>{if(b.sbtFor&&(b.history||[]).some(h=>/bảng đối chiếu/.test(h.a||'')))rm.add(b.id);
    if(b.fromPour&&!b.sbtFor){const d=String(b.fromPour).split('|')[0];if(d&&since&&d<=since)rm.add(b.id)}});
  if(rm.size){const pl=new Set(S.bbnt.filter(b=>rm.has(b.id)).map(b=>b.planId));S.bbnt=S.bbnt.filter(b=>!rm.has(b.id));S.plans=S.plans.filter(p=>!pl.has(p.id));Object.keys(L).forEach(k=>{if(rm.has(L[k]))delete L[k]});n+=rm.size}
  /* số liệu đã "lấy theo nhật ký": trả lại theo file Excel DATA */
  const rows=Y.rows||[];const byNo={};rows.forEach(r=>{if(r&&r[19])byNo[String(r[19]).trim()]=r});
  S.bbnt.forEach(b=>{const h=b.history||[];const i=h.findIndex(x=>/Lấy số liệu theo Nhật ký/.test(x.a||''));if(i<0)return;const r=byNo[b.no];if(!r)return;
    b.mac=String(r[25]??'').trim();b.doSut=String(r[27]??'').trim();const k=parseFloat(String(r[36]??'').replace(',','.'));b.klTT=isNaN(k)?'':k;h.splice(i,1);n++});
  S.sbtSkip={};if(n)save()}

/* =================== Hồ sơ chưa in (chờ in) =================== */
const waitList=()=>S.bbnt.filter(b=>sg(b).st==='chua'&&(b.start?ymd(b.start):(b.dueAt||'9999'))<=nowISO().slice(0,10)).sort((a,b)=>(b.start||'').localeCompare(a.start||'')||leadNo(b.no)-leadNo(a.no));
function waitTable(L,h){return `<div class="tbox" style="max-height:${h||320}px"><table class="t"><tr><th style="width:34px"><input type="checkbox" checked data-act="waitAll"></th><th>Số BBNT</th><th>Công tác</th><th>Vị trí</th><th>Ngày NT</th><th></th></tr>
  ${L.map(b=>`<tr><td><input type="checkbox" class="wck" value="${b.id}" checked></td><td class="small"><b>${esc(b.no)}</b>${b.fromPour?' <span class="chip c-green" style="font-size:10px">từ nhật ký đổ BT</span>':''}</td><td class="small">${esc(b.title)}</td><td class="small">${esc(b.viTri)}</td><td class="small">${fmtD(b.start)}</td><td style="text-align:right"><button class="btn sm ghost" data-act="open" data-id="${b.id}" title="Xem">${ic('doc',14)}</button></td></tr>`).join('')}</table></div>`}
function waitModal(){const L=waitList();if(!L.length){toast('Không có hồ sơ nào chưa in');return}
  modal(`<h3>Hồ sơ mới chưa in · ${L.length}</h3><p class="mut small">Tích chọn các bộ cần in rồi bấm <b>In các hồ sơ đã chọn</b>. In xong các bộ này tự chuyển sang “Đã in – chờ ký”.</p>${waitTable(L,420)}`,
   ()=>{const ids=[...document.querySelectorAll('#modal .wck:checked')].map(x=>x.value);if(!ids.length){toast('Tích chọn hồ sơ trước');return false}printModal(ids);return false},'In các hồ sơ đã chọn');
  $('#modal').style.maxWidth='980px';$('#modal').style.width='94vw'}
function waitAuto(){const L=waitList();S.seenWait=S.seenWait||[];const seen=new Set(S.seenWait);const nw=L.filter(b=>!seen.has(b.id));
  if(nw.length){S.seenWait=[...new Set([...S.seenWait,...L.map(b=>b.id)])].slice(-3000);save();setTimeout(waitModal,700)}}

/* =================== DATA grid =================== */
const GC=[
 ['stt','STT',46],['pycDate','Ngày YCNT',84,'d'],['ntDate','Ngày NT',84,'d'],['clDate','Ngày checklist',84,'d'],['lmDate','Ngày lấy mẫu',84,'d'],
 ['pycNo','Số YCNT',215],['no','Số BBNT',215],['clNo','Số checklist',225],['lmNo','Số BBLM',215],
 ['viTri','Vị trí',290],['title','Công tác',300,'ct'],['cl','Checklist',92,'cl'],['mac','Bê tông',78],['banVe','Bản vẽ số',90],['doSut','Độ sụt',62],
 ['tBD','Giờ BĐ',58],['tKT','Giờ KT',58],['CHT','Chỉ huy trưởng',140,'p'],['NTC','Bên giao thầu',140,'p'],['NTP','GS hiện trường',140,'p'],['TVGS','TVGS',140,'p'],
 ['klLT','KL lý thuyết',70],['klTT','KL thực tế',70],['r7','R7',84,'d'],['r28','R28',84,'d']];
const dmyS=iso=>{const d=parts(iso);return d?`${+d.d}/${+d.m}/${d.y}`:''};
const sigOrg={TVGS:'TVGS',NTC:'NTC',NTP:'NTP',CHT:'NTP'};
const sigTitle={TVGS:'Giám sát viên',NTC:'Giám sát BĐH',NTP:'Cán bộ kỹ thuật',CHT:'Chỉ huy trưởng'};
function gGet(b,k){switch(k){
  case'stt':return leadNo(b.no)||'';case'pycDate':return dmyS(b.pycDate);case'ntDate':return dmyS(b.start);case'clDate':return dmyS(b.clDate);case'lmDate':return b.docs.lm?dmyS(b.lmDate):'';
  case'clNo':return(b.cls[0]||{}).no||'';case'lmNo':return b.docs.lm?b.lmNo:'';case'cl':return clCodes(b.cls.map(c=>c.tpl));
  case'tBD':return b.start&&!b.startNoTime?hhmm(b.start):'';case'tKT':return b.end&&!b.endNoTime?hhmm(b.end):'';
  case'CHT':case'NTC':case'NTP':case'TVGS':return(sigP(b,k)||{}).name||'';
  case'r7':return dmyS(b.r7);case'r28':return dmyS(b.r28);default:return b[k]??''}}
const dPart=d=>d?toISO(d).slice(0,10):'';
function setTime(b,k,txt){const base=(b.start||nowISO()).slice(0,10);const m=String(txt).match(/(\d{1,2})\s*[h:]\s*(\d{0,2})/i);
  if(!m){b[k+'NoTime']=true;b[k]=k==='end'?(b.end||''):`${base}T00:00`;return}
  b[k+'NoTime']=false;b[k]=`${base}T${pad(+m[1])}:${pad(+(m[2]||0))}`;
  if(k==='start'&&!b.endNoTime&&b.end){const e=hhmm(b.end).match(/(\d+)h(\d+)/);if(e)setTime(b,'end',hhmm(b.end))}
  if(k==='end'&&b.start&&b.end<b.start)b.end=addDays(b.end,1)}
function renum(b,n){const f=x=>String(x||'').replace(/^\d+/,String(n));b.seq=n;b.no=f(b.no);b.pycNo=f(b.pycNo);b.lmNo=f(b.lmNo);b.dbtNo=f(b.dbtNo);b.cls.forEach(c=>c.no=f(c.no))}
function personByName(k,name){name=String(name||'').trim();if(!name)return'';const org=sigOrg[k];let p=S.people.find(x=>x.name===name&&x.org===org&&(k!=='CHT'||/chỉ huy/i.test(x.title)))||S.people.find(x=>x.name===name&&x.org===org);
  if(!p){p={id:uid(),name,org,title:sigTitle[k],duty:k==='TVGS'?'Phê duyệt':k==='NTC'?'Kiểm tra':'Thực hiện',sign:true};S.people.push(p)}return p.id}
function gSet(b,k,v){v=String(v??'').trim();const D=x=>{const d=xlDate(x);return d?toISO(d):''};
  switch(k){
  case'stt':{const n=parseInt(v,10);if(n)renum(b,n);break}
  case'pycDate':b.pycDate=D(v);if(b.pycDate&&!b.start){b.start=addDays(b.pycDate,1);b.startNoTime=true;b.end='';b.endNoTime=true;if(!b.clDate)b.clDate=b.start}break;
  case'ntDate':{const d=D(v);if(!d){b.start='';break}const tS=b.startNoTime?'':gGet(b,'tBD'),tE=b.endNoTime?'':gGet(b,'tKT');b.start=d.slice(0,10)+'T00:00';setTime(b,'start',tS);if(tE)setTime(b,'end',tE);else{b.end='';b.endNoTime=true}
    const old=b._nt;b.clDate=b.clDate&&b.clDate.slice(0,10)!==(old||'')?b.clDate:b.start;if(b.docs.lm&&(!b.lmDate||b.lmDate.slice(0,10)===old))b.lmDate=b.start;
    const o7=old?addDays(old+'T00:00',7).slice(0,10):'',o28=old?addDays(old+'T00:00',28).slice(0,10):'';if(!b.r7||b.r7===o7)b.r7=addDays(b.start,7).slice(0,10);if(!b.r28||b.r28===o28)b.r28=addDays(b.start,28).slice(0,10);break}
  case'clDate':b.clDate=D(v);break;case'lmDate':b.lmDate=D(v);break;
  case'clNo':b.cls.forEach(c=>c.no=v);break;
  case'lmNo':b.lmNo=v;b.docs.lm=!!v;break;
  case'cl':{const ids=codesToTpls(v);const old=b.cls;const no=(old[0]||{}).no||b.no.replace(/BBNT$/,'BBKT');ensureCls(b);
    b.cls=ids.map(id=>old.find(c=>c.tpl===id)||mkCls(S,[id],[no])[0]).filter(Boolean);b.docs.cl=b.cls.length>0;break}
  case'tBD':setTime(b,'start',v);break;case'tKT':setTime(b,'end',v);break;
  case'CHT':case'NTC':case'NTP':case'TVGS':b.sig=b.sig||{};b.sig[k]=personByName(k,v);break;
  case'klLT':case'klTT':{const n=parseFloat(v.replace(',','.'));b[k]=isNaN(n)?'':n;break}
  case'r7':b.r7=dPart(xlDate(v));break;case'r28':b.r28=dPart(xlDate(v));break;
  default:b[k]=v}
  b._nt=(b.start||'').slice(0,10);
  const p=S.plans.find(x=>x.id===b.planId);if(p){p.date=b.start||p.date;p.zone=b.viTri;p.title=`${b.title} ${b.viTri}`.trim()}
}
function dataGroups(){
  const q=(UI.dq||'').toLowerCase(),blk=UI.dblk||'',st=UI.dst||'';
  const byT={};S.bbnt.forEach(b=>{(byT[b.taskId]=byT[b.taskId]||[]).push(b)});
  const sf=UI.dsg||'';return S.tasks.map(t=>({t,rows:(byT[t.id]||[]).filter(b=>{if(blk&&t.hm!==blk)return false;if(st&&b.status!==st)return false;if(sf&&(sf==='chuaky'?sg(b).st==='ky':sg(b).st!==sf))return false;if(q&&!(b.no+' '+b.pycNo+' '+b.viTri+' '+b.title+' '+t.name).toLowerCase().includes(q))return false;return true})}))
   .filter(g=>g.rows.length||(!q&&!st&&!sf&&(!blk||g.t.hm===blk)));
}
/* Cột giống sheet DATA (A→AM) */
const XC=[
 ['A','Số biên bản','stt',62],['B','','gidx',52,1],
 ['C','Yêu cầu nghiệm thu','pycDate',104],
 ['G','Nghiệm thu','ntDate',104],
 ['K','Checklist','clDate',100],
 ['O','Lấy mẫu','lmDate',100],
 ['S','Phiếu yêu cầu nghiệm thu','pycNo',250],['T','BB NGHIỆM THU','no',250],['U','Check list','clNo',265],['V','Biên bản lấy mẫu','lmNo',250],
 ['W','Vị trí','viTri',210],['X','CÔNG TÁC','title',260],['Y','Block','blk',52,1],['Z','Bê tông','mac',80],['AA','BẢN VẼ SỐ','banVe',90],['AB','Độ sụt','doSut',62],
 ['AC','THỜI GIAN BD NGHIỆM THU','tBD',84],['AD','THỜI GIAN KẾT THÚC NGHIỆM THU','tKT',84],['AE','THỜI GIAN Lấy mẫu','tLM',96],
 ['AF','Chỉ huy trưởng/ Phó công trình','CHT',138],['AG','Bên Giao Thầu','NTC',138],['AH','giám sát hiện trường','NTP',138],['AI','TVGS','TVGS',138],
 ['AJ','Khối lượng lý thuyết','klLT',74],['AK','Khối lượng thực tế','klTT',74],['AL','R7','r7',90],['AM','R28','r28',90],['','Kiểm tra cột U (checklist)','cl',96],['','Tình trạng ký','sign',128],['','Ngày ký / lấy về','kyAt',96]];
function xGet(b,k,gi){
  if(k==='gidx')return gi||'';
  if(k==='sign')return SG[sg(b).st].t;
  if(k==='kyAt')return dmyS(sg(b).kyAt);
  if(k==='blk')return((task(b.taskId)||{}).hm||'').replace(/^Block\s*/,'');
  if(k==='tLM')return b.tLM!=null&&b.tLM!==''?b.tLM:(b.docs.lm?gGet(b,'tBD'):'');
  const m=k.match(/^(\w+)\.(d|m|y)$/);if(m){if(m[1]==='lmDate'&&!b.docs.lm)return'';const p=parts(b[m[1]]);return p?(m[2]==='y'?p.y:+p[m[2]]):''}
  return gGet(b,k)}
function xSet(b,k,v){if(k==='tLM'){b.tLM=String(v||'').trim();return}
  if(k==='sign'){const st=sgParse(v);if(st&&st!==sg(b).st)sgSet(b,st);return}
  if(k==='kyAt'){const d=xlDate(v);if(d){sgSet(b,'ky',toISO(d))}else if(!String(v).trim()&&sg(b).st==='ky'){sg(b).kyAt=''}return}
  gSet(b,k,v)}
const xEditable=(b,c)=>!c[4]&&(['sign','kyAt'].includes(c[2])||!['check','approve'].includes(b.status));
function xRow(b,ri,gi){const lock=['check','approve'].includes(b.status);
  return `<tr data-row="${b.id}"><td class="xg"><button class="xb" data-act="dPrint1" data-id="${b.id}" title="In hồ sơ dòng này">${ic('print',14)}</button><button class="xb" data-act="open" data-id="${b.id}" title="Mở hồ sơ, xem trước phiếu">${ic('doc',14)}</button><button class="xb" data-act="dDup" data-id="${b.id}" title="Nhân bản dòng (STT +1)">${ic('copy',14)}</button><button class="xb d" data-act="dDel" data-id="${b.id}" title="Xóa dòng">${ic('trash',14)}</button></td>
  ${XC.map((c,ci)=>{const v=xGet(b,c[2],gi);return `<td class="xc${c[4]?' ro':''}${ci===0?' xa':''}${['W','X'].includes(c[0])?' wr':''}${lock&&!c[4]&&c[2]!=='sign'&&c[2]!=='kyAt'?' lk':''}${c[2]==='sign'?' sg-'+sg(b).st:''}" data-ri="${ri}" data-ci="${ci}">${esc(v)}</td>`}).join('')}
  <td class="xc">${chip(b.status)}</td></tr>`}
V.data=()=>{
  if(!UI.dclosed){UI.dclosed={};UI.dScrollEnd=true}
  const G=dataGroups();let ri=0,gi=0;const closed=UI.dclosed;const order=[];
  const total=G.reduce((s,g)=>s+g.rows.length,0);const span=XC.length+2;
  const body=G.map(g=>{const t=g.t;const open=!closed[t.id]||!!(UI.dq||UI.dst||UI.dsg);
    const hd=`<tr class="xs"><td colspan="${span}"><div class="xsh"><button class="xb" data-act="dTog" data-id="${t.id}">${open?'▾':'▸'}</button><b>${esc(t.name)}</b><span class="mut small">${esc(t.hm)} · mã ${esc(t.code||'—')} · ${esc(clCodes(t.tpls)||'không checklist')} · ${g.rows.length} dòng</span>
      <button class="btn sm ghost" data-act="grpMove" data-id="${t.id}:-1" title="Đưa nhóm lên trên">▲</button><button class="btn sm ghost" data-act="grpMove" data-id="${t.id}:1" title="Đưa nhóm xuống dưới">▼</button><button class="btn sm" data-act="dAdd" data-id="${t.id}">${ic('plus',14)} Thêm dòng</button><button class="btn sm ghost" data-act="dEditGrp" data-id="${t.id}">Sửa nhóm</button></div></td></tr>`;
    if(!open){gi+=g.rows.length;return hd}
    return hd+g.rows.map(b=>{order.push(b.id);return xRow(b,ri++,++gi)}).join('')}).join('');
  UI.dOrder=order;
  const ctList=[...new Set(S.bbnt.map(b=>b.title).concat(S.tasks.map(t=>t.congTac)).filter(Boolean))];
  const dl=`<datalist id="dlCT">${ctList.map(x=>`<option value="${esc(x)}">`).join('')}</datalist>${['TVGS','NTC','NTP'].map(o=>`<datalist id="dl${o}">${S.people.filter(p=>p.org===o).map(p=>`<option value="${esc(p.name)}">${esc(p.title)}</option>`).join('')}</datalist>`).join('')}
   <datalist id="dlSG">${SGK.map(k=>`<option value="${SG[k].t}">`).join('')}</datalist><datalist id="dlCL">${['CT+VK+BT','CT+VK+BT+BCN','BTL','TVK','SBT','TĐ','HCTĐ','SSTPDC','DDC','R28'].map(x=>`<option value="${x}">`).join('')}</datalist>`;
  return `<div class="head"><div><h1>DATA hồ sơ nghiệm thu</h1></div>
  <div class="toolbar" style="margin:0"><button class="btn g" id="xprint" data-act="dPrintSel">${ic('print',16)} In dòng đang chọn</button><button class="btn" data-act="dSignSel">${ic('check',15)} Đánh dấu ký…</button><button class="btn p" data-act="dNewGrp">${ic('plus',16)} Nhóm công việc</button><button class="btn p" data-act="xlOrig">${ic('word',15)} Xuất Excel giống file gốc</button><button class="btn ghost" data-act="dXlsx" title="Chỉ sheet DATA, định dạng đơn giản">${ic('word',15)} DATA rút gọn</button></div></div>
  <div class="toolbar"><input class="in" style="width:280px" placeholder="Tìm số, vị trí, công tác…" data-dq="1" value="${esc(UI.dq||'')}">
   <select class="in" data-df="dblk"><option value="">Block: tất cả</option>${S.hms.map(h=>`<option ${UI.dblk===h.name?'selected':''}>${esc(h.name)}</option>`).join('')}</select>
   <select class="in" data-df="dst"><option value="">Trạng thái: tất cả</option>${['draft','check','approve','returned','approved'].map(k=>`<option value="${k}" ${UI.dst===k?'selected':''}>${ST[k].t}</option>`).join('')}</select>
   <select class="in" data-df="dsg"><option value="">Ký: tất cả</option><option value="chuaky" ${UI.dsg==='chuaky'?'selected':''}>Chưa ký (tất cả)</option>${SGK.map(k=>`<option value="${k}" ${UI.dsg===k?'selected':''}>${SG[k].t}</option>`).join('')}</select>
   <button class="btn sm ghost" data-act="dAll" data-id="close">Thu gọn tất cả</button><button class="btn sm ghost" data-act="dAll" data-id="open">Mở tất cả</button>
   <span style="margin-left:auto">${waitList().length?`<button class="btn sm p" data-act="waitOpen">${ic('print',14)} Chờ in (${waitList().length})</button> `:''}${pourBadge()} ${syncBadge()}</span><span class="mut small">${total} dòng · ${G.length} nhóm</span></div>
  ${dl}<div class="dwrap" id="dwrap" tabindex="-1"><table class="xgrid"><colgroup><col style="width:110px">${XC.map(c=>`<col style="width:${c[3]}px">`).join('')}<col style="width:110px"></colgroup>
  <thead><tr class="xl"><th class="xg"></th>${XC.map((c,ci)=>`<th class="${ci===0?'xa':''}">${c[0]}</th>`).join('')}<th></th></tr>
  <tr class="xh"><th class="xg"></th>${XC.map((c,ci)=>`<th class="${ci===0?'xa':''}${c[4]?' ro':''}${['sign','kyAt'].includes(c[2])?' sgh':''}">${c[2]==='r7'?'Ngày thí nghiệm<br>R7':c[2]==='r28'?'<br>R28':esc(c[1])}</th>`).join('')}<th>Trạng thái</th></tr></thead>
  <tbody>${body||`<tr><td colspan="${span}" class="empty">Chưa có dữ liệu – bấm “Nhóm công việc” để bắt đầu</td></tr>`}</tbody></table></div>`;
};
/* ---- Điều khiển kiểu Excel ---- */
const X={sel:null,ed:null,anchor:null,rows:new Set()};
const xTd=(ri,ci)=>document.querySelector(`#dwrap td[data-ri="${ri}"][data-ci="${ci}"]`);
const xB=ri=>S.bbnt.find(b=>b.id===(UI.dOrder||[])[ri]);
function xSelect(ri,ci,scroll=true,mode){
  const n=(UI.dOrder||[]).length;if(!n)return;ri=Math.max(0,Math.min(n-1,ri));ci=Math.max(0,Math.min(XC.length-1,ci));
  if(mode==='shift'&&X.anchor!=null){X.rows=new Set();const a=Math.min(X.anchor,ri),z=Math.max(X.anchor,ri);for(let k=a;k<=z;k++)X.rows.add(UI.dOrder[k])}
  else if(mode==='ctrl'){const id=UI.dOrder[ri];if(X.rows.has(id)&&X.rows.size>1)X.rows.delete(id);else X.rows.add(id);X.anchor=ri}
  else if(mode!=='keep'){X.rows=new Set([UI.dOrder[ri]]);X.anchor=ri}
  document.querySelectorAll('#dwrap tr.rs').forEach(e=>e.classList.remove('rs'));X.rows.forEach(id=>{const tr=document.querySelector(`#dwrap tr[data-row="${id}"]`);if(tr)tr.classList.add('rs')});
  const pb=$('#xprint');if(pb)pb.innerHTML=`${ic('print',16)} In ${X.rows.size>1?X.rows.size+' dòng đã chọn':'dòng đang chọn'}`;
  document.querySelectorAll('#dwrap td.on').forEach(e=>e.classList.remove('on'));
  X.sel={ri,ci};const td=xTd(ri,ci);if(td){td.classList.add('on');if(scroll)td.scrollIntoView({block:'nearest',inline:'nearest'})}
  const b=xB(ri);const c=XC[ci];const bar=$('#xbar');if(bar&&b)bar.innerHTML=`<b>${c[0]||'—'}${ri+1}</b> · ${esc(c[1]||c[2])} · <span class="mut">${esc(b.no)}</span>`;
}
function xRefresh(b){const tr=document.querySelector(`#dwrap tr[data-row="${b.id}"]`);if(!tr)return;const td=tr.querySelector('td[data-ri]');const ri=+td.dataset.ri;
  const gi=+(tr.querySelector('td[data-ci="1"]')||{}).textContent||'';const tmp=document.createElement('tbody');tmp.innerHTML=xRow(b,ri,gi);tr.replaceWith(tmp.firstElementChild);
  if(X.sel&&X.sel.ri===ri)xSelect(X.sel.ri,X.sel.ci,false,'keep')}
function xEdit(init){
  if(!X.sel)return;const b=xB(X.sel.ri),c=XC[X.sel.ci];if(!b)return;
  if(!xEditable(b,c)){toast(c[4]?'Cột này tự tính':'Hồ sơ đang chờ kiểm tra/phê duyệt – không sửa được');return}
  const td=xTd(X.sel.ri,X.sel.ci);if(!td)return;
  const ta=document.createElement(['W','X'].includes(c[0])?'textarea':'input');ta.className='xed';
  const list={title:'dlCT',TVGS:'dlTVGS',NTC:'dlNTC',NTP:'dlNTP',CHT:'dlNTP',cl:'dlCL',sign:'dlSG'}[c[2]];if(list&&ta.tagName==='INPUT')ta.setAttribute('list',list);
  ta.value=init!=null?init:String(xGet(b,c[2]));td.appendChild(ta);ta.focus();if(init==null)ta.select();else{ta.setSelectionRange(ta.value.length,ta.value.length)}
  X.ed={ta,b,c,typed:init!=null};
}
function xCommit(move){const E=X.ed;if(!E)return;X.ed=null;const v=E.ta.value;E.ta.remove();
  if(v!==String(xGet(E.b,E.c[2]))){xSet(E.b,E.c[2],v);save();xRefresh(E.b)}
  if(move){const[dr,dc]=move;xSelect(X.sel.ri+dr,X.sel.ci+dc)}else xSelect(X.sel.ri,X.sel.ci,false,'keep');$('#dwrap')&&$('#dwrap').focus({preventScroll:true})}
function xCancel(){const E=X.ed;if(!E)return;X.ed=null;E.ta.remove();$('#dwrap')&&$('#dwrap').focus({preventScroll:true})}
function xKey(e){
  if(UI.view!=='data'||$('#modalBg').classList.contains('on'))return false;
  if(X.ed){const k=e.key;
    if(k==='Enter'&&!e.altKey){e.preventDefault();xCommit([e.shiftKey?-1:1,0]);return true}
    if(k==='Tab'){e.preventDefault();xCommit([0,e.shiftKey?-1:1]);return true}
    if(k==='Escape'){e.preventDefault();xCancel();return true}
    if(X.ed.typed&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(k)&&!X.ed.ta.hasAttribute('list')){e.preventDefault();xCommit({ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[k]);return true}
    return false}
  if(!X.sel)return false;const a=document.activeElement;if(a&&a!==document.body&&a.id!=='dwrap'&&a.closest&&!a.closest('#dwrap'))return false;
  const mv={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1],Enter:[e.shiftKey?-1:1,0],Tab:[0,e.shiftKey?-1:1]}[e.key];
  if(mv){e.preventDefault();xSelect(X.sel.ri+mv[0],X.sel.ci+mv[1],true,e.shiftKey&&e.key.startsWith('Arrow')?'shift':undefined);return true}
  if(e.key==='F2'){e.preventDefault();xEdit();return true}
  if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();const b=xB(X.sel.ri),c=XC[X.sel.ci];if(b&&xEditable(b,c)){xSet(b,c[2],'');save();xRefresh(b)}return true}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='d'){e.preventDefault();const b=xB(X.sel.ri),up=xB(X.sel.ri-1),c=XC[X.sel.ci];if(b&&up&&xEditable(b,c)){xSet(b,c[2],xGet(up,c[2]));save();xRefresh(b)}return true}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='c'){const b=xB(X.sel.ri);if(b){const t=String(xGet(b,XC[X.sel.ci][2]));try{navigator.clipboard.writeText(t).then(()=>toast('Đã chép ô'),()=>{})}catch(x){}}return true}
  if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();xEdit(e.key);return true}
  return false}
function xPaste(e){
  if(UI.view!=='data'||!X.sel||X.ed||$('#modalBg').classList.contains('on'))return;
  const txt=(e.clipboardData||window.clipboardData).getData('text');if(!txt)return;e.preventDefault();
  const rows=txt.replace(/\r/g,'').replace(/\n$/,'').split('\n').map(l=>l.split('\t'));
  let ri=X.sel.ri;const ci0=X.sel.ci;let changed=0,added=0;let last=xB(ri);
  rows.forEach((cells,k)=>{let b=xB(ri+k);
    if(!b){const t=task(last.taskId);b=dNewRow(t,null);UI.dOrder.splice(ri+k,0,b.id);added++}
    last=b;const L0=XC[ci0][0];cells.forEach((v,j)=>{const c=L0?XC.find(x=>x[0]===xColL(xColN(L0)+j)):XC[ci0+j];if(!c||!xEditable(b,c))return;xSet(b,c[2],v);changed++})});
  save();render();xSelect(X.sel.ri,X.sel.ci);toast(`Đã dán ${rows.length} dòng × ${rows[0].length} cột${added?` (thêm ${added} dòng mới)`:''}`)}
const xColN=s=>[...s].reduce((n,ch)=>n*26+ch.charCodeAt(0)-64,0);const xColL=n=>{let s='';while(n>0){const m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26)}return s};
function dRefreshRow(b){xRefresh(b)}
const PK=[['pyc','Phiếu yêu cầu nghiệm thu (YCNT)'],['ntcv','Biên bản nghiệm thu công việc (BBNT)'],['cl','Phiếu kiểm tra / checklist (CT, VK, BT…)'],['lm','Biên bản lấy mẫu bê tông'],['dbt','Phiếu yêu cầu đổ bê tông']];
function signModal(ids,pre){const L=ids.map(id=>S.bbnt.find(b=>b.id===id)).filter(Boolean);if(!L.length)return;
  modal(`<h3>Tình trạng ký – ${L.length} bộ hồ sơ</h3><div class="mut small" style="max-height:110px;overflow:auto;margin-bottom:10px">${L.map(b=>`<div><b>${esc(b.no)}</b> · ${esc(b.viTri)} · ${sgChip(b)}</div>`).join('')}</div>
   <label class="f">Chuyển sang</label><select class="in" id="mSg">${SGK.map(k=>`<option value="${k}" ${(pre||'ky')===k?'selected':''}>${SG[k].t}</option>`).join('')}</select>
   <label class="f" style="margin-top:8px">Ngày</label><input class="in" type="date" id="mSd" value="${nowISO().slice(0,10)}">
   <p class="mut small" style="margin-top:8px">“Đã ký” nghĩa là bản giấy đã đủ chữ ký các bên và đã lấy về. Sau khi ký, vào <b>Lưu trữ file gốc</b> để ghi vị trí lưu.</p>`,
   ()=>{const st=$('#mSg').value,d=($('#mSd').value||nowISO().slice(0,10))+'T00:00';L.forEach(b=>sgSet(b,st,d));save();render();toast(`Đã chuyển ${L.length} hồ sơ sang “${SG[st].t}”`)},'Cập nhật')}
function printModal(ids){
  const L=ids.map(id=>S.bbnt.find(b=>b.id===id)).filter(Boolean);if(!L.length){toast('Chọn ít nhất 1 dòng');return}
  const cnt=k=>L.filter(b=>b.docs[k]&&(k!=='cl'||b.cls.length)).length;
  const sel=UI.printKinds||{pyc:1,ntcv:1,cl:1,lm:1,dbt:0};
  const ctm={};L.forEach(b=>{if(!b.docs.cl)return;ensureCls(b);b.cls.forEach(c=>{ctm[c.tpl]=(ctm[c.tpl]||0)+1})});const CT=Object.entries(ctm);
  modal(`<h3>In ${L.length} bộ hồ sơ</h3>
   <div class="mut small" style="max-height:110px;overflow:auto;margin-bottom:10px">${L.map(b=>`<div><b>${esc(b.no)}</b> · ${esc(b.viTri)}</div>`).join('')}</div>
   <div class="sect" style="margin-top:0">Chọn phiếu cần in</div>
   ${PK.map(([k,l])=>`<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" class="pk" value="${k}" ${sel[k]&&cnt(k)?'checked':''} ${cnt(k)?'':'disabled'} ${k==='cl'?'data-act="pkCl"':''}> ${l} <span class="mut small">(${cnt(k)} dòng có)</span></label>${k==='cl'&&CT.length?`<div id="pkcBox" style="margin:0 0 6px 26px;padding:6px 10px;border-left:3px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:2px 14px">${CT.map(([id,n])=>{const tp=tplOf(id)||{};return `<label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" class="pkc" value="${id}" ${(!UI.printCl||UI.printCl[id]!==0)&&sel.cl?'checked':''}> <b>${esc(tp.code||id)}</b> ${esc(String(tp.name||'').replace(/^Phiếu kiểm tra\s*/i,''))} <span class="mut">(${n})</span></label>`}).join('')}</div>`:''}`).join('')}
   <p class="mut small" style="margin-top:10px"><b>In ngay</b>: ${window.claude?'tải file PDF, mở file rồi bấm <b>Ctrl+P</b> để chọn máy in':'mở hộp thoại in, chọn máy in rồi bấm In'}. <b>Tải Word</b>: file Word để sửa.</p>
   <div style="text-align:right;margin-top:6px"><button class="btn" data-act="pmWord">${ic('word',15)} Tải Word</button></div>`,
   ()=>{const s=pmSel();if(!s)return false;directPrint(L,s.ks,s.cs);return false},'🖨 In ngay');UI._pmL=L}
function pmSel(){const ks=[...document.querySelectorAll('.pk:checked')].map(x=>x.value);if(!ks.length){toast('Chọn ít nhất 1 loại phiếu');return null}
  const allC=[...document.querySelectorAll('.pkc')];const cs=allC.filter(x=>x.checked).map(x=>x.value);
  if(ks.includes('cl')&&allC.length&&!cs.length){toast('Chọn ít nhất 1 loại checklist hoặc bỏ tích Phiếu kiểm tra');return null}
  UI.printCl=Object.fromEntries(allC.map(x=>[x.value,x.checked?1:0]));UI.printKinds=Object.fromEntries(PK.map(([k])=>[k,ks.includes(k)?1:0]));return{ks,cs:allC.length?cs:null}}
function printParts(L,ks,clT){const parts=[];L.forEach(b=>{ensureCls(b);docList(b).forEach(([k])=>{const isC=/^cl\d+$/.test(k);const base=isC?'cl':k;if(!ks.includes(base))return;if(isC&&clT&&!clT.includes((b.cls[+k.slice(2)]||{}).tpl))return;parts.push(buildDoc(b,k))})});return parts}
function fillPage(p,H){/* giãn khoảng cách dòng để phiếu phủ kín trang A4 như form gốc */
  p.style.setProperty('--g','0px');p.classList.add('fill');const h0=p.getBoundingClientRect().height;if(h0>=H*0.97)return;
  let lo=0,hi=40;for(let k=0;k<14;k++){const m=(lo+hi)/2;p.style.setProperty('--g',m+'px');if(p.getBoundingClientRect().height<=H)lo=m;else hi=m}
  p.style.setProperty('--g',lo+'px')}
function fitPages(pa,fill){/* mỗi phiếu vừa 1 trang A4: thu nhỏ phiếu nào cao hơn trang */
  pa.classList.add('measure');const mm=document.createElement('div');mm.style.height='267mm';pa.appendChild(mm);const H=mm.getBoundingClientRect().height;mm.remove();
  pa.querySelectorAll('.pp').forEach(p=>{p.style.zoom='';if(fill!==false)fillPage(p,H-6);const h=p.getBoundingClientRect().height;if(h>H)p.style.zoom=String(Math.max(0.6,(H-2)/h))});pa.classList.remove('measure')}
function loadLib(src,test){return new Promise((res,rej)=>{if(test())return res();const sc=document.createElement('script');sc.src=src;sc.onload=()=>test()?res():rej(new Error('lib'));sc.onerror=()=>rej(new Error('Không tải được thư viện PDF'));document.head.appendChild(sc)})}
async function directPrint(L,ks,clT){const parts=printParts(L,ks,clT);if(!parts.length){toast('Các dòng đã chọn không có phiếu loại này');return}
  const name=L.length===1?'In_'+L[0].no.replace(/[\/\\]/g,'-'):`In_${L.length}_ho_so_${nowISO().slice(0,10)}`;
  const ok=await printPages(parts,name,{fill:true});if(ok){L.forEach(b=>{if(sg(b).st==='chua')sgSet(b,'in')});save();if(UI.view==='data')L.forEach(b=>xRefresh(b))}}
async function printPages(parts,name,opt){opt=opt||{};
  if(!(window.claude&&typeof window.claude.use==='function')){/* chạy ngoài claude.ai (server nội bộ): mở hộp thoại in của trình duyệt */
    let pa=document.getElementById('printArea');if(!pa){pa=document.createElement('div');pa.id='printArea';document.body.appendChild(pa)}
    pa.innerHTML=parts.map(p=>`<div class="ppo"><div class="pp">${p}</div></div>`).join('');fitPages(pa,opt.fill!==false);document.body.classList.add('printing');closeModal();
    const done=()=>{document.body.classList.remove('printing');pa.innerHTML='';window.removeEventListener('afterprint',done)};window.addEventListener('afterprint',done);
    setTimeout(()=>{try{window.print()}catch(e){done()}},80);return true}
  closeModal();toast('Đang tạo PDF để in…');
  try{await loadLib('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',()=>window.html2canvas);
    await loadLib('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',()=>window.jspdf&&window.jspdf.jsPDF)}catch(e){toast(e.message+' – dùng Tải Word');return false}
  let pa=document.getElementById('printArea');if(!pa){pa=document.createElement('div');pa.id='printArea';document.body.appendChild(pa)}
  pa.innerHTML=parts.map(p=>`<div class="pp">${p}</div>`).join('');pa.classList.add('render');
  let ov=document.getElementById('pdfOv');if(!ov){ov=document.createElement('div');ov.id='pdfOv';document.body.appendChild(ov)}const ovT=t=>ov.innerHTML=`<div class="box"><div class="spin"></div><div>${t}</div></div>`;ov.style.display='flex';ovT('Đang tạo PDF để in…');
  try{const pdf=new window.jspdf.jsPDF({unit:'mm',format:'a4',orientation:'portrait',compress:true});
    const X=25,Y=15,W=170,H=269;const pages=[...pa.querySelectorAll('.pp')];
    {const mm=document.createElement('div');mm.style.height='262mm';pa.appendChild(mm);const Hp=mm.getBoundingClientRect().height;mm.remove();if(opt.fill!==false)pages.forEach(p=>fillPage(p,Hp))}
    for(let i=0;i<pages.length;i++){ovT(`Đang tạo PDF… trang ${i+1}/${pages.length}`);const p=pages[i];const cv=await window.html2canvas(p,{scale:3,backgroundColor:'#ffffff',logging:false,useCORS:false,ignoreElements:e=>e.id==='pdfOv'});
      let w=W,h=cv.height*W/cv.width;if(h>H){w=w*H/h;h=H}
      if(i)pdf.addPage();pdf.addImage(cv.toDataURL('image/jpeg',0.9),'JPEG',X+(W-w)/2,Y,w,h,undefined,'FAST')}
    const blob=pdf.output('blob');pa.classList.remove('render');pa.innerHTML='';ov.style.display='none';await saveFile(name+'.pdf',blob);return true;
  }catch(e){toast('Không tạo được PDF: '+(e&&e.message||e)+' – dùng Tải Word');return false}
  finally{pa.classList.remove('render');pa.innerHTML='';ov.style.display='none'}}
async function exportWordMulti(L,ks,clT){
  L.forEach(b=>{if(sg(b).st==='chua')sgSet(b,'in')});save();if(UI.view==='data')L.forEach(b=>xRefresh(b));
  const parts=[];L.forEach(b=>{ensureCls(b);docList(b).forEach(([k])=>{const isC=/^cl\d+$/.test(k);const base=isC?'cl':k;if(!ks.includes(base))return;if(isC&&clT&&!clT.includes((b.cls[+k.slice(2)]||{}).tpl))return;parts.push(buildDoc(b,k))})});
  if(!parts.length){toast('Các dòng đã chọn không có phiếu loại này');return}
  const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.3}p{margin:3pt 0}table{border-collapse:collapse}</style></head><body>${parts.map((p,i)=>(i?'<br clear="all" style="page-break-before:always">':'')+p).join('')}</body></html>`;
  const name=L.length===1?'In_'+L[0].no.replace(/[\/\\]/g,'-'):`In_${L.length}_ho_so_${nowISO().slice(0,10)}`;
  if(!window.JSZip){saveFile(name+'.html',html);return}
  const blob=await makeDocx(parts.map((p,i)=>(i?'<br clear="all" style="page-break-before:always">':'')+p).join(''));
  saveFile(name+'.docx',blob);toast(`Đang tải ${parts.length} trang phiếu`)}
function dNewRow(t,from){
  const last=from||S.bbnt.filter(b=>b.taskId===t.id).pop();
  const b=newBbntObj(S,t.id,null,last?last.title:(t.congTac||t.name),'');
  if(last){['mac','doSut','banVe','place'].forEach(k=>b[k]=last[k]);b.sig=Object.assign({},last.sig);b.docs.lm=last.docs.lm||b.docs.lm;
    const n=Math.max(0,...S.bbnt.filter(x=>x.taskId===t.id).map(x=>leadNo(x.no)))+1;
    const f=x=>String(x||'').replace(/^\d+/,String(n));b.seq=n;b.no=f(last.no);b.pycNo=f(last.pycNo);b.lmNo=f(last.lmNo||b.lmNo);
    const ids=last.cls.map(c=>c.tpl);if(ids.length){b.cls=mkCls(S,ids,ids.map((_,i)=>f((last.cls[i]||{}).no)))}b.docs.cl=b.cls.length>0}
  if(from){['viTri','klLT','klTT'].forEach(k=>b[k]=from[k])}
  const today=new Date();today.setHours(0,0,0,0);b.pycDate=toISO(today);b.start=addDays(b.pycDate,1);b.end='';b.startNoTime=true;b.endNoTime=true;b.clDate=b.start;b.lmDate=b.start;b.created=b.start;
  b.r7=addDays(b.start,7).slice(0,10);b.r28=addDays(b.start,28).slice(0,10);b._nt=b.start.slice(0,10);
  const p={id:uid(),taskId:t.id,date:b.start,zone:b.viTri,title:`${b.title} ${b.viTri}`.trim()};S.plans.push(p);b.planId=p.id;
  log(b,'Thêm dòng trên DATA');
  const idx=from?S.bbnt.indexOf(from)+1:(()=>{let k=-1;S.bbnt.forEach((x,j)=>{if(x.taskId===t.id)k=j});return k<0?S.bbnt.length:k+1})();
  S.bbnt.splice(idx,0,b);return b;
}
function grpModal(t){const isNew=!t;t=t||{name:'',hm:(S.hms[0]||{}).name||'',code:'',congTac:'Nghiệm thu công tác ván khuôn, cốt thép và đổ bê tông',tpls:codesToTpls('CT+VK+BT')};
  modal(`<h3>${isNew?'Thêm nhóm công việc':'Sửa nhóm công việc'}</h3>
  <label class="f">Tên nhóm (như dòng tiêu đề nhóm trong DATA)</label><input class="in" id="gN" value="${esc(t.name)}" placeholder="Ván khuôn, cốt thép và bê tông dầm sàn tầng 2">
  <div class="row r2" style="margin-top:8px"><div><label class="f">Block</label><select class="in" id="gB">${S.hms.map(h=>`<option ${h.name===t.hm?'selected':''}>${esc(h.name)}</option>`).join('')}</select></div>
  <div><label class="f">Mã cấu kiện trong số (VD DST2, CVB1, M)</label><input class="in" id="gC" value="${esc(t.code)}"></div></div>
  <label class="f" style="margin-top:8px">Công tác mặc định</label><input class="in" id="gT" list="dlCT" value="${esc(t.congTac||'')}">
  <label class="f" style="margin-top:8px">Checklist (ký hiệu nối bằng +: ${esc(S.templates.filter(isCL).map(x=>x.code).join(', '))})</label><input class="in" id="gL" value="${esc(clCodes(t.tpls))}">`,
  ()=>{const name=$('#gN').value.trim();if(!name){toast('Nhập tên nhóm');return false}
    const o={name,hm:$('#gB').value,code:$('#gC').value.trim(),congTac:$('#gT').value.trim(),tpls:codesToTpls($('#gL').value)};
    if(isNew){const nt=Object.assign({id:uid(),wbs:o.code,bm:'Kết cấu',nhom:'',ck:'',itp:''},o);S.tasks.push(nt);if(o.code&&!S.wbs.some(w=>w.code===o.code))S.wbs.push({id:uid(),code:o.code,name,hm:o.hm,bm:'Kết cấu',unit:'m3',qty:0});const b=dNewRow(nt);save();render();setTimeout(()=>{const ri=(UI.dOrder||[]).indexOf(b.id);if(ri>=0){xSelect(ri,2);$('#dwrap').focus({preventScroll:true})}},50)}
    else{Object.assign(t,o);save();render()}},isNew?'Tạo nhóm':'Lưu')}
function loadExcelJS(){return new Promise((ok,no)=>{if(window.ExcelJS)return ok();const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';sc.onload=()=>ok();sc.onerror=()=>no(new Error('Không tải được thư viện Excel'));document.head.appendChild(sc)})}
async function dataXlsx(){
  try{await loadExcelJS()}catch(e){toast(e.message);return}
  toast('Đang tạo file Excel…');
  const wb=new ExcelJS.Workbook();const ws=wb.addWorksheet('DATA',{views:[{state:'frozen',xSplit:1,ySplit:2}]});
  const L=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM'];
  const W=[14,8,14,7.9,7.2,8.5,14,7.6,7.8,7.6,14,7.8,7.4,8.1,14,7.4,8.8,10.7,38.1,40.2,41.4,37.6,25.1,40.1,8,15.9,13.1,11,13,13,13,17.9,18.2,19.1,18.4,12.1,11.4,11.7,12.7];
  ws.columns=L.map((c,i)=>({key:c,width:W[i]}));
  const H=['Số biên bản','','NGÀY THÁNG NĂM NGHIỆM THU','Ngày YCNT','Tháng YCNT','Năm YCNT','NGÀY NGHIỆM THU','Ngày NT','Tháng NT','Năm NT','NGÀY CHECKLIST','Ngày BBKT','Tháng BBKT','Năm BBKT','NGÀY LẤY MẪU','Ngày LM','Tháng LM','Năm LM','Phiếu yêu cầu nghiệm thu','BB NGHIỆM THU','Check list','Biên bản lấy mẫu','Vị trí','CÔNG TÁC','Block','Bê tông','BẢN VẼ SỐ','Độ sụt','THỜI GIAN BD NGHIỆM THU ','THỜI GIAN KẾT THÚC NGHIỆM THU','THỜI GIAN Lấy mẫu','Chỉ huy trưởng/ Phó công trình','Bên Giao Thầu','giám sát hiện trường','TVGS','Khối lượng lý thuyết','Khối lượng thực tế','Ngày thí nghiệm',''];
  const thin={style:'thin',color:{argb:'FF000000'}};const B={top:thin,left:thin,bottom:thin,right:thin};
  const F=(sz,b,color)=>({name:'Times New Roman',size:sz,bold:!!b,color:{argb:color||'FF000000'}});
  const r1=ws.getRow(1),r2=ws.getRow(2);
  H.forEach((h,i)=>{r1.getCell(i+1).value=h});r2.getCell(38).value='R7';r2.getCell(39).value='R28';
  L.forEach((c,i)=>{if(i<37)ws.mergeCells(`${c}1:${c}2`)});ws.mergeCells('AL1:AM1');
  [r1,r2].forEach(r=>{r.height=r===r1?30:30;L.forEach((c,i)=>{const cell=r.getCell(i+1);cell.font=F(i===37||r===r2?11:12,true);cell.alignment={horizontal:'center',vertical:'middle',wrapText:true};cell.border=B;cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFFFF2CC'}}})});
  const dt=iso=>{const p=parts(iso);return p?new Date(Date.UTC(p.y,+p.m-1,+p.d)):null};
  let r=3;const first=3;let gidx=0;
  dataGroups().forEach(g=>{if(!g.rows.length)return;
    const sr=ws.getRow(r);sr.getCell(1).value=g.t.name;ws.mergeCells(`A${r}:AM${r}`);sr.getCell(1).font=F(13,false,'FFFF0000');sr.getCell(1).alignment={vertical:'middle'};sr.getCell(1).border=B;sr.height=18;r++;
    g.rows.forEach((b,k)=>{gidx++;const row=ws.getRow(r);const n=key=>(sigP(b,key)||{}).name||'';
      const C=dt(b.pycDate),G=dt(b.start),K=dt(b.clDate),O=b.docs.lm?dt(b.lmDate):null;
      const dmy=(col,d)=>{const p=d?[d.getUTCDate(),d.getUTCMonth()+1,d.getUTCFullYear()]:['','',''];
        return[{formula:`IF(${col}${r}="","",DAY(${col}${r}))`,result:p[0]},{formula:`IF(${col}${r}="","",MONTH(${col}${r}))`,result:p[1]},{formula:`IF(${col}${r}="","",YEAR(${col}${r}))`,result:p[2]}]};
      const v=[k+1,{formula:`MAX($B$${first-1}:$B${r-1})+1`,result:gidx},C,...dmy('C',C),G,...dmy('G',G),K,...dmy('K',K),O,...dmy('O',O),
        b.pycNo,b.no,(b.cls[0]||{}).no||'',b.docs.lm?b.lmNo:'',b.viTri,b.title,+((task(b.taskId)||{}).hm||'').replace(/^Block\s*/,'')||((task(b.taskId)||{}).hm||''),b.mac,b.banVe,b.doSut,
        gGet(b,'tBD'),gGet(b,'tKT'),xGet(b,'tLM'),n('CHT'),n('NTC'),n('NTP'),n('TVGS'),b.klLT===''?null:b.klLT,b.klTT===''?null:b.klTT,b.r7?dt(b.r7):null,b.r28?dt(b.r28):null];
      v.forEach((x,i)=>{const cell=row.getCell(i+1);cell.value=(x===''?null:x);cell.font=F(12);cell.border=B;
        cell.alignment={horizontal:[22,23].includes(i)?'left':'center',vertical:'middle',wrapText:[22,23].includes(i)};
        if([2,6,10,14,37,38].includes(i))cell.numFmt='d/m/yyyy'});
      const sst=sg(b).st;const fc=sst==='ky'?'FFFFFF00':(sst==='trinh'||sst==='in')?'FF00B0F0':null;if(fc)[19,20].forEach(k=>{row.getCell(k).fill={type:'pattern',pattern:'solid',fgColor:{argb:fc}}});
      row.getCell(1).font=F(12,false,'FFFF0000');row.getCell(2).font=F(12,true);r++})});
  const buf=await wb.xlsx.writeBuffer();
  saveFile('DATA_HSNT_'+nowISO().slice(0,10)+'.xlsx',new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
}


/* =================== Xuất vào file Excel gốc =================== */
function xlRecs(){const out=[];const D=iso=>({d:XP.serial(iso)});
  dataGroups().forEach(g=>g.rows.forEach(b=>{const n=k=>(sigP(b,k)||{}).name||'';const t=task(b.taskId)||{};
    const v=new Array(39).fill('');v[2]=D(b.pycDate);v[6]=D(b.start);v[10]=D(b.clDate);v[14]=b.docs.lm?D(b.lmDate):'';
    Object.assign(v,{18:b.pycNo,19:b.no,20:(b.cls[0]||{}).no||'',21:b.docs.lm?b.lmNo:'',22:b.viTri,23:b.title,24:+String(t.hm||'').replace(/^Block\s*/,'')||'',25:b.mac,26:b.banVe,27:b.doSut,
      28:gGet(b,'tBD'),29:gGet(b,'tKT'),30:xGet(b,'tLM'),31:n('CHT'),32:n('NTC'),33:n('NTP'),34:n('TVGS'),35:b.klLT===''?'':+b.klLT,36:b.klTT===''?'':+b.klTT,37:b.r7?D(b.r7):'',38:b.r28?D(b.r28):''});
    out.push({id:b.id,no:b.no,vt:b.viTri,sec:t.name||'',isNew:!b.imported||!!b.fromPour,sign:sg(b).st,vals:v})}));return out}
function xlNewRecs(){/* hồ sơ có trên app mà chưa có trong sheet DATA (theo lần đồng bộ Excel gần nhất) */
  const Y=window.SYNC;if(!Y||!Array.isArray(Y.rows))return[];const nz=s=>String(s??'').replace(/\s+/g,' ').trim();const K=new Set();
  Y.rows.forEach(r=>{if(r&&r.length>22&&String(r[18]||'').trim())K.add(nz(String(r[19]||'').trim()||String(r[18]).replace(/YCNT$/,'BBNT'))+'|'+nz(r[22]))});
  const out=[];let lastSec='';xlRecs().forEach(rc=>{const k=nz(rc.no)+'|'+nz(rc.vt);if(K.has(k)){lastSec=rc.sec;return}rc.afterSec=lastSec;const b=S.bbnt.find(x=>x.id===rc.id);const m=b&&S.bbnt.find(x=>x.id===(b.sbtFor||b.tvkFor));
    if(m){const tv=b.sbtFor&&typeof tvkOf==='function'?tvkOf(m):null;rc.afterSec=((tv&&task(tv.taskId))||task(m.taskId)||{}).name||lastSec}rc.isNew=true;out.push(rc)});return out}
async function clPushXl(){try{const L=xlNewRecs();const j=JSON.stringify(L);if(j===CLD.xlLast)return;await clRef('xlnew').set({at:nowISO(),n:L.length,stamp:(window.SYNC||{}).stamp||'',recs:L});CLD.xlLast=j}catch(e){console.error(e)}}
function signList(){return S.bbnt.filter(b=>sg(b).st!=='ky').map(b=>{const g=sg(b);return[b.no,b.viTri,g.st,g.inAt||'',g.trinhAt||'']})}
async function clPushSigns(){try{const L=signList();const j=JSON.stringify(L);if(j===CLD.sgLast)return;await clRef('signs').set({at:nowISO(),n:L.length,list:L});CLD.sgLast=j}catch(e){console.error(e)}}
function applySigns(){/* bản ngoài Claude (GitHub Pages, ổ Z:): nhận tình trạng ký giống app trên Claude */
  const G=window.SIGNS;if(!G||!Array.isArray(G.list))return;let last='';try{last=localStorage.getItem(LS+'_signs')||''}catch(e){}if(last===String(G.at))return;
  const nz=s=>String(s??'').replace(/\s+/g,' ').trim();const M={};G.list.forEach(x=>M[nz(x[0])+'|'+nz(x[1])]=x);
  S.bbnt.forEach(b=>{const x=M[nz(b.no)+'|'+nz(b.viTri)];const g=sg(b);if(x){g.st=x[2];if(x[3])g.inAt=x[3];if(x[4])g.trinhAt=x[4];delete g.auto}else if(g.st!=='ky'){g.st='ky';delete g.auto}});
  try{localStorage.setItem(LS+'_signs',String(G.at))}catch(e){}}
function xlOrigModal(){
  modal(`<h3>Xuất Excel giống file gốc</h3><p>Chọn file Excel hồ sơ gốc (VD <b>CEN_HS_HSNT_KẾT CẤU BLOCK 4.5..xlsm</b> trên ổ Z:). App ghi dữ liệu web vào sheet <b>DATA</b> của chính file đó rồi tải về một bản mới – giữ nguyên mọi sheet, form, macro, định dạng:</p>
  <ul class="small" style="margin:6px 0 10px 18px;line-height:1.6"><li>Ô nào khác web thì ghi theo web; ô công thức giữ nguyên.</li><li>Tô màu cột S/T: vàng = đã ký, xanh = đang trình ký.</li><li>Hồ sơ mới tạo trên web được chèn vào cuối đúng nhóm công việc, công thức tự nối tiếp.</li></ul>
  <input type="file" class="in" id="xlOrig" accept=".xlsm,.xlsx"><p class="mut small" style="margin-top:8px">File gốc trên máy không bị sửa. Tải bản mới về rồi chép đè lên file gốc khi đã kiểm tra.</p>`,
  ()=>{const f=$('#xlOrig').files[0];if(!f){toast('Chọn file Excel gốc trước');return false}xlOrigRun(f)},'Xuất')}
async function xlOrigRun(f){try{if(!window.JSZip)throw new Error('Chưa tải được thư viện nén');toast('Đang đọc file '+f.name+'…');
  const zip=await JSZip.loadAsync(await f.arrayBuffer());const R=await XP.patch(zip,xlRecs());
  const blob=await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6},mimeType:f.name.endsWith('.xlsm')?'application/vnd.ms-excel.sheet.macroEnabled.12':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  const nm=f.name.replace(/(\.xls[xm])$/i,'_WEB_'+nowISO().slice(0,10)+'$1');saveFile(nm,blob);
  modal(`<h3>Đã xuất ${esc(nm)}</h3><ul style="margin:6px 0 0 18px;line-height:1.7"><li>${R.updRows} dòng có cập nhật (${R.updCells} ô giá trị, ${R.color} ô tô màu ký)</li><li>${R.ins} dòng hồ sơ mới được chèn${R.newSec.length?` (nhóm mới: ${R.newSec.map(esc).join(', ')})`:''}</li>${R.skipped.length?`<li style="color:var(--amber)">${R.skipped.length} hồ sơ không tìm thấy dòng tương ứng trong file (đã đổi số BBNT?): ${R.skipped.slice(0,8).map(esc).join(', ')}${R.skipped.length>8?'…':''}</li>`:''}</ul><p class="mut small" style="margin-top:8px">Mở file bằng Excel, bật macro (Enable Content) như file gốc. Excel tự tính lại công thức khi mở.</p>`,()=>{},'Đóng')}
  catch(e){console.error(e);toast('Lỗi: '+e.message)}}

/* =================== Render =================== */
function render(){
  const keep={};['formPane','bListPane','prevPane','paperWrap','dwrap'].forEach(id=>{const e=document.getElementById(id);if(e)keep[id]=e.scrollTop});
  const ws=window.scrollY;
  $('#view').innerHTML=(V[UI.view]||V.dashboard)();
  const same=UI._lastSel===UI.sel;UI._lastSel=UI.sel;
  Object.keys(keep).forEach(id=>{if(!same&&id!=='bListPane'&&id!=='dwrap')return;const e=document.getElementById(id);if(e)e.scrollTop=keep[id]});const dw=document.getElementById('dwrap');if(dw&&UI._dsl!=null)dw.scrollLeft=UI._dsl;if(dw)dw.onscroll=()=>{UI._dsl=dw.scrollLeft};
  window.scrollTo(0,ws);
  if(UI.view==='bbnt'&&UI.autoFit!==false)ACT.zoom('fit',null,null,true);
  X.ed=null;if(UI.view==='data'&&X.sel)xSelect(X.sel.ri,X.sel.ci,false,'keep');
  if(UI.view==='data'&&UI.dScrollEnd){UI.dScrollEnd=false;const w=$('#dwrap');if(w)w.scrollTop=w.scrollHeight}
  renderNav();renderTop();
  const rf=$('#restoreFile');if(rf)rf.onchange=restore;const xf=$('#xlsFile');if(xf)xf.onchange=importXlsx;
}
function go(v){
  let sub=null;if(v.includes(':'))[v,sub]=v.split(':');
  UI.view=v;if(v==='input'&&sub)UI.inTab=sub;if(v==='bbnt'&&sub){UI.f.st=sub;UI.sel=null}
  if(location.hash!=='#'+v){try{history.replaceState(null,'','#'+v)}catch(e){}}
  if(window.innerWidth<=980)$('#app').classList.remove('navon');
  render();window.scrollTo(0,0);
}

/* =================== Modal =================== */
let modalOk=null;
function modal(html,ok,okLabel='Đồng ý',danger){
  $('#modal').innerHTML=html+`<div class="acts"><button class="btn" data-act="mClose">Hủy</button><button class="btn ${danger?'d':'p'}" data-act="mOk">${okLabel}</button></div>`;
  modalOk=ok;$('#modalBg').classList.add('on');const f=$('#modal').querySelector('input,select,textarea');if(f)f.focus();
}
const closeModal=()=>{$('#modal').style.maxWidth='';$('#modal').style.width='';$('#modalBg').classList.remove('on');modalOk=null};

/* =================== Actions =================== */
function log(b,a,note){(b.history=b.history||[]).push({t:nowISO(),who:me().name,a,note:note||''})}
const resetF=()=>{UI.f={q:'',hm:'',nhom:'',ck:'',wbs:'',st:''}};
function makeFromPlan(pid){
  const ex=bOfPlan(pid);if(ex){UI.sel=ex.id;resetF();go('bbnt');return}
  const p=S.plans.find(x=>x.id===pid);if(!p)return;
  const tt=task(p.taskId)||{};const b=newBbntObj(S,p.taskId,p.id,tt.congTac||tt.name,p.zone);log(b,'Lập hồ sơ');
  S.bbnt.push(b);UI.sel=b.id;UI.doc='ntcv';resetF();save();
  if(UI.role!=='Thực hiện'){UI.role='Thực hiện';saveUI();toast('Đã chuyển sang vai trò Thực hiện để lập hồ sơ')}
  go('bbnt');
}
const ACT={
  nav(){const a=$('#app');if(window.innerWidth<=980)a.classList.toggle('navon');else a.classList.toggle('navoff')},
  go(id){go(id)},make(id){makeFromPlan(id)},
  open(id,el,e){if(e)e.preventDefault();UI.sel=id;if(UI.view!=='bbnt'){resetF();go('bbnt')}else render()},
  intab(id){UI.inTab=id;render()},
  dTog(id){const c=UI.dclosed||(UI.dclosed={});c[id]=!c[id];render()},
  dAll(id){const c=UI.dclosed={};if(id==='close')S.tasks.forEach(t=>c[t.id]=true);render()},
  dAdd(id){const t=task(id);if(!t)return;(UI.dclosed||{})[id]=false;const b=dNewRow(t);save();render();setTimeout(()=>{const ri=(UI.dOrder||[]).indexOf(b.id);if(ri>=0){xSelect(ri,2);$('#dwrap').focus({preventScroll:true})}},50)},
  dDup(id){const f=S.bbnt.find(b=>b.id===id);const t=f&&task(f.taskId);if(!t)return;const b=dNewRow(t,f);save();render();setTimeout(()=>{const ri=(UI.dOrder||[]).indexOf(b.id);if(ri>=0){xSelect(ri,22);$('#dwrap').focus({preventScroll:true})}},50)},
  dDel(id){const b=S.bbnt.find(x=>x.id===id);if(!b)return;modal(`<h3>Xóa dòng ${esc(b.no)}?</h3><p class="mut">${esc(b.title)} ${esc(b.viTri)}</p><p class="mut small">Xóa cả bộ hồ sơ (phiếu YCNT, BBNT, phiếu kiểm tra, BB lấy mẫu) của dòng này.</p>`,()=>{S.bbnt=S.bbnt.filter(x=>x.id!==id);S.plans=S.plans.filter(p=>p.id!==b.planId);if(UI.sel===id)UI.sel=null;save();render()},'Xóa',true)},
  dNewGrp(){grpModal(null)},
  dEditGrp(id){grpModal(task(id))},
  dPaste(id){const t=task(id);modal(`<h3>Dán dòng từ Excel vào “${esc(t.name)}”</h3><p class="mut small">Trong sheet DATA, chọn các dòng (từ cột A đến cột AM) → Copy → dán vào đây. Dòng tiêu đề nhóm (chỉ có chữ ở cột A) sẽ tạo nhóm mới. Dòng trùng số BBNT + vị trí sẽ bỏ qua.</p>
    <textarea class="in" id="mP" rows="9" style="font-family:ui-monospace,Consolas,monospace;font-size:12px" placeholder="1	490	4/11/2026	4	11	2026	5/11/2026	…	1/NOQ/CEN/KC/4.5/DST1/YCNT	…"></textarea>
    <label class="f" style="margin-top:8px">Trạng thái các dòng dán vào</label><select class="in" id="mS"><option value="draft">Nháp (chưa duyệt)</option><option value="approved">Đã duyệt (hồ sơ đã ký)</option></select>`,
    ()=>{const txt=$('#mP').value;if(!txt.trim())return false;const rows=txt.replace(/\r/g,'').split('\n').filter(l=>l.trim()).map(l=>l.split('\t'));
      const r=importDATA(S,rows,{from:0,task:id,status:$('#mS').value});save();render();toast(`Đã thêm ${r.added} dòng${r.skipped?`, bỏ qua ${r.skipped} dòng trùng`:''}`)},'Dán')},
  dXlsx(){dataXlsx()},
  xlOrig(){xlOrigModal()},
  dPrint1(id){printModal([id])},
  dSignSel(){if(!X.rows||!X.rows.size){toast('Chọn dòng trước (Shift/Ctrl + bấm để chọn nhiều)');return}signModal(UI.dOrder.filter(id=>X.rows.has(id)))},
  sgBulk(id){const ids=[...document.querySelectorAll('.sgck:checked')].map(x=>x.value);if(!ids.length){toast('Tích chọn hồ sơ trước');return}signModal(ids,id)},
  sgAll(id){document.querySelectorAll('.sgck').forEach(x=>{if(!id||x.dataset.st===id)x.checked=!x.checked})},
  sgTab(id){UI.sgTab=id;render()},
  dashSg(id){if(id==='all'){go('data');return}UI.sgTab=id;go('sign')},
  pourOpen(){pourModal()},
  pmWord(){const s=pmSel();if(!s)return;const L=UI._pmL||[];closeModal();exportWordMulti(L,s.ks,s.cs)},
  grpMove(id){const[tid,d]=id.split(':');const vis=dataGroups().map(g=>g.t.id);const i=vis.indexOf(tid),j=i+(+d);if(i<0||j<0||j>=vis.length){toast(+d<0?'Nhóm đã ở trên cùng':'Nhóm đã ở dưới cùng');return}
    const a=S.tasks.findIndex(x=>x.id===tid),b=S.tasks.findIndex(x=>x.id===vis[j]);const tmp=S.tasks[a];S.tasks[a]=S.tasks[b];S.tasks[b]=tmp;save();render();
    setTimeout(()=>{const el=document.querySelector(`[data-act="grpMove"][data-id="${tid}:${d}"]`);if(el)el.scrollIntoView({block:'center'})},0)},
  pourUndo(){const l=pUndo();toast(l?'Đã hoàn tác: '+l:'Không còn thao tác để hoàn tác');pourModal();render()},
  sbtMake(id){pUndoSnap('Tạo SBT');const m=S.bbnt.find(b=>b.id===id);const s=pMakeSBT(m,'Tạo hồ sơ sau khi đổ bê tông từ bảng đối chiếu');if(s){save();toast('Đã tạo '+s.no+' · ngày '+fmtD(s.start))}else toast('Không tìm được mẫu SBT');pourModal();render()},
  tvkMake(id){pUndoSnap('Tạo tháo VK');const m=S.bbnt.find(b=>b.id===id);const s=pMakeTVK(m,'Tạo tháo ván khuôn từ bảng đối chiếu');if(s){save();toast('Đã tạo '+s.no+' · ngày '+fmtD(s.start))}else toast('Không tìm được mẫu tháo ván khuôn');pourModal();render()},
  sbtSkip(id){pUndoSnap('Bỏ qua SBT');(S.sbtSkip=S.sbtSkip||{})[id]=1;save();pourModal();render()},
  sbtAll(){pUndoSnap('Tạo tất cả SBT');const s=pourState();let n=0;s.noSbt.forEach(({b,ms,mt})=>{if(mt&&pMakeTVK(b,'Tạo tháo ván khuôn từ bảng đối chiếu'))n++;if(ms&&pMakeSBT(b,'Tạo hồ sơ sau khi đổ bê tông từ bảng đối chiếu'))n++});compOrder();save();toast('Đã tạo '+n+' hồ sơ');pourModal();render()},
  toggleForm(){UI.noForm=UI.noForm===false;saveUI&&saveUI();render()},
  pkCl(id,el){document.querySelectorAll('.pkc').forEach(x=>x.checked=el.checked)},
  waitOpen(){waitModal()},
  waitAll(id,el){const box=el.closest('table');box.querySelectorAll('.wck').forEach(x=>x.checked=el.checked)},
  waitPrint(){const ids=[...document.querySelectorAll('#view .wck:checked')].map(x=>x.value);if(!ids.length){toast('Tích chọn hồ sơ trước');return}printModal(ids)},
  pourSkip(k){pUndoSnap('Bỏ qua lần đổ');(S.pourLink=S.pourLink||{})[k]='x';save();pourModal();render()},
  pourMake(k){pUndoSnap('Tạo hồ sơ');const P=(window.SYNC.pours||[]).find(p=>pKey(p)===k);const s=pourState();const m=s.miss.find(x=>pKey(x.P)===k);if(!P||!m||!m.code)return;const o=pCreate(P,m.code);if(o&&o.length){(S.pourLink=S.pourLink||{})[k]=o[0].id;save();toast('Đã tạo '+o.map(b=>b.no).join(', '))}else toast('Không tìm thấy mẫu cùng mã '+m.code);pourModal();render()},
  pourFix(id){pUndoSnap('Lấy theo nhật ký');const s=pourState();const x=s.diff.find(d=>d.b.id===id);if(!x)return;x.d.forEach(d=>{x.b[d[3]]=d[3]==='klTT'?+d[2]:String(d[2])});(x.b.history=x.b.history||[]).push({t:nowISO(),who:me().name,a:'Lấy số liệu theo Nhật ký đổ BT'});save();pourModal();render()},
  sgOne(id){const[bid,st]=id.split(':');const b=S.bbnt.find(x=>x.id===bid);if(b){sgSet(b,st);save();render();toast(`${b.no} → ${SG[st].t}`)}},
  sgPrintChecked(){const ids=[...document.querySelectorAll('.sgck:checked')].map(x=>x.value);if(!ids.length){toast('Tích chọn hồ sơ trước');return}printModal(ids)},
  dPrintSel(){if(!X.rows||!X.rows.size){toast('Bấm chọn 1 ô của dòng cần in trước');return}printModal(UI.dOrder.filter(id=>X.rows.has(id)))},planF(id){UI.planF=id;render()},libSel(id){UI.libSel=id;render()},
  doc(id){UI.doc=id;const p=$('#prevPane');if(p){p.innerHTML=prevHTML(curB());if(UI.autoFit!==false)ACT.zoom('fit',null,null,true)}},
  togPrev(){UI.prev=!UI.prev;render()},togExp(){UI.expand=!UI.expand;render()},
  zoom(id,el,e,auto){if(!auto)UI.autoFit=false;if(id==='+')UI.zoom=Math.min(1.5,+(UI.zoom+0.1).toFixed(2));else if(id==='-')UI.zoom=Math.max(0.4,+(UI.zoom-0.1).toFixed(2));else{const w=$('#paperWrap');if(w)UI.zoom=Math.max(0.4,Math.min(1.5,+((w.clientWidth-34)/794).toFixed(2)))}
    const a=$('#a4');if(a)a.style.zoom=UI.zoom;const z=$('#zv');if(z)z.textContent=Math.round(UI.zoom*100)+'%'},
  res(id){const b=curB();if(!editable(b))return;const[ci,i,v]=id.split(':');const c=b.cls[+ci].checks[+i];c.result=c.result===v?'':v;save();render()},
  allOk(ci){const b=curB();if(!editable(b))return;b.cls[+ci].checks.forEach(c=>c.result='Đạt');save();render()},
  reopen(){const b=curB();modal(`<h3>Mở lại hồ sơ ${esc(b.no)}?</h3><p class="mut">Hồ sơ quay về trạng thái Nháp để sửa, sau đó gửi duyệt lại.</p>`,()=>{b.status='draft';log(b,'Mở lại để sửa');UI.role='Thực hiện';saveUI();save();render()},'Mở lại')},
  lmMake(){const b=curB();if(!editable(b))return;b.lm.rows=lmRows(b).rows.map(r=>({xe:'',kl:r.kl,sut:'',vt:''}));if(!b.lm.rows.length)b.lm.rows=[{xe:'',kl:'',sut:'',vt:''}];save();render()},
  lmAuto(){const b=curB();if(!editable(b))return;b.lm.rows=[];save();render()},
  lmAdd(){const b=curB();if(!editable(b))return;b.lm.rows.push({xe:'',kl:'',sut:'',vt:''});save();render()},
  lmDel(i){const b=curB();if(!editable(b))return;b.lm.rows.splice(+i,1);save();render()},
  extra(id,el){const[t,k]=id.split(':');const tp=tplOf(t);tp.extra=tp.extra.filter(x=>x!==k);if(el.checked)tp.extra.push(k);save()},
  addCl(){const id='CL_'+uid().slice(0,5).toUpperCase();S.templates.push({id,kind:'cl',code:'MOI',name:'Checklist kiểm tra công tác mới',title1:'PHIẾU KIỂM TRA',title2:'CÔNG TÁC …',numStyle:'num',dateLabel:'Ngày phát hành:',groups:parseGroups('# Kiểm tra công tác chuẩn bị\nTheo biện pháp thi công được duyệt | Bằng mắt\n# Kiểm tra kỹ thuật\nNội dung 1 | Bằng mắt, thước thép'),extra:[],use:true});UI.libSel=id;save();render()},
  send(){const b=curB();if(!editable(b))return;const v=validate(b);if(v.blocks.length){toast('Còn lỗi chặn gửi');return}
    const go2=()=>{b.status='check';b.returnReason='';log(b,'Gửi kiểm tra');save();render();toast('Đã gửi kiểm tra '+b.no)};
    if(v.warns.length)modal(`<h3>Gửi kiểm tra?</h3><div class="alert y">${v.warns.map(esc).join('<br>')}</div><p>Vẫn gửi hồ sơ <b>${esc(b.no)}</b>?</p>`,go2,'Vẫn gửi');else go2()},
  pass(){const b=curB();if(b.status!=='check'||UI.role!=='Kiểm tra')return;b.status='approve';log(b,'Kiểm tra đạt, chuyển phê duyệt');save();render();toast('Đã chuyển phê duyệt')},
  approve(){const b=curB();if(b.status!=='approve'||UI.role!=='Phê duyệt')return;b.status='approved';log(b,'Phê duyệt');save();render();toast('Đã phê duyệt '+b.no)},
  ret(){const b=curB();modal(`<h3>Trả lại hồ sơ ${esc(b.no)}</h3><label class="f">Lý do trả lại (bắt buộc)</label><textarea class="in" id="mI" rows="4"></textarea>`,()=>{const r=$('#mI').value.trim();if(!r){toast('Nhập lý do trả lại');return false}b.status='returned';b.returnReason=r;log(b,'Trả lại',r);save();render();toast('Đã trả lại về bước Lập hồ sơ')},'Trả lại',true)},
  delB(){const b=curB();modal(`<h3>Xóa hồ sơ nháp ${esc(b.no)}?</h3><p class="mut">Kế hoạch liên quan sẽ quay về trạng thái chưa lập.</p>`,()=>{S.bbnt=S.bbnt.filter(x=>x.id!==b.id);UI.sel=null;save();render()},'Xóa',true)},
  adhoc(){const opts=S.tasks.map(t=>`<option value="${t.id}">${esc(t.hm)} – ${esc(t.name)}</option>`).join('');
    modal(`<h3>Lập hồ sơ ngoài kế hoạch</h3><label class="f">Công việc nghiệm thu</label><select class="in" id="mT">${opts}</select><label class="f" style="margin-top:8px">Vị trí</label><input class="in" id="mZ" placeholder="VD: cột vách tầng 1 trục 1-2'/D' Block 4.5"><label class="f" style="margin-top:8px">Công tác (để trống = công tác mặc định của công việc)</label><input class="in" id="mN">`,()=>{
      const t=task($('#mT').value);if(!t)return false;const z=$('#mZ').value.trim();const b=newBbntObj(S,t.id,null,$('#mN').value.trim()||t.congTac||t.name,z);log(b,'Lập hồ sơ (ngoài kế hoạch)');S.bbnt.push(b);UI.sel=b.id;UI.doc='ntcv';resetF();
      if(UI.role!=='Thực hiện'){UI.role='Thực hiện';saveUI()}save();go('bbnt')},'Lập')},
  addPlan(){const opts=S.tasks.map(t=>`<option value="${t.id}">${esc(t.hm)} – ${esc(t.name)}</option>`).join('');const d=new Date();d.setDate(d.getDate()+1);d.setHours(8,0,0,0);
    modal(`<h3>Thêm kế hoạch nghiệm thu</h3><label class="f">Công việc</label><select class="in" id="mT">${opts}</select>
    <div class="row r2" style="margin-top:8px"><div><label class="f">Ngày giờ lần đầu</label><input class="in" type="datetime-local" id="mD" value="${toISO(d)}"></div><div><label class="f">Cách nhau (ngày)</label><input class="in" type="number" id="mK" value="2" min="0"></div></div>
    <label class="f" style="margin-top:8px">Vị trí – mỗi dòng tạo một lần nghiệm thu</label><textarea class="in" id="mZ" rows="4" placeholder="dầm sàn tầng 2 trục 1-5/B-D Block 4.5"></textarea>`,()=>{
      const t=task($('#mT').value);const z=$('#mZ').value.split('\n').map(s=>s.trim()).filter(Boolean);const k=+$('#mK').value||0;const dt=$('#mD').value;if(!t||!dt)return false;
      (z.length?z:['']).forEach((zz,i)=>S.plans.push({id:uid(),taskId:t.id,date:addDays(dt,i*k),zone:zz,title:`${t.congTac||t.name} ${zz}`.trim()}));save();render();toast(`Đã thêm ${Math.max(1,z.length)} lần nghiệm thu`)},'Thêm')},
  addHm(){S.hms.push({id:uid(),name:'Khu vực mới',code:'KV'});save();render()},
  addPerson(){S.people.push({id:uid(),name:'Người mới',org:'NTC',title:'',duty:'Thực hiện',sign:false});save();render()},
  addWbs(){S.wbs.push({id:uid(),code:'WBS-'+(S.wbs.length+1),name:'',hm:(S.hms[0]||{}).name||'',bm:'',unit:'',qty:0});save();render()},
  addTask(){const w=S.wbs[0]||{};S.tasks.unshift({id:uid(),wbs:w.code||'',name:'Công việc mới',hm:w.hm||(S.hms[0]||{}).name||'',bm:'',nhom:'',ck:'',itp:'',tpls:[],code:w.code||''});save();render()},
  addPay(){const n=S.payments.length+1;const L=S.payments[S.payments.length-1];
    const p={id:uid(),name:'Kỳ thanh toán số '+n,tasks:[]};if(L){payDef(L);['duAn','diaDiem','goiThau','contract'].forEach(k=>p[k]=L[k])}
    S.payments.push(p);save();render();payTaskModal(p.id)},
  payOk(id){const p=S.payments.find(x=>x.id===id);if(!p)return;p.status='approved';save();render();toast('Đã chốt '+p.name)},
  payTasks(id){payTaskModal(id)},
  ptAll(){document.querySelectorAll('#ptList .ptRow').forEach(r=>{if(r.style.display!=='none')r.querySelector('.ptk').checked=true})},
  ptNone(){document.querySelectorAll('#ptList .ptRow').forEach(r=>{if(r.style.display!=='none')r.querySelector('.ptk').checked=false})},
  ptOk(id){const p=S.payments.find(x=>x.id===id);if(!p)return;p.tasks=[...document.querySelectorAll('#ptList .ptk:checked')].map(x=>x.value);closeModal();save();render()},
  payUnlock(id){const p=S.payments.find(x=>x.id===id);if(!p)return;delete p.status;save();render()},
  payTn(id,el){const p=S.payments.find(x=>x.id===id);if(!p)return;p.tnFull=!!el.checked;save();render()},
  payOnly(id,el){const p=S.payments.find(x=>x.id===id);if(!p)return;p.onlySigned=!!el.checked;save();render()},
  payTog(id,el){const[pid,bid]=id.split(':');const p=S.payments.find(x=>x.id===pid);if(!p)return;payDef(p);p.excl=p.excl.filter(x=>x!==bid);if(!el.checked)p.excl.push(bid);save();render()},
  dmPrint(id){const p=S.payments.find(x=>x.id===id);if(!p)return;const R=dmRecs(payDef(p));if(!R.length){toast('Kỳ này chưa có hồ sơ');return}printPages(dmPages(p),dmName(p),{fill:false})},
  async dmWord(id){const p=S.payments.find(x=>x.id===id);if(!p)return;const R=dmRecs(payDef(p));if(!R.length){toast('Kỳ này chưa có hồ sơ');return}
    const html=dmTable(dmTitle(p)+DMHEAD+R.map((b,i)=>dmBlock(b,i+1,p)).join(''));if(!window.JSZip){saveFile(dmName(p)+'.html','<meta charset="utf-8">'+html);return}saveFile(dmName(p)+'.docx',await makeDocx(html))},
  dmXlsx(id){const p=S.payments.find(x=>x.id===id);if(!p)return;if(!window.XLSX){toast('Chưa tải được thư viện Excel');return}const R=dmRecs(payDef(p));
    const A=[['DANH MỤC HỒ SƠ QUẢN LÝ CHẤT LƯỢNG'],['DỰ ÁN: '+String(p.duAn).toUpperCase()],['ĐỊA ĐIỂM: '+String(p.diaDiem).toUpperCase()],['GÓI THẦU: '+String(p.goiThau).toUpperCase()],[],['THEO HỢP ĐỒNG: '+String(p.contract).toUpperCase()],['STT','Nội dung hồ sơ nghiệm thu','Số biên bản','Ngày']];const M=[0,1,2,3,4,5].map(r=>({s:{r,c:0},e:{r,c:3}}));
    R.forEach((b,i)=>{const r0=A.length;A.push([i+1,(String(b.title||'').trim()+' '+String(b.viTri||'').trim()).trim(),'','']);M.push({s:{r:r0,c:1},e:{r:r0,c:3}});
      dmRows(b,p).forEach(r=>A.push(['',r[0],r[1]||'',dd2(r[2])]));
      M.push({s:{r:r0,c:0},e:{r:A.length-1,c:0}})});
    const ws=XLSX.utils.aoa_to_sheet(A);ws['!merges']=M;ws['!cols']=[{wch:6},{wch:62},{wch:42},{wch:12}];const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Danh muc');
    saveFile(dmName(p)+'.xlsx',new Blob([XLSX.write(wb,{type:'array',bookType:'xlsx'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))},
  del(id){const[coll,rid]=id.split(':');
    const name={people:'người này',wbs:'dòng WBS này',tasks:'công việc này',plans:'kế hoạch này',hms:'khu vực này',payments:'kỳ thanh toán này',templates:'checklist này'}[coll]||'mục này';
    if(coll==='tasks'&&S.bbnt.some(b=>b.taskId===rid)){toast('Công việc đã có hồ sơ, không xóa được');return}
    if(coll==='templates'&&S.tasks.some(t=>(t.tpls||[]).includes(rid))){toast('Checklist đang được công việc sử dụng');return}
    modal(`<h3>Xóa ${name}?</h3>${coll==='tasks'?'<p class="mut">Các kế hoạch chưa lập của công việc này cũng bị xóa.</p>':''}`,()=>{S[coll]=S[coll].filter(x=>x.id!==rid);if(coll==='tasks')S.plans=S.plans.filter(p=>p.taskId!==rid);if(coll==='templates')UI.libSel=null;save();render()},'Xóa',true)},
  pasteWbs(){const rows=$('#pasteWbs').value.split('\n').map(r=>r.split('\t').map(s=>s.trim())).filter(r=>r[0]);let a=0,u=0;
    rows.forEach(r=>{const q=parseFloat(String(r[5]||'').replace(/\./g,'').replace(',','.'))||0;const ex=S.wbs.find(w=>w.code===r[0]);const o={code:r[0],name:r[1]||'',hm:r[2]||'',bm:r[3]||'',unit:r[4]||'',qty:q};if(ex){Object.assign(ex,o);u++}else{S.wbs.push({id:uid(),...o});a++}ensureHm(o.hm)});
    save();UI.inTab='wbs';render();toast(`Thêm ${a}, cập nhật ${u} dòng WBS`)},
  pasteTask(){const rows=$('#pasteTask').value.split('\n').map(r=>r.split('\t').map(s=>s.trim())).filter(r=>r[1]);
    rows.forEach(r=>{S.tasks.push({id:uid(),wbs:r[0],name:r[1],hm:r[2]||'',bm:'',nhom:'',congTac:r[3]||'',ck:'',itp:'',code:r[4]||r[0]||'',tpls:codesToTpls(r[5])});ensureHm(r[2])});
    save();UI.inTab='tasks';render();toast(`Đã thêm ${rows.length} công việc`)},
  word(id){exportWord(id==='all')},copyDoc(){copyDoc()},
  csvReg(){const L=S.bbnt.slice().sort((a,b)=>(a.start||'').localeCompare(b.start||''));
    const rows=[['STT','Ngày YCNT','Ngày nghiệm thu','Ngày checklist','Ngày lấy mẫu','Số YCNT','Số BBNT','Số checklist','Số BBLM','Vị trí','Công tác','Block','Bê tông','Bản vẽ số','Độ sụt','Giờ bắt đầu','Giờ kết thúc','Chỉ huy trưởng','Bên giao thầu','Giám sát hiện trường','TVGS','KL lý thuyết','KL thực tế','R7','R28','Kết luận','Trạng thái']].concat(L.map((b,i)=>{const t=task(b.taskId)||{};const n=k=>(sigP(b,k)||{}).name||'';return[i+1,fmtD(b.pycDate),fmtD(b.start),fmtD(b.clDate),b.docs.lm?fmtD(b.lmDate):'',b.pycNo,b.no,b.cls.map(c=>c.no).filter((x,j,a)=>a.indexOf(x)===j).join('; '),b.docs.lm?b.lmNo:'',b.viTri,b.title,(t.hm||'').replace('Block ',''),b.mac,b.banVe,b.doSut,hhmm(b.start),hhmm(b.end),n('CHT'),n('NTC'),n('NTP'),n('TVGS'),b.klLT,b.klTT,fmtD(b.r7),fmtD(b.r28),b.conclusion==='yes'?'Chấp thuận':b.conclusion==='no'?'Không đồng ý':'',ST[b.status].t]}));
    saveFile('So_theo_doi_ho_so_NT.csv',toCSV(rows))},
  csvPay(id){const p=S.payments.find(x=>x.id===id);const ap=S.bbnt.filter(b=>b.status==='approved'&&(b.start||b.created||'').slice(0,10)>=p.from&&(b.start||b.created||'').slice(0,10)<=p.to);
    const rows=[['Kỳ','Mã WBS','Tên công tác','ĐVT','KL dự toán','Số BB NTCV','Công việc','Vị trí','Ngày NT']].concat(ap.map(b=>{const t=task(b.taskId)||{};const W=S.wbs.find(w=>w.code===t.wbs)||{};return[p.name,t.wbs,W.name,W.unit,W.qty,b.no,b.title,b.viTri,fmtDT(b.start)]}));
    saveFile((p.name||'Ky').replace(/\s+/g,'_')+'.csv',toCSV(rows))},
  backup(){saveFile('HoSoNghiemThu_saoluu_'+nowISO().slice(0,10)+'.json',JSON.stringify(S,null,1))},
  async copyJson(){try{await navigator.clipboard.writeText(JSON.stringify(S));toast('Đã sao chép JSON')}catch(e){toast('Trình duyệt chặn sao chép')}},
  resetDemo(){modal('<h3>Nạp lại dữ liệu Block 4.5 ban đầu?</h3><p class="mut">Toàn bộ dữ liệu hiện tại sẽ bị thay thế. Nên sao lưu trước.</p>',()=>{S=buildDemo();UI.sel=null;save();go('dashboard')},'Nạp mẫu',true)},
  wipe(){modal('<h3>Xóa toàn bộ hồ sơ?</h3><p class="mut">Giữ thông tin dự án, nhân sự, khu vực, kho biểu mẫu. Xóa WBS, công việc, kế hoạch, hồ sơ và kỳ thanh toán.</p>',()=>{Object.assign(S,{wbs:[],tasks:[],plans:[],bbnt:[],payments:[]});UI.sel=null;save();go('input')},'Xóa',true)},
  mClose(){closeModal()},
  fsOpen(){fsOpen()},
  xlReload(){xlReloadPick()},
  async clUseLocal(){CLD.pendMeta=null;closeModal();S._rev=0;await clPush();toast('Đã dùng dữ liệu máy này cho mọi máy')},
  async clUseRemote(){const m=CLD.pendMeta;CLD.pendMeta=null;closeModal();if(m)await clPull(m);toast('Đã tải dữ liệu đồng bộ')},
  mOk(){if(modalOk&&modalOk()===false)return;closeModal()},
};
function ensureHm(n){if(n&&!S.hms.some(h=>h.name===n))S.hms.push({id:uid(),name:n,code:n.replace(/^Block\s*/i,'B').replace(/\s+/g,'').slice(0,6)})}
const toCSV=rows=>'﻿'+rows.map(r=>r.map(v=>{v=String(v??'');return /[",\n;]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(',')).join('\r\n');

/* =================== Tạo file Word (.docx) chuẩn =================== */
const DX={W:9638};
function dxEsc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
function dxSize(v,def){if(!v)return def;const m=String(v).match(/([\d.]+)\s*(pt|px)?/);if(!m)return def;const n=+m[1];return Math.round((m[2]==='px'?n*0.75:n)*2)}
function dxLen(v){if(!v)return 0;const m=String(v).match(/([\d.]+)\s*(pt|px|mm)?/);if(!m)return 0;const n=+m[1];return Math.round(m[2]==='pt'?n*20:m[2]==='mm'?n*56.7:n*15)}
function dxCtx(el,ctx){const st=el.style||{};const c=Object.assign({},ctx);const tg=el.tagName;
  if(tg==='B'||tg==='STRONG'||tg==='TH'||st.fontWeight==='bold'||+st.fontWeight>=600)c.b=true;
  if(tg==='I'||tg==='EM'||st.fontStyle==='italic')c.i=true;if(tg==='U'||/underline/.test(st.textDecoration||''))c.u=true;
  if(el.dataset){if(el.dataset.ln)c.ln=+el.dataset.ln;if(el.dataset.lnt)c.lnt=+el.dataset.lnt;if(el.dataset.sa)c.sa=+el.dataset.sa}
  if(st.fontSize)c.sz=dxSize(st.fontSize,c.sz);if(st.textAlign)c.al=st.textAlign;if(st.color&&/^(red|#c00|#d00|#f00|rgb\(2\d\d, 0, 0\))/.test(st.color))c.red=true;
  return c}
function dxRun(t,c){if(t==='')return'';const out=[];String(t).split(/([☐☑])/).forEach(p=>{if(!p)return;const sym=/[☐☑]/.test(p);
  out.push(`<w:r><w:rPr>${sym?'<w:rFonts w:ascii="Segoe UI Symbol" w:hAnsi="Segoe UI Symbol" w:cs="Segoe UI Symbol"/>':''}${c.b?'<w:b/><w:bCs/>':''}${c.i?'<w:i/><w:iCs/>':''}${c.u?'<w:u w:val="single"/>':''}${c.red?'<w:color w:val="C00000"/>':''}<w:sz w:val="${c.sz}"/><w:szCs w:val="${c.sz}"/></w:rPr><w:t xml:space="preserve">${dxEsc(p)}</w:t></w:r>`)});return out.join('')}
function dxPara(runs,c){const jc={center:'center',right:'right',justify:'both'}[c.al];
  return `<w:p><w:pPr><w:spacing w:before="${c.sb||0}" w:after="${c.tb?0:(c.sa??30)}" w:line="${c.tb?(c.lnt||240):(c.ln||252)}" w:lineRule="auto"/>${c.ind?`<w:ind w:left="${c.ind}"/>`:''}${jc?`<w:jc w:val="${jc}"/>`:''}<w:rPr><w:sz w:val="${c.sz}"/></w:rPr></w:pPr>${runs.join('')}</w:p>`}
function dxInline(el,c,runs){el.childNodes.forEach(n=>{if(n.nodeType===3){const t=n.nodeValue.replace(/\s+/g,' ');if(t)runs.push(dxRun(t,c))}
  else if(n.nodeType===1){if(n.tagName==='BR'){runs.push('<w:r><w:br/></w:r>')}else dxInline(n,dxCtx(n,c),runs)}})}
const DXBLOCK=new Set(['DIV','P','TABLE','H1','H2','H3']);
function dxBlocks(el,c){let res='',runs=[];
  const flush=()=>{while(runs.length&&/^<w:r><w:rPr>[^]*?<w:t xml:space="preserve"> <\/w:t><\/w:r>$/.test(runs[0]))runs.shift();if(runs.length)res+=dxPara(runs,c);runs=[]};
  el.childNodes.forEach(n=>{
    if(n.nodeType===3){const t=n.nodeValue.replace(/\s+/g,' ');if(t.trim()||runs.length)runs.push(dxRun(t,c));return}
    if(n.nodeType!==1)return;const tg=n.tagName;
    if(tg==='BR'){if(/page-break/.test(n.getAttribute('style')||'')){flush();res+='<w:p><w:pPr><w:pageBreakBefore/><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/><w:rPr><w:sz w:val="2"/></w:rPr></w:pPr></w:p>'}else runs.push('<w:r><w:br/></w:r>');return}
    if(tg==='TABLE'){flush();res+=dxTable(n,c);return}
    if(DXBLOCK.has(tg)){flush();const c2=dxCtx(n,c);const st=n.style;if(st.marginLeft)c2.ind=(c.ind||0)+dxLen(st.marginLeft);
      if(st.marginTop)c2.sb=dxLen(st.marginTop);const inner=dxBlocks(n,c2);res+=inner||(tg==='P'?dxPara([],c2):'');return}
    if([...n.querySelectorAll('div,p,table')].length){flush();res+=dxBlocks(n,dxCtx(n,c));return}
    dxInline(n,dxCtx(n,c),runs)});
  flush();return res}
function dxTable(t,c0){const c=dxCtx(t,c0);
  const rows=[...t.rows];const occ=rows.map(()=>[]);
  rows.forEach((tr,r)=>{let ci=0;[...tr.cells].forEach(td=>{while(occ[r][ci])ci++;const cs=td.colSpan||1,rs=td.rowSpan||1;
    for(let dr=0;dr<rs&&r+dr<rows.length;dr++)for(let dc=0;dc<cs;dc++)occ[r+dr][ci+dc]={td,top:dr===0,left:dc===0,cs,rs};ci+=cs})});
  const n=Math.max(...occ.map(o=>o.length));const tw=t.style.width&&/%/.test(t.style.width)?DX.W*parseFloat(t.style.width)/100:(t.style.width?dxLen(t.style.width):DX.W);
  const pct=v=>{if(!v)return null;if(/%/.test(v))return tw*parseFloat(v)/100;const l=dxLen(v);return l||null};
  let w=new Array(n).fill(null);const cols=t.querySelectorAll('col');
  if(cols.length===n)cols.forEach((col,i)=>w[i]=pct(col.style.width));
  occ.forEach(row=>row.forEach((o,i)=>{if(o&&o.cs===1&&w[i]==null&&o.td.style.width)w[i]=pct(o.td.style.width)}));
  const known=w.reduce((s,x)=>s+(x||0),0),miss=w.filter(x=>x==null).length;const rest=Math.max(300*miss,tw-known);w=w.map(x=>x==null?rest/(miss||1):x);
  const sc=tw/w.reduce((s,x)=>s+x,0);w=w.map(x=>Math.round(x*sc));
  const hasB=td=>/border/.test(td.getAttribute('style')||'');
  const bd='<w:tcBorders><w:top w:val="single" w:sz="4" w:color="000000"/><w:left w:val="single" w:sz="4" w:color="000000"/><w:bottom w:val="single" w:sz="4" w:color="000000"/><w:right w:val="single" w:sz="4" w:color="000000"/></w:tcBorders>';
  const tc=(o,cont)=>{const td=o.td;const span=w.slice(occ.find(r=>r.includes(o))?0:0,0);let wid=0;return{td}};
  let xml=`<w:tbl><w:tblPr><w:tblW w:w="${tw}" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="60" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="60" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${w.map(x=>`<w:gridCol w:w="${x}"/>`).join('')}</w:tblGrid>`;
  rows.forEach((tr,r)=>{const hgt=dxLen(tr.style.height)||0;xml+=`<w:tr>${hgt?`<w:trPr><w:trHeight w:val="${hgt}"/></w:trPr>`:''}`;let ci=0;
    while(ci<n){const o=occ[r][ci];
      if(!o){xml+=`<w:tc><w:tcPr><w:tcW w:w="${w[ci]}" w:type="dxa"/></w:tcPr><w:p/></w:tc>`;ci++;continue}
      const cw=w.slice(ci,ci+o.cs).reduce((s,x)=>s+x,0);const td=o.td;const st=td.style;
      const va={middle:'center',bottom:'bottom'}[st.verticalAlign]||(td.tagName==='TH'?'center':'top');
      const pr=`<w:tcPr><w:tcW w:w="${cw}" w:type="dxa"/>${o.cs>1?`<w:gridSpan w:val="${o.cs}"/>`:''}${o.rs>1?(o.top?'<w:vMerge w:val="restart"/>':'<w:vMerge/>'):''}${hasB(td)?bd:''}<w:vAlign w:val="${va}"/></w:tcPr>`;
      if(!o.top){xml+=`<w:tc>${pr}<w:p/></w:tc>`}
      else{const c2=dxCtx(td,Object.assign({},c,{tb:1,ind:0,al:td.tagName==='TH'?'center':(t.style.textAlign||'left'),sa:0}));if(td.tagName==='TH')c2.b=true;
        let inner=dxBlocks(td,c2);if(!inner)inner=dxPara([],c2);xml+=`<w:tc>${pr}${inner}</w:tc>`}
      ci+=o.cs}
    xml+='</w:tr>'});
  return xml+'</w:tbl><w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="60" w:lineRule="exact"/><w:rPr><w:sz w:val="4"/></w:rPr></w:pPr></w:p>'}
async function makeDocx(html){
  const d=new DOMParser().parseFromString('<!DOCTYPE html><html><body><div id="r">'+html+'</div></body></html>','text/html');
  const body=dxBlocks(d.getElementById('r'),{sz:24,al:'left'});
  const z=new JSZip();
  z.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>');
  z.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  z.file('word/_rels/document.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
  z.file('word/styles.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/></w:rPr></w:style><w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>');
  z.file('word/document.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="851" w:right="851" w:bottom="737" w:left="1417" w:header="425" w:footer="425" w:gutter="0"/></w:sectPr></w:body></w:document>`);
  return z.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}

/* =================== Files =================== */
let DL=null;
(async()=>{try{if(window.claude&&typeof window.claude.use==='function'){DL=await window.claude.use('downloads')}}catch(e){DL=null}})();
async function saveFile(name,data){
  if(DL){try{await DL.save({filename:name,data});toast('Đã tải '+name)}catch(e){if(e&&e.code==='declined')return;toast('Không tải được: '+((e&&(e.message||e.code))||'lỗi'))}return}
  try{const blob=data instanceof Blob?data:new Blob([data],{type:'application/octet-stream'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast('Đang tải '+name)}
  catch(e){toast('Trình duyệt chặn tải file ở chế độ này')}
}
function docHTML(b,keys){const body=keys.map((k,i)=>(i?'<br clear="all" style="page-break-before:always">':'')+buildDoc(b,k)).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(b.no)}</title><style>body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.3}p{margin:3pt 0}table{border-collapse:collapse}</style></head><body>${body}</body></html>`}
async function exportWord(all){
  const b=curB();if(!b)return;const v=validate(b);const keys=all?docList(b).map(d=>d[0]):[UI.doc];
  const fname=('HoSoNT_'+b.no.replace(/[\/\\]/g,'-')+(all?'':'_'+UI.doc)+(v.blocks.length&&b.status!=='approved'?'_NHAP':'')+'.docx');
  if(!window.JSZip){saveFile(fname.replace('.docx','.html'),docHTML(b,keys));return}
  const html=keys.map((k,i)=>(i?'<br clear="all" style="page-break-before:always">':'')+buildDoc(b,k)).join('');
  saveFile(fname,await makeDocx(html));
}
async function copyDoc(){
  const b=curB();if(!b)return;const html=docHTML(b,[UI.doc]);
  try{if(window.ClipboardItem&&navigator.clipboard.write){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([$('#a4').innerText],{type:'text/plain'})})]);toast('Đã sao chép – dán vào Word/Google Docs');return}}catch(e){}
  try{await navigator.clipboard.writeText($('#a4').innerText);toast('Đã sao chép dạng văn bản')}catch(e){toast('Trình duyệt chặn sao chép')}
}
function codesToTpls(str){return String(str||'').split(/[+,;\s]+/).map(c=>c.trim()).filter(Boolean).map(c=>(S.templates.find(t=>isCL(t)&&(t.code===c||t.id===c))||{}).id).filter(Boolean)}
/* ===== Cập nhật ngay từ file Excel (chọn file trên ổ Z:) ===== */
function xlCv(v){if(v==null)return'';if(v instanceof Date){if(v.getFullYear()<1901){const t=new Date(Math.round(v.getTime()/60000)*60000);return t.getHours()+'h'+String(t.getMinutes()).padStart(2,'0')}const t=new Date(v.getTime()+12*3600e3);return t.getDate()+'/'+(t.getMonth()+1)+'/'+t.getFullYear()}
  if(typeof v==='number'&&Number.isInteger(v))return v;if(typeof v==='string'&&v.startsWith('#'))return'';return v}
function xlSheetRows(ws){const rg=XLSX.utils.decode_range(ws['!ref']||'A1');const raw=XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:'',blankrows:true});return Array(rg.s.r).fill([]).concat(raw)}
function xlPours(ws){const out=[];const rows=xlSheetRows(ws);const dd=v=>{if(!(v instanceof Date)||v.getFullYear()<1901)return'';const t=new Date(v.getTime()+12*3600e3);return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0')};
  const tx=v=>{v=xlCv(v);return typeof v==='string'?v.trim():v};
  for(let i=1;i<rows.length;i++){const r=(rows[i]||[]).concat(Array(34).fill(''));if(!r[3]||!dd(r[1]))continue;
    out.push({row:i+1,stt:tx(r[0]),d:dd(r[1]),d2:dd(r[2]),desc:String(r[3]).split(/\s+/).join(' ').trim(),blk:tx(r[4]),tang:tx(r[5]),mac:tx(r[6]),klLT:tx(r[7]),klTT:tx(r[8]),ntp:tx(r[9]),tvgs:tx(r[10]),gs:tx(r[11]),mau:tx(r[12]),
      tBD:tx(r[13]),tKT:tx(r[14]),ncc:tx(r[15]),pp:tx(r[16]),doSut:tx(r[17]),r7:dd(r[18]),r28:dd(r[27])})}return out}
function xlReloadPick(){let inp=document.getElementById('xlReloadIn');if(!inp){inp=document.createElement('input');inp.type='file';inp.multiple=true;inp.accept='.xlsm,.xlsx';inp.id='xlReloadIn';inp.style.display='none';document.body.appendChild(inp);
    inp.onchange=()=>{const fs=[...inp.files];inp.value='';if(fs.length)xlReloadRun(fs)}}
  modal(`<h3>Cập nhật ngay từ Excel</h3><p>Chọn <b>file HSNT Block 4.5</b> (sheet DATA) và/hoặc <b>file theo dõi vật tư 4.5</b> (sheet Nhật ký đổ BT) trên ổ Z:. Giữ Ctrl để chọn cả hai file một lần.</p>`,()=>{inp.click()},'Chọn file')}
async function xlReloadRun(files){if(!window.XLSX){toast('Chưa tải được thư viện đọc Excel – kiểm tra mạng rồi thử lại');return}
  let ov=document.getElementById('pdfOv');if(!ov){ov=document.createElement('div');ov.id='pdfOv';document.body.appendChild(ov)}ov.style.display='flex';
  const msg=t=>ov.innerHTML=`<div class="box"><div class="spin"></div><div>${t}</div></div>`;const Y0=window.SYNC||{};let rows=null,pours=null,fn='',pfn='';
  try{for(const f of files){msg('Đang đọc '+esc(f.name)+'…');await new Promise(r=>setTimeout(r,30));const buf=await f.arrayBuffer();
      const names=XLSX.read(buf,{type:'array',bookSheets:true}).SheetNames;
      if(names.includes('DATA')){const wb=XLSX.read(buf,{type:'array',cellDates:true,sheets:['DATA']});rows=xlSheetRows(wb.Sheets.DATA).map(r=>{const x=(r||[]).slice(0,39).map(xlCv);while(x.length&&x[x.length-1]==='')x.pop();return x});fn=f.name}
      const pn=names.find(n=>/^nhật ký đổ bt/i.test(n.trim()));if(pn){const wb=XLSX.read(buf,{type:'array',cellDates:true,sheets:[pn]});pours=xlPours(wb.Sheets[pn]);pfn=f.name}}
    if(!rows&&!pours){toast('Không thấy sheet DATA hay sheet Nhật ký đổ BT trong file đã chọn');return}
    let add=0,upd=0,made=0;
    if(rows){const r=importDATA(S,rows,{update:true,status:'approved',colors:{}});add=r.added;upd=r.updated;S.syncInfo=Object.assign({},S.syncInfo||{},{file:fn,at:nowISO(),count:rows.filter((x,i)=>i>=24&&x.length>18&&String(x[18]).trim()).length,manual:true})}
    if(pours){const n0=S.bbnt.length;const Y=Object.assign({},Y0,{pours,pourFile:pfn});window.SYNC=Y;applyPours(Y);made=S.bbnt.length-n0;S.manualPours={at:nowISO(),file:pfn,pours}}
    if(FS_ON){if(Y0.stamp)S._syncStamp=String(Y0.stamp)}else try{if(Y0.stamp)localStorage.setItem(LS+'_sync',String(Y0.stamp))}catch(e){}
    save();render();toast(`Đã cập nhật từ Excel: thêm ${add}, cập nhật ${upd} dòng${pours?`; nhật ký đổ BT ${pours.length} lần${made?`, tạo ${made} hồ sơ mới`:''}`:''}`)}
  catch(e){console.error(e);toast('Không đọc được file: '+e.message)}finally{ov.style.display='none'}}
function importXlsx(e){const f=e.target.files[0];if(!f)return;
  if(!window.XLSX){toast('Chưa tải được thư viện đọc Excel – kiểm tra mạng rồi thử lại');return}
  const r=new FileReader();r.onload=()=>{try{
    const wb=XLSX.read(r.result,{type:'array',cellDates:true});const ws=wb.Sheets['DATA'];if(!ws){toast('Không thấy sheet DATA trong file');return}
    const rows=XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:''});
    const test=JSON.parse(JSON.stringify(S));const res=importDATA(test,rows);
    modal(`<h3>Nhập từ ${esc(f.name)}</h3><p>Tìm thấy <b>${res.added}</b> bộ hồ sơ mới${res.skipped?`, bỏ qua <b>${res.skipped}</b> dòng đã có (trùng số BBNT)`:''}.</p><p class="mut small">Hồ sơ nhập vào ở trạng thái “Đã duyệt”, ô Đạt/Không đạt để trống như bản in từ Excel.</p>`,
      ()=>{if(!res.added)return;const r2=importDATA(S,rows);save();go('register');toast(`Đã nhập ${r2.added} bộ hồ sơ`)},'Nhập');
  }catch(x){console.error(x);toast('Không đọc được file: '+x.message)}};r.readAsArrayBuffer(f);e.target.value=''}
function restore(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.project||!Array.isArray(d.bbnt))throw 0;
  modal(`<h3>Khôi phục dữ liệu?</h3><p>File có <b>${d.bbnt.length}</b> hồ sơ, <b>${(d.plans||[]).length}</b> kế hoạch. Dữ liệu hiện tại sẽ bị thay thế.</p>`,()=>{S=d;['hms','people','templates','wbs','tasks','plans','payments'].forEach(k=>S[k]=S[k]||[]);UI.sel=null;save();go('dashboard')},'Khôi phục',true)}catch(x){toast('File không đúng định dạng sao lưu')}};r.readAsText(f)}

/* =================== Binding =================== */
function onBind(el,evt){
  const v=el.type==='checkbox'?el.checked:el.value;const p=el.dataset.bind.split(':');const b=curB();
  if(p[0]==='p'){S.project[p[1]]=v;if(p[1]==='name'||p[1]==='hangMuc')renderTop()}
  else if(p[0]==='b'){if(!editable(b))return;b[p[1]]=v;if(p[1]==='title'){const t=$('#fTitle');if(t)t.textContent=v}}
  else if(p[0]==='bc'){if(!editable(b))return;b.cls[+p[1]].checks[+p[2]][p[3]]=v}
  else if(p[0]==='bcl'){if(!editable(b))return;b.cls[+p[1]].no=v}
  else if(p[0]==='sig'){if(!editable(b))return;b.sig=b.sig||{};b.sig[p[1]]=v}
  else if(p[0]==='ttpl'){const t=task(p[1]);if(t&&evt==='change'){t.tpls=codesToTpls(v);el.value=clCodes(t.tpls)}}
  else if(p[0]==='bx'){if(!editable(b))return;b[p[1]][p[2]]=v}
  else if(p[0]==='lr'){if(!editable(b))return;b.lm.rows[+p[1]][p[2]]=v}
  else if(p[0]==='bd'){if(!editable(b))return;b.docs[p[1]]=v;save();if(v)UI.doc=p[1];render();return}
  else if(p[0]==='row'){const r=(S[p[1]]||[]).find(x=>x.id===p[2]);if(!r)return;
    if(p[1]==='hms'&&p[3]==='name'){const old=r.name;S.tasks.forEach(t=>{if(t.hm===old)t.hm=v});S.wbs.forEach(w=>{if(w.hm===old)w.hm=v})}
    if(p[1]==='wbs'&&p[3]==='code'){const old=r.code;S.tasks.forEach(t=>{if(t.wbs===old)t.wbs=v})}
    r[p[3]]=el.dataset.num?(parseFloat(v)||0):v}
  else if(p[0]==='tgroups'){const t=tplOf(p[1]);if(t)t.groups=parseGroups(v)}
  save();
  if(UI.view==='bbnt'&&['b','bc','bx','lr','bcl','sig'].includes(p[0])){if(p[1]==='klTT'&&evt==='change'){render();return}refreshPreview();refreshValid();if(evt==='change'&&(p[1]==='no'||p[1]==='title')){const l=$('#bList');if(l)l.innerHTML=bListHTML()}}
  if(evt==='change'&&el.dataset.rr)render();
}
document.addEventListener('click',e=>{const td=e.target.closest&&e.target.closest('#dwrap td[data-ri]');
  if(td&&!e.target.closest('.xed')&&(XC[+td.dataset.ci]||[])[2]==='gidx'&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey){const b=xB(+td.dataset.ri);if(b){if(X.ed)xCommit(null);ACT.open(b.id);return}}
  if(td&&!e.target.closest('.xed')){if(X.ed)xCommit(null);xSelect(+td.dataset.ri,+td.dataset.ci,false,e.shiftKey?'shift':(e.ctrlKey||e.metaKey)?'ctrl':undefined);$('#dwrap').focus({preventScroll:true});return}
  if(X.ed&&!e.target.closest('.xed'))xCommit(null);
  const el=e.target.closest('[data-act]');if(!el)return;
  if(el.tagName==='INPUT'&&el.type==='checkbox'){ACT[el.dataset.act]&&ACT[el.dataset.act](el.dataset.id,el,e);return}
  if(el.disabled)return;const f=ACT[el.dataset.act];if(f)f(el.dataset.id,el,e)});
document.addEventListener('input',e=>{const el=e.target;
  if(el.dataset.bind&&el.type!=='checkbox'&&el.tagName!=='SELECT'&&el.type!=='date'&&el.type!=='datetime-local')onBind(el,'input');
  if(el.dataset.filter==='q'){UI.f.q=el.value;const l=$('#bList');if(l)l.innerHTML=bListHTML();
    clearTimeout(UI._qT);const qv=el.value.trim();if(/^\d+$/.test(qv))UI._qT=setTimeout(()=>{if(UI.f.q.trim()!==qv)return;const L=filteredB();if(L.length&&L[0].id!==UI.sel){UI.sel=L[0].id;render();const i=document.querySelector('[data-filter="q"]');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}}},400)}
  if(el.dataset.dq){UI.dq=el.value;clearTimeout(el._t);el._t=setTimeout(()=>{const pos=el.selectionStart;render();const n=document.querySelector('[data-dq]');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}},300)}
  if(el.dataset.pq){UI.planQ=el.value;clearTimeout(el._t);el._t=setTimeout(()=>{const pos=el.selectionStart;render();const n=document.querySelector('[data-pq]');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}},250)}
});
document.addEventListener('change',e=>{const el=e.target;
  if(el.dataset.g){const[id,k]=el.dataset.g.split(':');const b=S.bbnt.find(x=>x.id===id);if(b){gSet(b,k,el.value);save();const r=el.dataset.r,c=el.dataset.c;const act=document.activeElement&&document.activeElement.dataset.g;dRefreshRow(b);
    if(act===el.dataset.g){const n=document.querySelector(`[data-r="${r}"][data-c="${c}"]`);if(n)n.focus()}}return}
  if(el.dataset.df){UI[el.dataset.df]=el.value;render();return}
  if(el.dataset.bind)onBind(el,'change');
  if(el.dataset.filter&&el.dataset.filter!=='q'){UI.f[el.dataset.filter]=el.value;const l=$('#bList');if(l)l.innerHTML=bListHTML()}
});
$('#modalBg').addEventListener('click',e=>{if(e.target.id==='modalBg')closeModal()});
document.addEventListener('dblclick',e=>{const td=e.target.closest&&e.target.closest('#dwrap td[data-ri]');if(td&&!X.ed){xSelect(+td.dataset.ri,+td.dataset.ci,false);xEdit()}});
document.addEventListener('paste',xPaste);
document.addEventListener('keydown',e=>{if(xKey(e))return;const el=e.target;
  if(el.dataset&&el.dataset.g&&(e.key==='Enter'||(['ArrowDown','ArrowUp'].includes(e.key)&&!el.hasAttribute('list')))){
    e.preventDefault();const r=+el.dataset.r+(e.key==='ArrowUp'?-1:1),c=el.dataset.c;el.blur();
    setTimeout(()=>{const n=document.querySelector(`[data-r="${r}"][data-c="${c}"]`);if(n){n.focus();n.select&&n.select()}},0);return}
  if(e.key==='Escape')closeModal();if(e.key==='Enter'&&$('#modalBg').classList.contains('on')&&e.target.tagName==='INPUT')ACT.mOk()});
$('#selUser').addEventListener('change',e=>{UI.user=e.target.value;const p=me();if(p.duty)UI.role=p.duty;saveUI();render();toast(`Đang làm việc: ${p.name} – ${UI.role}`)});
$('#selRole').addEventListener('change',e=>{UI.role=e.target.value;saveUI();render()});
window.addEventListener('resize',()=>{if(UI.view==='bbnt'&&UI.autoFit!==false)ACT.zoom('fit',null,null,true)});
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(V[h]&&h!==UI.view){UI.view=h;render()}});
function postLoad(){S.bbnt.forEach(b=>{if(!b.sign){if(b.imported)sgDefaultImported(b);else b.sign={st:'chua'}}});try{sbtR28Fix()}catch(e){console.error(e)}try{applySync()}catch(e){console.error(e)}try{pUndoLegacy()}catch(e){console.error(e)}try{dst1Fix()}catch(e){console.error(e)}try{blankCompFix()}catch(e){console.error(e)}try{sbtDateFix()}catch(e){console.error(e)}try{sbtNoFix()}catch(e){console.error(e)}try{compOrder()}catch(e){console.error(e)}try{delDst1()}catch(e){console.error(e)}try{restoreGrp1()}catch(e){console.error(e)}}
(function(){CLD.boot=true;postLoad();try{if(!(window.claude&&window.claude.use))applySigns()}catch(e){console.error(e)}try{waitAuto()}catch(e){console.error(e)}const h=location.hash.slice(1);if(V[h])UI.view=h;if(!S.people.some(p=>p.id===UI.user)){const p=S.people.find(x=>x.duty==='Thực hiện')||S.people[0]||{};UI.user=p.id;UI.role=p.duty||'Thực hiện'}save();render();CLD.boot=false;cloudInit();fsInit()})();
