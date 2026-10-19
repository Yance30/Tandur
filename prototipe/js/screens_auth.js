const LOGIN_ROLES = ['petugas', 'manajer', 'dps', 'admin'];
const LOGIN_NAMA = { petugas: 'Petugas', manajer: 'Manajer', dps: 'DPS', admin: 'Admin' };
const LOGIN_EMAIL = {
  petugas: 'rina@lembaga.example',
  manajer: 'ayu@lembaga.example',
  dps: 'hasan@lembaga.example',
  admin: 'dimas@lembaga.example'
};

function loginMask(role) {
  return LOGIN_EMAIL[role][0] + '•••@lembaga.example';
}

function loginRoute(role, verif) {
  return { screen: verif ? 'A2' : 'A1', render() { return verif ? renderVerif(role) : renderLogin(role); } };
}

function loginBtnLabel(role) {
  return role === 'petugas' ? 'Masuk → Beranda petugas' : 'Masuk → Verifikasi dua langkah';
}

function renderLogin(role) {
  const tabs = LOGIN_ROLES.map(r =>
    '<button data-tab="' + r + '"' + (r === role ? ' class="active"' : '') + '>' + LOGIN_NAMA[r] + '</button>').join('');
  return '<div class="login">' + authLeft() +
    '<div class="right"><a class="back" href="#/beranda">← Kembali ke beranda</a>' +
    '<h1 id="login-title">Masuk sebagai ' + LOGIN_LABEL[role][0] + '</h1>' +
    '<p class="sub" id="login-sub">Lanjutkan ke ' + LOGIN_LABEL[role][1] + '.</p>' +
    '<div class="tabs">' + tabs + '</div>' +
    '<div class="note m220"><b>Masuk ke demo</b>Pilih peran untuk melihat alur petugas, manajer, DPS, atau admin. Kata sandi dan verifikasi pada prototipe ini disimulasikan; jangan gunakan kredensial asli.</div>' +
    '<div class="field"><label>Lembaga</label><select><option>' + TDATA.lembaga + '</option></select></div>' +
    '<div class="field"><label>Email atau nomor telepon</label><input id="login-email" value="' + LOGIN_EMAIL[role] + '"></div>' +
    pwdField('Kata sandi', true) +
    '<label class="check"><input type="checkbox" checked> Ingat pada perangkat pribadi; jangan aktifkan pada perangkat bersama.</label>' +
    '<p class="sub"><a href="#/masuk/lupa">Lupa kata sandi →</a></p>' +
    '<button class="btn btn-primary" id="login-btn" data-role="' + role + '"' +
      (role === 'petugas' ? '' : ' data-verify="1"') + ' data-login="1">' + loginBtnLabel(role) + '</button>' +
    '<p class="sub mt18">Akun hanya diterbitkan lembaga. Minta undangan admin, bukan pendaftaran mandiri.</p>' +
    '<p class="sub"><a href="#/masuk/aktivasi">Aktivasi akun undangan →</a> · <a href="#/masuk/sesi-berakhir">Contoh sesi berakhir →</a></p>' +
    '<p class="sub">Hak akses mengikuti akun lembaga. · <a href="#/privasi">Privasi</a> · <a href="#/bantuan">Bantuan akses akun</a></p></div></div>';
}

function authLeft() {
  return '<div class="left">' + logo() +
    '<div class="tag">MENUMBUHKAN KEJELASAN</div>' +
    '<h1>Satu akad. Empat sisi yang harus terjaga.</h1>' +
    '<div class="turi-card">' + turi(120) + '<p>Turi mengingatkan: jelaskan dahulu, pastikan dipahami, baru tandatangani.</p></div>' +
    '<div class="small">Akun hanya diterbitkan lembaga. Petani tidak perlu masuk ke Tandur.</div></div>';
}

function authRight(inner) {
  return '<div class="right"><a class="back" href="#/beranda">← Kembali ke beranda</a>' + inner +
    '<p class="sub mt26">Hak akses mengikuti akun lembaga. <a href="#/privasi">Privasi</a> · <a href="#/bantuan">Bantuan akses akun</a></p></div>';
}

function pwdField(label, eye) {
  return '<div class="field"><label>' + label + '</label>' +
    '<div class="flex-row"><input type="password" value="contoh-sandi-12" class="flex1">' +
    (eye ? '<button type="button" class="password-toggle" data-toggle-password aria-pressed="false">Tampilkan</button>' : '') +
    '</div></div>';
}

