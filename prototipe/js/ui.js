const ROUTES = {};

function rp(n) { return 'Rp' + n.toLocaleString('id-ID'); }

function logo(opts) {
  const o = opts || {};
  return '<span class="logo' + (o.ink ? ' ink' : '') + '"' + (o.size ? ' style="font-size:' + o.size + 'px"' : '') + '>' +
    '<img class="brand-mark" src="assets/logo-tandur.png" alt="" width="44" height="38">tandur</span>';
}

function turi(size) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    '<path d="M45 34 Q50 30 51 26" stroke="#2E7D5B" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M19 36 Q14 34 13 30" stroke="#2E7D5B" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="32" cy="40" rx="13" ry="17" fill="#F4E7D3" stroke="#E4D2B8"/>' +
    '<path d="M32 23 C30 14 24 12 20 12 C22 18 26 21 32 23Z" fill="#2E7D5B"/>' +
    '<path d="M32 23 C34 12 42 10 46 11 C44 18 38 21 32 23Z" fill="#A7D34E"/>' +
    '<circle cx="27" cy="38" r="1.6" fill="#3B3B33"/><circle cx="37" cy="38" r="1.6" fill="#3B3B33"/>' +
    '<path d="M29 44 Q32 46.5 35 44" stroke="#3B3B33" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="24" cy="42" r="2" fill="#E8B7A0" opacity=".7"/><circle cx="40" cy="42" r="2" fill="#E8B7A0" opacity=".7"/></svg>';
}

function lock() {
  return '<svg width="11" height="12" viewBox="0 0 12 13" class="lock-ico" aria-hidden="true" focusable="false">' +
    '<rect x="1.5" y="5.5" width="9" height="6.5" rx="1.5" fill="#8A7A12"/>' +
    '<path d="M3.5 5.5 V4 a2.5 2.5 0 0 1 5 0 v1.5" fill="none" stroke="#8A7A12" stroke-width="1.5"/></svg>';
}

const GLYPH = { ok: '✓', tinjau: '△', gagal: '×', tunggu: '○', belum: '–', estimasi: '=' };
function st(kind, text) {
  return '<span class="st-' + kind + '">' + (GLYPH[kind] || '') + (text ? ' ' + text : '') + '</span>';
}
function duo(pair) {
  return pair.split('/').map(k => GLYPH[k] || '–').join(' / ');
}

const NAV = {
  petugas: {
    role: 'Petugas lapangan', user: 'Rina S.', items: [
      ['Beranda petugas', '#/petugas/beranda', 'F1'],
      ['Data petani', '#/petugas/data-petani', 'F2'],
      ['Calon kontrak', '#/petugas/calon-kontrak', 'F7'],
      ['Ringkasan akad', '#/petugas/ringkasan-akad', 'F10'],
      ['Serah terima', '#/petugas/serah-terima', 'F14'],
      ['Keberatan', '#/petugas/keberatan', 'F15']
    ]
  },
  manajer: {
    role: 'Manajer pembiayaan', user: 'Ayu P.', items: [
      ['Portofolio', '#/manajer/portofolio', 'M1'],
      ['Antrean persetujuan', '#/manajer/antrean', 'M2'],
      ['Detail kontrak', '#/manajer/detail-kontrak', 'M4'],
      ['Risiko portofolio', '#/manajer/risiko', 'M5'],
      ['Parameter & laporan', '#/manajer/parameter', 'M6']
    ]
  },
  dps: {
    role: 'Dewan Pengawas Syariah', user: 'Hasan M.', items: [
      ['Arsip akad', '#/dps/arsip', 'D1'],
      ['Jejak keputusan', '#/dps/jejak', 'D2'],
      ['Persetujuan parameter', '#/dps/persetujuan', 'D3'],
      ['Laporan', '#/dps/laporan', 'D4']
    ]
  },
  admin: {
    role: 'Admin lembaga', user: 'Dimas A.', items: [
      ['Kelola akun', '#/admin/kelola-akun', 'N1'],
      ['Undang pengguna', '#/admin/undang', 'N2'],
      ['Pengaturan lembaga', '#/admin/pengaturan', 'N3'],
      ['Parameter bawaan', '#/admin/parameter', 'N4'],
      ['Templat dokumen', '#/admin/templat', 'N5'],
      ['Log audit', '#/admin/log', 'N6']
    ]
  }
};

function sesiBaris(role) {
  const s = STATE.sesi;
  if (!s || s.role !== role) {
    return '<span class="sesi">Sesi demo · belum masuk</span> <a href="#/masuk/' + role + '">Masuk sebagai ' + PERAN_LABEL[role].toLowerCase() + ' →</a>';
  }
  return '<span class="sesi">Masuk sebagai ' + s.nama + ' · ' + s.waktu.split(' · ')[1] + '</span>';
}

