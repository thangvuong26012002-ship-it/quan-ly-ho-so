/* =================== Ghi DATA vào file Excel gốc (giữ nguyên mọi sheet, macro, định dạng) =================== */
const XP=(()=>{
const unx=s=>String(s).replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const enx=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const cN=s=>{let n=0;for(const ch of s)n=n*26+ch.charCodeAt(0)-64;return n};
const cL=n=>{let s='';while(n>0){const m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26)}return s};
const COLS=Array.from({length:39},(_,i)=>cL(i+1));
const norm=s=>String(s??'').replace(/\s+/g,' ').trim();
/* duyệt từng tham chiếu ô trong công thức (bỏ qua chuỗi "...") */
const REF=/((?:'(?:[^']|'')+'|[A-Za-z_\u00C0-\u1EF9][\w.\u00C0-\u1EF9]*)!)?(\$?)([A-Z]{1,3})(\$?)(\d+)(?::(\$?)([A-Z]{1,3})(\$?)(\d+))?/g;
function mapRefs(f,cb){let out='',i=0;const parts=f.split('"');
  return parts.map((p,k)=>k%2?p:p.replace(REF,(m,pre,a1,c1,a2,r1,b1,c2,b2,r2,off,str)=>{
    const prev=str[off-1];if(prev&&/[A-Za-z0-9_.]/.test(prev)&&!pre)return m;
    const next=str[off+m.length];if(next==='(')return m;
    const sh=pre?unx(pre.slice(0,-1)).replace(/^'|'$/g,'').replace(/''/g,"'"):null;
    const one=(ca,c,ra,r)=>{const o=cb(sh,{ca:!!ca,c:cN(c),ra:!!ra,r:+r});return (o.ca?'$':'')+cL(o.c)+(o.ra?'$':'')+o.r};
    return (pre||'')+one(a1,c1,a2,r1)+(c2?':'+one(b1,c2,b2,r2):'')})).join('"')}
const relShift=(f,dr,dc)=>mapRefs(f,(sh,x)=>({ca:x.ca,c:x.ca?x.c:x.c+dc,ra:x.ra,r:x.ra?x.r:x.r+dr}));
const cellRe=/<c r="([A-Z]+)(\d+)"([^>]*?)(\/>|>([\s\S]*?)<\/c>)/g;
const attr=(a,n)=>{const m=a.match(new RegExp('\\b'+n+'="([^"]*)"'));return m?m[1]:null};
function parseRow(xml){const cells={};let m;cellRe.lastIndex=0;
  while((m=cellRe.exec(xml))){const inner=m[5]||'';const f=inner.match(/<f\b([^>]*?)(?:\/>|>([\s\S]*?)<\/f>)/);
    cells[m[1]]={c:m[1],s:attr(m[3],'s'),t:attr(m[3],'t'),f:f?{attrs:f[1],text:f[2]!=null?unx(f[2]):null}:null,v:(inner.match(/<v>([\s\S]*?)<\/v>/)||[])[1],is:(inner.match(/<is>([\s\S]*?)<\/is>/)||[])[1],raw:m[0]}}
  return cells}
/* bỏ "shared formula": viết công thức đầy đủ vào từng ô để có thể chèn dòng */
function unshare(xml,onlyIf){const M={};let m;const re=/<c r="([A-Z]+)(\d+)"[^>]*?>\s*<f\b([^>]*?t="shared"[^>]*?[^\/])>([\s\S]*?)<\/f>/g;
  while((m=re.exec(xml))){const si=attr(m[3],'si');if(si!=null&&attr(m[3],'ref'))M[si]={c:cN(m[1]),r:+m[2],text:unx(m[4])}}
  const want=Object.keys(M).filter(si=>!onlyIf||onlyIf(M[si].text));if(!want.length)return xml;const W=new Set(want);
  return xml.replace(/<c r="([A-Z]+)(\d+)"([^>]*?)>(\s*)<f\b([^>]*?)(\/>|>([\s\S]*?)<\/f>)/g,(all,c,r,a,ws,fa,end,txt)=>{
    if(!/t="shared"/.test(fa))return all;const si=attr(fa,'si');if(!W.has(si))return all;const ms=M[si];
    const text=relShift(ms.text,+r-ms.r,cN(c)-ms.c);const keep=fa.replace(/\s*\b(t|ref|si)="[^"]*"/g,'');
    return `<c r="${c}${r}"${a}>${ws}<f${keep}>${enx(text)}</f>`})}
function shiftFormulasIn(xml,sheetName,isData,fm){
  return xml.replace(/<(f|formula|formula1|formula2|xm:f)\b((?:[^>\/]|\/(?!>))*)>([\s\S]*?)<\/\1>/g,(all,tag,a,txt)=>{
    if(!txt||(!isData&&!/DATA!/i.test(txt)))return all;
    const t=mapRefs(unx(txt),(sh,x)=>{const tgt=sh==null?(isData?'DATA':sheetName):sh;if(tgt!=='DATA'||x.r<1)return x;return {...x,r:fm(x.r)}});
    let a2=a;if(isData&&/\bref="/.test(a))a2=a.replace(/ref="([^"]*)"/,(q,r)=>'ref="'+shiftRange(r,fm)+'"');
    return `<${tag}${a2}>${enx(t)}</${tag}>`})}
const shiftRange=(r,fm)=>r.replace(/([A-Z]+)(\d+)/g,(m,c,n)=>c+fm(+n));
/* kiểu ô có tô màu (vàng = đã ký, xanh = đang trình) */
function styler(st){let fills=st.match(/<fills count="(\d+)">([\s\S]*?)<\/fills>/);let xfs=st.match(/<cellXfs count="(\d+)">([\s\S]*?)<\/cellXfs>/);
  const fillList=fills[2].match(/<fill>[\s\S]*?<\/fill>|<fill\/>/g);const xfList=xfs[2].match(/<xf\b[^>]*\/>|<xf\b[^>]*>[\s\S]*?<\/xf>/g);
  const fid={},cache={};const getFill=rgb=>{if(fid[rgb]!=null)return fid[rgb];
    let i=fillList.findIndex(f=>new RegExp('patternType="solid"[\\s\\S]*fgColor rgb="'+rgb+'"').test(f));
    if(i<0){fillList.push(`<fill><patternFill patternType="solid"><fgColor rgb="${rgb}"/><bgColor indexed="64"/></patternFill></fill>`);i=fillList.length-1}return fid[rgb]=i};
  return{style(s,rgb){const k=s+'|'+rgb;if(cache[k]!=null)return cache[k];const f=getFill(rgb);const base=xfList[+s||0];
      const cur=attr(base,'fillId');if(cur!=null&&+cur===f)return cache[k]=String(+s||0);
      let x=base.replace(/\bfillId="\d+"/,`fillId="${f}"`);if(!/fillId=/.test(x))x=x.replace('<xf ',`<xf fillId="${f}" `);
      x=/applyFill=/.test(x)?x.replace(/applyFill="\d"/,'applyFill="1"'):x.replace('<xf ','<xf applyFill="1" ');
      xfList.push(x);return cache[k]=String(xfList.length-1)},
    out(){return st.replace(fills[0],`<fills count="${fillList.length}">${fillList.join('')}</fills>`).replace(xfs[0],`<cellXfs count="${xfList.length}">${xfList.join('')}</cellXfs>`)}}}
const serial=iso=>{const m=String(iso||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?Math.round((Date.UTC(+m[1],+m[2]-1,+m[3])-Date.UTC(1899,11,30))/864e5):null};
const tnorm=s=>{const m=String(s||'').match(/^\s*0*(\d{1,2})\s*h\s*(\d{1,2})\s*$/i);return m?(+m[1])+'h'+String(+m[2]).padStart(2,'0'):norm(s)};
function cellXml(ref,s,val){const sa=s!=null?` s="${s}"`:'';
  if(val==null||val==='')return `<c r="${ref}"${sa}/>`;
  if(typeof val==='object'&&val.d!=null)return `<c r="${ref}"${sa}><v>${val.d}</v></c>`;
  if(typeof val==='number')return `<c r="${ref}"${sa}><v>${val}</v></c>`;
  return `<c r="${ref}"${sa} t="inlineStr"><is><t xml:space="preserve">${enx(val)}</t></is></c>`}
/* recs: [{id,no,vt,sec,isNew,vals[39],sign}] ; trả về {zip, report} */
async function patch(zip,recs){
  const R={updCells:0,updRows:0,ins:0,color:0,skipped:[],newSec:[]};
  const wbx=await zip.file('xl/workbook.xml').async('string');const rels=await zip.file('xl/_rels/workbook.xml.rels').async('string');
  const shs=[...wbx.matchAll(/<sheet [^>]*name="([^"]*)"[^>]*r:id="([^"]*)"/g)].map(m=>{const t=(rels.match(new RegExp('Id="'+m[2]+'"[^>]*Target="([^"]*)"'))||rels.match(new RegExp('Target="([^"]*)"[^>]*Id="'+m[2]+'"'))||[])[1];return{name:unx(m[1]),path:'xl/'+String(t).replace(/^\/?xl\//,'')}});
  const D=shs.find(s=>s.name==='DATA');if(!D)throw new Error('File không có sheet DATA');
  const sstX=zip.file('xl/sharedStrings.xml')?await zip.file('xl/sharedStrings.xml').async('string'):'';
  const SST=(sstX.match(/<si>[\s\S]*?<\/si>/g)||[]).map(si=>unx((si.match(/<t[^>]*>[\s\S]*?<\/t>/g)||[]).map(t=>t.replace(/<[^>]+>/g,'')).join('')));
  const styX=await zip.file('xl/styles.xml').async('string');const ST=styler(styX);
  let x=await zip.file(D.path).async('string');
  const i0=x.indexOf('<sheetData>'),i1=x.indexOf('</sheetData>');let head=x.slice(0,i0),body=x.slice(i0+11,i1),tail=x.slice(i1);
  let rows=[...body.matchAll(/<row r="(\d+)"[^>]*?(?:\/>|>[\s\S]*?<\/row>)/g)].map(m=>({r:+m[1],xml:m[0]}));
  const val=c=>{if(!c)return '';if(c.t==='s')return SST[+c.v]??'';if(c.t==='inlineStr')return unx((c.is||'').replace(/<[^>]+>/g,''));if(c.v==null)return '';if(c.t==='str'||c.t==='e')return unx(c.v);return +c.v};
  /* nhận diện dòng dữ liệu / dòng tiêu đề nhóm */
  const info=rows.map(o=>{const C=parseRow(o.xml);const S_=norm(val(C.S)),T_=norm(val(C.T));const A_=norm(val(C.A));
    return {...o,C,data:o.r>=22&&!!S_,T:T_||S_.replace(/YCNT$/,'BBNT'),W:norm(val(C.W)),head:o.r>=22&&!S_&&A_&&isNaN(+A_)?A_:null}});
  let sec='';info.forEach(o=>{if(o.head)sec=o.head;o.sec=sec});
  const key=(n,w)=>norm(n)+'|'+norm(w);const byKey={},byNo={};
  info.filter(o=>o.data).forEach(o=>{(byKey[key(o.T,o.W)]=byKey[key(o.T,o.W)]||[]).push(o);(byNo[norm(o.T)]=byNo[norm(o.T)]||[]).push(o)});
  const used=new Set();const ins=[];
  const DATECOL=new Set([2,6,10,14,37,38]);
  recs.forEach(rc=>{let o=(byKey[key(rc.no,rc.vt)]||[]).find(z=>!used.has(z));if(!o){const L=(byNo[norm(rc.no)]||[]).filter(z=>!used.has(z));if(L.length===1&&!rc.isNew)o=L[0]}
    if(!o){if(rc.isNew)ins.push(rc);else R.skipped.push(rc.no);return}used.add(o);
    let changed=false;const C=o.C;
    rc.vals.forEach((v,i)=>{const col=COLS[i];if(i===0||i===1||(i%4!==2&&i>=3&&i<=17))return;const c=C[col];if(c&&c.f)return;
      if(v==null||v===''||(typeof v==='object'&&v.d==null))return;
      const cur=val(c);if((i===14||i===30)&&(cur===''||cur==null))return;let same;
      if(typeof v==='object')same=typeof cur==='number'&&Math.round(cur)===v.d;
      else if(typeof v==='number')same=typeof cur==='number'?Math.abs(cur-v)<1e-6:Math.abs(parseFloat(String(cur).replace(',','.'))-v)<1e-6;
      else if(i>=28&&i<=30)same=tnorm(cur)===tnorm(v);
      else same=norm(cur)===norm(v);
      if(same)return;
      const ref=col+o.r;const nx=cellXml(ref,c?c.s:null,v);(R.log=R.log||[]).push([ref,cur,v]);
      if(c)o.xml=o.xml.replace(c.raw,nx);else o.xml=insertCell(o.xml,col,nx);C[col]={...(C[col]||{}),raw:nx,s:c?c.s:null};changed=true;R.updCells++});
    if(rc.sign==='ky'||rc.sign==='trinh'){const rgb=rc.sign==='ky'?'FFFFFF00':'FF00B0F0';
      ['S','T'].forEach(col=>{const c=C[col];if(!c)return;const ns=ST.style(c.s||'0',rgb);if(ns===(c.s||'0'))return;
        const nx=c.raw.replace(/^<c r="([A-Z]+\d+)"(\s+s="\d+")?/,`<c r="$1" s="${ns}"`);o.xml=o.xml.replace(c.raw,nx);C[col]={...c,raw:nx,s:ns};changed=true;R.color++})}
    if(changed)R.updRows++});
  /* chèn dòng mới vào cuối nhóm công việc tương ứng */
  let maxR=Math.max(...info.map(o=>o.r));
  const plan=[];/* {after:r, rows:[rec], tpl:infoRow, newHead?} */
  ins.forEach(rc=>{const sRows=info.filter(o=>o.data&&norm(o.sec)===norm(rc.sec));
    if(sRows.length){const last=sRows[sRows.length-1];let p=plan.find(q=>q.after===last.r);if(!p)plan.push(p={after:last.r,rows:[],tpl:last});p.rows.push(rc)}
    else{const tpl=info.filter(o=>o.data).pop();let p=plan.find(q=>q.sec===rc.sec);if(!p){const hd=info.filter(o=>o.head).pop();plan.push(p={after:maxR,rows:[],tpl,sec:rc.sec,hd});R.newSec.push(rc.sec)}p.rows.push(rc)}});
  if(plan.length){
    plan.sort((a,b)=>a.after-b.after);plan.forEach(p=>p.n=p.rows.length+(p.hd?1:0));
    const fm=r=>{let s=0;for(const p of plan)if(r>p.after)s+=p.n;return r+s};
    /* bỏ shared formula ở DATA và ở các sheet khác có trỏ tới DATA */
    let bodyX=info.map(o=>o.xml).join('');bodyX=unshare(bodyX);
    /* đánh số lại dòng + công thức của DATA */
    bodyX=bodyX.replace(/<row r="(\d+)"/g,(m,r)=>`<row r="${fm(+r)}"`).replace(/<c r="([A-Z]+)(\d+)"/g,(m,c,r)=>`<c r="${c}${fm(+r)}"`);
    bodyX=shiftFormulasIn(bodyX,'DATA',true,fm);
    /* tạo dòng mới */
    const rowsNew=[...bodyX.matchAll(/<row r="(\d+)"[^>]*?(?:\/>|>[\s\S]*?<\/row>)/g)].map(m=>({r:+m[1],xml:m[0]}));
    plan.forEach(p=>{const tN=fm(p.tpl.r);const tplX=(rowsNew.find(o=>o.r===tN)||{}).xml;const tc=parseRow(tplX);let at=fm(p.after)+1;const add=[];
      if(p.hd){const hx=(rowsNew.find(o=>o.r===fm(p.hd.r))||{}).xml;const hc=parseRow(hx);let h=hx.replace(/<row r="\d+"/,`<row r="${at}"`).replace(/<c r="([A-Z]+)\d+"/g,`<c r="$1${at}"`);
        h=h.replace(/<c r="A\d+"[^>]*?(?:\/>|>[\s\S]*?<\/c>)/,cellXml('A'+at,hc.A?hc.A.s:null,p.sec));add.push({r:at,xml:h,merge:`A${at}:AM${at}`});at++}
      let stt=+val(tc.A)||0;
      p.rows.forEach(rc=>{const nr=at++;stt++;const d=nr-tN;
        const cells=COLS.map((col,i)=>{const c=tc[col];const s=c?c.s:null;
          const keepF=c&&c.f&&c.f.text!=null&&(i===1||(i>=3&&i<=17&&i%4!==2)||rc.vals[i]==null||rc.vals[i]==='');
          if(keepF){const f=relShift(c.f.text,d,0);return `<c r="${col}${nr}"${s!=null?` s="${s}"`:''}${c.t==='str'?' t="str"':''}><f>${enx(f)}</f></c>`}
          if(i===0)return cellXml(col+nr,s,stt);
          if(i>=3&&i<=17&&i%4!==2)return cellXml(col+nr,s,'');
          let v=rc.vals[i];let ss=s;if((i===18||i===19)&&(rc.sign==='ky'||rc.sign==='trinh'))ss=ST.style(s||'0',rc.sign==='ky'?'FFFFFF00':'FF00B0F0');
          return cellXml(col+nr,ss,v)});
        const extra=Object.keys(tc).filter(k=>cN(k)>39).map(k=>{const c=tc[k];return c.s!=null?`<c r="${k}${nr}" s="${c.s}"/>`:''}).join('');
        const rowOpen=tplX.match(/^<row\b[^>]*>/)[0].replace(/r="\d+"/,`r="${nr}"`);
        add.push({r:nr,xml:rowOpen+cells.join('')+extra+'</row>'});R.ins++});
      p.add=add});
    /* ghép lại theo thứ tự dòng */
    const all=rowsNew.concat(...plan.map(p=>p.add)).sort((a,b)=>a.r-b.r);body=all.map(o=>o.xml).join('');
    /* phần còn lại của sheet DATA */
    const mergesNew=plan.flatMap(p=>p.add.filter(a=>a.merge).map(a=>a.merge));
    tail=tail.replace(/<mergeCell ref="([^"]*)"\/>/g,(m,r)=>`<mergeCell ref="${shiftRange(r,fm)}"/>`);
    if(mergesNew.length)tail=tail.replace(/<mergeCells count="(\d+)">/,(m,n)=>`<mergeCells count="${+n+mergesNew.length}">`+mergesNew.map(r=>`<mergeCell ref="${r}"/>`).join(''));
    tail=tail.replace(/(<(?:autoFilter|conditionalFormatting|dataValidation|selection)\b[^>]*\b(?:ref|sqref)=")([^"]*)"/g,(m,a,r)=>a+shiftRange(r,fm)+'"');
    tail=tail.replace(/(<xdr:row>)(\d+)(<\/xdr:row>)/g,(m,a,r,b)=>a+(fm(+r+1)-1)+b);
    head=head.replace(/<dimension ref="([^"]*)"/,(m,r)=>`<dimension ref="${shiftRange(r,fm)}"`).replace(/topLeftCell="([A-Z]+)(\d+)"/g,(m,c,r)=>`topLeftCell="${c}${fm(+r)}"`).replace(/(sqref|activeCell)="([^"]*)"/g,(m,a,r)=>a+'="'+shiftRange(r,fm)+'"');
    tail=shiftFormulasIn(tail,'DATA',true,fm);
    /* sheet khác */
    for(const s of shs){if(s===D||!zip.file(s.path))continue;let y=await zip.file(s.path).async('string');if(!/DATA!/i.test(y))continue;
      y=unshare(y,t=>/DATA!/i.test(t));y=shiftFormulasIn(y,s.name,false,fm);zip.file(s.path,y)}
    let wb2=wbx.replace(/(<definedName\b[^>]*>)([^<]*)(<\/definedName>)/g,(m,a,t,b)=>/DATA!/.test(t)?a+enx(mapRefs(unx(t),(sh,x2)=>sh==='DATA'?{...x2,r:fm(x2.r)}:x2))+b:m);
    /* bản vẽ / nút bấm trên sheet DATA */
    const drel=zip.file(D.path.replace(/worksheets\/(sheet\d+\.xml)$/,'worksheets/_rels/$1.rels'));
    if(drel){const rx=await drel.async('string');for(const m of rx.matchAll(/Target="\.\.\/drawings\/([^"]+)"/g)){const p='xl/drawings/'+m[1];const z=zip.file(p);if(!z)continue;let y=await z.async('string');
      if(/\.vml$/.test(p))y=y.replace(/(<x:Anchor>)([^<]*)(<\/x:Anchor>)/g,(q,a,t,b)=>{const v=t.split(',').map(s=>s.trim());[2,6].forEach(k=>{v[k]=String(fm(+v[k]+1)-1)});return a+v.join(', ')+b});
      else y=y.replace(/(<xdr:row>)(\d+)(<\/xdr:row>)/g,(q,a,r,b)=>a+(fm(+r+1)-1)+b);zip.file(p,y)}}
    zip.file('xl/workbook.xml',wb2.replace(/<calcPr\b([^>]*?)\/>/,(m,a)=>`<calcPr${a.replace(/\s*fullCalcOnLoad="\d"/,'')} fullCalcOnLoad="1"/>`));
  }else{body=info.map(o=>o.xml).join('');
    if(R.updCells||R.color){const w=await zip.file('xl/workbook.xml').async('string');zip.file('xl/workbook.xml',w.replace(/<calcPr\b([^>]*?)\/>/,(m,a)=>`<calcPr${a.replace(/\s*fullCalcOnLoad="\d"/,'')} fullCalcOnLoad="1"/>`))}}
  zip.file(D.path,head+'<sheetData>'+body+tail);
  zip.file('xl/styles.xml',ST.out());
  if(plan.length&&zip.file('xl/calcChain.xml')){zip.remove('xl/calcChain.xml');
    zip.file('xl/_rels/workbook.xml.rels',(await zip.file('xl/_rels/workbook.xml.rels').async('string')).replace(/<Relationship [^>]*calcChain[^>]*\/>/,''));
    zip.file('[Content_Types].xml',(await zip.file('[Content_Types].xml').async('string')).replace(/<Override [^>]*calcChain[^>]*\/>/,''))}
  return R}
function insertCell(rowXml,col,nx){const n=cN(col);const re=/<c r="([A-Z]+)\d+"/g;let m,pos=-1;while((m=re.exec(rowXml))){if(cN(m[1])>n){pos=m.index;break}}
  if(pos<0)return rowXml.replace(/<\/row>$/,nx+'</row>').replace(/^(<row\b[^>]*)\/>$/,'$1>'+nx+'</row>');return rowXml.slice(0,pos)+nx+rowXml.slice(pos)}
return{patch,serial,mapRefs,relShift}})();
if(typeof module!=='undefined')module.exports=XP;
