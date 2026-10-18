function phead() {
  const nav = [['Cara kerja', '#/cara-kerja'], ['Peran', '#/beranda'], ['Keamanan', '#/cara-kerja'], ['Masuk', '#/masuk']]
    .map(x => '<a href="' + x[1] + '">' + x[0] + '</a>').join('');
  return '<header class="phead"><div class="pin">' +
    '<a class="nodeco" href="#/beranda">' + logo({ ink: true, size: 24 }) + '</a>' +
    '<nav class="pnav">' + nav + '</nav>' +
    '<div class="right"><a class="btn btn-primary" href="#/ajukan">Ajukan akses lembaga</a></div>' +
    '</div></header>';
}

function pfoot(rows) {
  const isi = (rows || [
    [['Cara kerja', '#/cara-kerja'], ['Keamanan', '#/cara-kerja'], ['Ajukan akses', '#/ajukan']],
    [['Privasi', '#/beranda'], ['Syarat penggunaan', '#/beranda'], ['Kontak lembaga', '#/ajukan']],
    [['Rencana produk', '#/cara-kerja'], ['© 2027 Tandur', '']]
  ]).map(row => '<div>' + row.map(l => l[1] ? '<a href="' + l[1] + '">' + l[0] + '</a>' : l[0]).join(' · ') + '</div>').join('');
  return '<footer class="pfoot"><div class="pin"><div class="brand">' + logo() +
    '<p class="tag">Menumbuhkan kejelasan, menjaga kesepakatan.</p></div>' +
    '<div class="rows">' + isi + '</div></div></footer>';
}

const SISI_P1 = [
  { nama: 'Modal', st: 'ok', nilai: 'Rp4.800.000', ambang: '≥ K Rp4.775.715', rasio: 1.05 },
  { nama: 'Penyerahan', st: 'ok', nilai: '1.283,2 kg', ambang: '≥ q 800 kg', rasio: 1.6 },
  { nama: 'Manfaat petani', st: 'ok', nilai: 'Rp3.125.764', ambang: '≥ Rp3.000.000', rasio: 1.04 },
  { nama: 'Kontribusi lembaga', st: 'ok', nilai: 'Rp160.000', ambang: '≥ Rp100.000', rasio: 1.3 }
];

const PERAN = [
  ['Petugas lapangan', 'Mencatat data petani, biaya, dan bukti; membacakan ringkasan akad; mencatat serah terima di lapangan.', 'Petugas', 'petugas'],
  ['Manajer pembiayaan', 'Menyetujui, meminta perbaikan, atau menolak dengan alasan; memantau risiko portofolio.', 'Manajer', 'manajer'],
  ['Dewan Pengawas Syariah', 'Menyetujui parameter dan templat, meninjau jejak keputusan, mengunduh laporan pengawasan.', 'DPS', 'dps'],
  ['Admin lembaga', 'Mengundang pengguna, mengatur kewenangan, templat, dan membaca log audit berkode.', 'Admin', 'admin']
];

const ALUR = [
  ['01', 'Data & persetujuan', 'Identitas petani, lahan, biaya, dan persetujuan pencatatan direkam satu kali oleh petugas.'],
  ['02', 'Uji empat sisi', 'Modal, penyerahan, manfaat petani, dan kontribusi lembaga dihitung pada empat skenario.'],
  ['03', 'Keputusan manajer', 'Manajer menyetujui, meminta perbaikan, atau menolak dengan alasan yang tercatat.'],
  ['04', 'Bacakan & pahami', 'Ringkasan akad dibacakan; pemahaman petani dicentang poin demi poin sebelum tanda tangan.'],
  ['05', 'Tanda tangan & bukti bayar', 'Tanda tangan petani dan saksi, serta bukti pembayaran uang muka dilampirkan.'],
  ['06', 'Serah terima', 'Timbang, foto, dan catatan lapangan dibandingkan dengan target akad; keberatan dicatat.'],
  ['07', 'Laporan & audit', 'DPS dan admin memantau jejak keputusan yang tidak dapat dihapus lewat layar mana pun.']
];

