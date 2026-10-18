const KODE_TINJAU = 'TDR-0012';
const ARSIP_TINJAU = 'TDR-2027-0012-01';
const PERAN_LABEL = { petugas: 'Petugas', manajer: 'Manajer', dps: 'DPS', admin: 'Admin' };

const USERS_AWAL = [
  { nama: 'Rina S.', email: 'rina@lembaga.example', peran: 'Petugas', status: 'aktif', dua: false, terakhir: '20 Mei · 09.26' },
  { nama: 'Budi S.', email: 'budi@lembaga.example', peran: 'Petugas', status: 'aktif', dua: false, terakhir: '20 Mei · 08.30' },
  { nama: 'Nina R.', email: 'nina@lembaga.example', peran: 'Petugas', status: 'aktif', dua: false, terakhir: '19 Mei · 16.10' },
  { nama: 'Sari W.', email: 'sari@lembaga.example', peran: 'Petugas', status: 'aktif', dua: false, terakhir: '19 Mei · 15.45' },
  { nama: 'Ayu P.', email: 'ayu@lembaga.example', peran: 'Manajer', status: 'aktif', dua: true, terakhir: '20 Mei · 10.00' },
  { nama: 'Dewi K.', email: 'dewi@lembaga.example', peran: 'Manajer', status: 'aktif', dua: true, terakhir: '19 Mei · 14.20' },
  { nama: 'Hasan M.', email: 'hasan@lembaga.example', peran: 'DPS', status: 'aktif', dua: true, terakhir: '20 Mei · 10.15' },
  { nama: 'Dimas A.', email: 'dimas@lembaga.example', peran: 'Admin', status: 'aktif', dua: true, terakhir: '20 Mei · 10.20', saya: true },
  { nama: 'Fajar T.', email: 'fajar@lembaga.example', peran: 'Petugas', status: 'tunggu', dua: false, terakhir: 'Dikirim 19 Mei' },
  { nama: 'Lina P.', email: 'lina@lembaga.example', peran: 'Petugas', status: 'tunggu', dua: false, terakhir: 'Dikirim 20 Mei' },
  { nama: 'Arif D.', email: 'arif@lembaga.example', peran: 'Petugas', status: 'nonaktif', dua: false, terakhir: '2 Mei · 11.00' }
];

const LOG_AWAL = [
  { waktu: '22 Mei 10.20', pelaku: 'Dimas A. / Admin', peristiwa: 'Jadwalkan parameter', objek: 'v1.3 disetujui DPS; efektif 1 Jun', hasil: 'Tercatat' },
  { waktu: '22 Mei 09.10', pelaku: 'Hasan M. / DPS', peristiwa: 'Persetujuan versi', objek: 'v1.3; catatan keputusan disimpan', hasil: 'Tercatat' },
  { waktu: '20 Mei 11.25', pelaku: 'Hasan M. / DPS', peristiwa: 'Ekspor laporan PDF', objek: 'Jan–Mei; kode petani saja', hasil: 'Selesai' },
  { waktu: '20 Mei 10.20', pelaku: 'Dimas A. / Admin', peristiwa: 'Undang pengguna', objek: 'Lina P. / Petugas / Sumberarum', hasil: 'Terkirim' },
  { waktu: '20 Mei 10.15', pelaku: 'Hasan M. / DPS', peristiwa: 'Masuk + 2 langkah', objek: 'Sesi lembaga Tunas Makmur', hasil: 'Berhasil' },
  { waktu: '20 Mei 10.00', pelaku: 'Ayu P. / Manajer', peristiwa: 'Tinjau keberatan', objek: 'KBR-2027-0012', hasil: 'Tercatat' },
  { waktu: '19 Mei 16.20', pelaku: 'Dimas A. / Admin', peristiwa: 'Ubah kontak lembaga', objek: 'Kontak layanan diperbarui', hasil: 'Tercatat' },
  { waktu: '19 Mei 15.10', pelaku: 'Dimas A. / Admin', peristiwa: 'Kirim ulang undangan', objek: 'Fajar T. / Petugas', hasil: 'Terkirim' },
  { waktu: '12 Mei 14.00', pelaku: 'Dimas A. / Admin', peristiwa: 'Reset akses', objek: 'Budi S.; tautan pemulihan', hasil: 'Tercatat' },
  { waktu: '2 Mei 11.20', pelaku: 'Dimas A. / Admin', peristiwa: 'Nonaktifkan akun', objek: 'Arif D.; penugasan berakhir', hasil: 'Tercatat' }
];

