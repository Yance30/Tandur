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

function shell(role, activeHref, inner) {
  const n = NAV[role];
  const nav = n.items.map(it =>
    '<a href="' + it[1] + '"' + (it[1] === activeHref ? ' class="active" aria-current="page"' : '') + '>' + it[0] + '</a>'
  ).join('');
  return '<div class="shell"><aside class="sidebar">' + logo() +
    '<div class="role">' + n.role + '</div><nav>' + nav + '</nav>' +
    '<div class="foot">' + TDATA.lembaga + '<br>Data lembaga terpisah.' +
    sesiBaris(role) +
    '<a href="#/bantuan">Pusat bantuan →</a><a href="#/masuk/sesi-berakhir">Keluar dari akun</a>' +
    '<a href="#/beranda" data-aksi="resetDemo">Reset data demo</a></div></aside>' +
    '<main class="main"><div class="topbar">' +
    '<div class="search"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.5 L13 13" stroke="currentColor" stroke-width="1.5"/></svg> Cari kode petani atau akad…</div>' +
    '<div class="right"><span>Demo lokal</span><span>·</span><span>' + n.user + '</span></div></div>' +
    '<div class="content">' + inner + '</div></main></div>';
}

function larik(sisi) {
  return '<div class="larik">' + sisi.map(s => {
    const gagal = s.st === 'gagal';
    const h = gagal ? 10 : Math.min(s.rasio, 2) / 2 * 88;
    const bg = gagal ? 'background:var(--gagal);' : '';
    return '<div><div class="box"><div class="line"></div><div class="bar" style="height:' + h + '%;' + bg + '"></div></div>' +
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

const LARIK_FOOT = '<p class="foot-note mt160">Garis = 100% ambang sendiri; batas tampilan = 200%. Rupiah dan kg tidak disatukan dalam satu skala. Nilai negatif berarti di bawah ambang.</p>';

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