function ikonMenu(href) {
  const paths={
    home:'M3 10 12 3l9 7v11h-6v-7H9v7H3Z',
    people:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 4a4 4 0 0 1 0 7 M22 21v-2a4 4 0 0 0-3-4',
    document:'M5 3h10l4 4v14H5Z M14 3v5h5 M8 12h8 M8 16h5',
    approval:'M5 3h14v18H5Z M8 8h8 M8 14l3 3 5-6',
    delivery:'M3 7h12v11H3Z M15 11h4l3 4v3h-7 M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M19 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    message:'M3 4h18v13H9l-6 4Z M7 8h10 M7 12h6',
    chart:'M3 3v18h18 M7 17v-5 M12 17V7 M17 17v-8',
    risk:'M12 3 2 21h20Z M12 9v5 M12 17v1',
    settings:'M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6',
    archive:'M3 3h18v5H3Z M5 8v13h14V8 M9 12h6',
    audit:'M12 3a9 9 0 1 1-8 5 M3 3v5h5 M12 7v5l4 2',
    invite:'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2 M19 7v6 M16 10h6'
  };
  const key=href.split('/').pop();
  const types={beranda:'home','data-petani':'people','calon-kontrak':'document','ringkasan-akad':'document','serah-terima':'delivery',keberatan:'message',portofolio:'chart',antrean:'approval','detail-kontrak':'document',risiko:'risk',parameter:'settings',arsip:'archive',jejak:'audit',persetujuan:'approval',laporan:'chart','kelola-akun':'people',undang:'invite',pengaturan:'settings',templat:'document',log:'audit'};
  return '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+paths[types[key]||'document']+'"/></svg>';
}
function shell(role, activeHref, inner) {
  const n = NAV[role];
  const nav = n.items.map((it, i) =>
    '<a href="' + it[1] + '"' + (it[1] === activeHref ? ' class="active" aria-current="page"' : '') + '>'+ikonMenu(it[1])+'<span>' + it[0] + '</span></a>'
  ).join('');
  return '<div class="shell"><aside class="sidebar">' + logo() +
    '<div class="role"><span class="workspace-label">RUANG KERJA</span>' + n.role + '</div><nav>' + nav + '</nav>' +
    '<div class="foot"><div class="workspace-org">' + TDATA.lembaga + '</div><p>Data lembaga terpisah.</p>' +
    sesiBaris(role) +
    '<a href="#/bantuan">Pusat bantuan →</a><a href="#/masuk/sesi-berakhir">Keluar dari akun</a>' +
    '<a href="#/beranda" data-aksi="resetDemo">Reset data demo</a></div></aside>' +
    '<main class="main"><div class="topbar">' +
    '<div class="search"><span class="workspace-section">' + PERAN_LABEL[role] + '</span><span class="topbar-divider">/</span>Kasus ' + KODE_TINJAU + '</div>' +
    '<div class="right"><span class="demo-badge">Demo lokal</span><span class="user-avatar" aria-hidden="true">' + n.user.split(' ').map(s => s[0]).join('') + '</span><span>' + n.user + '</span></div></div>' +
    '<div class="content">' + inner + '</div></main></div>';
}

function larik(sisi) {
  return '<div class="larik">' + sisi.map(s => {
    const gagal = s.st === 'gagal';
    const h = Math.max(0, Math.min(s.rasio, 2)) / 2 * 88;
    const bg = gagal ? 'background:var(--gagal);' : '';
    return '<div><div class="box" aria-hidden="true"><div class="line"></div><div class="bar" style="height:' + h + '%;' + bg + '"></div></div>' +
      '<div class="nama">' + s.nama + '</div><div class="nilai">' + st(s.st, s.nilai) + '</div>' +
      '<div class="ambang">' + s.ambang + '</div></div>';
  }).join('') + '</div>';
}

function scenTabs(active) {
  const t = [['Dasar', '#/petugas/hasil-uji/dasar'], ['Hasil −20%', '#/petugas/hasil-uji'], ['Hasil −40%', '#/petugas/hasil-uji/-40'], ['Harga −10%', '#/petugas/hasil-uji/harga']];
  return '<div class="tabs wide mt622">' + t.map(x =>
    '<a href="' + x[1] + '"' + (x[1] === active ? ' class="active"' : '') + '>' + x[0] + '</a>').join('') + '</div>';
}

const TABLE_UJI = '<table class="tbl"><tr><th>Skenario</th><th>Q / batas serah</th><th>Manfaat petani W</th><th>Kontribusi M</th><th>Hasil</th></tr>' +
  '<tr><td>Dasar</td><td>1.854 / 1.654 kg</td><td>Rp5.535.964</td><td>Rp160.000</td><td>' + st('ok', '4/4 lolos') + '</td></tr>' +
  '<tr><td>Hasil −20%</td><td>1.483,2 / 1.283,2 kg</td><td>Rp3.125.764</td><td>Rp160.000</td><td>' + st('ok', '4/4 lolos') + '</td></tr>' +
  '<tr><td>Hasil −40%</td><td>1.112,4 / 912,4 kg</td><td>Rp715.564</td><td>Rp160.000</td><td>' + st('tinjau', 'Tinjau manfaat') + '</td></tr>' +
  '<tr><td>Harga −10%</td><td>1.854 / 1.654 kg</td><td>Rp4.850.864</td><td>−Rp360.000</td><td>' + st('tinjau', 'Tinjau kontribusi') + '</td></tr></table>';

const LARIK_FOOT = '<p class="foot-note mt160">Garis = 100% ambang sendiri; batas tampilan = 200%. Rupiah dan kg tidak disatukan dalam satu skala. Nilai nol/negatif tidak memiliki batang positif; baca angka dan status di bawah grafik.</p>';

function stepper(active) {
  const steps = [['1 · Identitas & lahan', '#/petugas/pendataan'], ['2 · Biaya', '#/petugas/biaya'], ['3 · Cadangan & bukti', '#/petugas/cadangan']];
  return '<div class="tabs wide mt622">' + steps.map(s =>
    '<a href="' + s[1] + '"' + (s[1] === active ? ' class="active"' : '') + '>' + s[0] + '</a>').join('') + '</div>';
}

function placeholder(code, title) {
  return '<div class="placeholder"><div class="card"><h2>' + title + '</h2>' +
    '<p class="sub">Layar <b>' + code + '</b> belum masuk batch ini. Prototipe dibangun bertahap; menu di kiri sudah aktif untuk layar yang tersedia.</p>' +
    '<div class="btn-row"><button class="btn btn-ghost" data-back>← Kembali</button></div></div></div>';
}
