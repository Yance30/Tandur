/* Alur demo terpadu. Semua layar operasional membaca draf atau salinan usulan
   yang sama. Data disimpan pada browser; tidak ada pengiriman ke server. */
const DEMO_KEY = 'tandur-demo-v2';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone = value => JSON.parse(JSON.stringify(value));
const BIAYA_DEMO = [
  ['Benih',360000,360000],['Pupuk',1250000,1250000],['Pestisida',450000,450000],
  ['Tenaga kerja',2125036,1235715],['BBM',280000,280000],['Air / listrik',150000,150000],
  ['Sewa lahan',1200000,900000],['Lainnya',300000,300000]
];
function workflowAwal() {
  return {
    petani: { nama:'Sutrisno (contoh)', desa:'Sumberarum', luas:0.4, Q:1854, R:200, L:0,
      sendiri:150000, persetujuan:false, tanggal:'2027-05-20', lokasi:'Gudang Sumberarum', biaya:clone(BIAYA_DEMO) },
    bukti:[], hasil:null, usulan:null, versi:[], tahap:'draf', alasan:'', dibaca:false,
    jawaban:[null,null,null,null,null], ttd:false, bayar:false, serah:null,
    keberatan:'', penyelesaian:'', pesan:'', form:{}, keputusanBukti:false
  };
}
const muatAwal = muatState;
muatState = function () {
  muatAwal();
  STATE.workflow = workflowAwal();
  STATE.log = []; STATE.jejak = [];
};
muatState();
let masalahSimpan = '';
function stateDemoValid(s) {
  const w=s?.workflow, p=w?.petani;
  const validParameter=x=>x && typeof x.versi==='string' && Number.isFinite(x.wMin) && x.wMin>0 && Number.isFinite(x.mMin) && x.mMin>0;
  const validInput=x=>x && ['q','ps','ph','pj','b'].every(k=>Number.isFinite(x[k])) && x.q>0 && x.ps>0 && x.ph>0 && x.pj>0 && x.b>=0;
  const validPetani=x=>x && ['nama','desa','tanggal','lokasi'].every(k=>typeof x[k]==='string') &&
    ['Q','R','L','sendiri','luas'].every(k=>Number.isFinite(x[k])) && Array.isArray(x.biaya) && x.biaya.length===8 &&
    x.biaya.every(r=>Array.isArray(r) && typeof r[0]==='string' && Number.isFinite(r[1]) && Number.isFinite(r[2]));
  const validSnap=x=>!x || (validInput(x.input) && validPetani(x.petani) && validParameter(x.parameter) &&
    x.konteks && ['Q','C','K','R','L'].every(k=>Number.isFinite(x.konteks[k])));
  return validPetani(p) && validInput(s.simulasi) && validParameter(s.param?.aktif) && validParameter(s.param?.usulan) &&
    Array.isArray(s.users) && Array.isArray(s.log) && Array.isArray(s.jejak) &&
    Array.isArray(w.bukti) && w.bukti.every(b=>typeof b.id==='string' && typeof b.data==='string' && typeof b.nama==='string' && Number.isFinite(b.size)) &&
    Array.isArray(w.jawaban) && w.jawaban.length===5 && w.form && typeof w.form==='object' &&
    Array.isArray(w.versi) && w.versi.every(validSnap) && validSnap(w.hasil) && validSnap(w.usulan) &&
    ['draf','diajukan','perbaikan','ditolak','disetujui','ditandatangani','dibayar','penyerahan','selesai'].includes(w.tahap) &&
    (w.tahap==='draf' || !!w.usulan);
}
try {
  const saved = JSON.parse(localStorage.getItem(DEMO_KEY) || 'null');
  if (saved && saved.version === 2 && stateDemoValid(saved.state)) {
    STATE = saved.state;
  } else if (saved) masalahSimpan = 'Data tersimpan tidak sesuai versi demo. Sesi ini memakai data awal.';
} catch (_) { masalahSimpan = 'Data tersimpan tidak dapat dibaca. Sesi ini memakai data awal.'; }
function simpanDemo() {
  try { localStorage.setItem(DEMO_KEY, JSON.stringify({ version:2, state:STATE })); masalahSimpan = ''; return true; }
  catch (_) { masalahSimpan = 'Penyimpanan browser penuh atau tidak tersedia. Perubahan hanya bertahan di sesi ini. Unduh cadangan data.'; return false; }
}
const wf = () => STATE.workflow;
const bolehEdit = () => ['draf','perbaikan','ditolak'].includes(wf().tahap);
function konteksPetani(p = wf().petani) {
  const C = p.biaya.reduce((n,r) => n+r[1],0), tunai = p.biaya.reduce((n,r) => n+r[2],0);
  return { Q:p.Q, C, K:Math.max(0,tunai-p.sendiri), R:p.R, L:p.L };
}
function snapshotDraf() { return { input:clone(STATE.simulasi), konteks:konteksPetani(), petani:clone(wf().petani), parameter:clone(STATE.param.aktif) }; }
function akadKini() { return wf().usulan || snapshotDraf(); }
function uji(snap, scen) { return hitungSimulasi(snap.input,snap.parameter,scen,snap.konteks); }
function buktiAda(jenis) { return wf().bukti.some(b=>b.jenis===jenis); }
const JENIS_BUKTI = { data:'Persetujuan data', panen:'Riwayat panen', biaya:'Dasar biaya', cadangan:'Cadangan / komitmen', tanda:'Tanda tangan', bayar:'Pembayaran', serah:'Timbang dan mutu' };
const buktiDasar = () => ['data','panen','biaya','cadangan'].every(buktiAda);
const judulTahap = () => ({draf:'Draf',diajukan:'Menunggu manajer',perbaikan:'Perbaikan diminta',ditolak:'Ditolak',disetujui:'Disetujui',ditandatangani:'Ditandatangani',dibayar:'Pembayaran dicatat',penyerahan:'Serah terima ditinjau',selesai:'Selesai'}[wf().tahap]);
function catatWorkflow(peristiwa, rincian) {
  tambahJejak(peristiwa,esc(rincian)); catatLog(peristiwa,esc(rincian));
}
function selesaiAksi(pesan, tujuan) {
  const saved = simpanDemo();
  if (tujuan && location.hash !== '#'+tujuan) location.hash=tujuan; else render();
  toast(saved ? pesan : masalahSimpan, saved?'ok':'gagal');
}
function gagal(pesan) { toast(pesan,'gagal'); return false; }
function field(key,label,value,type='text',extra='') {
  return '<div class="field"><label for="wf-'+key+'">'+label+'</label><input id="wf-'+key+'" name="'+key+'" type="'+type+'" value="'+esc(value)+'" '+extra+'></div>';
}
function tombol(action,label,disabled=false,extra='') {
  return '<button class="btn '+(disabled?'btn-off':'btn-primary')+'" data-aksi="'+action+'" '+extra+(disabled?' disabled':'')+'>'+label+'</button>';
}
const tautan = (href,label) => '<a class="btn btn-ghost" href="#'+href+'">'+label+'</a>';
function pageWorkflow(role,title,body,active) {
  return shell(role,active || '#/'+role+'/'+(role==='petugas'?'calon-kontrak':role==='manajer'?'antrean':'arsip'),
    '<h1 class="page">'+title+'</h1><p class="sub">'+ARSIP_TINJAU+' · '+judulTahap()+' · '+(wf().usulan?'Usulan v'+wf().usulan.versi:'Draf belum diajukan')+'</p>'+
    '<div class="meta-chip">Demo desktop · Data tersimpan di browser ini</div>'+
    (masalahSimpan?'<div class="alert">'+esc(masalahSimpan)+'</div>':'')+pemanduDemo()+body+
    '<p class="foot-note mt24">Tandur mencatat pembiayaan; pembayaran dilakukan langsung oleh lembaga. Gunakan data contoh untuk demo.</p>');
}
function summary(s = akadKini()) {
  return '<div class="card"><h2>Kesepakatan yang ditinjau</h2><div class="grid g3">'+
    '<div><span class="sub">Volume akad</span><div class="stat-lg">'+angkaSimulasi(s.input.q)+' kg</div></div>'+
    '<div><span class="sub">Harga salam</span><div class="stat-lg">'+rp(s.input.ps)+'/kg</div></div>'+
    '<div><span class="sub">Pembayaran penuh</span><div class="stat-lg">'+rp(s.input.q*s.input.ps)+'</div></div></div>'+
    '<p>Penyerahan '+esc(s.petani.tanggal)+' · '+esc(s.petani.lokasi)+' · Cadangan '+angkaSimulasi(s.konteks.R)+' kg · Parameter '+esc(s.parameter.versi)+'.</p></div>';
}
function hasilCards(s) {
  return Object.entries(SKENARIO_SIMULASI).map(([key,nama])=>{
    const h=uji(s,key);
    return '<div class="card mt24"><h2>'+nama+' · '+h.lolos+'/4 lolos</h2>'+larik(h.sisi)+LARIK_FOOT+
      '<p>Panen '+angkaSimulasi(h.panen)+' kg · Batas serah '+angkaSimulasi(h.batas)+' kg.</p><p>'+
      (h.rentangAda?'Rentang harga salam: '+rp(h.bawah)+'–'+rp(h.atas)+'/kg.':'Tidak ada rentang harga salam layak dengan input lain tetap.')+'</p></div>';
  }).join('');
}
function panelBukti(kategori, bisaUnggah=true) {
  const rows=wf().bukti.filter(b=>kategori.includes(b.jenis));
  return '<div class="card mt24"><h2>Bukti pendukung</h2><p class="sub">Berkas disimpan lokal. PDF, PNG, JPEG, atau teks; maksimum 1 MB per berkas, total 2 MB. Bukti contoh diberi label.</p>'+
    '<table class="tbl"><tr><th>Jenis</th><th>Berkas</th><th>Aksi</th></tr>'+rows.map(b=>'<tr><td>'+JENIS_BUKTI[b.jenis]+'</td><td>'+esc(b.nama)+(b.contoh?' · CONTOH':'')+'</td><td><button class="aksilink" data-aksi="unduhBukti" data-id="'+b.id+'">Unduh</button></td></tr>').join('')+'</table>'+
    (bisaUnggah?'<div class="grid g2 mt24"><div class="field"><label for="jenis-bukti">Jenis bukti</label><select id="jenis-bukti">'+kategori.map(k=>'<option value="'+k+'">'+JENIS_BUKTI[k]+'</option>').join('')+'</select></div><div class="field"><label for="file-bukti">Pilih berkas</label><input id="file-bukti" type="file" accept=".pdf,.png,.jpg,.jpeg,.txt"></div></div><div class="btn-row">'+tombol('unggahBukti','Simpan berkas')+tombol('buktiContoh','Gunakan bukti contoh',false,'data-jenis="'+kategori.join(',')+'"')+'</div>':'')+'</div>';
}
function formValid(id) { return document.getElementById(id).reportValidity(); }
function nilai(id) { return document.getElementById('wf-'+id).value.trim(); }
function numerik(id) { return document.getElementById('wf-'+id).valueAsNumber; }
function cekDraf() {
  const p=wf().petani, c=konteksPetani();
  return p.persetujuan && p.nama.trim() && p.desa.trim() && p.lokasi.trim() && p.tanggal && p.Q>0 &&
    p.biaya.every(r=>r[1]>=r[2] && r[2]>=0) && p.sendiri>=0 && c.R+c.L<=c.Q;
}
function bersihkanHasil() { wf().hasil=null; STATE.hasilSimulasi=null; }
AKSI.simpanIdentitas = () => {
  if (!bolehEdit() || !formValid('form-petani')) return;
  Object.assign(wf().petani,{nama:nilai('nama'),desa:nilai('desa'),luas:numerik('luas'),Q:numerik('Q'),
    persetujuan:elId('consent').checked,tanggal:nilai('tanggal'),lokasi:nilai('lokasi')});
  bersihkanHasil(); selesaiAksi('Identitas dan panen disimpan.','/petugas/biaya');
};
AKSI.simpanBiaya = () => {
  if (!bolehEdit() || !formValid('form-biaya')) return;
  const rows=wf().petani.biaya.map((r,i)=>[r[0],numerik('total-'+i),numerik('tunai-'+i)]);
  if (rows.some(r=>r[2]>r[1])) return gagal('Bagian tunai tidak boleh melebihi total biaya.');
  wf().petani.biaya=rows; wf().petani.sendiri=numerik('sendiri'); bersihkanHasil();
  selesaiAksi('Biaya dan kebutuhan modal diperbarui.','/petugas/cadangan');
};
AKSI.simpanCadangan = () => {
  if (!bolehEdit() || !formValid('form-cadangan')) return;
  const R=numerik('R'),L=numerik('L');
  if (R+L>wf().petani.Q) return gagal('Cadangan dan komitmen melebihi perkiraan panen.');
  Object.assign(wf().petani,{R,L}); bersihkanHasil(); selesaiAksi('Cadangan disimpan.','/petugas/calon-kontrak');
};
AKSI.hitungSimulasi = () => {
  if (!bolehEdit()) return gagal('Usulan sudah dikirim. Manajer perlu meminta perbaikan sebelum input dapat diubah.');
  if (!formValid('form-kontrak')) return;
  if (!cekDraf()) return gagal('Lengkapi pendataan dan persetujuan petani sebelum menjalankan uji.');
  for (const key of Object.keys(INPUT_SIMULASI)) STATE.simulasi[key]=elId('sim-'+key).valueAsNumber;
  wf().hasil=snapshotDraf(); STATE.hasilSimulasi=clone(wf().hasil);
  selesaiAksi('Empat skenario dihitung dari data yang disimpan.','/petugas/simulasi');
};
AKSI.resetSimulasi = () => {
  if (!bolehEdit()) return gagal('Usulan terkunci selama peninjauan.');
  delete wf().form[location.hash];
  STATE.simulasi=clone(INPUT_SIMULASI); bersihkanHasil(); selesaiAksi('Input kontrak dikembalikan ke contoh.');
};
AKSI.kirimUsulan = () => {
  if (!bolehEdit() || !wf().hasil) return gagal('Jalankan uji pada draf terlebih dahulu.');
  if (JSON.stringify(wf().hasil)!==JSON.stringify(snapshotDraf())) return gagal('Data atau parameter berubah. Jalankan ulang uji sebelum mengirim.');
  if (!buktiDasar()) return gagal('Lengkapi empat jenis bukti dasar sebelum mengajukan.');
  const w=wf();
  if (w.usulan) w.versi.push(clone(w.usulan));
  w.usulan={...clone(w.hasil),versi:w.versi.length+1,bukti:w.bukti.filter(b=>['data','panen','biaya','cadangan'].includes(b.jenis)).map(({id,jenis,nama})=>({id,jenis,nama}))};
  w.tahap='diajukan'; w.alasan=''; w.keputusanBukti=false; w.dibaca=false; w.jawaban=[null,null,null,null,null];
  catatWorkflow('Usulan dikirim','v'+w.usulan.versi+' · '+w.usulan.input.q+' kg × '+rp(w.usulan.input.ps)+' · '+w.usulan.parameter.versi);
  selesaiAksi('Usulan masuk antrean manajer.','/manajer/antrean');
};
AKSI.kirimUlang=AKSI.kirimUsulan;
AKSI.keputusan = el => {
  const w=wf(), alasan=elId('alasan-keputusan')?.value.trim();
  if (!w.usulan || w.tahap!=='diajukan') return gagal('Tidak ada usulan yang menunggu keputusan.');
  if (!alasan) return gagal('Alasan keputusan wajib diisi.');
  const op=el.dataset.op;
  if (op==='setuju' && (!elId('verifikasi-bukti').checked || !buktiDasar() || uji(w.usulan,'-20').lolos!==4 || uji(w.usulan,'dasar').lolos!==4))
    return gagal('Persetujuan memerlukan verifikasi bukti serta empat sisi lolos pada dasar dan −20%.');
  w.tahap=op==='setuju'?'disetujui':op==='tolak'?'ditolak':'perbaikan';
  w.alasan=alasan; w.usulan.keputusan=w.tahap; w.usulan.alasan=alasan;
  catatWorkflow('Keputusan: '+judulTahap(),'Usulan v'+w.usulan.versi+' · '+alasan);
  selesaiAksi('Keputusan disimpan bersama versi usulan.');
};
AKSI.bacakan = () => {
  if (wf().tahap!=='disetujui') return gagal('Usulan harus disetujui manajer terlebih dahulu.');
  wf().dibaca=true; catatWorkflow('Ringkasan dibacakan','Usulan v'+wf().usulan.versi);
  selesaiAksi('Pembacaan tercatat.','/petugas/uji-pemahaman');
};
AKSI.simpanPemahaman = () => {
  if (!wf().dibaca || wf().tahap!=='disetujui') return gagal('Bacakan ringkasan yang disetujui terlebih dahulu.');
  const answers=Array.from({length:5},(_,i)=>document.querySelector('input[name="jawab-'+i+'"]:checked')?.value ?? null);
  wf().jawaban=answers;
  const benar=answers.filter(x=>x==='benar').length;
  catatWorkflow('Pemahaman dicatat',benar+'/5 jawaban benar');
  selesaiAksi(benar===5?'Lima jawaban benar; bukti tanda tangan dapat dilengkapi.':'Jelaskan kembali topik yang belum tepat.',benar===5?'/petugas/tanda-tangan':null);
};
AKSI.tandatangani = () => {
  const w=wf();
  if (w.tahap!=='disetujui' || !w.dibaca || !w.jawaban.every(x=>x==='benar') || !buktiAda('tanda') || !elId('konfirmasi-ttd')?.checked)
    return gagal('Lengkapi persetujuan, pembacaan, lima jawaban benar, bukti, dan konfirmasi tanda tangan.');
  w.ttd=true; w.tahap='ditandatangani'; catatWorkflow('Tanda tangan dicatat','Usulan v'+w.usulan.versi);
  selesaiAksi('Bukti tanda tangan dicatat.','/petugas/kontrak');
};
AKSI.catatBayar = () => {
  if (wf().tahap!=='ditandatangani' || !buktiAda('bayar') || !elId('konfirmasi-bayar')?.checked) return gagal('Lengkapi bukti pembayaran penuh dan konfirmasi.');
  wf().bayar=true; wf().tahap='dibayar'; catatWorkflow('Pembayaran penuh dicatat',rp(akadKini().input.q*akadKini().input.ps)+' langsung dari lembaga');
  selesaiAksi('Pembayaran penuh dicatat.','/petugas/serah-terima');
};
AKSI.ajukan = () => {
  if (wf().tahap!=='dibayar' || !formValid('form-serah')) return gagal('Selesaikan pembayaran dan isian penyerahan terlebih dahulu.');
  if (!buktiAda('serah')) return gagal('Lampirkan bukti timbang dan mutu.');
  wf().serah={berat:numerik('berat'),air:numerik('air'),kotor:numerik('kotor'),saksi:nilai('saksi'),catatan:nilai('catatan'),putusan:'menunggu'};
  wf().keberatan=nilai('keberatan'); wf().penyelesaian=''; wf().tahap='penyerahan';
  catatWorkflow('Serah terima diajukan',wf().serah.berat+' kg · air '+wf().serah.air+'% · kotoran '+wf().serah.kotor+'%');
  selesaiAksi('Hasil penyerahan masuk tinjauan manajer.','/manajer/detail-kontrak');
};
AKSI.serah = el => {
  if (wf().tahap!=='penyerahan') return gagal('Tidak ada penyerahan yang menunggu tinjauan.');
  const alasan=elId('alasan-serah').value.trim();
  if (!alasan) return gagal('Alasan tinjauan wajib diisi.');
  if (el.dataset.op==='klarifikasi') {
    wf().tahap='dibayar'; wf().serah.putusan='perbaikan';
  } else {
    const s=wf().serah, q=akadKini().input.q;
    if (Math.abs(s.berat-q)>q*0.01 || s.air>25 || s.kotor>3) return gagal('Berat atau mutu di luar kesepakatan contoh. Minta perbaikan; jangan finalisasi.');
    if (wf().keberatan && !wf().penyelesaian) return gagal('Selesaikan keberatan sebelum menyetujui serah terima.');
    wf().tahap='selesai'; s.putusan='disetujui';
  }
  wf().serah.alasan=alasan; catatWorkflow('Tinjauan serah terima',alasan+' · '+wf().serah.putusan);
  selesaiAksi('Tinjauan penyerahan disimpan.');
};
AKSI.keberatan = () => {
  if (!wf().keberatan || wf().tahap!=='penyerahan') return gagal('Tidak ada keberatan dalam penyerahan yang sedang ditinjau.');
  const alasan=elId('alasan-keberatan').value.trim();
  if (!alasan) return gagal('Keputusan penyelesaian wajib diisi.');
  wf().penyelesaian=alasan; catatWorkflow('Keberatan diselesaikan',alasan); selesaiAksi('Penyelesaian keberatan tercatat.');
};