function renderVerif(role) {
  const kotak = ['2', '7', '1', '8', '4', '0'].map((v, i) =>
    '<input id="otp-' + (i + 1) + '" value="' + v + '" maxlength="1" inputmode="numeric" autocomplete="one-time-code" aria-label="Digit verifikasi ke-' + (i + 1) + '"' +
    (v ? '' : ' placeholder="·"') + (i === 3 ? ' class="on"' : '') + '>').join('');
  return '<div class="login">' + authLeft() + authRight(
    '<h1>Pastikan ini Anda.</h1>' +
    '<p class="sub">Kode contoh sudah diisi untuk demo ' + loginMask(role) + '. Tidak ada email atau SMS yang dikirim.</p>' +
    '<div class="note m220"><b>Wajib untuk manajer, DPS, dan admin</b>' + TDATA.lembaga + ' · ' + LOGIN_LABEL[role][1] + '</div>' +
    '<div class="field"><label id="lbl-otp" for="otp-1">Kode verifikasi</label></div>' +
    '<div class="otp mn12" role="group" aria-labelledby="lbl-otp">' + kotak + '</div>' +
    '<p class="sub">Kode berlaku 5 menit. Jangan bagikan kepada siapa pun.</p>' +
    '<div class="btn-row"><button class="btn btn-primary" data-role="' + role + '" data-login="1">Verifikasi → ' + LOGIN_LABEL[role][1] + '</button></div>' +
    '<p class="sub mt18">Kirim ulang dalam 00:42</p>' +
    '<p class="sub"><b><a href="#/masuk/' + role + '" class="nodeco">Gunakan akun lain</a> · <a href="#/bantuan" class="nodeco">Bantuan verifikasi</a></b></p>');
}

ROUTES['/masuk'] = loginRoute('manajer', false);
ROUTES['/masuk/verifikasi'] = loginRoute('manajer', true);
LOGIN_ROLES.forEach(r => {
  ROUTES['/masuk/' + r] = loginRoute(r, false);
  ROUTES['/masuk/verifikasi/' + r] = loginRoute(r, true);
});

ROUTES['/masuk/lupa'] = {
  screen: 'A3',
  render() {
    return '<div class="login">' + authLeft() + authRight(
      '<h1>Pulihkan akses Anda.</h1>' +
      '<p class="sub">Gunakan email atau nomor telepon yang tercatat pada akun lembaga.</p>' +
      '<div class="field mt22"><label>Lembaga</label><input value="' + TDATA.lembaga + '"></div>' +
      '<div class="field"><label>Email atau nomor telepon</label><input value="rina@lembaga.example"></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/masuk/atur-ulang">Kirim tautan pemulihan</a></div>' +
      '<div class="note m220"><b>Jika akun ada, tautan sudah dikirim</b>Periksa kotak masuk dan folder spam. Pesan ini tidak mengonfirmasi apakah akun terdaftar.</div>' +
      '<p class="sub">Tautan hanya berlaku sekali. Jika kontak Anda berubah, hubungi admin lembaga untuk verifikasi identitas.</p>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/masuk">Kembali ke Masuk</a></div>') +
      '</div>';
  }
};

ROUTES['/masuk/atur-ulang'] = {
  screen: 'A4',
  render() {
    return '<div class="login">' + authLeft() + authRight(
      '<h1>Buat kata sandi baru.</h1>' +
      '<p class="sub">Tautan pemulihan valid · KSPPS Tunas Makmur (contoh).</p>' +
      '<div class="mt22">' + pwdField('Kata sandi baru', true) + pwdField('Ulangi kata sandi baru', true) + '</div>' +
      '<div class="note"><b>✓ Persyaratan terpenuhi</b>Minimal 12 karakter · huruf besar dan kecil · angka atau simbol · berbeda dari kata sandi sebelumnya.</div>' +
      '<label class="check m180"><input type="checkbox" checked> Akhiri sesi lain setelah perubahan. Draf tersimpan tidak dihapus.</label>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/masuk">Simpan kata sandi → Masuk</a></div>' +
      '<p class="sub mt18">Jangan gunakan nama petani, tanggal lahir, atau nomor lembaga sebagai kata sandi.</p>') +
      '</div>';
  }
};