const SISI_RUMUS = [
  ['Modal', 'Lembaga membayar penuh di muka, tidak melebihi kebutuhan riil petani.', 'U ≥ K  ·  K = biaya tanam + sarana'],
  ['Penyerahan', 'Batas serah dijaga agar petani tidak terbebani saat hasil turun.', 'q ≥ batas serah  ·  batas = target − cadangan'],
  ['Manfaat petani', 'Sisa manfaat petani tetap berarti pada skenario hasil menurun.', 'W ≥ ambang manfaat (Rp)'],
  ['Kontribusi lembaga', 'Margin lembaga wajar, tidak negatif, dan dapat dipertanggungjawabkan.', 'M ≥ ambang kontribusi (Rp)']
];

const FAQ = [
  ['Apakah petani perlu masuk ke Tandur?', 'Tidak. Petani cukup menerima ringkasan akad yang dibacakan petugas, menandatanganinya, dan membawa salinan cetak. Akun hanya diterbitkan lembaga.'],
  ['Apakah hasil lolos langsung menjadi akad?', 'Tidak. Lolos empat sisi baru usulan. Keputusan akhir tetap di manajer, dan parameter serta templat disetujui DPS.'],
  ['Apakah Tandur meminjamkan atau mengumpulkan dana?', 'Tidak. Tandur bukan perantara dana. Pencatatan uang muka dan pembayaran memakai rekening lembaga; bukti bayar diunggah petugas.'],
  ['Apakah sinkronisasi offline sudah tersedia?', 'Belum. Prototipe ini berjalan daring. Sinkronisasi offline untuk daerah tanpa sinyal masuk rencana tahun kedua.']
];

