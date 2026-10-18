ROUTES['/petugas/beranda'] = {
  screen: 'F1',
  render() {
    const kontrak = STATE.kandidat.slice(0, 4).map(k =>
      '<tr><td>' + k.kode + '</td><td>' + k.volume + ' kg</td><td>' + rp(k.harga) + '</td><td>' + st(k.status[0], k.status[1]) + '</td></tr>').join('');
    return shell('petugas', '#/petugas/beranda',
      '<h1 class="page">Selamat pagi, Rina.</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · Wilayah Sumberarum &amp; Wringinrejo (contoh)</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="btn-row mb22"><a class="btn btn-primary" href="#/petugas/pendataan">Data petani baru</a></div>' +
      '<div class="banner"><div class="label">Fokus hari ini</div><h2>Dua serah terima. Satu bukti perlu dilengkapi.</h2>' +
      '<p>Periksa kesesuaian berat dan mutu bersama petani sebelum menyusun berita acara.</p></div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Agenda serah terima</h2><table class="tbl"><tr><th>Waktu / kode</th><th>Lokasi</th><th>Kesiapan</th></tr>' +
      '<tr><td>09.00 · TDR-0012</td><td>Gudang Sumberarum (contoh)</td><td>' + st('ok', '800 kg · siap dicatat') + '</td></tr>' +
      '<tr><td>13.30 · TDR-0016</td><td>Gudang Wringinrejo (contoh)</td><td>' + st('tunggu', 'Konfirmasi saksi') + '</td></tr></table>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/serah-terima">Buka Serah terima</a></div></div>' +
      '<div class="card"><h2>Kontrak terakhir</h2><table class="tbl"><tr><th>Kode petani</th><th>Volume</th><th>Harga salam</th><th>Status</th></tr>' +
      kontrak + '</table><div class="btn-row"><a class="btn btn-ghost" href="#/petugas/calon-kontrak">Lihat Detail kontrak</a></div></div>' +
      '</div><div class="grid">' +
      '<div class="card"><h2>Perlu tindakan</h2>' +
      '<div class="note mb14"><b>○ Bukti cadangan belum ada</b>TDR-0024 · Draf musim berikutnya, 1 hari menunggu. Finalisasi terkunci sampai diverifikasi.</div>' +
      '<div class="note"><b>△ Jelaskan ulang pemahaman</b>TDR-0028 · Calon akad berikutnya, pertanyaan 4 belum benar. Tanda tangan terkunci.</div>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/petugas/data-petani">Buka Data petani</a></div></div>' +
      '<div class="warn"><h3>Batas kewenangan Anda</h3><p>Anda mencatat data, menjalankan uji, membacakan ringkasan, dan mendokumentasikan penyerahan.</p>' +
      '<p><b>Keputusan pembiayaan tetap oleh manajer. Ambang tetap versi DPS.</b></p></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/cadangan'] = {
  screen: 'F5',
  render() {
    return shell('petugas', '#/petugas/data-petani',
      '<h1 class="page">Jaga cadangan keluarga.</h1>' +
      '<p class="sub">Langkah 3 dari 3 · TDR-0012 · Periksa kembali bersama petani.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      stepper('#/petugas/cadangan') +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Cadangan dan komitmen</h2>' +
      '<div class="field"><label>R · Cadangan keluarga</label><input value="200 kg GKP"></div>' +
      '<div class="verif">✓ Terverifikasi · pernyataan petani · Tambah bukti</div>' +
      '<p class="sub mb18">Tidak termasuk volume yang dijanjikan kepada lembaga.</p>' +
      '<div class="field"><label>L · Komitmen lain</label><input value="0 kg"></div>' +
      '<div class="verif">✓ Terverifikasi · pernyataan tidak ada komitmen · Tambah bukti</div>' +
      '<div class="field"><label>Catatan keluarga</label><input value="Cadangan disepakati untuk rumah tangga dan dibacakan kembali pada ringkasan."></div>' +
      '<div class="verif">✓ Terverifikasi · Tambah bukti</div></div>' +
      '<div class="card"><h2>Berkas pendukung</h2><table class="tbl"><tr><th>Dokumen</th><th>Status</th><th>Tindakan</th></tr>' +
      '<tr><td>Persetujuan data</td><td>' + st('ok', 'Terverifikasi') + '</td><td>Lihat / ganti bukti</td></tr>' +
      '<tr><td>Riwayat panen</td><td>' + st('ok', 'Terverifikasi') + '</td><td>Lihat / tambah</td></tr>' +
      '<tr><td>Dasar biaya non-tunai</td><td>' + st('estimasi', 'Estimasi terdokumentasi') + '</td><td>Tinjau catatan</td></tr>' +
      '<tr><td>Pernyataan R / L</td><td>' + st('ok', 'Terverifikasi') + '</td><td>Lihat / tambah</td></tr></table>' +
      '<div class="btn-row"><button class="btn btn-ghost" data-aksi="simpan" data-label="Tambah bukti" data-objek="Berkas pendukung TDR-0012">Tambah bukti</button></div></div>' +
      '</div><div class="grid">' +
      '<div class="warn"><h3>Tinjauan akhir</h3><p><b>TDR-0012 · 0,4 ha</b></p>' +
      '<p>Q 1.854 kg; C Rp6.115.036; tunai Rp4.925.715; dana sendiri Rp150.000; K Rp4.775.715; R 200 kg; L 0 kg.</p>' +
      '<p>[✓] Data dibacakan kembali. [✓] Persetujuan tercatat. [✓] Estimasi ditandai dengan dasar bukti.</p></div>' +
      '<div class="note"><b>○ Bukti belum ada memblokir finalisasi</b>Jika bukti R belum tersedia: tandai Belum ada dan Tambah bukti. Pada TDR-0012 bukti telah tersedia.</div>' +
      '</div></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/detail-petani">Simpan → Detail petani</a>' +
      '<a class="btn btn-ghost" href="#/petugas/biaya">Kembali ke Biaya</a><button class="btn btn-ghost" data-aksi="simpan">Simpan draf</button></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

const PETANI = [
  ['TDR-0012', 'Sumberarum / Tunas', '0,4 ha', '1.854 kg', ['ok', 'Lengkap'], ['Detail petani →', '#/petugas/detail-petani']],
  ['TDR-0016', 'Wringinrejo / Rukun', '0,5 ha', '2.300 kg', ['ok', 'Lengkap'], ['Detail petani →', '#/petugas/detail-petani']],
  ['TDR-0018', 'Sumberarum / Tunas', '0,35 ha', '1.540 kg', ['estimasi', 'Estimasi biaya'], ['Lengkapi →', '#/petugas/biaya']],
  ['TDR-0021', 'Wringinrejo / Rukun', '0,6 ha', '2.760 kg', ['ok', 'Lengkap'], ['Detail petani →', '#/petugas/detail-petani']],
  ['TDR-0024', 'Wringinrejo / Rukun', '0,3 ha', '1.300 kg', ['tunggu', 'Cadangan'], ['Lengkapi →', '#/petugas/cadangan']],
  ['TDR-0028', 'Sumberarum / Tunas', '0,45 ha', '2.020 kg', ['ok', 'Lengkap'], ['Detail petani →', '#/petugas/detail-petani']],
  ['TDR-0030', 'Sumberarum / Mekar', '0,25 ha', '1.100 kg', ['estimasi', 'Panen'], ['Lengkapi →', '#/petugas/cadangan']],
  ['TDR-0032', 'Wringinrejo / Mekar', '0,5 ha', '2.250 kg', ['ok', 'Lengkap'], ['Detail petani →', '#/petugas/detail-petani']]
];

ROUTES['/petugas/data-petani'] = {
  screen: 'F2',
  render() {
    const rows = PETANI.map(p =>
      '<tr><td>' + p[0] + '</td><td>' + p[1] + '</td><td>' + p[2] + '</td><td>' + p[3] + '</td>' +
      '<td>' + st(p[4][0], p[4][1]) + '</td><td><a href="' + p[5][1] + '">' + p[5][0] + '</a></td></tr>').join('');
    return shell('petugas', '#/petugas/data-petani',
      '<h1 class="page">Data petani</h1>' +
      '<p class="sub">Kelola bukti usaha sebelum menyusun calon kontrak.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="btn-row mb26"><a class="btn btn-primary" href="#/petugas/pendataan">Tambah data petani</a></div>' +
      '<div class="grid g3 mb24">' +
      '<div class="field"><label>Cari kode petani</label><input placeholder="TDR-…"></div>' +
      '<div class="field"><label>Desa / kelompok</label><select><option>Semua desa · semua kelompok</option></select></div>' +
      '<div class="field"><label>Luas / bukti</label><select><option>Semua luas · semua status</option></select></div></div>' +
      '<div class="note mb24"><b>○ 2 petani perlu verifikasi</b>Bukti yang belum ada atau masih estimasi harus ditinjau sebelum finalisasi akad.</div>' +
      '<div class="card"><h2>8 petani di wilayah tugas</h2><table class="tbl"><tr><th>Kode petani</th><th>Desa / kelompok</th><th>Luas</th><th>Panen estimasi</th><th>Bukti</th><th>Tindakan</th></tr>' +
      rows + '</table><p class="foot-note mt140">Menampilkan 8 dari 8 · Kode digunakan di laporan; identitas pribadi hanya pada berkas dengan izin.</p></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/pendataan">Tambah → Pendataan identitas</a>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-objek="Daftar petani berkode wilayah Sumberarum">Ekspor daftar berkode</button></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/pendataan'] = {
  screen: 'F3',
  render() {
    return shell('petugas', '#/petugas/data-petani',
      '<h1 class="page">Pendataan TDR-0012</h1>' +
      '<p class="sub">Langkah 1 dari 3 · Data identitas, lahan, dan riwayat hasil.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      stepper('#/petugas/pendataan') +
      '<div class="card"><h2>Identitas dan kontak terbatas</h2>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Kode petani</label><input value="TDR-0012 · dibuat lembaga"></div>' +
      '<div class="field"><label>Nama sesuai identitas (contoh)</label><input value="Sutrisno · hanya berkas internal"></div></div>' +
      '<div class="verif">✓ Terverifikasi · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;✓ Terverifikasi · KTP tersamarkan · Tambah bukti</div>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Desa / kelompok tani</label><input value="Sumberarum / Tunas (contoh)"></div>' +
      '<div class="field"><label>Kontak petani</label><input value="08·· ···· 3012"></div></div>' +
      '<div class="verif">✓ Terverifikasi · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;✓ Terverifikasi · Tambah bukti</div></div>' +
      '<div class="card mt24"><h2>Lahan dan panen tiga musim</h2>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Luas lahan</label><input value="0,4 ha"></div>' +
      '<div class="field"><label>Status penguasaan</label><input value="Sewa · musim Jan–Mei 2027"></div></div>' +
      '<div class="verif">✓ Terverifikasi · ukur lahan · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;✓ Terverifikasi · dokumen sewa · Tambah bukti</div>' +
      '<table class="tbl"><tr><th>Musim</th><th>Hasil GKP</th><th>Sumber bukti</th><th>Status</th></tr>' +
      '<tr><td>Jan–Mei 2026</td><td>1.820 kg</td><td>Catatan timbang</td><td>' + st('ok', 'Terverifikasi') + '</td></tr>' +
      '<tr><td>Jun–Sep 2026</td><td>1.900 kg</td><td>Catatan kelompok</td><td>' + st('ok', 'Terverifikasi') + '</td></tr>' +
      '<tr><td>Okt–Des 2026</td><td>1.842 kg</td><td>Catatan timbang</td><td>' + st('ok', 'Terverifikasi') + '</td></tr></table>' +
      '<div class="field mt22"><label>Q perkiraan panen musim ini</label><input value="1.854 kg GKP"></div>' +
      '<div class="verif">= Estimasi berdasarkan tiga musim · Tambah bukti</div>' +
      '<p class="sub">Nilai estimasi harus ditinjau dengan bukti dan penjelasan; bukan hasil panen yang dijamin.</p></div>' +
      '<div class="card mt24"><h2>Persetujuan pengumpulan data</h2>' +
      '<label class="check"><input type="checkbox" checked> Tujuan pendataan, akses peran lembaga, penggunaan kode dalam laporan, dan salinan dokumen telah dijelaskan dalam bahasa yang dipahami petani.</label>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Metode dan tanggal persetujuan</label><input value="Dibacakan & persetujuan tertulis · 12 Jan 2027"></div>' +
      '<div class="field"><label>Petugas / bukti</label><input value="Rina Setyaningrum · persetujuan-0012.pdf"></div></div>' +
      '<div class="verif">✓ Terverifikasi · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;✓ Terverifikasi · Tambah bukti</div></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/biaya">Simpan → Pendataan biaya</a>' +
      '<button class="btn btn-ghost" data-aksi="simpan">Simpan draf</button><a class="btn btn-ghost" href="#/petugas/data-petani">Kembali ke Data petani</a></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/biaya'] = {
  screen: 'F4',
  render() {
    const K = [
      ['Benih', 360000, 360000, 'ok'], ['Pupuk', 1250000, 1250000, 'ok'], ['Pestisida', 450000, 450000, 'ok'],
      ['Tenaga kerja', 2125036, 1235715, 'estimasi'], ['BBM', 280000, 280000, 'ok'], ['Air / listrik', 150000, 150000, 'ok'],
      ['Sewa lahan', 1200000, 900000, 'estimasi'], ['Lainnya', 300000, 300000, 'ok']
    ];
    const rows = K.map(k => '<tr><td>' + k[0] + '</td><td>' + rp(k[1]) + '</td><td>' + rp(k[2]) + '</td><td>' +
      st(k[3], k[3] === 'ok' ? 'Terverifikasi' : 'Estimasi') + '</td></tr>').join('');
    return shell('petugas', '#/petugas/data-petani',
      '<h1 class="page">Biaya satu musim</h1>' +
      '<p class="sub">TDR-0012 · 0,4 ha · ' + TDATA.musim + ' · Semua biaya dihitung, bukan hanya pengeluaran tunai.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      stepper('#/petugas/biaya') +
      '<div class="card"><h2>Delapan komponen biaya</h2><table class="tbl"><tr><th>Komponen</th><th>Total ekonomi</th><th>Bagian tunai</th><th>Status bukti</th></tr>' +
      rows + '</table><p class="foot-note mt140">Setiap baris: Tambah bukti → nota, catatan upah, atau penjelasan estimasi. Tenaga keluarga dan bagian sewa non-tunai tetap masuk biaya C.</p></div>' +
      '<div class="grid g3 m240">' +
      '<div class="card stat"><div class="lab">C · Biaya total</div><div class="num">Rp6.115.036</div><div class="cap">Tunai + non-tunai</div></div>' +
      '<div class="card stat"><div class="lab">Biaya tunai</div><div class="num">Rp4.925.715</div><div class="cap">Kebutuhan pembayaran musim ini</div></div>' +
      '<div class="card stat"><div class="lab">Non-tunai</div><div class="num">Rp1.189.321</div><div class="cap">Tenaga keluarga Rp889.321 + sewa Rp300.000</div></div></div>' +
      '<div class="card"><h2>Kebutuhan modal tunai</h2>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Dana sendiri</label><input value="Rp150.000"></div>' +
      '<div class="field"><label>K · Kebutuhan kas</label><input value="Rp4.775.715"></div></div>' +
      '<div class="verif">✓ Terverifikasi · pernyataan dana · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;Rp4.925.715 − Rp150.000. Hasil turunan, bukan isian manual.</div>' +
      '<div class="note mb22"><b>= Dua komponen menggunakan estimasi</b>Dasar tenaga kerja dan sewa sudah dilampirkan. Verifikasi petugas dan tinjauan manajer wajib dicatat sebelum finalisasi; nilai estimasi tidak diperlakukan sebagai nota tunai.</div>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Dasar estimasi tenaga kerja</label><input value="Hari orang kerja × upah lokal; pisahkan tenaga keluarga."></div>' +
      '<div class="field"><label>Catatan sewa</label><input value="Rp900.000 tunai; Rp300.000 non-tunai."></div></div>' +
      '<div class="verif">= Estimasi · catatan-upah.pdf · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;= Estimasi · perjanjian-sewa.pdf · Tambah bukti</div></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/cadangan">Simpan → Cadangan & bukti</a>' +
      '<button class="btn btn-ghost" data-aksi="simpan" data-label="Tambah bukti biaya" data-objek="Komponen biaya TDR-0012">Tambah bukti biaya</button><button class="btn btn-ghost" data-aksi="simpan">Simpan draf</button></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/detail-petani'] = {
  screen: 'F6',
  render() {
    const tabs = [['Ringkasan', ''], ['Lahan & panen', '#/petugas/pendataan'], ['Biaya', '#/petugas/biaya'], ['Bukti & persetujuan', '#/petugas/cadangan'], ['Kontrak', '#/petugas/kontrak']];
    return shell('petugas', '#/petugas/data-petani',
      '<h1 class="page">TDR-0012</h1>' +
      '<p class="sub">Sumberarum / Kelompok Tunas (contoh) · Diperbarui 12 Jan 2027 oleh Rina S.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="btn-row mb22"><a class="btn btn-primary" href="#/petugas/calon-kontrak">Buat calon kontrak</a></div>' +
      '<div class="tabs wide mb24">' + tabs.map(t => t[1]
        ? '<a href="' + t[1] + '">' + t[0] + '</a>'
        : '<a class="active" href="#/petugas/detail-petani">' + t[0] + '</a>').join('') + '</div>' +
      '<div class="grid g3 mb24">' +
      '<div class="card stat"><div class="lab">Lahan kelolaan</div><div class="num">0,4 ha</div><div class="cap">Sewa · bukti tersedia</div></div>' +
      '<div class="card stat"><div class="lab">Q · Panen perkiraan</div><div class="num">1.854 kg</div><div class="cap">Estimasi tiga musim</div></div>' +
      '<div class="card stat"><div class="lab">K · Kebutuhan kas</div><div class="num">Rp4.775.715</div><div class="cap">Tunai dikurangi dana sendiri</div></div></div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Usaha dan cadangan</h2><table class="tbl"><tr><th>Komponen</th><th>Nilai</th><th>Dasar bukti</th></tr>' +
      '<tr><td>Biaya ekonomi C</td><td>Rp6.115.036</td><td>8 komponen tercatat</td></tr>' +
      '<tr><td>Biaya tunai</td><td>Rp4.925.715</td><td>Nota dan catatan upah</td></tr>' +
      '<tr><td>Dana sendiri</td><td>Rp150.000</td><td>Pernyataan terverifikasi</td></tr>' +
      '<tr><td>Cadangan keluarga R</td><td>200 kg</td><td>Pernyataan terverifikasi</td></tr>' +
      '<tr><td>Komitmen lain L</td><td>0 kg</td><td>Pernyataan terverifikasi</td></tr></table></div>' +
      '<div class="card"><h2>Kontrak terkait</h2><table class="tbl"><tr><th>Kode akad</th><th>Volume / Ps</th><th>Tahap</th></tr>' +
      '<tr><td>TDR-2027-0012-01</td><td>800 kg / Rp6.000</td><td>' + st('ok', 'Terjadwal 20 Mei 2027') + '</td></tr></table>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/kontrak">Detail kontrak</a>' +
      '<a class="btn btn-ghost" href="#/petugas/ringkasan-akad">Ringkasan akad</a></div></div>' +
      '</div><div class="grid">' +
      '<div class="card"><h2>Kesiapan data</h2>' +
      '<div class="note mb16"><b>✓ Persetujuan tercatat</b>12 Jan 2027 · dibacakan dan ditandatangani.</div>' +
      '<p>✓ Identitas dan luas terverifikasi. ✓ Bukti cadangan dan komitmen lengkap. = Estimasi panen dan non-tunai ditinjau bersama petani.</p>' +
      '<p class="sub">Estimasi tetap diberi label. Pemeriksaan manajer ditautkan pada calon kontrak.</p></div>' +
      '<div class="warn"><h3>Riwayat tiga musim</h3><p>1.820 kg → 1.900 kg → 1.842 kg</p>' +
      '<p class="sub">Rata-rata 1.854 kg GKP, bukan jaminan hasil musim berjalan.</p></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/calon-kontrak'] = {
  screen: 'F7',
  render() {
    const pa = STATE.param.aktif;
    return shell('petugas', '#/petugas/calon-kontrak',
      '<h1 class="page">Susun calon kontrak</h1>' +
      '<p class="sub">TDR-2027-0012-01 · Hasil uji bukan persetujuan pembiayaan.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Volume dan harga kesepakatan</h2>' +
      '<div class="grid g2">' +
      '<div class="field"><label>q · Volume akad</label><input value="800 kg GKP"></div>' +
      '<div class="field"><label>Ps · Harga salam</label><input value="Rp6.000 / kg"></div></div>' +
      '<div class="verif">✓ Terverifikasi · calon kesepakatan · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;✓ Terverifikasi · catatan harga · Tambah bukti</div>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Ph · Harga sisa panen</label><input value="Rp6.500 / kg"></div>' +
      '<div class="field"><label>Pj · Harga jual lembaga</label><input value="Rp6.500 / kg"></div></div>' +
      '<div class="verif">= Estimasi · survei lokal · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;= Estimasi · catatan pasar · Tambah bukti</div>' +
      '<div class="field"><label>B · Biaya lembaga</label><input value="Rp240.000"></div>' +
      '<div class="verif">= Estimasi · angkut dan penanganan · Tambah bukti</div>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Tanggal penyerahan</label><input value="20 Mei 2027"></div>' +
      '<div class="field"><label>Lokasi</label><input value="Gudang Sumberarum (contoh)"></div></div>' +
      '<div class="verif">✓ Terverifikasi · Tambah bukti&nbsp;&nbsp;&nbsp;&nbsp;✓ Terverifikasi · Tambah bukti</div></div>' +
      '<div class="card"><h2>Ambang terkunci · DPS ' + pa.versi + '</h2>' +
      '<div class="grid g2">' +
      '<div class="field"><label>W_min</label><input value="' + lock() + ' ' + rp(pa.wMin) + '"></div>' +
      '<div class="field"><label>M_min</label><input value="' + lock() + ' ' + rp(pa.mMin) + '"></div></div>' +
      '<div class="verif">Petugas tidak dapat mengubah.&nbsp;&nbsp;&nbsp;&nbsp;Aktif sejak ' + pa.efektif + '.</div>' +
      '<p class="sub">Ambang lokal disepakati dengan petani. Manajer mengusulkan, DPS menyetujui, admin hanya menerapkan versi disetujui. Akad yang sudah ditandatangani tetap memakai versi saat penyusunan.</p></div>' +
      '</div><div class="grid">' +
      '<div class="warn"><h3>Konteks petani</h3><p><b>TDR-0012 · 0,4 ha</b></p>' +
      '<p>Q 1.854 kg; C Rp6.115.036; K Rp4.775.715; R 200 kg; L 0 kg.</p>' +
      '<div class="note mt14"><b>Uang muka penuh</b>800 × Rp6.000 = Rp4.800.000. Lembaga membayar langsung kepada petani.</div></div>' +
      '<div class="note"><b>Perlu verifikasi memblokir finalisasi</b>Estimasi memerlukan dasar bukti dan tinjauan. Data belum ada harus dilengkapi sebelum diteruskan.</div>' +
      '</div></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/hasil-uji">Jalankan uji → Hasil uji</a>' +
      '<button class="btn btn-ghost" data-aksi="simpan">Simpan draf</button><a class="btn btn-ghost" href="#/petugas/detail-petani">Kembali ke Detail petani</a></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

const SISI = {
  dasar: [
    { nama: 'Modal', nilai: 'Rp4.800.000', ambang: '≥ K Rp4.775.715', rasio: 1.005, st: 'ok' },
    { nama: 'Penyerahan', nilai: '1.654 kg', ambang: '≥ q 800 kg', rasio: 2.068, st: 'ok' },
    { nama: 'Manfaat petani', nilai: 'Rp5.535.964', ambang: '≥ Rp3.000.000', rasio: 1.845, st: 'ok' },
    { nama: 'Kontribusi lembaga', nilai: 'Rp160.000', ambang: '≥ Rp100.000', rasio: 1.6, st: 'ok' }
  ],
  '-20': TDATA.uji,
  '-40': [
    { nama: 'Modal', nilai: 'Rp4.800.000', ambang: '≥ K Rp4.775.715', rasio: 1.005, st: 'ok' },
    { nama: 'Penyerahan', nilai: '912,4 kg', ambang: '≥ q 800 kg', rasio: 1.14, st: 'ok' },
    { nama: 'Manfaat petani', nilai: 'Rp715.564', ambang: '≥ Rp3.000.000', rasio: 0.24, st: 'gagal' },
    { nama: 'Kontribusi lembaga', nilai: 'Rp160.000', ambang: '≥ Rp100.000', rasio: 1.6, st: 'ok' }
  ],
  harga: [
    { nama: 'Modal', nilai: 'Rp4.800.000', ambang: '≥ K Rp4.775.715', rasio: 1.005, st: 'ok' },
    { nama: 'Penyerahan', nilai: '1.654 kg', ambang: '≥ q 800 kg', rasio: 2.068, st: 'ok' },
    { nama: 'Manfaat petani', nilai: 'Rp4.850.864', ambang: '≥ Rp3.000.000', rasio: 1.617, st: 'ok' },
    { nama: 'Kontribusi lembaga', nilai: '−Rp360.000', ambang: '≥ Rp100.000', rasio: -3.6, st: 'gagal' }
  ]
};

function renderUji(scen) {
  const self = '#/petugas/hasil-uji' + (scen === '-20' ? '' : '/' + scen);
  const usulan = kandidat(KODE_TINJAU);
  const kirimLabel = usulan.putusan === 'perbaikan'
    ? 'Kirim ulang setelah perbaikan'
    : usulan.putusan === 'diajukan' ? 'Kirim ulang ke antrean manajer' : 'Kirim ke Antrean persetujuan';
  if (scen === '-40') {
    return shell('petugas', '#/petugas/calon-kontrak',
      '<h1 class="page">Tinjau: manfaat petani belum terjaga.</h1>' +
      '<p class="sub">TDR-2027-0012-01 · Alternatif tekanan, bukan akad siap tanda tangan.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      scenTabs(self) +
      '<div class="alert"><b>× Manfaat petani gagal · selisih Rp2.284.436</b>W Rp715.564 dibanding W_min Rp3.000.000. Modal, penyerahan, dan kontribusi tetap lolos.</div>' +
      '<div class="card"><h2>Larik · Q turun menjadi 1.112,4 kg</h2>' + larik(SISI['-40']) + LARIK_FOOT + '</div>' +
      '<div class="grid g2 m240">' +
      '<div class="warn"><h3>Mengapa perlu ditinjau?</h3><div class="num stat-lg">Rp715.564</div>' +
      '<p><b>Manfaat petani setelah biaya C</b></p><p>Rp4.800.000 + (1.112,4 − 800) × Rp6.500 − Rp6.115.036 = Rp715.564.</p>' +
      '<p class="sub">Batas serah 912,4 kg masih di atas q 800 kg. Kontribusi tetap Rp160.000, bukan pemeriksaan yang gagal.</p></div>' +
      '<div class="card"><h2>Tidak ada rentang harga layak</h2><p>Tidak ada interval Ps yang memenuhi keempat sisi dengan input tetap pada −40%. Jangan memakai rentang dari skenario −20%.</p>' +
      '<h3 class="mt14">Langkah berikutnya</h3><p>Tinjau volume dan harga bersama petani; lengkapi bukti yang lemah; jalankan ulang atau tunda pengajuan.</p></div></div>' +
      '<div class="card"><h2>Seluruh skenario</h2>' + TABLE_UJI + '</div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/calon-kontrak">Revisi calon kontrak</a>' +
      '<a class="btn btn-ghost" href="#/manajer/antrean">Kirim tinjauan manajer</a><button class="btn btn-ghost" data-aksi="simpan" data-label="Simpan catatan" data-objek="Catatan tinjauan hasil uji TDR-2027-0012-01">Simpan catatan</button></div>' +
      '<div class="btn-row"><button class="btn btn-off" disabled>Tanda tangan belum tersedia</button></div>' +
      '<p class="sub mt14">Dinonaktifkan: skenario ini belum memenuhi ambang. Tidak ada finalisasi otomatis oleh petugas.</p>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
  const HEAD = {
    dasar: ['Empat sisi lolos pada input dasar.', '✓ Skenario dasar · 4 dari 4 lolos'],
    '-20': ['Empat sisi lolos pada hasil −20%.', '✓ Skenario −20% · 4 dari 4 lolos'],
    harga: ['Harga −10%: kontribusi lembaga tidak lolos.', '△ Skenario harga −10% · 3 dari 4 lolos']
  }[scen];
  const alertHtml = scen === 'harga'
    ? '<div class="alert"><b>× Kontribusi lembaga gagal · −Rp360.000</b>Harga jual lembaga turun 10% sementara biaya lembaga tetap. Manfaat petani masih lolos.</div>'
    : '<div class="note mb24"><b>△ Keseluruhan stress test tetap perlu ditinjau</b>Hasil −40% menurunkan manfaat petani di bawah ambang; harga −10% membuat kontribusi lembaga tidak lolos. Kirim beserta alasan dan bukti kepada manajer. Ini bukan persetujuan akad.</div>';
  const rentang = scen === 'dasar'
    ? '<div class="card"><h2>Rentang harga salam · skenario dasar</h2><div class="num stat-lg">Rp5.970—Rp6.075/kg</div>' +
      '<p>Ps Rp6.000/kg berada dalam rentang yang memenuhi empat pemeriksaan dengan input tetap. Batas ditampilkan secara pembulatan.</p>' +
      '<div class="range"><div class="mark"></div></div><div class="verif m0">Bawah Rp5.970 · Ps Rp6.000 · Atas Rp6.075</div></div>'
    : scen === '-20'
      ? '<div class="card"><h2>Rentang harga salam · skenario −20%</h2><div class="num stat-lg">Rp5.970—Rp6.075/kg</div>' +
        '<p>Ps Rp6.000/kg berada dalam rentang yang memenuhi empat pemeriksaan dengan input tetap. Batas ditampilkan secara pembulatan.</p>' +
        '<div class="range"><div class="mark"></div></div><div class="verif m0">Bawah Rp5.970 · Ps Rp6.000 · Atas Rp6.075</div></div>'
      : '<div class="card"><h2>Tidak ada rentang harga layak</h2><p>Pada harga −10% kontribusi lembaga negatif untuk semua Ps dengan input tetap. Perbaiki struktur biaya atau harga jual sebelum mengajukan.</p></div>';
  return shell('petugas', '#/petugas/calon-kontrak',
    '<h1 class="page">' + HEAD[0] + '</h1>' +
    '<p class="sub">TDR-2027-0012-01 · q 800 kg · Ps Rp6.000/kg · Parameter DPS v1.2 (versi saat akad disusun)</p>' +
    '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
    scenTabs(self) +
    '<div class="frame"><div class="card"><h2>' + HEAD[1] + '</h2>' + larik(SISI[scen]) + LARIK_FOOT + '</div></div>' +
    alertHtml +
    '<div class="card"><h2>Perbandingan skenario</h2>' + TABLE_UJI +
    '<p class="foot-note mt140">Q −20% = 1.483,2 kg; batas serah = Q − R − L = 1.283,2 kg. Sensitivitas bukan probabilitas kejadian.</p></div>' +
    '<div class="layout mt24"><div>' + rentang + '</div>' +
    '<div class="card"><h2>Catatan untuk manajer</h2><p>Dasar panen tiga musim dan estimasi non-tunai tersedia. Cadangan 200 kg dipisahkan. Mohon tinjau paparan stress dan kecukupan bukti sebelum keputusan.</p>' +
    '<p class="sub">Rina S. · 13 Jan 2027 09.40 WIB</p></div></div>' +
    '<div class="btn-row"><button class="btn btn-primary" data-aksi="kirimUlang">' + (kirimLabel) + '</button>' +
    '<a class="btn btn-ghost" href="#/petugas/calon-kontrak">Ubah calon kontrak</a><a class="btn btn-ghost" href="#/petugas/hasil-uji/-40">Lihat Hasil −40%</a></div>' +
    '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
}

ROUTES['/petugas/hasil-uji'] = { screen: 'F8', render: () => renderUji('-20') };
ROUTES['/petugas/hasil-uji/dasar'] = { screen: 'F8', render: () => renderUji('dasar') };
ROUTES['/petugas/hasil-uji/harga'] = { screen: 'F8', render: () => renderUji('harga') };
ROUTES['/petugas/hasil-uji/-40'] = { screen: 'F9', render: () => renderUji('-40') };

ROUTES['/petugas/ringkasan-akad'] = {
  screen: 'F10',
  render() {
    const dibaca = STATE.serah.dibaca;
    return shell('petugas', '#/petugas/ringkasan-akad',
      '<h1 class="page">Bacakan bersama petani.</h1>' +
      '<p class="sub">TDR-2027-0012-01 · Draf operasional; wajib ditinjau DPS sebelum tanda tangan.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="note mb24"><b>✓ Versi calon akad telah ditinjau manajer</b>Dasar dan −20% lolos; bukti dan catatan stress ditinjau. Ini bukan finalisasi skenario gagal F9.</div>' +
      '<div class="layout"><div class="warn"><h2 class="h2-lg">Yang disepakati</h2>' +
      '<div class="upper">Lembaga membayar penuh di muka</div><div class="big-num">Rp4.800.000</div>' +
      '<p>Pembayaran langsung dari ' + TDATA.lembaga + ', bukan dari Tandur.</p>' +
      '<table class="tbl"><tr><th>Hal yang dijelaskan</th><th>Kesepakatan</th></tr>' +
      '<tr><td>Barang / jumlah</td><td>800 kg gabah kering panen (GKP)</td></tr>' +
      '<tr><td>Harga salam</td><td>Rp6.000/kg, disepakati di awal</td></tr>' +
      '<tr><td>Penyerahan</td><td>20 Mei 2027, pukul 09.00 WIB</td></tr>' +
      '<tr><td>Tempat</td><td>Gudang Sumberarum, Malang (lokasi contoh)</td></tr>' +
      '<tr><td>Cadangan keluarga</td><td>200 kg tetap untuk keluarga, tidak masuk 800 kg akad</td></tr></table>' +
      '<h3 class="mt20">Mutu dan cara memeriksa (contoh)</h3>' +
      '<p>Timbangan diperiksa bersama. Kadar air maks. 25%, kotoran maks. 3%, toleransi timbang ±1%. Alat kadar air dan sampel bersama; bukan standar tersertifikasi.</p>' +
      '<h3>Jika gagal panen atau berbeda</h3>' +
      '<p>Hubungi petugas melalui lembaga. Bukti diverifikasi; penyelesaian dibahas bersama lembaga dan DPS sesuai akad yang ditinjau. Tidak ada perubahan sepihak atau denda otomatis.</p></div>' +
      '<div class="grid">' +
      '<div class="card"><h2>Panduan pembacaan</h2><p>[ ] Jelaskan uang muka. [ ] Sebutkan jumlah dan harga. [ ] Tunjukkan waktu dan tempat. [ ] Bahas mutu dan cadangan. [ ] Jelaskan gagal panen.</p>' +
      (dibaca ? '<span class="pill">✓ Pembacaan tercatat ' + STATE.serah.dibacaPada + '</span>' : '<span class="pill">Berikutnya: uji pemahaman</span>') +
      '<p class="sub mt12">Lima jawaban harus benar sebelum tanda tangan.</p></div>' +
      '<div class="card"><h2>Salinan untuk petani</h2>' +
      '<div class="btn-row mt6"><button class="btn btn-primary" data-aksi="ekspor" data-objek="Ringkasan akad TDR-2027-0012-01">Unduh PDF</button><button class="btn btn-ghost" data-aksi="simpan" data-label="Siapkan WhatsApp" data-objek="Pesan ringkasan untuk petani TDR-0012">Siapkan WhatsApp</button><button class="btn btn-ghost" data-aksi="cetak">Cetak ringkasan</button></div>' +
      '<p class="sub mt14">Rancangan dokumen dan pesan, bukan pengiriman otomatis.</p></div>' +
      '</div></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/uji-pemahaman">Mulai Uji pemahaman</a>' +
      (dibaca
        ? '<button class="btn btn-off" disabled>Sudah dibacakan</button>'
        : '<button class="btn btn-ghost" data-aksi="bacakan">Tandai sudah dibacakan</button>') +
      '<a class="btn btn-ghost" href="#/petugas/kontrak">Kembali ke Detail kontrak</a></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/uji-pemahaman'] = {
  screen: 'F11',
  render() {
    const tabs = ['1 ✓ Uang muka', '2 ✓ Jumlah / harga', '3 ✓ Waktu / lokasi', '4 · Mutu / cadangan', '5 · Gagal panen'];
    return shell('petugas', '#/petugas/ringkasan-akad',
      '<h1 class="page">Pastikan petani benar-benar memahami.</h1>' +
      '<p class="sub">TDR-2027-0012-01 · Pertanyaan 4 dari 5 · Catat jawaban, jangan menjawabkan.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="tabs wide mt622">' + tabs.map((t, i) =>
        '<a href="#/petugas/uji-pemahaman"' + (i === 3 ? ' class="active"' : '') + '>' + t + '</a>').join('') + '</div>' +
      '<div class="layout"><div class="card"><h2>Pertanyaan 4</h2>' +
      '<div class="q">Apakah cadangan keluarga 200 kg termasuk dalam 800 kg yang diserahkan?</div>' +
      '<p class="mb18">Jelaskan juga bagaimana mutu gabah diperiksa bersama.</p>' +
      '<div class="opt">○ Tidak. Cadangan tetap milik petani; 800 kg diperiksa sesuai mutu kesepakatan.</div>' +
      '<div class="opt sel">● Ya. Semua cadangan keluarga juga harus diserahkan.</div>' +
      '<div class="alert mb18"><b>× Jawaban belum tepat · jelaskan ulang</b>Cadangan 200 kg tidak masuk volume akad. Tunjukkan ringkasan, jelaskan timbang dan mutu, lalu minta petani mengulang dengan bahasanya sendiri.</div>' +
      '<div class="btn-row mt6"><button class="btn btn-primary" data-aksi="jelaskan" data-topik="pertanyaan 4 · mutu dan cadangan keluarga">Jelaskan ulang</button><button class="btn btn-ghost" data-aksi="ulang">Ulangi pertanyaan</button></div>' +
      '<div class="btn-row"><button class="btn btn-off" disabled>Lanjut ke pertanyaan 5</button></div>' +
      '<p class="sub mt12">Dinonaktifkan sampai jawaban 4 benar.</p></div>' +
      '<div class="grid">' +
      '<div class="card"><h2>Kemajuan sesi</h2><div class="big-num">3 / 5 benar</div>' +
      '<p>1. Rp4.800.000 uang muka ✓</p><p>2. 800 kg / Rp6.000 ✓</p><p>3. 20 Mei / gudang contoh ✓</p><p>4. Mutu dan cadangan ×</p><p>5. Gagal panen / kontak —</p>' +
      '<div class="btn-row"><button class="btn btn-off" disabled>Tanda tangan terkunci</button></div>' +
      '<p class="sub mt12">Alasan: kelima jawaban harus benar.</p>' +
      '<p class="sub"><a href="#/petugas/tanda-tangan">Lihat keadaan setelah 5/5 benar →</a></p></div>' +
      '<div class="warn"><h3>Dampingi tanpa menguji hafalan</h3><div class="flex-c m100">' + turi(90) + '</div>' +
      '<p>Gunakan bahasa sehari-hari; beri waktu bertanya.</p></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/tanda-tangan'] = {
  screen: 'F12',
  render() {
    const ttd = STATE.serah.ttd;
    const sig = (judul, isi) => '<div class="card"><h2>' + judul + '</h2><p>' + isi + '</p>' +
      '<div class="sigbox' + (ttd ? ' isi' : '') + '">' + (ttd ? '✓ Bukti tanda tangan tersimpan ' + STATE.serah.ttdPada : 'Tanda tangan / unggah bukti') + '</div>' +
      '<p class="sub">' + (ttd ? 'Ditandatangani pada data demo ini.' : 'Belum ditandatangani pada rancangan ini.') + '</p></div>';
    return shell('petugas', '#/petugas/ringkasan-akad',
      '<h1 class="page">Dipahami sebelum disepakati.</h1>' +
      '<p class="sub">TDR-2027-0012-01 · 16 Jan 2027 · Calon akad ditinjau; bukan skenario gagal.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="note mb24"><b>✓ Pemahaman 5/5 · prasyarat diperiksa</b>Disetujui manajer 15 Jan; bukti lengkap; ringkasan dibacakan; dokumen ditinjau DPS. Catatan stress tetap tersimpan.</div>' +
      '<div class="card"><h2>Jawaban yang dikonfirmasi</h2><table class="tbl"><tr><th>Topik</th><th>Jawaban petani</th><th>Status</th></tr>' +
      '<tr><td>Uang muka</td><td>Rp4.800.000 penuh, langsung dari lembaga</td><td>' + st('ok', 'Benar') + '</td></tr>' +
      '<tr><td>Jumlah / harga</td><td>800 kg GKP dengan Rp6.000/kg</td><td>' + st('ok', 'Benar') + '</td></tr>' +
      '<tr><td>Waktu / tempat</td><td>20 Mei 2027, Gudang Sumberarum (contoh)</td><td>' + st('ok', 'Benar') + '</td></tr>' +
      '<tr><td>Mutu / cadangan</td><td>Diperiksa bersama; 200 kg untuk keluarga</td><td>' + st('ok', 'Benar setelah diulang') + '</td></tr>' +
      '<tr><td>Gagal panen / kontak</td><td>Hubungi petugas; verifikasi bersama lembaga/DPS</td><td>' + st('ok', 'Benar') + '</td></tr></table></div>' +
      '<div class="grid g3 m240">' +
      sig('Petani', 'TDR-0012 · identitas di berkas terbatas') +
      sig('Petugas', 'Rina Setyaningrum') +
      sig('Saksi', 'Budi Santosa (contoh)') + '</div>' +
      '<div class="card"><h2>Konfirmasi pendampingan</h2>' +
      '<p>[✓] Petani mendapat kesempatan bertanya tanpa paksaan. [✓] Dokumen dan lampiran yang sama diperlihatkan. [✓] Identitas dan metode tanda tangan mengikuti kebijakan lembaga serta hukum yang berlaku.</p>' +
      '<p class="sub">Ini bukan penetapan keabsahan tanda tangan elektronik. Lembaga memastikan metode, persetujuan, dan tinjauan hukum/syariah.</p></div>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="tandatangani"' + (ttd ? ' disabled' : '') + '>' + (ttd ? 'Bukti tanda tangan tersimpan' : 'Simpan bukti tanda tangan') + '</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak untuk ditandatangani</button><button class="btn btn-ghost" data-aksi="ekspor" data-objek="Salinan akad TDR-2027-0012-01">Salinan PDF</button><button class="btn btn-ghost" data-aksi="simpan" data-label="Siapkan WhatsApp" data-objek="Pesan akad untuk petani TDR-0012">Siapkan WhatsApp</button>' +
      '<a class="btn btn-ghost" href="#/petugas/kontrak">Lanjut ke Detail kontrak & bukti bayar →</a></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/kontrak'] = {
  screen: 'F13',
  render() {
    const tabs = [['Ringkasan', '#/petugas/ringkasan-akad'], ['Hasil uji', '#/petugas/hasil-uji'], ['Akad', '#/petugas/akad'], ['Bukti pembayaran', ''], ['Serah terima', '#/petugas/serah-terima'], ['Jejak', '#/dps/jejak']];
    const TL = [['12 Jan 2027', 'Data + persetujuan', 'Bukti dan asumsi tercatat.'], ['15 Jan 2027', 'Disetujui manajer', 'Dasar / −20% lolos, stress ditinjau.'], ['16 Jan · 10.40', 'Pemahaman 5/5', 'Penjelasan ulang tercatat.'], ['16 Jan · 11.10', 'Ditandatangani', 'Bukti dokumen tersedia.'], ['16 Jan · 14.20', 'Bayar penuh di muka', 'Bukti transfer langsung terverifikasi.'], ['20 Mei 2027', 'Penyerahan terjadwal', 'Berat dan mutu belum dicatat.']];
    return shell('petugas', '#/petugas/calon-kontrak',
      '<h1 class="page">TDR-2027-0012-01</h1>' +
      '<p class="sub">TDR-0012 · 800 kg GKP · Penyerahan 20 Mei 2027 · Parameter v1.2</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="tabs wide mb24">' + tabs.map(t => t[1]
        ? '<a href="' + t[1] + '">' + t[0] + '</a>'
        : '<a class="active" href="#/petugas/kontrak">' + t[0] + '</a>').join('') + '</div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Pembayaran penuh di muka</h2><span class="pill">✓ Bukti pembayaran terverifikasi</span>' +
      '<div class="big-num">Rp4.800.000</div>' +
      '<p>Lembaga membayar langsung kepada petani pada 16 Jan 2027. Tandur hanya menyimpan dokumentasi, tidak memproses pembayaran.</p>' +
      '<table class="tbl"><tr><th>Rincian</th><th>Catatan</th></tr>' +
      '<tr><td>Pembayar</td><td>' + TDATA.lembaga + '</td></tr>' +
      '<tr><td>Penerima</td><td>TDR-0012 · rekening disamarkan</td></tr>' +
      '<tr><td>Metode / referensi</td><td>Transfer bank langsung · REF-···0012 (contoh)</td></tr>' +
      '<tr><td>Jumlah</td><td>Rp4.800.000 · penuh, tidak dicicil</td></tr>' +
      '<tr><td>Pemeriksa</td><td>Ayu P. · 16 Jan 2027 14.20 WIB</td></tr></table>' +
      '<h3 class="mt20">Bukti pembayaran</h3>' +
      '<div class="field"><input value="bukti-transfer-0012.pdf · 248 KB"></div>' +
      '<div class="verif">✓ Terverifikasi · Tambah bukti</div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/akad">Lihat bukti</a><button class="btn btn-ghost" data-aksi="simpan" data-label="Tambah dokumen pendukung" data-objek="Dokumen pendukung bukti bayar TDR-2027-0012-01">Tambah dokumen pendukung</button></div></div>' +
      '<div class="card"><h2>Penyerahan yang dijadwalkan</h2><p><b>20 Mei 2027 · 09.00 WIB</b></p>' +
      '<p>800 kg GKP · Gudang Sumberarum (lokasi contoh). Kadar air maks. 25%; kotoran maks. 3%; toleransi timbang ±1% sebagai contoh kesepakatan, bukan standar tersertifikasi.</p>' +
      '<span class="pill">' + (STATE.serah.putusan === 'disetujui' ? '✓ Serah terima disetujui manajer' : STATE.serah.diajukan ? '○ Menunggu persetujuan manajer' : '○ Belum diajukan ke manajer') + '</span>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/serah-terima">Buka Serah terima</a>' +
      '<a class="btn btn-ghost" href="#/petugas/ringkasan-akad">Lihat Ringkasan akad</a></div></div>' +
      '</div><div class="grid">' +
      '<div class="card"><h2>Siklus kontrak</h2><div class="tl">' + TL.map(t =>
        '<div class="item"><div class="dot"></div><div class="when">' + t[0] + '</div><div><div class="what">' + t[1] + '</div><div class="desc">' + t[2] + '</div></div></div>').join('') + '</div></div>' +
      '<div class="note"><b>Dokumen kontrak</b>Ringkasan PDF · Akad bertanda tangan · Bukti transfer · Jejak keputusan.</div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/serah-terima'] = {
  screen: 'F14',
  render() {
    const serah = STATE.serah, diajukan = serah.diajukan;
    const df = (lab, val, foot, cls) => '<div class="df' + (cls ? ' ' + cls : '') + '"><div class="lab">' + lab + '</div><div class="val">' + val + '</div>' + (foot || '') + '</div>';
    const vf = (t) => '<div class="verif">✓ Terverifikasi' + (t ? ' · ' + t : '') + ' · Tambah bukti</div>';
    const doc = (t) => '<div class="docbox"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#076653" stroke-width="1.6" aria-hidden="true"><rect x="5" y="3" width="16" height="20" rx="2"/><path d="M9.5 13l2.5 2.5 4.5-5"/></svg><div class="t">' + t + '</div><div class="sub">Berkas contoh · Lihat / tambah foto</div></div>';
    return shell('petugas', '#/petugas/serah-terima',
      '<h1 class="page">Serah terima panen</h1>' +
      '<p class="sub">20 Mei 2027 · TDR-2027-0012-01 · Mutu berikut adalah contoh, bukan standar tersertifikasi.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="layout rev"><div class="grid">' +
      '<div class="card"><h2>Agenda penyerahan</h2><div class="mintbox"><table class="tbl"><tr><th>Kode / waktu</th><th>Tahap</th></tr>' +
      '<tr><td>TDR-0012 · 09.00</td><td><b>● Sedang dicatat</b></td></tr>' +
      '<tr><td>TDR-0016 · 13.30</td><td>' + st('tunggu', 'Menunggu saksi') + '</td></tr>' +
      '<tr><td>TDR-0018 · 22 Mei</td><td>Terjadwal</td></tr></table></div></div>' +
      '<div class="warn"><h2>Pratinjau berita acara</h2>' +
      '<p class="b7 fs17 mb10">Berita acara serah terima</p>' +
      '<p>BA-2027-0012 · 800 kg / 800 kg. Kadar air 24%; kotoran 2%. Timbang ulang disaksikan.</p>' +
      '<div class="btn-row mt14"><a class="btn btn-ghost" href="#/petugas/akad">Lihat dokumen A4</a></div></div>' +
      '</div><div class="grid">' +
      '<div class="card"><h2>Hasil timbang dan pemeriksaan</h2><div class="dfs">' +
      df('Berat diterima', '800 kg GKP', vf('tiket timbang')) +
      df('Target / selisih', '800 kg / 0 kg (0%)', '<p class="sub">Toleransi contoh ±1% = ±8 kg.</p>') +
      df('Kadar air', '24% · batas ≤25%', vf('alat kadar air')) +
      df('Kotoran', '2% · batas ≤3%', vf('sampel bersama')) +
      df('Metode / alat', 'Timbangan diperiksa bersama; tiga sampel karung; alat kadar air; petani dan saksi hadir.', vf(), 'full') +
      df('Petugas / saksi', 'Rina S. / Budi S. (contoh)', vf()) +
      df('Tanggal / lokasi', '20 Mei 2027 · Gudang Sumberarum (contoh)', vf()) +
      '</div></div>' +
      '<div class="card"><h2>Foto dan catatan lapangan</h2>' +
      '<div class="grid g2 mb10">' + doc('Tiket timbang 800 kg') + doc('Alat kadar air 24%') + '</div>' +
      df('Keberatan petani', 'Meminta timbang ulang satu karung; hasil akhir tetap 800 kg. Menunggu tinjauan manajer.', vf()) +
      '<div class="note mt16"><b>' + (serah.putusan === 'disetujui' ? '✓ Disetujui manajer' : diajukan ? '○ Sudah diajukan ke manajer' : 'Menunggu persetujuan manajer') + '</b><p class="m0">' +
      (serah.putusan === 'disetujui'
        ? 'Alasan persetujuan: ' + serah.alasan + ' Penyelesaian keberatan: ' + (serah.keberatan === 'selesai' ? 'tertutup' : 'masih terbuka') + '.'
        : 'Petugas mencatat dan menyusun berita acara; manajer menyetujui hasil penyerahan dan penyelesaian keberatan.') + '</p></div>' +
      '<div class="btn-row">' + (diajukan || serah.putusan === 'disetujui'
        ? '<button class="btn btn-off" disabled>Sudah diajukan ke manajer</button>'
        : '<button class="btn btn-primary" data-aksi="ajukan">Ajukan ke Manajer</button>') +
      '<a class="btn btn-ghost" href="#/petugas/berita-acara">Pratinjau PDF BA</a><a class="btn btn-ghost" href="#/petugas/keberatan">Catat keberatan</a></div></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/petugas/keberatan'] = {
  screen: 'F15',
  render() {
    const df = (lab, val, foot) => '<div class="df"><div class="lab">' + lab + '</div><div class="val">' + val + '</div>' + (foot || '') + '</div>';
    const vf = (t) => '<div class="verif">✓ Terverifikasi' + (t ? ' · ' + t : '') + ' · Tambah bukti</div>';
    const tutup = STATE.serah.keberatan === 'selesai';
    const TL = [['20 Mei · 09.18', 'Dicatat', 'Rina S. menerima keberatan sebelum berita acara diselesaikan.'], ['20 Mei · 09.26', 'Bukti ditambahkan', 'Timbang ulang dan keterangan saksi.'], ['20 Mei · 10.00', 'Ditinjau', 'Ayu P. memeriksa bukti dan konfirmasi petani.']];
    const putusJejak = STATE.jejak.find(x => x.peristiwa === 'Keberatan diselesaikan');
    if (tutup && putusJejak) TL.push([putusJejak.waktu, 'Selesai', putusJejak.rincian]);
    return shell('petugas', '#/petugas/keberatan',
      '<h1 class="page">Keberatan KBR-2027-0012</h1>' +
      '<p class="sub">TDR-2027-0012-01 · Penyerahan 20 Mei 2027 · Dicatat oleh Rina S.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="track"><span>✓ Dicatat</span><span' + (tutup ? '' : ' class="on"') + '>' + (tutup ? '✓' : '●') + ' Ditinjau manajer</span><span' + (tutup ? ' class="on"' : '') + '>' + (tutup ? '✓' : '○') + ' Selesai</span></div>' +
      '<div class="layout"><div>' +
      '<div class="card"><h2>Apa yang disampaikan petani?</h2>' +
      df('Jenis keberatan', 'Hasil timbang / permintaan timbang ulang', vf()) +
      df('Uraian petani', 'Petani meminta satu karung ditimbang ulang karena posisi karung pada timbangan. Penimbangan ulang disaksikan; total akhir tetap 800 kg.', vf('catatan lapangan')) +
      df('Foto / lampiran', 'foto-timbangan.jpg · tiket-ulang.pdf · catatan-saksi.pdf', vf('Tambah bukti lapangan')) +
      df('Usulan tindak lanjut petugas', 'Lampirkan tiket timbang ulang dan konfirmasi bersama petani. Tidak mengubah nilai akad.', vf()) +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="simpan" data-label="Tambah keterangan" data-objek="Keterangan keberatan KBR-2027-0012">Tambah keterangan</button><a class="btn btn-ghost" href="#/petugas/serah-terima">Buka Serah terima</a></div></div>' +
      '<div class="note m240"><b>Keputusan adalah kewenangan manajer</b><p class="m0">Petugas tidak dapat menutup keberatan atau menyetujui penyelesaian sendiri. Komunikasi kepada petani dicatat setelah keputusan.</p></div>' +
      '<div class="btn-row mt0">' + (tutup
        ? '<a class="btn btn-primary" href="#/petugas/serah-terima">Bacakan hasil ke petani</a>'
        : '<button class="btn btn-off" disabled>Selesaikan keberatan</button>') + '</div>' +
      '<p class="sub mt12">' + (tutup
        ? 'Keputusan manajer sudah tercatat; petugas menyampaikan hasilnya kepada petani.'
        : 'Dinonaktifkan untuk peran Petugas lapangan.') + '</p>' +
      '</div><div class="grid">' +
      '<div class="card"><h2>Jejak keberatan</h2><div class="tl">' + TL.map(t =>
        '<div class="item"><div class="dot"></div><div class="when">' + t[0] + '</div><div><div class="what">' + t[1] + '</div><div class="desc">' + t[2] + '</div></div></div>').join('') + '</div></div>' +
      '<div class="warn"><h2>' + (tutup ? 'Keputusan manajer tercatat' : 'Keputusan yang ditunggu') + '</h2><p>' +
      (tutup ? putusJejak.rincian : 'Manajer mencatat alasan penyelesaian, tanggal keputusan, dan tindak lanjut. Petugas kemudian membacakan hasilnya kepada petani.') + '</p>' +
      '<span class="pill">' + (tutup ? '✓ Selesai · ' + putusJejak.waktu : '○ Belum ada keputusan akhir') + '</span></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};