const JEJAK_AWAL = [
  { waktu: '12 Jan · 08.40', peristiwa: 'Data usaha dicatat', rincian: 'Rina S. / Petugas · 0,4 ha, Q 1.854 kg, biaya dan cadangan; berkas-usaha-v1.' },
  { waktu: '12 Jan · 09.15', peristiwa: 'Persetujuan data', rincian: 'Rina S. · tujuan dan akses dijelaskan; persetujuan-0012.pdf.' },
  { waktu: '13 Jan · 09.40', peristiwa: 'Uji empat sisi', rincian: 'Rina S. · dasar dan −20% lolos; −40% manfaat gagal, harga −10% kontribusi gagal.' },
  { waktu: '15 Jan · 10.00', peristiwa: 'Perbaikan diminta', rincian: 'Ayu P. / Manajer · alasan: perjelas risiko dan bukti harga.' },
  { waktu: '15 Jan · 13.20', peristiwa: 'Lampiran diperbarui', rincian: 'Rina S. · dasar harga dan rencana hasil ekstrem dilengkapi; input tetap.' },
  { waktu: '15 Jan · 15.10', peristiwa: 'Calon akad disetujui', rincian: 'Ayu P. · dasar/−20% lolos; bukti diperiksa; stress ekstrem dijelaskan. Bukan persetujuan skenario gagal.' },
  { waktu: '16 Jan · 10.40', peristiwa: 'Ringkasan dibaca; 5/5', rincian: 'Rina S. · pertanyaan 4 dijelaskan ulang sebelum benar.' },
  { waktu: '16 Jan · 11.10', peristiwa: 'Dokumen ditandatangani', rincian: 'Petani, petugas, saksi · dokumen ditinjau DPS; akad-bertanda-tangan.pdf.' },
  { waktu: '16 Jan · 14.20', peristiwa: 'Bayar penuh terdokumentasi', rincian: 'Ayu P. · Rp4.800.000 langsung dari lembaga ke petani; bukti terverifikasi.' },
  { waktu: '20 Mei · 09.18', peristiwa: 'Keberatan dicatat', rincian: 'Rina S. · permintaan timbang ulang; foto-timbangan.jpg.' },
  { waktu: '20 Mei · 09.26', peristiwa: 'Serah terima diukur', rincian: 'Rina S. / Budi S. · 800 kg, air 24%, kotoran 2%; tiket ulang.' },
  { waktu: '20 Mei · 10.00', peristiwa: 'Keberatan ditinjau', rincian: 'Ayu P. · belum final pada cuplikan ini, BA menunggu.' }
];

const AKTIF_AWAL = [
  { kode: 'TDR-0012', desa: 'Sumberarum', q: '800 kg', ps: 'Rp6.000/kg', nilai: 'Rp4.800.000', serah: '20 Mei 2027', status: ['ok', 'Terjadwal'], rentan: false },
  { kode: 'TDR-0018', desa: 'Sumberarum', q: '650 kg', ps: 'Rp5.950/kg', nilai: 'Rp3.867.500', serah: '22 Mei 2027', status: ['tinjau', 'Tinjau'], rentan: true },
  { kode: 'TDR-0021', desa: 'Wringinrejo', q: '900 kg', ps: 'Rp6.050/kg', nilai: 'Rp5.445.000', serah: '24 Mei 2027', status: ['ok', 'Ditandatangani'], rentan: false },
  { kode: 'TDR-0024', desa: 'Wringinrejo', q: '700 kg', ps: 'Rp6.000/kg', nilai: 'Rp4.200.000', serah: '25 Mei 2027', status: ['tunggu', 'Bukti BA'], rentan: true },
  { kode: 'TDR-0028', desa: 'Sumberarum', q: '750 kg', ps: 'Rp5.900/kg', nilai: 'Rp4.425.000', serah: '27 Mei 2027', status: ['ok', 'Terjadwal'], rentan: false }
];