ROUTES['/beranda'] = {
  screen: 'P1',
  render() {
    return '<div class="pub">' + phead() +

      '<section class="psec hero">' +
      '<span class="pill">Perangkat kerja akad salam untuk KSPPS/BMT dan DPS</span>' +
      '<h1>Akad salam yang dipahami petani sebelum ditandatangani.</h1>' +
      '<p class="sub">Tandur mencatat data lapangan, menguji empat sisi kelayakan, dan menyimpan jejak keputusan yang bisa diaudit — tanpa membuat petani harus punya akun.</p>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/ajukan">Ajukan akses lembaga</a>' +
      '<a class="btn btn-ghost" href="#/cara-kerja">Pelajari cara kerja</a></div>' +
      '</section>' +

      '<section class="psec pt34">' +
      '<div class="pgrid">' + PERAN.map(p =>
        '<div class="pcard"><h3>' + p[0] + '</h3><p>' + p[1] + '</p>' +
        '<a class="btn btn-primary" href="#/masuk/' + p[3] + '">Masuk sebagai ' + p[2] + '</a></div>').join('') + '</div>' +
      '</section>' +

      '<div class="pband"><section class="psec p2col">' +
      '<div><p class="plabel">Kenali empat sisi akad</p>' +
      '<h2>Bukan sekadar angka yang lolos.</h2>' +
      '<p class="plead">Setiap usulan akad diuji pada empat sisi sekaligus: modal lembaga, penyerahan petani, manfaat petani, dan kontribusi lembaga. Kalau satu sisi gagal, akad tidak boleh disetujui begitu saja.</p>' +
      turi(96) + '</div>' +
      '<div class="plarik"><div class="flex-between">' +
      '<div><div class="ttl mb4">Larik · Hasil −20%</div>' +
      '<p class="m0 sub13">TDR-2027-0012 · 800 kg GKP · Desa Pandanrejo</p></div>' +
      '<span class="pill">✓ Empat sisi lolos</span></div>' +
      '<div class="mt20">' + larik(SISI_P1) + '</div>' +
      '<p class="foot-note mt180">Garis = ambang masing-masing sisi. Rupiah dan kg tidak disatukan dalam satu skala.</p>' +
      '<p class="foot-note mt80">Skenario Hasil −40% tetap perlu ditinjau manajer sebelum keputusan akhir.</p></div>' +
      '</section></div>' +

      '<section class="psec">' +
      '<p class="plabel">01 / Dari lapangan ke kesepakatan</p>' +
      '<h2 class="narrow">Satu alur, tidak ada langkah yang dilompati.</h2>' +
      '<div class="pgrid c3">' + ALUR.slice(0, 3).map(a =>
        '<div class="pcard"><h3>' + a[1] + '</h3><div class="bignum">' + a[0] + '</div><p>' + a[2] + '</p></div>').join('') + '</div>' +
      '<div class="pgrid">' + ALUR.slice(3).map(a =>
        '<div class="pcard"><h3>' + a[1] + '</h3><div class="bignum">' + a[0] + '</div><p>' + a[2] + '</p></div>').join('') + '</div>' +
      '</section>' +

      '<div class="pdark"><section class="psec">' +
      '<p class="plabel">02 / Larik</p>' +
      '<h2 class="narrow">Layak untuk lembaga. Tetap berarti bagi petani.</h2>' +
      '<p class="sub">Empat sisi ini yang menentukan sebuah usulan boleh maju ke keputusan manajer atau tidak.</p>' +
      '<div class="pgrid">' + SISI_RUMUS.map(s =>
        '<div class="pcard"><h3>' + s[0] + '</h3><p>' + s[1] + '</p><code class="fx">' + s[2] + '</code></div>').join('') + '</div>' +
      '</section></div>' +

      '<section class="psec">' +
      '<p class="plabel">03 / Petani tidak perlu akun</p>' +
      '<h2 class="narrow">Kesepakatan dibawa pulang, bukan disimpan di layar saja.</h2>' +
      '<div class="pgrid c3">' +
      '<div class="pcard"><div class="pmock"><span class="up">Ringkasan akad salam</span>' +
      '<div class="big">Rp4.800.000</div><hr>' +
      'Dibayar penuh di muka · Volume 1.854 kg GKP<br>Serah Mei 2027 · Desa Pandanrejo' +
      '<a href="#/petugas/akad">Lihat ringkasan contoh →</a></div></div>' +
      '<div class="pcard"><div class="pchat"><span class="who">Pesan WhatsApp</span>' +
      '<p class="mt100 sub135">Halo, berikut ringkasan akad TDR-2027-0012-01. Harga dibaca bersama sebelum petani setuju.</p>' +
      '<div class="pbubble">Tidak paham? Tanya dahulu.<br><span class="sub13">Hubungi petugas melalui lembaga. Jangan kirim PIN atau kata sandi.</span></div>' +
      '<p class="mt140 sub13">Contoh pesan; bukan pengiriman otomatis.</p></div></div>' +
      '<div class="pcard"><div class="pmock"><span class="up">Berita acara serah terima</span>' +
      '<div class="big">800 kg</div><hr>' +
      '✓ Timbang disaksikan · ✓ Kadar air sesuai<br>✓ Foto karung · ✓ Tidak ada keberatan' +
      '<a href="#/petugas/berita-acara">Lihat berita acara →</a></div></div>' +
      '</div></section>' +

      '<div class="pkertas"><section class="psec p2col">' +
      '<div><p class="plabel">04 / Jejak yang utuh</p>' +
      '<h2 class="narrow">Setiap keputusan punya alasan.</h2>' +
      '<p class="plead">Jejak keputusan bersifat append-only: alasan manajer, catatan DPS, dan versi parameter tersimpan berurutan dan dapat diunduh sebagai lampiran laporan.</p>' +
      '<a class="btn btn-primary" href="#/cara-kerja">Pelajari cara kerja & keamanan</a></div>' +
      '<div class="tl lines">' +
      '<div class="item"><span class="dot"></span><span class="when">12 Jan 2027</span><div><div class="what">Data dan persetujuan petani</div><div class="desc">Petugas Rina S. mencatat identitas, lahan 0,4 ha, dan biaya; persetujuan direkam.</div></div></div>' +
      '<div class="item"><span class="dot"></span><span class="when">15 Jan 2027</span><div><div class="what">Keputusan manajer</div><div class="desc">Disetujui dengan alasan: empat sisi lolos pada skenario Hasil −20%.</div></div></div>' +
      '<div class="item"><span class="dot"></span><span class="when">16 Jan 2027</span><div><div class="what">Pemahaman 5/5</div><div class="desc">Ringkasan akad dibacakan; petani menandatangani bersama dua saksi.</div></div></div>' +
      '<div class="item"><span class="dot"></span><span class="when">20 Mei 2027</span><div><div class="what">Serah terima 800 kg</div><div class="desc">Berita acara dibuat; menunggu persetujuan manajer.</div></div></div>' +
      '</div>' +
      '</section></div>' +

      '<section class="psec">' +
      '<p class="plabel">05 / Aman secara peran, jelas secara data</p>' +
      '<h2 class="narrow">Data lembaga tetap dalam kendali lembaga.</h2>' +
      '<div class="pgrid c3">' +
      '<div class="pcard"><h3>Persetujuan yang tercatat</h3><p>Perubahan parameter hanya berlaku setelah manajer mengusulkan, DPS menyetujui, dan admin menerapkan. Setiap langkah beralasan.</p></div>' +
      '<div class="pcard"><h3>Akses yang terbatas</h3><p>Akun diterbitkan admin lembaga, bukan pendaftaran mandiri. Kewenangan tiap peran dibatasi dan dapat dicabut dengan alasan.</p></div>' +
      '<div class="pcard"><h3>Bukan perantara dana</h3><p>Tandur tidak memegang, meminjamkan, atau menyalurkan dana pembiayaan. Pembayaran memakai rekening lembaga.</p></div>' +
      '</div></section>' +

      '<div class="pcta"><section class="psec p2col">' +
      '<div><p class="plabel">06 / Mulai dari pilot lembaga</p>' +
      '<h2 class="narrow">Tumbuhkan praktik yang jelas, bersama tim Anda.</h2>' +
      '<p class="sub mb26">Ajukan akses untuk satu musim tanam dahulu. Tim Anda menentukan peran, templat, dan parameter yang akan ditinjau DPS.</p>' +
      '<a class="btn btn-primary btn-lime" href="#/ajukan">Ajukan akses lembaga</a></div>' +
      '<div class="plarik"><span class="up">Harga usulan · Tahun 1–2</span>' +
      '<div class="ttl m1004">Rp600.000 <span class="satuan">/ lembaga / bulan</span></div>' +
      '<p class="mb16 sub14">Onboarding Rp2.500.000 sekali. Pilot lembaga awal gratis 3 bulan. Tidak ada biaya untuk petani.</p>' +
      '<div class="note"><b>Status: rancangan lapangan</b>Angka harga dan cakupan masih usulan untuk dibicarakan bersama lembaga pilot.</div></div>' +
      '</section></div>' +

      '<section class="psec">' +
      '<h2 class="narrow">Hal yang perlu diketahui.</h2>' +
      '<div class="pgrid c1">' + FAQ.map(f =>
        '<div class="pcard"><h3>' + f[0] + '</h3><p>' + f[1] + '</p></div>').join('') + '</div>' +
      '</section>' +

      pfoot() + '</div>';
  }
};