ROUTES['/masuk/aktivasi'] = {
  screen: 'A5',
  render() {
    return '<div class="login">' + authLeft() + authRight(
      '<h1>Selamat datang, Rina.</h1>' +
      '<p class="sub">Peran ditetapkan oleh admin, bukan dipilih sendiri.</p>' +
      '<div class="note m220"><b>Undangan: Petugas lapangan</b>' + TDATA.lembaga + '. rina@lembaga.example · berlaku sampai 13 Jan 2027.</div>' +
      '<div class="field"><label>Nama pengguna</label><input value="Rina Setyaningrum"></div>' +
      pwdField('Buat kata sandi', true) +
      '<p class="sub mn12020 fs13">Minimal 12 karakter, huruf besar/kecil dan angka atau simbol.</p>' +
      pwdField('Ulangi kata sandi', false) +
      '<label class="check"><input type="checkbox" checked> Saya memahami kebijakan kerahasiaan dan penggunaan data sesuai peran.</label>' +
      '<div class="btn-row"><button class="btn btn-primary" data-role="petugas" data-login="1">Aktifkan → Beranda petugas</button></div>' +
      '<p class="sub mt18">Petugas dapat mendata dan menguji; tidak dapat menyetujui pembiayaan atau mengubah ambang DPS.</p>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/bantuan">Laporkan undangan keliru</a></div>') +
      '</div>';
  }
};

ROUTES['/masuk/sesi-berakhir'] = {
  screen: 'A6',
  render() {
    return '<div class="login">' + authLeft() + authRight(
      '<h1>Sesi Anda telah berakhir.</h1>' +
      '<p class="sub">Masuk kembali untuk melindungi data lembaga pada perangkat ini.</p>' +
      '<div class="note m220"><b>✓ Draf yang tersimpan tetap aman</b>Terakhir disimpan 12 Jan 2027, 10.24 WIB. Tidak ada perubahan pada data setelah sesi berakhir.</div>' +
      '<div class="card"><h2>Lanjutkan pekerjaan</h2><p class="mb10 b6">TDR-0012 · Pendataan biaya</p>' +
      '<p class="sub m0">Langkah 2 dari 3 · kembali ke draf setelah autentikasi.</p></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/masuk">Masuk lagi</a></div>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/beranda">Kembali ke landing</a></div>' +
      '<p class="sub mt18">Jika menggunakan perangkat bersama, tutup halaman setelah keluar. Perubahan yang belum disimpan perlu diperiksa kembali.</p>') +
      '</div>';
  }
};

ROUTES['/bantuan'] = {
  screen: 'S3',
  render() {
    const err = (code, judul, isi, btns) => '<div class="card err"><div class="col"><div class="code">' + code + '</div>' + turi(96) + '</div>' +
      '<div><h2>' + judul + '</h2><p>' + isi + '</p><div class="btn-row">' + btns + '</div></div></div>';
    return '<div class="help">' + logo() +
      '<h1>Tetap jelas, termasuk saat ada kendala.</h1>' +
      '<p class="sub">Keadaan sistem · contoh pesan yang dapat dibaca, tindakan berikutnya, dan alasan pembatasan.</p>' +
      '<div class="mt26">' +
      err('403', 'Akses ini tidak tersedia untuk peran Anda.',
        'Anda masuk sebagai Petugas lapangan. Persetujuan pembiayaan hanya tersedia bagi Manajer pembiayaan. Pilihan peran pada landing tidak mengubah izin akun.',
        '<a class="btn btn-primary" href="#/petugas/beranda">Kembali ke Beranda petugas</a><button class="btn btn-ghost" data-aksi="pesan" data-pesan="Kontak admin lembaga: layanan@lembaga.example · 08·· ···· 2180 (contoh).">Hubungi admin lembaga</button>') +
      err('404', 'Halaman atau berkas tidak ditemukan.',
        'Kode mungkin keliru, atau dokumen tidak tersedia untuk lembaga Anda. Periksa kode akad tanpa membagikan identitas petani.',
        '<a class="btn btn-primary" href="#/dps/arsip">Cari kode akad</a><a class="btn btn-ghost" href="#/beranda">Kembali ke beranda</a>') +
      err('500', 'Ada kendala di sisi layanan.',
        'Permintaan belum selesai. Draf yang sudah tersimpan tetap aman; periksa status sebelum mengirim ulang agar tidak membuat catatan ganda. Referensi bantuan: TDR-SYS-0527 (contoh).',
        '<button class="btn btn-primary" data-aksi="pesan" data-pesan="Permintaan diulang. Draf yang tersimpan tetap aman; tidak ada catatan ganda.">Coba lagi</button><button class="btn btn-ghost" data-aksi="pesan" data-pesan="Bantuan: layanan@lembaga.example · referensi TDR-SYS-0527 (contoh).">Hubungi bantuan</button>') +
      '</div>' +
      '<div class="grid g2 mb24">' +
      '<div class="card"><h2>Notifikasi dan konfirmasi</h2>' +
      '<div class="note mb14"><b>✓ Draf tersimpan</b>Pendataan TDR-0012 · 12 Jan 2027 10.24 WIB.</div>' +
      '<div class="note mb14"><b>○ Permintaan tinjauan dikirim</b>Kandidat masuk Antrean persetujuan manajer, bukan langsung disetujui.</div>' +
      '<div class="alert m0"><b>× Bukti belum dapat diunggah</b>Periksa format PDF/JPG dan ukuran maksimal 10 MB, lalu coba kembali. Isian lain tetap tersimpan.</div></div>' +
      '<div class="card"><h2>Keadaan kosong dan kontrol terkunci</h2>' +
      '<h3 class="fs22">Belum ada penyerahan untuk filter ini.</h3>' +
      '<p class="sub">Ubah periode atau hapus filter desa. Kontrak tidak dihapus.</p>' +
      '<div class="btn-row"><button class="btn btn-ghost" data-aksi="pesan" data-pesan="Filter dihapus pada contoh ini. Kontrak yang ada tidak ikut terhapus.">Hapus filter</button></div>' +
      '<div class="btn-row mt12"><button class="btn btn-off" disabled>Lanjut tanda tangan</button></div>' +
      '<p class="sub mt14">Dinonaktifkan: pemahaman baru 3/5 dan bukti cadangan belum lengkap.</p></div></div>' +
      '<div class="grid g2">' +
      '<div class="card"><h2>Kesalahan isian</h2>' +
      '<div class="field"><label>Volume akad</label><input value="1.000 kg"></div>' +
      '<div class="alert m0"><b>× Volume melewati batas serah</b>Pada hasil −40%, batas 912,4 kg. Tinjau volume dan jalankan ulang; jangan menandai lolos secara manual.</div></div>' +
      '<div class="warn"><h2>Rencana pengembangan, bukan keadaan aktif</h2>' +
      '<span class="pill">Rencana tahun 2 · sinkronisasi offline</span>' +
      '<p class="mt12">Rancangan pesan masa depan: “Draf lokal menunggu sinkronisasi”. Mode ini belum tersedia pada layanan saat ini; pekerjaan lapangan sekarang memerlukan jaringan.</p></div></div>' +
      '</div>';
  }
};