const JAM_DEMO = { mulai: 630 };
let STATE;

function muatState() {
  const p = TDATA.parameter;
  STATE = {
    sesi: null,
    menit: JAM_DEMO.mulai,
    users: USERS_AWAL.map(u => ({ ...u })),
    log: LOG_AWAL.map(l => ({ ...l })),
    jejak: JEJAK_AWAL.map(j => ({ ...j })),
    aktif: AKTIF_AWAL.map(a => ({ ...a, status: [...a.status] })),
    kandidat: TDATA.kontrak.map(k => ({ ...k, bukti: [...k.bukti], status: [...k.status], putusan: 'menunggu', alasan: '' })),
    arsip: TDATA.arsip.map(a => ({ ...a, lengkap: [...a.lengkap] })),
    param: {
      aktif: { ...p.aktif },
      usulan: { versi: p.disetujui.versi, wMin: p.disetujui.wMin, mMin: p.disetujui.mMin, efektif: p.disetujui.efektif, diajukan: '12 Mei 2027', oleh: 'Ayu P. / Manajer' },
      keputusan: 'menunggu',
      catatan: '',
      dpsOleh: '',
      tanggal: '',
      diterapkanPada: ''
    },
    serah: { putusan: 'menunggu', alasan: '', keberatan: 'terbuka', dibaca: false, ttd: false, diajukan: false }
  };
}
muatState();

function elId(id) { return document.getElementById(id); }

let jamAksi = null;

function waktuAksi() {
  if (jamAksi) return jamAksi;
  STATE.menit += 2;
  const s = String(Math.floor(STATE.menit / 60) % 24).padStart(2, '0') + '.' + String(STATE.menit % 60).padStart(2, '0');
  jamAksi = { log: '20 Mei ' + s, jejak: '20 Mei · ' + s };
  return jamAksi;
}

function peranAktif() {
  if (STATE.sesi) return STATE.sesi.role;
  const m = location.hash.match(/^#\/(petugas|manajer|dps|admin)\//);
  return m ? m[1] : null;
}

function pelaku() {
  const r = peranAktif();
  return r ? TDATA.users[r] + ' / ' + PERAN_LABEL[r] : 'Sesi demo';
}

function sesiMulai(role) {
  jamAksi = null;
  STATE.sesi = { role, nama: TDATA.users[role], waktu: waktuAksi().jejak };
  catatLog('Masuk' + (role === 'petugas' ? '' : ' + 2 langkah'), 'Sesi ' + TDATA.lembaga, 'Berhasil');
}

function sesiSelesai() { STATE.sesi = null; }

function catatLog(peristiwa, objek, hasil) {
  STATE.log.unshift({ waktu: waktuAksi().log, pelaku: pelaku(), peristiwa, objek, hasil: hasil || 'Tercatat' });
}

function tambahJejak(peristiwa, rincian, waktu) {
  STATE.jejak.push({ waktu: waktu || waktuAksi().jejak, peristiwa, rincian, baru: true });
}

function toast(pesan, jenis) {
  let wrap = elId('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-live', 'polite');
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'toast ' + (jenis || 'ok');
  t.textContent = pesan;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('hilang'); setTimeout(() => t.remove(), 260); }, 4000);
}

function alasanWajib(id, label) {
  const el = elId(id);
  const nilai = el ? el.value.trim() : '';
  if (!nilai) {
    toast(label + ' wajib diisi sebelum tindakan dikirim.', 'gagal');
    if (el) el.focus();
    return null;
  }
  return nilai;
}

const kandidat = kode => STATE.kandidat.find(k => k.kode === kode);
const arsipOf = kode => STATE.arsip.find(a => a.petani === kode);
const aktifOf = kode => STATE.aktif.find(a => a.kode === kode);
const userOf = email => STATE.users.find(u => u.email === email);
const labelAksi = el => el.dataset.label || el.textContent.trim();

const TOTAL_KONTRAK = 12;
const arsipBelumLengkap = () => STATE.arsip.filter(a => a.lengkap[0] !== 'ok').length;