ROUTES['/cara-kerja'] = {
  screen: 'P3',
  render() {
    const langkah = [
      ['01', 'Data + persetujuan', 'Identitas, lahan, panen tiga musim, biaya, cadangan R dan komitmen L; bukti diberi status.'],
      ['02', 'Uji empat sisi', 'Gunakan skenario dasar, hasil −20%, hasil −40%, dan harga −10%.'],
      ['03', 'Keputusan manajer', 'Setujui, minta perbaikan, atau tolak dengan alasan. Perlu verifikasi memblokir finalisasi.'],
      ['04', 'Bacakan ringkasan', 'Petani menjawab lima pertanyaan; jelaskan ulang setiap jawaban salah.'],
      ['05', 'Tanda tangan', 'Dilakukan setelah 5/5 benar dan seluruh prasyarat terpenuhi.'],
      ['06', 'Bayar penuh di muka', 'Lembaga membayar petani langsung, bukti pembayaran dicatat.'],
      ['07', 'Serah terima + audit', 'Ukur berat dan mutu, catat keberatan dan keputusan penyelesaiannya.']
    ];
    const rumus = [
      ['Modal', 'q × Ps ≥ K', 'Uang muka menutup kebutuhan kas.'],
      ['Penyerahan', 'q ≤ Q skenario − R − L', 'Cadangan keluarga dan komitmen lain dikurangi dahulu.'],
      ['Manfaat petani', 'W = qPs + (Q − q)Ph − C ≥ W_min', 'Hitung manfaat setelah seluruh biaya.'],
      ['Kontribusi lembaga', 'M = q(Pj − Ps) − B ≥ M_min', 'Harga dan biaya, bukan bunga.']
    ];
    const jaga = [
      ['Persetujuan & pembatasan', 'Jelaskan tujuan pengumpulan dan siapa yang dapat melihat data. Catat tanggal, metode, petugas, dan bukti persetujuan. Laporan menggunakan kode petani.'],
      ['Akun & autentikasi', 'Akun diterbitkan lewat undangan lembaga. Verifikasi dua langkah wajib untuk manajer, DPS, dan admin. Perubahan peran dan ekspor dicatat.'],
      ['Dokumen & jejak keputusan', 'Keputusan ditambahkan ke jejak tanpa menimpa riwayat. Parameter memiliki versi, pengusul, persetujuan DPS, dan tanggal penerapan.']
    ];
    return '<div class="pub">' + phead() +
      '<div class="pform">' +
      '<div class="crumb">Tandur / Untuk lembaga</div>' +
      '<h1>Kejelasan yang bisa ditelusuri.</h1>' +
      '<p class="sub">Tandur membantu lembaga mendokumentasikan akad salam: barang diserahkan kemudian, harga dibayarkan penuh di muka oleh lembaga.</p>' +
      '<div class="layout">' +
      '<div class="card"><h2>Dari persetujuan data sampai serah terima</h2><div class="tl lines">' +
      langkah.map(l => '<div class="item"><span class="dot"></span><span class="when">' + l[0] + '</span>' +
        '<div><div class="what">' + l[1] + '</div><div class="desc">' + l[2] + '</div></div></div>').join('') +
      '</div></div>' +
      '<div><div class="warn"><h2>Batas layanan</h2>' +
      '<p><b>Tandur bukan pemberi pembiayaan.</b></p>' +
      '<p>Tidak ada penghimpunan dana, dompet, gateway pembayaran, atau janji hasil investasi.</p>' +
      '<p class="m0">Petani tidak perlu akun. Admin tidak dapat menyetujui pembiayaan; DPS tidak mengubah data kontrak.</p></div>' +
      '<div class="note mt18"><b>Rencana pengembangan</b><p class="m0">Tahun 2: sinkronisasi offline dan pencocokan penggilingan. Tahun 3: jagung dan integrasi. Belum ditampilkan sebagai layanan aktif.</p></div></div>' +
      '</div>' +

      '<div class="card mt24"><h2>Empat pemeriksaan, empat ambang</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Sisi</th><th>Rumus</th><th>Arti praktis</th></tr>' +
      rumus.map(r => '<tr><td>' + r[0] + '</td><td><code class="fx m0">' + r[1] + '</code></td><td>' + r[2] + '</td></tr>').join('') +
      '</table></div>' +
      '<p class="foot-note">q: volume akad; Ps: harga salam; Q: panen; K: kebutuhan kas; Ph: harga sisa panen; Pj: harga jual lembaga; B: biaya lembaga. Ambang W_min dan M_min memakai versi yang disetujui DPS.</p>' +
      '</div>' +

      '<div class="card mt24"><h2>Contoh sensitivitas TDR-0012</h2>' +
      '<div class="mintbox">' + TABLE_UJI + '</div>' +
      '<div class="note mt18"><b>Sensitivitas bukan probabilitas</b><p class="m0">Pada hasil −40%, manfaat petani gagal, bukan kontribusi lembaga. Tidak ada rentang harga yang memenuhi keempat sisi dengan input tetap tersebut.</p></div>' +
      '</div>' +

      '<h2 class="num-xl">Data yang dijaga, kewenangan yang terpisah.</h2>' +
      '<div class="pgrid c3 mt0">' + jaga.map(j =>
        '<div class="pcard"><h3>' + j[0] + '</h3><p>' + j[1] + '</p></div>').join('') + '</div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/ajukan">Ajukan akses lembaga</a>' +
      '<a class="btn btn-ghost" href="#/beranda">Kembali ke landing</a></div>' +
      '</div>' +
      '<footer class="pfoot"><div class="pin"><div class="row">' + logo() +
      '<div class="links"><a href="#/beranda">Privasi</a> · <a href="#/beranda">Syarat penggunaan</a> · <a href="#/ajukan">Hubungi Tandur</a></div>' +
      '</div></div></footer>' +
      '</div>';
  }
};