function bolehBukti(jenis) {
  return ['data','panen','biaya','cadangan'].includes(jenis) ? bolehEdit() :
    jenis==='tanda' ? wf().tahap==='disetujui' : jenis==='bayar' ? wf().tahap==='ditandatangani' :
    jenis==='serah' && wf().tahap==='dibayar';
}
function simpanBukti(b) {
  if (!bolehBukti(b.jenis)) return gagal('Bukti tahap ini sudah terkunci atau belum diperlukan.');
  if (wf().bukti.reduce((n,x)=>n+x.size,0)+b.size>2*1024*1024) return gagal('Total berkas melebihi 2 MB. Gunakan berkas contoh atau berkas yang lebih kecil.');
  wf().bukti.push(b); catatWorkflow('Bukti ditambahkan',JENIS_BUKTI[b.jenis]+' · '+b.nama+(b.contoh?' · CONTOH':''));
  return true;
}
AKSI.unggahBukti = async () => {
  const file=elId('file-bukti')?.files[0], jenis=elId('jenis-bukti')?.value, owner=wf();
  if (!file) return gagal('Pilih berkas terlebih dahulu.');
  if (!/\.(pdf|png|jpe?g|txt)$/i.test(file.name) || file.size>1024*1024 || !file.size) return gagal('Gunakan PDF, PNG, JPEG, atau teks berukuran 1 byte sampai 1 MB.');
  try {
    const data=await new Promise((resolve,reject)=>{const reader=new FileReader(); reader.onload=()=>resolve(reader.result); reader.onerror=reject; reader.readAsDataURL(file);});
    if (owner!==wf()) return;
    if (simpanBukti({id:crypto.randomUUID(),jenis,nama:file.name,size:file.size,data,contoh:false})) selesaiAksi('Berkas disimpan lokal.');
  } catch (_) { gagal('Berkas tidak dapat dibaca. Pilih ulang berkas.'); }
};
AKSI.buktiContoh = el => {
  for (const jenis of el.dataset.jenis.split(',')) {
    if (!bolehBukti(jenis) || buktiAda(jenis)) continue;
    const content='CONTOH DEMO TANDUR — BUKAN BUKTI NYATA\n'+JENIS_BUKTI[jenis]+'\n'+ARSIP_TINJAU+'\n'+JSON.stringify({input:akadKini().input,petani:akadKini().petani},null,2);
    const bytes=new TextEncoder().encode(content);
    const data='data:text/plain;base64,'+btoa(Array.from(bytes,b=>String.fromCharCode(b)).join(''));
    simpanBukti({id:crypto.randomUUID(),jenis,nama:'contoh-'+jenis+'.txt',size:bytes.length,data,contoh:true});
  }
  selesaiAksi('Bukti contoh dibuat dan diberi label CONTOH.');
};
function unduhBlob(nama,blob) {
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=nama; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
AKSI.unduhBukti = el => {
  const b=wf().bukti.find(x=>x.id===el.dataset.id);
  if (!b) return;
  const bytes=Uint8Array.from(atob(b.data.split(',')[1]),c=>c.charCodeAt(0));
  unduhBlob(b.nama,new Blob([bytes],{type:'application/octet-stream'}));
};
AKSI.cadanganDemo = () => unduhBlob('tandur-cadangan-demo.json',new Blob([JSON.stringify({version:2,state:STATE},null,2)],{type:'application/json'}));
AKSI.ekspor = el => {
  if (/pdf/i.test(labelAksi(el))) { window.print(); return; }
  const s=akadKini(), quote=x=>'"'+String(x??'').replace(/^[=+@-]/,"'").replaceAll('"','""')+'"';
  const rows=location.hash==='#/admin/log' ? [['Waktu','Pelaku','Peristiwa','Objek','Hasil'],...STATE.log.map(r=>[r.waktu,r.pelaku,r.peristiwa,r.objek,r.hasil])] : [['Kode','Tahap','Versi','Volume kg','Harga Rp/kg','Pembayaran Rp','Parameter'],
    [ARSIP_TINJAU,judulTahap(),s.versi||'draf',s.input.q,s.input.ps,s.input.q*s.input.ps,s.parameter.versi]];
  unduhBlob('tandur-laporan.csv',new Blob(['\uFEFF'+rows.map(r=>r.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
};
AKSI.siapkanPesan = () => {
  const s=akadKini();
  wf().pesan='Ringkasan '+ARSIP_TINJAU+': '+angkaSimulasi(s.input.q)+' kg, '+rp(s.input.ps)+'/kg, pembayaran penuh '+rp(s.input.q*s.input.ps)+'. Penyerahan '+s.petani.tanggal+' di '+s.petani.lokasi+'. Silakan hubungi petugas jika ada yang belum dipahami.';
  selesaiAksi('Teks pesan disiapkan; belum dikirim.');
};
AKSI.resetDemo = () => { muatState(); selesaiAksi('Data demo direset.','/beranda'); };

ROUTES['/petugas/pendataan']={screen:'F3',render(){
  const p=wf().petani;
  return pageWorkflow('petugas','Pendataan petani',stepper('#/petugas/pendataan')+
    '<form id="form-petani"><fieldset '+(!bolehEdit()?'disabled':'')+'><div class="card"><h2>Identitas, lahan, dan penyerahan</h2><div class="grid g2">'+
    field('nama','Nama petani (data contoh)',p.nama,'text','required maxlength="120"')+
    field('desa','Desa / kelompok',p.desa,'text','required maxlength="120"')+
    field('luas','Luas lahan (ha)',p.luas,'number','required min="0.01" max="10000" step="0.01"')+
    field('Q','Perkiraan panen Q (kg)',p.Q,'number','required min="0.01" max="1000000000" step="0.01"')+
    field('tanggal','Tanggal penyerahan',p.tanggal,'date','required')+
    field('lokasi','Lokasi penyerahan',p.lokasi,'text','required maxlength="200"')+'</div>'+
    '<p class="sub mt24">Perkiraan panen harus didukung riwayat panen; bukan hasil yang dijamin.</p><label class="check"><input id="consent" type="checkbox" required '+(p.persetujuan?'checked':'')+'> Petani menyetujui pencatatan setelah tujuan dan akses data dijelaskan.</label></div>'+
    '<div class="btn-row">'+tombol('simpanIdentitas','Simpan → Pendataan biaya')+'</div></fieldset></form>'+(!bolehEdit()?'<div class="note">Draf terkunci selama peninjauan dan setelah disetujui.</div>':''), '#/petugas/data-petani');
}};
ROUTES['/petugas/biaya']={screen:'F4',render(){
  const p=wf().petani,c=konteksPetani();
  return pageWorkflow('petugas','Biaya satu musim',stepper('#/petugas/biaya')+
    '<form id="form-biaya"><fieldset '+(!bolehEdit()?'disabled':'')+'><div class="card"><h2>Biaya ekonomi dan bagian tunai</h2><table class="tbl"><tr><th>Komponen</th><th>Total ekonomi (Rp)</th><th>Bagian tunai (Rp)</th></tr>'+
    p.biaya.map((r,i)=>'<tr><td>'+r[0]+'</td><td>'+field('total-'+i,r[0]+' total',r[1],'number','required min="0" max="1000000000" step="1"')+'</td><td>'+field('tunai-'+i,r[0]+' tunai',r[2],'number','required min="0" max="1000000000" step="1"')+'</td></tr>').join('')+'</table>'+
    field('sendiri','Dana sendiri (Rp)',p.sendiri,'number','required min="0" max="1000000000" step="1"')+
    '<p>Data tersimpan: biaya ekonomi '+rp(c.C)+' · kebutuhan kas '+rp(c.K)+'. Total diperbarui setelah disimpan.</p></div><div class="btn-row">'+tombol('simpanBiaya','Simpan → Cadangan & bukti')+'</div></fieldset></form>', '#/petugas/data-petani');
}};
ROUTES['/petugas/cadangan']={screen:'F5',render(){
  const p=wf().petani;
  return pageWorkflow('petugas','Cadangan dan bukti',stepper('#/petugas/cadangan')+
    '<form id="form-cadangan"><fieldset '+(!bolehEdit()?'disabled':'')+'><div class="card"><h2>Cadangan keluarga dan komitmen lain</h2><div class="grid g2">'+
    field('R','Cadangan keluarga R (kg)',p.R,'number','required min="0" max="1000000000" step="0.01"')+
    field('L','Komitmen lain L (kg)',p.L,'number','required min="0" max="1000000000" step="0.01"')+'</div></div><div class="btn-row">'+tombol('simpanCadangan','Simpan → Calon kontrak')+'</div></fieldset></form>'+
    panelBukti(['data','panen','biaya','cadangan'],bolehEdit()), '#/petugas/data-petani');
}};
ROUTES['/petugas/calon-kontrak']={screen:'F7',render(){
  const c=konteksPetani(), p=STATE.param.aktif;
  return pageWorkflow('petugas','Susun calon kontrak',
    '<form id="form-kontrak"><fieldset '+(!bolehEdit()?'disabled':'')+'><div class="layout"><div class="card"><h2>Volume dan harga</h2><div class="grid g2">'+
    inputSimulasi('q','Volume akad q (kg)')+inputSimulasi('ps','Harga salam Ps (Rp/kg)')+
    inputSimulasi('ph','Harga sisa panen Ph (Rp/kg)')+inputSimulasi('pj','Harga jual lembaga Pj (Rp/kg)')+
    inputSimulasi('b','Biaya lembaga B (Rp)')+'</div></div><div class="card"><h2>Dasar perhitungan</h2><p>Q '+angkaSimulasi(c.Q)+' kg · C '+rp(c.C)+' · K '+rp(c.K)+' · R '+angkaSimulasi(c.R)+' kg · L '+angkaSimulasi(c.L)+' kg.</p>'+
    '<p>Parameter DPS '+esc(p.versi)+' · manfaat minimum '+rp(p.wMin)+' · kontribusi minimum '+rp(p.mMin)+'.</p><p>Parameter tidak dapat diubah petugas.</p></div></div>'+
    '<div class="btn-row">'+tombol('hitungSimulasi','Jalankan uji → Hasil uji')+tombol('resetSimulasi','Pulihkan input contoh')+'</div></fieldset></form>'+
    '<div class="btn-row">'+tautan('/petugas/pendataan','Ubah pendataan')+tautan('/petugas/cadangan','Lengkapi bukti')+tautan('/petugas/simulasi','Lihat hasil terakhir')+'</div>'+
    (!bolehEdit()?'<div class="note mt24">Usulan sudah dikirim. Data hanya dapat direvisi setelah manajer meminta perbaikan atau menolak.</div>':''));
}};
ROUTES['/petugas/simulasi']={screen:'F8',render(){
  const s=wf().hasil;
  if (!s) return pageWorkflow('petugas','Belum ada hasil uji',tautan('/petugas/calon-kontrak','Isi calon kontrak'));
  return pageWorkflow('petugas','Hasil uji empat sisi',summary(s)+
    '<div class="note mt24"><b>Hasil dihitung dari pendataan dan input kontrak.</b>Dasar dan hasil −20% harus lolos untuk persetujuan pada demo ini. Risiko −40% dan harga −10% tetap ditinjau. Hasil bukan persetujuan otomatis.</div>'+
    hasilCards(s)+'<div class="card mt24"><h2>Asumsi model</h2><p>U = q × Ps; batas serah = Q skenario − R − L; W = U + (Q skenario − q) × Ph skenario − C; M = q × (Pj skenario − Ps) − B.</p><p>W menilai seluruh sisa panen termasuk cadangan; bukan kas bersih. Harga −10% menurunkan Ph dan Pj, sementara Ps tetap. Sensitivitas bukan probabilitas kejadian.</p></div>'+
    '<div class="btn-row">'+tombol('kirimUsulan',wf().tahap==='perbaikan'?'Kirim ulang setelah perbaikan':'Kirim ke antrean manajer',!bolehEdit() || !buktiDasar())+tautan('/petugas/calon-kontrak','Ubah input')+tautan('/petugas/cadangan','Lengkapi bukti')+'</div>'+
    (!buktiDasar()?'<p class="sub">Lengkapi empat jenis bukti dasar sebelum mengirim usulan.</p>':''));
}};
for (const route of ['/petugas/hasil-uji','/petugas/hasil-uji/dasar','/petugas/hasil-uji/-40','/petugas/hasil-uji/harga']) ROUTES[route]=ROUTES['/petugas/simulasi'];

ROUTES['/manajer/antrean']={screen:'M2',render(){
  const s=wf().usulan;
  return pageWorkflow('manajer','Antrean persetujuan','<div class="card"><h2>'+ (wf().tahap==='diajukan'?1:0)+' usulan menunggu keputusan</h2>'+
    (s?'<table class="tbl"><tr><th>Usulan</th><th>Volume / nilai</th><th>Dasar / −20%</th><th>Status</th><th>Tindakan</th></tr><tr><td>'+ARSIP_TINJAU+' · v'+s.versi+'</td><td>'+angkaSimulasi(s.input.q)+' kg · '+rp(s.input.q*s.input.ps)+'</td><td>'+uji(s,'dasar').lolos+'/4 · '+uji(s,'-20').lolos+'/4</td><td>'+judulTahap()+'</td><td><a href="#/manajer/detail-persetujuan">Tinjau usulan</a></td></tr></table>':'<p>Belum ada usulan. Petugas perlu menyimpan data, melengkapi bukti, dan menjalankan uji.</p>')+'</div><div class="btn-row">'+tautan('/petugas/calon-kontrak','Buka calon kontrak petugas')+'</div>');
}};
ROUTES['/manajer/detail-persetujuan']={screen:'M3',render(){
  const s=wf().usulan;
  if (!s) return pageWorkflow('manajer','Belum ada usulan',tautan('/petugas/pendataan','Mulai pendataan'));
  const ready=wf().tahap==='diajukan';
  return pageWorkflow('manajer','Tinjau usulan v'+s.versi,summary(s)+hasilCards(s)+panelBukti(['data','panen','biaya','cadangan'],false)+
    '<div class="card mt24"><h2>Keputusan manajer</h2><p>Dasar dan −20% harus lolos; tinjau semua bukti dan jelaskan penanganan skenario yang gagal.</p>'+
    '<label class="check"><input id="verifikasi-bukti" type="checkbox" '+(!ready?'disabled':'')+'> Saya sudah memeriksa bukti dan paparan risiko.</label>'+
    '<div class="field"><label for="alasan-keputusan">Alasan keputusan</label><textarea id="alasan-keputusan" maxlength="2000" '+(!ready?'readonly':'')+'>'+esc(wf().alasan)+'</textarea></div><div class="btn-row">'+
    tombol('keputusan','Setujui usulan',!ready,'data-op="setuju"')+tombol('keputusan','Minta perbaikan',!ready,'data-op="perbaikan"')+tombol('keputusan','Tolak usulan',!ready,'data-op="tolak"')+'</div></div>'+
    '<div class="btn-row">'+tautan('/petugas/ringkasan-akad','Buka ringkasan akad')+tautan('/petugas/calon-kontrak','Kembali ke petugas')+'</div>');
}};

ROUTES['/petugas/ringkasan-akad']={screen:'F10',render(){
  if (!wf().usulan) return pageWorkflow('petugas','Ringkasan belum tersedia',tautan('/petugas/calon-kontrak','Susun calon kontrak'));
  return pageWorkflow('petugas','Bacakan bersama petani',summary()+
    '<div class="card mt24"><h2>Pokok kesepakatan</h2><p>Pembayaran penuh di muka langsung dari lembaga; jumlah dan harga tetap sesuai usulan yang disetujui. Cadangan keluarga tidak termasuk volume penyerahan.</p><p>Contoh mutu: kadar air maksimal 25%, kotoran maksimal 3%, toleransi timbang ±1%. Jika panen berbeda atau gagal, hubungi petugas untuk pemeriksaan bersama dan pembahasan penyelesaian.</p>'+
    '<p>Status persetujuan: '+judulTahap()+'. '+(wf().dibaca?'Ringkasan sudah dibacakan.':'Ringkasan belum dibacakan.')+'</p><div class="btn-row">'+
    tombol('bacakan','Tandai sudah dibacakan',wf().tahap!=='disetujui' || wf().dibaca)+tautan('/petugas/uji-pemahaman','Uji pemahaman')+tautan('/petugas/akad','Cetak / simpan PDF')+tombol('siapkanPesan','Siapkan teks pesan')+'</div>'+
    (wf().pesan?'<div class="field mt24"><label for="pesan-salin">Teks siap disalin — belum dikirim</label><textarea id="pesan-salin" readonly>'+esc(wf().pesan)+'</textarea></div>':'')+'</div>', '#/petugas/ringkasan-akad');
}};
function pertanyaan() {
  const s=akadKini();
  return [
    ['Bagaimana pembayarannya?',rp(s.input.q*s.input.ps)+' dibayar penuh di muka oleh lembaga.','Dicicil sesudah panen.'],
    ['Berapa volume dan harga yang disepakati?',angkaSimulasi(s.input.q)+' kg dengan '+rp(s.input.ps)+'/kg.','Semua hasil panen, dengan harga ditentukan sesudah penyerahan.'],
    ['Kapan dan di mana penyerahan dilakukan?',s.petani.tanggal+' di '+s.petani.lokasi+'.','Waktu dan tempat dapat diubah sepihak.'],
    ['Apakah cadangan keluarga termasuk volume akad?','Tidak; '+angkaSimulasi(s.konteks.R)+' kg cadangan tetap untuk keluarga. Mutu diperiksa bersama.','Ya, seluruh cadangan wajib ikut diserahkan.'],
    ['Apa yang dilakukan jika panen gagal?','Hubungi petugas untuk verifikasi dan pembahasan penyelesaian bersama lembaga/DPS.','Langsung menerima denda otomatis tanpa pemeriksaan.']
  ];
}
ROUTES['/petugas/uji-pemahaman']={screen:'F11',render(){
  const ready=wf().dibaca && wf().tahap==='disetujui';
  return pageWorkflow('petugas','Pastikan petani memahami',
    '<div class="note mb24"><b>'+wf().jawaban.filter(x=>x==='benar').length+'/5 jawaban benar</b>Catat jawaban petani, jangan menjawabkan. Jelaskan ulang topik yang belum dipahami.</div>'+
    (!ready?'<div class="alert">Uji dapat diisi setelah usulan disetujui dan ringkasan dibacakan.</div>':'')+
    '<form id="form-pemahaman"><fieldset '+(!ready?'disabled':'')+'>'+pertanyaan().map((p,i)=>
      '<div class="card mt24"><h2>'+(i+1)+'. '+p[0]+'</h2>'+[1,2].map(j=>'<label class="quiz-option"><input type="radio" name="jawab-'+i+'" value="'+(j===1?'benar':'salah')+'" '+(wf().jawaban[i]===(j===1?'benar':'salah')?'checked':'')+'> '+esc(p[j])+'</label>').join('')+
      (wf().jawaban[i]==='salah'?'<p class="st-gagal">Belum tepat. Bacakan kembali pokok kesepakatan ini, lalu tanyakan ulang.</p>':'')+'</div>').join('')+
    '<div class="btn-row">'+tombol('simpanPemahaman','Simpan jawaban')+'</div></fieldset></form>'+tautan('/petugas/ringkasan-akad','Kembali ke ringkasan'), '#/petugas/ringkasan-akad');
}};
ROUTES['/petugas/tanda-tangan']={screen:'F12',render(){
  const ready=wf().tahap==='disetujui' && wf().dibaca && wf().jawaban.every(x=>x==='benar');
  return pageWorkflow('petugas','Dokumentasi tanda tangan',summary()+
    '<div class="note mt24"><b>Pemahaman '+wf().jawaban.filter(x=>x==='benar').length+'/5</b>'+(wf().ttd?'Bukti tanda tangan sudah dicatat.':'Bukti tanda tangan petani, petugas, dan saksi dapat digabung dalam satu berkas.')+'</div>'+
    panelBukti(['tanda'],ready)+'<div class="card mt24"><label class="check"><input id="konfirmasi-ttd" type="checkbox" '+(!ready?'disabled':'')+'> Petani mendapat kesempatan bertanya; dokumen dan bukti tanda tangan telah diperiksa.</label><div class="btn-row">'+
    tombol('tandatangani','Simpan bukti tanda tangan',!ready)+tautan('/petugas/uji-pemahaman','Uji pemahaman')+tautan('/petugas/kontrak','Bukti pembayaran')+'</div></div>', '#/petugas/ringkasan-akad');
}};
ROUTES['/petugas/kontrak']={screen:'F13',render(){
  const ready=wf().tahap==='ditandatangani';
  return pageWorkflow('petugas','Kontrak dan pembayaran',summary()+
    '<div class="note mt24"><b>'+(wf().bayar?'Pembayaran penuh telah dicatat':'Pembayaran belum dicatat')+'</b>Uang dibayarkan langsung oleh lembaga kepada petani. Tombol ini hanya mencatat bukti, tidak memindahkan dana.</div>'+
    panelBukti(['bayar'],ready)+'<div class="card mt24"><label class="check"><input id="konfirmasi-bayar" type="checkbox" '+(!ready?'disabled':'')+'> Bukti pembayaran penuh sesuai nilai akad telah diperiksa.</label><div class="btn-row">'+
    tombol('catatBayar','Catat pembayaran penuh',!ready)+tautan('/petugas/serah-terima','Buka serah terima')+tautan('/petugas/akad','Ringkasan PDF')+'</div></div>');
}};
ROUTES['/petugas/serah-terima']={screen:'F14',render(){
  const s=wf().serah || {berat:akadKini().input.q,air:24,kotor:2,saksi:'Budi (contoh)',catatan:''};
  const ready=wf().tahap==='dibayar';
  return pageWorkflow('petugas','Serah terima panen',summary()+
    '<form id="form-serah"><fieldset '+(!ready?'disabled':'')+'><div class="card mt24"><h2>Timbang dan mutu</h2><div class="grid g2">'+
    field('berat','Berat diterima (kg)',s.berat,'number','required min="0" max="1000000000" step="0.01"')+
    field('air','Kadar air (%)',s.air,'number','required min="0" max="100" step="0.01"')+
    field('kotor','Kotoran (%)',s.kotor,'number','required min="0" max="100" step="0.01"')+
    field('saksi','Nama saksi (contoh)',s.saksi,'text','required maxlength="120"')+
    field('catatan','Catatan pemeriksaan',s.catatan,'text','required maxlength="1000"')+
    field('keberatan','Keberatan petani (kosong jika tidak ada)',wf().keberatan,'text','maxlength="1000"')+'</div></div><div class="btn-row">'+tombol('ajukan','Ajukan ke manajer')+'</div></fieldset></form>'+
    panelBukti(['serah'],ready)+'<div class="btn-row">'+tautan('/manajer/detail-kontrak','Lihat tinjauan manajer')+tautan('/petugas/berita-acara','Pratinjau berita acara')+'</div>', '#/petugas/serah-terima');
}};
ROUTES['/manajer/detail-kontrak']={screen:'M4',render(){
  const s=wf().serah, ready=wf().tahap==='penyerahan';
  return pageWorkflow('manajer','Tinjau serah terima',summary()+
    (!s?'<div class="note mt24">Belum ada hasil serah terima yang diajukan.</div>':
    '<div class="card mt24"><h2>Hasil lapangan</h2><p>Berat '+angkaSimulasi(s.berat)+' kg · selisih '+angkaSimulasi(s.berat-akadKini().input.q)+' kg · kadar air '+s.air+'% · kotoran '+s.kotor+'%.</p><p>Saksi: '+esc(s.saksi)+'. '+esc(s.catatan)+'</p><p>Keberatan: '+esc(wf().keberatan||'Tidak ada')+'</p><p>Penyelesaian: '+esc(wf().penyelesaian||'Belum diperlukan / belum dicatat')+'</p>'+panelBukti(['serah'],false)+'</div>'+
    (wf().keberatan?'<div class="card mt24"><h2>Penyelesaian keberatan</h2><div class="field"><label for="alasan-keberatan">Keputusan dan tindak lanjut</label><textarea id="alasan-keberatan" maxlength="2000">'+esc(wf().penyelesaian)+'</textarea></div>'+tombol('keberatan','Catat penyelesaian',!ready)+'</div>':'')+
    '<div class="card mt24"><h2>Keputusan penyerahan</h2><p>Contoh kesepakatan: selisih berat maksimal ±1%, kadar air ≤25%, kotoran ≤3%. Keberatan harus diselesaikan sebelum finalisasi.</p><div class="field"><label for="alasan-serah">Alasan tinjauan</label><textarea id="alasan-serah" maxlength="2000">'+esc(s.alasan||'')+'</textarea></div><div class="btn-row">'+
    tombol('serah','Setujui serah terima',!ready,'data-op="setujui"')+tombol('serah','Minta perbaikan',!ready,'data-op="klarifikasi"')+'</div></div>')+
    '<div class="btn-row">'+tautan('/petugas/serah-terima','Buka pencatatan petugas')+tautan('/petugas/berita-acara','Cetak berita acara')+'</div>', '#/manajer/detail-kontrak');
}};
ROUTES['/petugas/keberatan']={screen:'F15',render(){
  return pageWorkflow('petugas','Keberatan petani','<div class="card"><h2>Catatan keberatan</h2><p>'+esc(wf().keberatan||'Belum ada keberatan. Catat saat mengisi serah terima.')+'</p><h2>Penyelesaian manajer</h2><p>'+esc(wf().penyelesaian||'Belum ada keputusan.')+'</p><div class="btn-row">'+tautan('/petugas/serah-terima','Catat serah terima')+tautan('/manajer/detail-kontrak','Tinjauan manajer')+'</div></div>', '#/petugas/keberatan');
}};
function dokumenWorkflow(ba=false) {
  const s=akadKini(), serah=wf().serah, judul=ba?'Berita acara serah terima':'Ringkasan akad salam';
  return '<div class="doc">'+docBar(judul,ba?'#/petugas/serah-terima':'#/petugas/kontrak','Kembali')+'<div class="wrap"><div class="head">'+logo({ink:true,size:30})+
    '<div class="right">'+ARSIP_TINJAU+'<br>'+esc(s.parameter.versi)+' · '+judulTahap()+'</div></div><h1>'+judul+'</h1><p>'+esc(TDATA.lembaga)+' · Data demo</p>'+
    '<div class="green"><div class="big">'+(ba?(serah?angkaSimulasi(serah.berat)+' kg diterima':'Belum ada penyerahan'):rp(s.input.q*s.input.ps))+'</div></div>'+
    '<table class="tbl"><tr><th>Pokok</th><th>Rincian</th></tr><tr><td>Volume / harga</td><td>'+angkaSimulasi(s.input.q)+' kg × '+rp(s.input.ps)+'/kg</td></tr><tr><td>Penyerahan</td><td>'+esc(s.petani.tanggal)+' · '+esc(s.petani.lokasi)+'</td></tr><tr><td>Cadangan / komitmen</td><td>'+angkaSimulasi(s.konteks.R)+' kg / '+angkaSimulasi(s.konteks.L)+' kg</td></tr><tr><td>Versi usulan</td><td>'+(s.versi||'Draf belum diajukan')+'</td></tr></table>'+
    (ba&&serah?'<p>Kadar air '+serah.air+'% · kotoran '+serah.kotor+'% · selisih '+angkaSimulasi(serah.berat-s.input.q)+' kg.</p><p>Saksi: '+esc(serah.saksi)+'. '+esc(serah.catatan)+'</p><p>Keberatan: '+esc(wf().keberatan||'Tidak ada')+'. Penyelesaian: '+esc(wf().penyelesaian||'Belum ada')+'</p><p>Keputusan penyerahan: '+esc(serah.putusan)+'. '+esc(serah.alasan||'')+'</p>':
    '<p>Pembayaran penuh langsung oleh lembaga. Kadar air maksimal 25%, kotoran maksimal 3%, toleransi timbang ±1% (contoh kesepakatan). Cadangan tetap milik petani. Jika panen gagal atau berbeda, hubungi petugas untuk pemeriksaan dan pembahasan penyelesaian bersama.</p><p>Pemahaman '+wf().jawaban.filter(x=>x==='benar').length+'/5 · tanda tangan '+(wf().ttd?'dicatat':'belum dicatat')+' · pembayaran '+(wf().bayar?'dicatat':'belum dicatat')+'.</p>')+
    '<div class="sig"><div>Petani '+KODE_TINJAU+'</div><div>Petugas</div><div>Saksi</div></div><p class="foot">Dokumen demo; bukan penetapan keabsahan akad. '+(!wf().usulan?'DRAF — BELUM DIAJUKAN':'Usulan v'+s.versi)+' · '+judulTahap()+'</p></div></div>';
}
ROUTES['/petugas/akad']={screen:'S1',render:()=>dokumenWorkflow(false)};
ROUTES['/petugas/berita-acara']={screen:'S2',render:()=>dokumenWorkflow(true)};

function statsDemo() {
  const w=wf(), s=w.usulan;
  const aktif=['ditandatangani','dibayar','penyerahan','selesai'].includes(w.tahap);
  return { petani:1, antrean:w.tahap==='diajukan'?1:0, aktif:aktif?1:0,
    nilai:aktif?s.input.q*s.input.ps:0, selesai:w.tahap==='selesai'?1:0,
    bukti:w.bukti.length, rentan:aktif && (uji(s,'-40').lolos<4 || uji(s,'harga').lolos<4)?1:0 };
}
function dashboardDemo(role) {
  const s=statsDemo();
  return pageWorkflow(role,role==='petugas'?'Beranda petugas':'Portofolio pembiayaan',
    '<div class="grid g3">'+[['Petani dalam demo',s.petani],['Usulan menunggu',s.antrean],['Kontrak ditandatangani',s.aktif],['Nilai akad',rp(s.nilai)],['Serah terima selesai',s.selesai],['Kontrak dengan paparan stress',s.rentan]].map(([label,n])=>'<div class="card stat"><div class="lab">'+label+'</div><div class="num">'+n+'</div></div>').join('')+'</div>'+
    '<div class="card mt24"><h2>Kasus aktif · '+KODE_TINJAU+'</h2><p>'+judulTahap()+' · '+s.bukti+' berkas tersimpan.</p><p>Angka di atas berasal dari kasus demo yang sedang dikerjakan. Nilai akad mulai dihitung setelah tanda tangan dicatat.</p><div class="btn-row">'+
    tautan('/petugas/pendataan','Pendataan')+tautan('/petugas/calon-kontrak','Calon kontrak')+tautan('/manajer/antrean','Antrean manajer')+tautan('/petugas/ringkasan-akad','Ringkasan akad')+tautan('/petugas/serah-terima','Serah terima')+'</div></div>'+
    '<div class="btn-row">'+tombol('ekspor','Unduh laporan CSV')+tombol('cadanganDemo','Unduh cadangan data')+'</div>',role==='petugas'?'#/petugas/beranda':'#/manajer/portofolio');
}
ROUTES['/petugas/beranda']={screen:'F1',render:()=>dashboardDemo('petugas')};
ROUTES['/manajer/portofolio']={screen:'M1',render:()=>dashboardDemo('manajer')};
ROUTES['/manajer/risiko']={screen:'M5',render:()=>pageWorkflow('manajer','Risiko kontrak',summary()+hasilCards(akadKini()),'#/manajer/risiko')};
ROUTES['/petugas/data-petani']={screen:'F2',render:()=>pageWorkflow('petugas','Data petani',
  '<div class="card"><table class="tbl"><tr><th>Kode</th><th>Desa</th><th>Luas</th><th>Panen</th><th>Tindakan</th></tr><tr><td>'+KODE_TINJAU+'</td><td>'+esc(wf().petani.desa)+'</td><td>'+angkaSimulasi(wf().petani.luas)+' ha</td><td>'+angkaSimulasi(wf().petani.Q)+' kg</td><td><a href="#/petugas/pendataan">Lihat / perbarui</a></td></tr></table></div>','#/petugas/data-petani')};
ROUTES['/petugas/detail-petani']={screen:'F6',render:()=>pageWorkflow('petugas','Detail '+KODE_TINJAU,
  '<div class="card"><h2>'+esc(wf().petani.nama)+'</h2><p>'+esc(wf().petani.desa)+' · '+angkaSimulasi(wf().petani.luas)+' ha · panen '+angkaSimulasi(wf().petani.Q)+' kg.</p><p>Persetujuan data: '+(wf().petani.persetujuan?'dicatat':'belum dicatat')+'</p><div class="btn-row">'+tautan('/petugas/pendataan','Perbarui data')+tautan('/petugas/cadangan','Bukti')+'</div></div>','#/petugas/data-petani')};
ROUTES['/dps/arsip']={screen:'D1',render:()=>pageWorkflow('dps','Arsip akad dan pengawasan',summary()+
  '<div class="card mt24"><h2>Kelengkapan kasus</h2><p>'+Object.entries(JENIS_BUKTI).map(([key,label])=>(buktiAda(key)?'✓ ':'○ ')+label).join(' · ')+'</p><p>Serah terima selesai: '+statsDemo().selesai+'/1. Versi usulan tersimpan: '+(wf().versi.length+(wf().usulan?1:0))+'.</p><div class="btn-row">'+tautan('/petugas/akad','Ringkasan akad')+tautan('/petugas/berita-acara','Berita acara')+tautan('/dps/jejak','Jejak keputusan')+tautan('/dps/persetujuan','Persetujuan parameter')+'</div></div>'+panelBukti(Object.keys(JENIS_BUKTI),false))};
ROUTES['/dps/jejak']={screen:'D2',render:()=>pageWorkflow('dps','Jejak keputusan',
  '<div class="note mb24">Jejak demo tersimpan lokal dan bertambah setiap tindakan. Reset demo menghapusnya; ini belum merupakan penyimpanan audit yang tahan manipulasi.</div>'+
  '<div class="card"><h2>Peristiwa</h2>'+(!STATE.jejak.length?'<p>Belum ada peristiwa.</p>':'<div class="tl">'+STATE.jejak.map(j=>'<div class="item"><div class="dot"></div><div class="when">'+j.waktu+'</div><div><div class="what">'+j.peristiwa+'</div><div class="desc">'+j.rincian+'</div></div></div>').join('')+'</div>')+'</div>'+
  '<div class="card mt24"><h2>Versi usulan</h2>'+[...wf().versi,...(wf().usulan?[wf().usulan]:[])].map(s=>'<p>v'+s.versi+' · '+angkaSimulasi(s.input.q)+' kg × '+rp(s.input.ps)+' · '+esc(s.parameter.versi)+' · '+esc(s.keputusan||'menunggu')+' · '+esc(s.alasan||'')+'</p>').join('')+'</div>','#/dps/jejak')};
ROUTES['/dps/laporan']={screen:'D4',render:()=>pageWorkflow('dps','Laporan pengawasan',summary()+
  '<div class="card mt24"><h2>Ringkasan laporan</h2><p>'+statsDemo().aktif+' kontrak ditandatangani · '+statsDemo().selesai+' penyerahan selesai · '+statsDemo().bukti+' bukti.</p><div class="btn-row">'+tombol('ekspor','Unduh laporan CSV')+tombol('cetak','Cetak / simpan PDF')+'</div></div>','#/dps/laporan')};

function setelahRenderWorkflow() {
  if (masalahSimpan && !document.querySelector('#app .alert')) {
    const notice=document.createElement('div');
    notice.className='alert'; notice.setAttribute('role','alert'); notice.textContent=masalahSimpan;
    document.getElementById('app').prepend(notice);
  }
  const form=wf().form[location.hash] || {};
  document.querySelectorAll('form input, form textarea, #alasan-keputusan, #alasan-serah, #alasan-keberatan').forEach(el=>{
    const key=el.id || (el.name+':'+el.value), value=form[key];
    if (el.disabled || el.readOnly || value===undefined || el.type==='file') return;
    if (el.type==='checkbox' || el.type==='radio') el.checked=value; else el.value=value;
  });
  document.querySelectorAll('button[data-aksi="simpan"],button.btn:not([data-aksi]):not([data-login]):not([data-tab])').forEach(el=>{
    if (el.closest('.docbar') || el.disabled) return;
    el.title='Fitur di luar alur demo utama; belum terhubung ke layanan.';
    if (!el.textContent.includes('(simulasi)')) el.append(' (simulasi)');
  });
}
document.addEventListener('submit',e=>e.preventDefault());
document.addEventListener('input',e=>{
  const el=e.target;
  if (location.hash.startsWith('#/masuk')) return;
  if (!(el.closest('form') || ['alasan-keputusan','alasan-serah','alasan-keberatan'].includes(el.id)) || el.type==='file') return;
  const key=el.id || (el.name+':'+el.value);
  const values=wf().form[location.hash] ||= {};
  if (el.type==='radio') document.querySelectorAll('input[name="'+el.name+'"]').forEach(r=>values[r.name+':'+r.value]=r.checked);
  else values[key]=el.type==='checkbox'?el.checked:el.value;
  simpanDemo();
});
window.addEventListener('pagehide',simpanDemo);
AKSI.simpan = () => toast('Fitur ini masih simulasi. Gunakan tombol simpan pada formulir alur utama untuk memperbarui data.', 'tunggu');

AKSI.usulParameter = () => {
  if (!formValid('form-parameter')) return;
  const p=STATE.param;
  const usulan={versi:nilai('versi'),wMin:numerik('wMin'),mMin:numerik('mMin'),efektif:nilai('efektif'),oleh:pelaku(),alasan:nilai('alasan-param')};
  if (usulan.versi===p.aktif.versi) return gagal('Gunakan versi baru yang berbeda dari parameter aktif.');
  p.usulan=usulan;
  p.keputusan='menunggu'; p.catatan=''; p.tanggal=''; p.dpsOleh='';
  catatWorkflow('Parameter diusulkan',p.usulan.versi+' · '+p.usulan.alasan);
  selesaiAksi('Usulan parameter dikirim ke DPS.','/dps/persetujuan');
};
AKSI.paramDps = el => {
  if (!['menunggu','catatan'].includes(STATE.param.keputusan)) return gagal('Usulan ini sudah diputuskan.');
  const catatan=elId('catatan-dps').value.trim();
  if (!catatan) return gagal('Catatan penilaian DPS wajib diisi.');
  const p=STATE.param;
  p.catatan=catatan; p.dpsOleh=pelaku(); p.tanggal=waktuAksi().jejak;
  p.keputusan=el.dataset.op==='catatan'?'catatan':'disetujui';
  catatWorkflow('Tinjauan parameter DPS',p.usulan.versi+' · '+p.keputusan+' · '+catatan);
  selesaiAksi('Tinjauan DPS disimpan.');
};
AKSI.paramTerapkan = () => {
  const p=STATE.param;
  if (p.keputusan!=='disetujui') return gagal('Parameter belum disetujui DPS.');
  p.aktif={versi:p.usulan.versi,wMin:p.usulan.wMin,mMin:p.usulan.mMin,efektif:p.usulan.efektif};
  p.keputusan='diterapkan'; p.diterapkanPada=waktuAksi().jejak;
  catatWorkflow('Parameter diterapkan',p.aktif.versi+' · berlaku untuk uji berikutnya, usulan tersimpan tidak berubah');
  selesaiAksi('Parameter aktif diperbarui untuk uji berikutnya.');
};
function tabelParameter() {
  const p=STATE.param;
  return '<div class="card"><h2>Parameter aktif dan usulan</h2><table class="tbl"><tr><th>Parameter</th><th>Aktif '+esc(p.aktif.versi)+'</th><th>Usulan '+esc(p.usulan.versi)+'</th></tr><tr><td>Manfaat minimum</td><td>'+rp(p.aktif.wMin)+'</td><td>'+rp(p.usulan.wMin)+'</td></tr><tr><td>Kontribusi minimum</td><td>'+rp(p.aktif.mMin)+'</td><td>'+rp(p.usulan.mMin)+'</td></tr></table><p>Status usulan: '+esc(p.keputusan)+'. '+esc(p.catatan||'')+'</p><p>Usulan/akad yang sudah tersimpan tetap memakai salinan parameter sebelumnya.</p></div>';
}
ROUTES['/manajer/parameter']={screen:'M6',render(){
  const p=STATE.param;
  return pageWorkflow('manajer','Usulkan parameter',tabelParameter()+
    '<form id="form-parameter"><div class="card mt24"><h2>Usulan berikutnya</h2><div class="grid g2">'+field('versi','Versi',p.usulan.versi,'text','required maxlength="30" pattern="[a-zA-Z0-9._-]+"')+
    field('wMin','Manfaat minimum (Rp)',p.usulan.wMin,'number','required min="1" max="1000000000" step="1"')+
    field('mMin','Kontribusi minimum (Rp)',p.usulan.mMin,'number','required min="1" max="1000000000" step="1"')+
    field('efektif','Rencana efektif',p.usulan.efektif,'text','required maxlength="40"')+
    field('alasan-param','Alasan perubahan',p.usulan.alasan||'','text','required maxlength="1000"')+'</div><div class="btn-row">'+tombol('usulParameter','Kirim usulan ke DPS')+'</div></div></form>','#/manajer/parameter');
}};
ROUTES['/dps/persetujuan']={screen:'D3',render:()=>pageWorkflow('dps','Tinjau parameter',tabelParameter()+
  '<div class="card mt24"><div class="field"><label for="catatan-dps">Catatan penilaian</label><textarea id="catatan-dps" maxlength="2000">'+esc(STATE.param.catatan)+'</textarea></div><div class="btn-row">'+
  tombol('paramDps','Setujui versi',!['menunggu','catatan'].includes(STATE.param.keputusan),'data-op="setujui"')+
  tombol('paramDps','Minta perubahan',STATE.param.keputusan!=='menunggu','data-op="catatan"')+tautan('/admin/parameter','Penerapan oleh admin')+'</div></div>','#/dps/persetujuan')};
ROUTES['/admin/parameter']={screen:'N4',render:()=>pageWorkflow('admin','Penerapan parameter',tabelParameter()+
  '<div class="note mt24">Tombol menerapkan versi yang sudah disetujui DPS sekarang untuk uji berikutnya. Tanggal rencana dicatat sebagai metadata; tidak ada penjadwal otomatis.</div><div class="btn-row">'+
  tombol('paramTerapkan','Terapkan versi disetujui',STATE.param.keputusan!=='disetujui')+tautan('/petugas/calon-kontrak','Lihat ambang petugas')+'</div>','#/admin/parameter')};
function langkahDemo() {
  const w=wf();
  if (['draf','perbaikan','ditolak'].includes(w.tahap)) {
    if (!w.petani.persetujuan) return ['/petugas/pendataan','Mulai dari pendataan dan persetujuan petani.','Isi pendataan'];
    if (!buktiDasar()) return ['/petugas/cadangan','Lengkapi bukti dasar. Bukti contoh tersedia untuk presentasi.','Lengkapi bukti'];
    if (!w.hasil) return ['/petugas/calon-kontrak','Atur volume dan harga, kemudian jalankan empat skenario.','Jalankan uji'];
    return ['/petugas/simulasi','Tinjau hasil dan kirim usulan kepada manajer.','Lihat hasil uji'];
  }
  if (w.tahap==='diajukan') return ['/manajer/detail-persetujuan','Berikutnya: manajer memeriksa bukti dan mencatat keputusan.','Tinjau usulan'];
  if (w.tahap==='disetujui') {
    if (!w.dibaca) return ['/petugas/ringkasan-akad','Usulan disetujui. Bacakan ringkasan kepada petani.','Bacakan ringkasan'];
    if (!w.jawaban.every(x=>x==='benar')) return ['/petugas/uji-pemahaman','Catat lima jawaban petani sebelum tanda tangan.','Uji pemahaman'];
    return ['/petugas/tanda-tangan','Pemahaman lengkap. Catat bukti tanda tangan.','Bukti tanda tangan'];
  }
  if (w.tahap==='ditandatangani') return ['/petugas/kontrak','Catat bukti pembayaran penuh dari lembaga.','Bukti pembayaran'];
  if (w.tahap==='dibayar') return ['/petugas/serah-terima','Catat berat, mutu, saksi, dan bukti penyerahan.','Catat penyerahan'];
  if (w.tahap==='penyerahan') return ['/manajer/detail-kontrak','Manajer meninjau penyerahan dan penyelesaian keberatan.','Tinjau penyerahan'];
  return ['/dps/arsip','Alur selesai. Lihat dokumen dan jejak keputusan.','Buka arsip'];
}
function pemanduDemo() {
  const [route,text,label]=langkahDemo();
  if (location.hash==='#'+route) return '';
  return '<aside class="demo-next" aria-label="Langkah demo berikutnya"><p>'+text+'</p>'+tautan(route,label)+'</aside>';
}
function infoPublik(judul,isi) {
  return '<div class="pub">'+phead()+'<div class="pform"><h1>'+judul+'</h1>'+isi+'</div>'+pfoot()+'</div>';
}
ROUTES['/panduan-demo']={screen:'P6',render:()=>infoPublik('Demo Tandur untuk presentasi',
  '<p class="sub">Satu kasus petani, satu alur utuh. Semua data contoh dapat diubah; tidak ada pembayaran atau pesan yang dikirim.</p>'+
  '<div class="card mt24"><h2>Alur yang bisa ditunjukkan</h2><ol><li>Petugas mencatat data dan bukti.</li><li>Ubah harga menjadi Rp6.030/kg dengan volume 800 kg, lalu jalankan uji.</li><li>Manajer meninjau risiko, memverifikasi bukti, dan menyetujui dengan alasan.</li><li>Bacakan ringkasan, catat lima jawaban, serta bukti tanda tangan dan pembayaran.</li><li>Catat penyerahan, tinjau sebagai manajer, lalu buka arsip DPS.</li></ol><p>Nilai akad contoh berubah menjadi Rp4.824.000 dan mengikuti seluruh dokumen. Tombol <b>Gunakan bukti contoh</b> membantu demo tanpa berkas pribadi.</p></div>'+
  '<div class="note mt24"><b>Batas prototipe</b>Peran dapat berpindah untuk demonstrasi. Login/OTP dan pengiriman layanan eksternal adalah simulasi. Data tersimpan di browser ini; reset menghapus data demo.</div>'+
  '<div class="btn-row">'+tautan(langkahDemo()[0],'Lanjutkan demo')+tautan('/petugas/beranda','Buka dashboard')+'</div>')};
ROUTES['/privasi']={screen:'P7',render:()=>infoPublik('Data pada prototipe',
  '<div class="card"><h2>Penyimpanan lokal</h2><p>Isian, bukti, dan jejak demo disimpan di browser yang digunakan. Aplikasi ini tidak mengirimnya ke server Tandur. Berkas yang diunduh tetap berada di perangkat Anda.</p><h2>Gunakan data contoh</h2><p>Prototipe tidak menyediakan keamanan akun produksi. Gunakan nama dan bukti contoh. Pengguna perangkat atau profil browser yang sama dapat mengakses data tersimpan.</p><h2>Menghapus data</h2><p>Gunakan Reset data demo pada sidebar atau hapus data situs melalui pengaturan browser. Berkas cadangan yang sudah diunduh perlu dihapus secara terpisah.</p><p>Ini penjelasan perilaku prototipe, bukan kebijakan layanan produksi.</p></div>')};
ROUTES['/peran']={screen:'P9',render:()=>infoPublik('Peran dalam satu alur',
  '<div class="pgrid">'+PERAN.map(p=>'<div class="pcard"><h2>'+p[0]+'</h2><p>'+p[1]+'</p>'+tautan('/masuk/'+p[3],'Buka demo '+p[2])+'</div>').join('')+'</div><div class="btn-row">'+tautan('/panduan-demo','Panduan urutan demo')+'</div>')};
ROUTES['/syarat-demo']={screen:'P8',render:()=>infoPublik('Ketentuan penggunaan demo',
  '<div class="card"><p>Tandur pada halaman ini adalah prototipe untuk demonstrasi. Data, ambang, mutu, harga layanan, dan dokumen merupakan contoh atau usulan.</p><p>Hasil uji tidak menjadi persetujuan pembiayaan otomatis. Pembayaran, pengiriman pesan, dan penerbitan akun nyata tidak dilakukan oleh prototipe.</p><p>Gunakan data contoh, periksa ringkasan sebelum presentasi, dan unduh cadangan bila diperlukan. Reset menghapus data kerja lokal.</p></div><div class="btn-row">'+tautan('/panduan-demo','Panduan demo')+'</div>')};
ROUTES['/admin/templat']={screen:'N5',render:()=>pageWorkflow('admin','Dokumen dan identitas',
  '<div class="card"><h2>Logo Tandur</h2>'+logo({ink:true,size:40})+'<p>Logo ini dipakai pada halaman publik, login, sidebar, dan dokumen.</p><h2>Pratinjau dokumen dari data aktif</h2><div class="btn-row">'+
  tautan('/petugas/akad','Ringkasan akad')+tautan('/petugas/berita-acara','Berita acara')+'</div><p>Gunakan Cetak / simpan PDF pada halaman dokumen.</p></div>','#/admin/templat')};