function riwayatVersi() {
  const p = STATE.param;
  const aktif = p.aktif.versi + ' aktif sejak ' + p.aktif.efektif;
  if (p.keputusan === 'menunggu') return aktif + '. ' + p.usulan.versi + ' masih menunggu keputusan DPS.';
  if (p.keputusan === 'catatan') return aktif + '. ' + p.usulan.versi + ' dikembalikan ke manajer dengan catatan.';
  if (p.keputusan === 'disetujui') return aktif + '. ' + p.usulan.versi + ' disetujui DPS ' + p.tanggal + '; menunggu penerapan admin.';
  return aktif + ' · diterapkan ' + p.diterapkanPada + '. Versi sebelumnya tetap tersimpan pada jejak akad historis.';
}

const AKSI = {
  cetak() { window.print(); },

  simpan(el) {
    const l = labelAksi(el);
    catatLog(l, el.dataset.objek || 'Perubahan disimpan pada data demo');
    render();
    toast(l + ' · perubahan tersimpan pada data demo.');
  },

  ekspor(el) {
    const l = labelAksi(el);
    catatLog(l, el.dataset.objek || 'Dokumen berkode', 'Selesai');
    render();
    toast(l + ' disiapkan · peristiwa tercatat di log audit.');
  },

  keputusan(el) {
    const op = el.dataset.op;
    const alasan = alasanWajib('alasan-keputusan', 'Alasan keputusan');
    if (!alasan) return;
    const k = kandidat(KODE_TINJAU);
    const a = arsipOf(KODE_TINJAU);
    const w = waktuAksi();
    if (op === 'setuju' && k.bukti[0] !== 'ok') {
      toast('Bukti belum lengkap: usulan tidak dapat disetujui. Minta petugas melengkapi.', 'gagal');
      return;
    }
    k.alasan = alasan;
    if (op === 'setuju') {
      k.putusan = 'disetujui'; k.status = ['ok', 'Disetujui'];
      tambahJejak('Calon akad disetujui', pelaku() + ' · alasan: ' + alasan + ' · parameter ' + STATE.param.aktif.versi + '.', w.jejak);
      if (a) { a.keputusan = 'Manajer ' + w.jejak.split(' · ')[1] + ' · disetujui'; }
      catatLog('Keputusan pembiayaan', KODE_TINJAU + ' · disetujui');
      toast(KODE_TINJAU + ' disetujui pada parameter ' + STATE.param.aktif.versi + '. Jejak ditambahkan.');
    } else if (op === 'tolak') {
      k.putusan = 'ditolak'; k.status = ['gagal', 'Ditolak'];
      tambahJejak('Usulan ditolak', pelaku() + ' · alasan: ' + alasan + '. Riwayat sebelumnya tetap tersimpan.', w.jejak);
      if (a) { a.keputusan = 'Manajer ' + w.jejak.split(' · ')[1] + ' · ditolak'; a.lengkap = ['gagal', 'Ditolak']; }
      catatLog('Keputusan pembiayaan', KODE_TINJAU + ' · ditolak');
      toast(KODE_TINJAU + ' ditolak dengan alasan tercatat.', 'gagal');
    } else {
      k.putusan = 'perbaikan'; k.status = ['tinjau', 'Perbaikan diminta'];
      tambahJejak('Perbaikan diminta', pelaku() + ' · alasan: ' + alasan + '. Petugas mengirim ulang versi.', w.jejak);
      if (a) { a.keputusan = 'Perbaikan diminta ' + w.jejak.split(' · ')[1]; a.lengkap = ['tinjau', 'Perbaikan diminta']; }
      catatLog('Keputusan pembiayaan', KODE_TINJAU + ' · minta perbaikan');
      toast('Perbaikan diminta untuk ' + KODE_TINJAU + '. Status antrean diperbarui.', 'tunggu');
    }
    render();
  },

  serah(el) {
    const op = el.dataset.op;
    if (op === 'klarifikasi') {
      const alasan = alasanWajib('alasan-serah', 'Alasan klarifikasi');
      if (!alasan) return;
      tambahJejak('Klarifikasi serah terima diminta', pelaku() + ' · ' + alasan);
      catatLog('Minta klarifikasi serah terima', ARSIP_TINJAU);
      render();
      toast('Klarifikasi dikirim ke petugas. Serah terima belum final.', 'tunggu');
      return;
    }
    const alasan = alasanWajib('alasan-serah', 'Alasan persetujuan');
    if (!alasan) return;
    const w = waktuAksi();
    STATE.serah.putusan = 'disetujui';
    STATE.serah.alasan = alasan;
    STATE.serah.pada = w.jejak;
    const a = aktifOf(KODE_TINJAU);
    if (a) a.status = ['ok', 'Selesai'];
    const ar = arsipOf(KODE_TINJAU);
    if (ar) ar.lengkap = ['ok', 'Lengkap'];
    tambahJejak('Serah terima disetujui', pelaku() + ' · 800 kg, kadar air 24%, kotoran 2% · alasan: ' + alasan);
    catatLog('Setujui serah terima', ARSIP_TINJAU);
    render();
    toast('Serah terima disetujui. Portofolio dan arsip DPS ikut diperbarui.');
  },

  keberatan(el) {
    if (el.dataset.op === 'bukti') {
      tambahJejak('Bukti tambahan diminta untuk keberatan', pelaku() + ' · KBR-2027-0012 belum ditutup.');
      catatLog('Minta bukti keberatan', 'KBR-2027-0012');
      render();
      toast('Permintaan bukti tambahan tercatat. Keberatan masih terbuka.', 'tunggu');
      return;
    }
    const alasan = alasanWajib('alasan-keberatan', 'Keputusan penyelesaian');
    if (!alasan) return;
    const w = waktuAksi();
    STATE.serah.keberatan = 'selesai';
    STATE.serah.keberatanAlasan = alasan;
    STATE.serah.keberatanPada = w.jejak;
    tambahJejak('Keberatan diselesaikan', pelaku() + ' · KBR-2027-0012 · ' + alasan, w.jejak);
    catatLog('Tutup keberatan', 'KBR-2027-0012');
    render();
    toast('Keberatan KBR-2027-0012 ditutup dengan keputusan tercatat.');
  },

  bukti(el) {
    const k = kandidat(el.dataset.kode || KODE_TINJAU);
    if (!k) return;
    if (k.bukti[0] === 'ok') { toast('Bukti ' + k.kode + ' sudah lengkap.', 'tunggu'); return; }
    k.bukti = ['ok', 'Lengkap'];
    const ar = arsipOf(k.kode);
    if (ar) ar.lengkap = ['ok', 'Lengkap'];
    tambahJejak('Bukti lapangan dilengkapi', pelaku() + ' · ' + k.kode + ' · lampiran diverifikasi petugas.');
    catatLog('Lengkapi bukti', k.kode);
    render();
    toast('Bukti ' + k.kode + ' ditandai lengkap. Manajer dapat meninjau ulang.');
  },

  paramDps(el) {
    const catatan = alasanWajib('catatan-dps', 'Catatan penilaian');
    if (!catatan) return;
    const w = waktuAksi();
    const v = STATE.param.usulan.versi;
    STATE.param.catatan = catatan;
    STATE.param.dpsOleh = pelaku();
    STATE.param.tanggal = w.jejak;
    if (el.dataset.op === 'catatan') {
      STATE.param.keputusan = 'catatan';
      catatLog('Catatan perubahan parameter', v + ' · dikembalikan ke manajer');
      render();
      toast('Catatan perubahan dikirim ke manajer. ' + v + ' belum disetujui.', 'tunggu');
      return;
    }
    STATE.param.keputusan = 'disetujui';
    catatLog('Persetujuan versi', v + '; catatan keputusan disimpan');
    render();
    toast(v + ' disetujui DPS. Admin lembaga kini dapat menjadwalkan penerapan.');
  },

  paramTerapkan() {
    const u = STATE.param.usulan;
    if (STATE.param.keputusan !== 'disetujui') {
      toast('Versi ' + u.versi + ' belum disetujui DPS, jadi tidak dapat diterapkan.', 'gagal');
      return;
    }
    const tgl = elId('tanggal-terapkan');
    const efektif = tgl && tgl.value.trim() ? tgl.value.trim() : u.efektif;
    const w = waktuAksi();
    STATE.param.aktif = { versi: u.versi, efektif: efektif, wMin: u.wMin, mMin: u.mMin };
    STATE.param.keputusan = 'diterapkan';
    STATE.param.diterapkanPada = w.jejak;
    catatLog('Terapkan parameter', u.versi + ' aktif per ' + efektif + '; W_min ' + rp(u.wMin) + ', M_min ' + rp(u.mMin));
    render();
    toast(u.versi + ' diterapkan. Ambang aktif berubah untuk calon akad musim berikutnya.');
  },

  akun(el) {
    const u = userOf(el.dataset.email);
    if (!u) return;
    const op = el.dataset.op;
    if (op === 'nonaktif') {
      u.status = 'nonaktif'; u.terakhir = waktuAksi().jejak;
      catatLog('Nonaktifkan akun', u.nama + '; jejak pekerjaan tetap tersimpan');
      toast('Akun ' + u.nama + ' dinonaktifkan. Riwayat pekerjaannya tetap ada.');
    } else if (op === 'aktif') {
      u.status = 'aktif'; u.terakhir = waktuAksi().jejak;
      catatLog('Aktifkan kembali akun', u.nama);
      toast('Akun ' + u.nama + ' diaktifkan kembali.');
    } else if (op === 'ulang') {
      u.terakhir = 'Dikirim ulang ' + waktuAksi().jejak.split(' · ')[1];
      catatLog('Kirim ulang undangan', u.nama + ' / ' + u.peran, 'Terkirim');
      toast('Undangan untuk ' + u.nama + ' dikirim ulang.');
    } else if (op === 'batalkan') {
      STATE.users = STATE.users.filter(x => x.email !== u.email);
      catatLog('Batalkan undangan', u.nama + ' / ' + u.peran);
      toast('Undangan ' + u.nama + ' dibatalkan.', 'tunggu');
    } else if (op === 'reset') {
      u.terakhir = 'Reset akses ' + waktuAksi().jejak.split(' · ')[1];
      catatLog('Reset akses', u.nama + '; tautan pemulihan dikirim');
      toast('Tautan pemulihan dikirim ke ' + u.email + '.');
    } else if (op === 'peran') {
      u.peran = u.peran === 'Petugas' ? 'Manajer' : 'Petugas';
      catatLog('Ubah peran', u.nama + ' → ' + u.peran + '; alasan: penugasan musim berikutnya');
      toast('Peran ' + u.nama + ' diubah menjadi ' + u.peran + '.');
    } else {
      toast('Riwayat akun ' + u.nama + ' tersedia pada log audit lembaga.', 'tunggu');
    }
    render();
  },

  undang() {
    const nama = elId('undang-nama'), email = elId('undang-email'), peran = elId('undang-peran');
    if (!nama.value.trim() || !email.value.trim()) {
      toast('Nama dan email kerja wajib diisi.', 'gagal');
      (nama.value.trim() ? email : nama).focus();
      return;
    }
    const mandat = elId('undang-mandat');
    if (mandat && !mandat.checked) {
      toast('Mandat dan kontak pengguna harus diverifikasi lebih dahulu.', 'gagal');
      mandat.focus();
      return;
    }
    const alamat = email.value.trim().toLowerCase();
    if (userOf(alamat)) { toast('Email itu sudah terdaftar di lembaga ini.', 'gagal'); return; }
    STATE.users.push({
      nama: nama.value.trim(), email: alamat, peran: peran.value, status: 'tunggu', dua: false,
      terakhir: 'Dikirim ' + waktuAksi().jejak.split(' · ')[1]
    });
    catatLog('Undang pengguna', nama.value.trim() + ' / ' + peran.value, 'Terkirim');
    toast('Undangan untuk ' + nama.value.trim() + ' dikirim. Akun aktif setelah aktivasi.');
    location.hash = '/admin/kelola-akun';
  },

  bacakan() {
    const w = waktuAksi();
    STATE.serah.dibaca = true;
    STATE.serah.dibacaPada = w.jejak.split(' · ')[1];
    tambahJejak('Ringkasan akad dibacakan', pelaku() + ' · ' + ARSIP_TINJAU + ' · uang muka, volume, harga, waktu, mutu, dan cadangan dijelaskan kepada petani.', w.jejak);
    catatLog('Tandai ringkasan dibacakan', ARSIP_TINJAU);
    render();
    toast('Pembacaan tercatat pada jejak. Lanjutkan ke uji pemahaman lima pertanyaan.');
  },

  ulang() {
    toast('Pertanyaan diulang untuk petani. Jawaban belum dinilai benar.', 'tunggu');
  },

  pesan(el) {
    toast(el.dataset.pesan || labelAksi(el), el.dataset.jenis || 'tunggu');
  },

  jelaskan(el) {
    const w = waktuAksi();
    const topik = el.dataset.topik || 'pertanyaan yang belum tepat';
    tambahJejak('Penjelasan ulang dicatat', pelaku() + ' · ' + topik + ' · petugas menjelaskan ulang tanpa menguji hafalan.', w.jejak);
    catatLog('Catat penjelasan ulang', ARSIP_TINJAU);
    render();
    toast('Penjelasan ulang ' + topik + ' tersimpan pada jejak keputusan.', 'tunggu');
  },

  tandatangani() {
    if (STATE.serah.ttd) { toast('Bukti tanda tangan ' + ARSIP_TINJAU + ' sudah tersimpan.', 'tunggu'); return; }
    const w = waktuAksi();
    STATE.serah.ttd = true;
    STATE.serah.ttdPada = w.jejak.split(' · ')[1];
    tambahJejak('Dokumen ditandatangani', pelaku() + ' · petani, petugas, saksi · pemahaman 5/5 diperiksa sebelum tanda tangan.', w.jejak);
    catatLog('Simpan bukti tanda tangan', ARSIP_TINJAU);
    render();
    toast('Bukti tanda tangan tersimpan. Pembayaran penuh di muka menjadi tahap berikutnya.');
  },

  ajukan() {
    if (STATE.serah.diajukan) { toast(ARSIP_TINJAU + ' sudah diajukan ke manajer.', 'tunggu'); return; }
    const w = waktuAksi();
    STATE.serah.diajukan = true;
    const ar = arsipOf(KODE_TINJAU);
    if (ar) ar.lengkap = ['tunggu', 'Menunggu manajer'];
    const k = kandidat(KODE_TINJAU);
    if (k) { k.putusan = 'diajukan'; k.status = ['tunggu', 'Menunggu manajer']; }
    tambahJejak('Berita acara diajukan ke manajer', pelaku() + ' · ' + ARSIP_TINJAU + ' · bukti timbang, mutu, dan saksi terlampir.', w.jejak);
    catatLog('Ajukan berita acara', ARSIP_TINJAU);
    render();
    toast('Diajukan ke manajer. Antrean persetujuan dan arsip DPS ikut diperbarui.');
  },

  kirimUlang() {
    const k = kandidat(KODE_TINJAU);
    if (k.putusan === 'disetujui' || k.putusan === 'ditolak') {
      toast('Keputusan manajer sudah final untuk ' + KODE_TINJAU + '.', 'tunggu');
      return;
    }
    const w = waktuAksi();
    k.putusan = 'diajukan'; k.status = ['tunggu', 'Menunggu manajer'];
    const ar = arsipOf(KODE_TINJAU);
    if (ar) { ar.keputusan = 'Versi baru dikirim ' + w.jejak.split(' · ')[1]; ar.lengkap = ['tunggu', 'Menunggu manajer']; }
    tambahJejak('Versi usulan dikirim ulang', pelaku() + ' · ' + ARSIP_TINJAU + ' · catatan perbaikan manajer ditindaklanjuti; input uji tidak berubah.', w.jejak);
    catatLog('Kirim ulang usulan', ARSIP_TINJAU);
    render();
    toast('Versi baru masuk antrean manajer. Persetujuan kini dapat dilakukan.');
    location.hash = '/manajer/antrean';
  },

  resetDemo() {
    muatState();
    render();
    toast('Data demo dikembalikan ke keadaan awal.');
  }
};

function jalankanAksi(el) {
  jamAksi = null;
  const fn = AKSI[el.dataset.aksi];
  if (!fn) { toast('Tindakan "' + labelAksi(el) + '" belum terhubung ke data di prototipe ini.', 'tunggu'); return; }
  fn(el);
}