ROUTES['/ajukan'] = {
  screen: 'P2',
  render() {
    return '<div class="pub">' + phead() +
      '<div class="pform">' +
      '<div class="crumb">Tandur / Untuk lembaga</div>' +
      '<h1>Mulai percakapan untuk lembaga Anda.</h1>' +
      '<p class="sub">Permohonan akses bukan pendaftaran akun mandiri. Tim lembaga menentukan pengguna dan kewenangannya.</p>' +
      '<div class="layout">' +

      '<div class="card"><h2>Identitas lembaga</h2>' +
      '<div class="field"><label>Nama lembaga</label><input value="KSPPS Tunas Makmur"></div>' +
      '<div class="dfs">' +
      '<div class="field"><label>Jenis lembaga</label><select><option>KSPPS</option><option>BMT</option></select></div>' +
      '<div class="field"><label>Perkiraan jumlah petugas lapangan</label><input value="6 petugas"></div>' +
      '</div>' +
      '<div class="field"><label>Alamat / wilayah layanan</label><input value="Malang, Jawa Timur (contoh)"></div>' +
      '<div class="dfs">' +
      '<div class="field"><label>Nama pemohon</label><input value="Ayu Pramesti"></div>' +
      '<div class="field"><label>Jabatan pemohon</label><input value="Manajer pembiayaan"></div>' +
      '<div class="field"><label>WhatsApp lembaga</label><input value="08·· ···· 2180"></div>' +
      '<div class="field"><label>Email kerja</label><input value="ayu@lembaga.example"></div>' +
      '</div>' +
      '<div class="field"><label>Kebutuhan dan catatan</label>' +
      '<textarea>Kami ingin meninjau alur pendataan, persetujuan pembiayaan, dan pelaporan DPS untuk musim tanam berikutnya.</textarea></div>' +
      '<label class="check"><input type="checkbox" checked> Saya menyetujui penggunaan kontak ini untuk menindaklanjuti permohonan akses sesuai Kebijakan privasi.</label>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/masuk">Kirim permohonan akses</a>' +
      '<a class="btn btn-ghost" href="#/beranda">← Kembali ke beranda</a></div>' +
      '</div>' +

      '<div>' +
      '<div class="warn"><h2>Setelah permohonan dikirim</h2><div class="tl">' +
      '<div class="item"><span class="dot"></span><span class="when">Tahap 1</span><div><div class="what">Konfirmasi kebutuhan</div><div class="desc">Tim menghubungi kontak lembaga untuk memahami alur kerja.</div></div></div>' +
      '<div class="item"><span class="dot"></span><span class="when">Tahap 2</span><div><div class="what">Tentukan cakupan pilot</div><div class="desc">Sepakati peran, templat, dan parameter yang akan ditinjau DPS.</div></div></div>' +
      '<div class="item"><span class="dot"></span><span class="when">Tahap 3</span><div><div class="what">Undangan akun</div><div class="desc">Admin lembaga mengundang pengguna yang berwenang.</div></div></div>' +
      '</div></div>' +
      '<div class="note mt18"><b>Contoh konfirmasi</b><p>Permohonan TDR-AKSES-0027 diterima. Ringkasan dikirim ke a***@lembaga.example. Ini contoh tampilan setelah pengiriman.</p></div>' +
      '<p class="sub mt18 sub135">Tidak ada biaya untuk petani. Tandur tidak menerima atau menyalurkan dana pembiayaan.</p>' +
      '<div class="card mt18"><h2>Ingin melihat dahulu?</h2>' +
      '<p class="sub">Semua layar prototipe dapat dibuka dengan data contoh, tanpa akun.</p>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/masuk">Buka contoh layar petugas</a>' +
      '<a class="btn btn-ghost" href="#/petugas/akad">Contoh dokumen A4</a></div></div>' +
      '</div>' +

      '</div></div>' +
      pfoot([[['Privasi', '#/beranda'], ['Syarat penggunaan', '#/beranda'], ['Hubungi Tandur', '#/ajukan']]]) +
      '</div>';
  }
};