function docBar(judul, href, label) {
  return '<div class="docbar"><span class="ttl">' + judul + '</span>' +
    '<button type="button" data-aksi="cetak">Cetak / simpan PDF</button>' +
    '<a href="' + href + '">' + label + '</a></div>';
}

ROUTES['/petugas/akad'] = {
  screen: 'S1',
  render() {
    return '<div class="doc">' +
      docBar('Ringkasan akad salam · TDR-2027-0012-01', '#/petugas/kontrak', 'Kembali ke Detail kontrak') +
      '<div class="wrap">' +
      '<div class="head">' + logo({ ink: true, size: 30 }) +
      '<div class="right"><span class="upper">Draf operasional · v1.2</span><br>TDR-2027-0012-01 · 16 Jan 2027</div></div>' +
      '<div class="lembaga">KSPPS Tunas Makmur — Malang (contoh)</div><hr>' +
      '<h1>Ringkasan akad salam</h1>' +
      '<p class="sub">Petani TDR-0012 · Lahan 0,4 ha · Data ilustratif</p>' +
      '<div class="green"><div class="upper">Lembaga membayar penuh di muka</div><div class="big">Rp4.800.000</div>' +
      '<p class="m0">Langsung dari lembaga kepada petani. Tandur tidak menerima atau menyalurkan uang.</p></div>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Pokok kesepakatan</th><th>Rincian</th></tr>' +
      '<tr><td>Jumlah / harga</td><td>800 kg GKP × Rp6.000/kg</td></tr>' +
      '<tr><td>Waktu / tempat</td><td>20 Mei 2027 · 09.00 WIB; Gudang Sumberarum, Malang (lokasi contoh)</td></tr>' +
      '<tr><td>Cadangan R / komitmen L</td><td>200 kg tetap milik petani / 0 kg</td></tr></table></div>' +
      '<p class="mt22">Mutu dan pemeriksaan (contoh): kadar air maks. 25%, kotoran maks. 3%, toleransi timbang ±1%. Timbang dan tiga sampel diperiksa bersama dengan alat kadar air; bukan standar tersertifikasi.</p>' +
      '<p>Jika panen gagal atau berbeda: hubungi petugas. Bukti diverifikasi dan penyelesaian dibahas bersama lembaga dan DPS sesuai akad. Tidak ada perubahan sepihak atau denda otomatis.</p>' +
      '<p class="b7">Uang muka, jumlah/harga, waktu/tempat, mutu/cadangan, dan gagal panen/kontak telah dijelaskan. Pemahaman 5/5 dicatat sebelum tanda tangan.</p>' +
      '<div class="sig"><div>Petani TDR-0012</div><div>Petugas Rina S.</div><div>Saksi Budi S.</div></div>' +
      '<p class="sub mt20">Kontak Rina S. melalui lembaga: 08·· ···· 2180. Draf legal operasional, wajib ditinjau DPS sebelum penandatanganan. Ringkasan tidak menggantikan akad dan lampirannya.</p>' +
      '<p class="foot">TDR-2027-0012-01 · 1 / 1 · <a href="#/petugas/kontrak">Kembali ke Detail kontrak</a></p>' +
      '</div></div>';
  }
};

ROUTES['/petugas/berita-acara'] = {
  screen: 'S2',
  render() {
    const s = STATE.serah;
    const tahap = s.putusan === 'disetujui' ? 'Disetujui manajer' : s.diajukan ? 'Diajukan' : 'Draf';
    return '<div class="doc">' +
      docBar('Berita acara serah terima · BA-2027-0012', '#/petugas/serah-terima', 'Kembali ke Serah terima') +
      '<div class="wrap">' +
      '<div class="head">' + logo({ ink: true, size: 30 }) +
      '<div class="right"><span class="upper">BA-2027-0012 · ' + tahap + '</span><br>20 Mei 2027 · 09.26 WIB</div></div>' +
      '<div class="lembaga">KSPPS Tunas Makmur — Malang (contoh)</div><hr>' +
      '<h1>Berita acara serah terima</h1>' +
      '<p class="sub">Akad TDR-2027-0012-01 · Petani TDR-0012 · Data ilustratif. Gudang Sumberarum, Malang (lokasi fiktif contoh).</p>' +
      '<div class="green"><div class="big mb14">800 kg GKP diterima</div>' +
      '<p class="m0">Volume akad 800 kg · Selisih 0 kg (0%)</p></div>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Pemeriksaan</th><th>Hasil</th><th>Contoh kesepakatan</th></tr>' +
      '<tr><td>Kadar air</td><td>24%</td><td>Maks. 25%</td></tr>' +
      '<tr><td>Kotoran</td><td>2%</td><td>Maks. 3%</td></tr>' +
      '<tr><td>Toleransi timbang</td><td>0 kg selisih</td><td>±1% (±8 kg)</td></tr>' +
      '<tr><td>Metode</td><td>Timbang ulang + 3 sampel</td><td>Disaksikan bersama</td></tr></table></div>' +
      '<p class="mt22">Mutu ilustratif, bukan standar tersertifikasi. Timbangan diperiksa bersama; alat kadar air digunakan pada sampel yang disepakati.</p>' +
      '<div class="dfs doc-side">' +
      '<div><p class="b7 mb8">Petugas / saksi</p><p>Rina S. / Budi S. (contoh)</p>' +
      '<p class="b7 mb8">Keberatan dan tindak lanjut</p>' +
      '<p>Satu karung ditimbang ulang. Total tetap 800 kg. Tiket ulang dan catatan saksi dilampirkan; ' +
      (s.keberatan === 'selesai' ? 'keputusan manajer tercatat ' + s.keberatanPada + ': ' + s.keberatanAlasan : 'menunggu keputusan manajer.') + '</p>' +
      '<p class="b7">' + (s.putusan === 'disetujui'
        ? 'Serah terima disetujui manajer ' + s.pada + '. Alasan: ' + s.alasan + ' BA dapat diterbitkan tanpa mengubah nilai akad.'
        : s.diajukan
          ? 'BA sudah diajukan ke manajer dan menunggu persetujuan serah terima. Tidak mengubah nilai akad.'
          : 'Draf BA belum diajukan. Petugas menyusun berita acara; manajer yang menyetujui.') + '</p></div>' +
      '<div class="side"><b>Lampiran bukti</b><p class="m120">foto-timbangan.jpg; foto-kadar-air.jpg; tiket-ulang.pdf</p>' +
      '<p class="sub m0">Area salinan foto pada dokumen cetak.</p></div></div>' +
      '<div class="sig"><div>Petani TDR-0012</div><div>Petugas Rina S.</div><div>Saksi Budi S.</div></div>' +
      '<p class="sub mt20">Salinan untuk petani dan lembaga · 08·· ···· 2180. Dokumen ilustratif; penerbitan akhir mengikuti pemeriksaan lembaga.</p>' +
      '<p class="foot">BA-2027-0012 · 1 / 1 · <a href="#/petugas/serah-terima">Kembali ke Serah terima</a></p>' +
      '</div></div>';
  }
};
