ROUTES['/dps/arsip'] = {
  screen: 'D1',
  render() {
    const rows = STATE.arsip.map(a =>
      '<tr><td>' + a.kode + '<br><span class="st-tunggu">' + a.petani + '</span></td>' +
      '<td>' + a.dokumen + '</td><td>' + a.uji + '</td><td>' + a.keputusan + '</td>' +
      '<td>' + st(a.lengkap[0], a.lengkap[1]) + '</td></tr>').join('');
    const belum = arsipBelumLengkap();
    const p = STATE.param;
    const agendaParam = p.keputusan === 'diterapkan'
      ? ['Versi ' + p.aktif.versi + ' aktif', 'Diterapkan admin ' + p.diterapkanPada, '<a href="#/admin/parameter">Parameter bawaan →</a>']
      : p.keputusan === 'disetujui'
        ? ['Usulan ' + p.usulan.versi + ' disetujui', 'Menunggu penerapan admin lembaga', '<a href="#/admin/parameter">Parameter bawaan →</a>']
        : p.keputusan === 'catatan'
          ? ['Usulan ' + p.usulan.versi + ' diberi catatan', 'Dikembalikan ke manajer untuk diperbaiki', '<a href="#/manajer/parameter">Usulan manajer →</a>']
          : ['Usulan parameter ' + p.usulan.versi, 'W_min dan M_min musim berikutnya', '<a href="#/dps/persetujuan">Persetujuan parameter →</a>'];
    const agendaBa = belum > 0
      ? [belum + ' berita acara belum lengkap', 'Menunggu keputusan manajer', '<a href="#/dps/arsip">Arsip dokumen →</a>']
      : ['Berita acara lengkap', 'Semua arsip tahap ini terdokumentasi', '<a href="#/dps/arsip">Arsip dokumen →</a>'];
    const agendaKeberatan = STATE.serah.keberatan === 'selesai'
      ? ['Keberatan TDR-0012 ditutup', 'Keputusan penyelesaian tercatat pada jejak', '<a href="#/dps/jejak">Jejak keputusan →</a>']
      : ['1 jejak keberatan baru', 'TDR-0012 · timbang ulang', '<a href="#/dps/jejak">Jejak keputusan →</a>'];
    return shell('dps', '#/dps/arsip',
      '<h1 class="page">Arsip akad &amp; pengawasan</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · Baca dokumen, telusuri keputusan, dan awasi kelengkapan tanpa mengubah data akad.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="btn-row mb22"><a class="btn btn-primary" href="#/dps/laporan">Buka laporan periode</a></div>' +
      '<div class="layout"><div class="card"><h2>Agenda pengawasan</h2><table class="tbl"><tr><th>Perlu ditinjau</th><th>Konteks</th><th>Tujuan</th></tr>' +
      [agendaParam, agendaBa, agendaKeberatan].map(a =>
        '<tr><td>' + a[0] + '</td><td>' + a[1] + '</td><td>' + a[2] + '</td></tr>').join('') + '</table></div>' +
      '<div class="warn"><h3>Kelengkapan dokumentasi</h3>' +
      '<div class="stat-lg">' + (TOTAL_KONTRAK - belum) + ' / ' + TOTAL_KONTRAK + '</div>' +
      '<p>Kontrak aktif memiliki dokumen wajib lengkap; ' + belum + ' masih menunggu tinjauan penyerahan.</p>' +
      '<p class="sub">Bukan ukuran kepatuhan hukum otomatis.</p></div></div>' +
      '<div class="grid g3 m240">' +
      '<div class="field"><label>Cari kode akad / petani</label><input placeholder="TDR-…"></div>' +
      '<div class="field"><label>Status dan desa</label><select><option>Semua status · semua desa</option></select></div>' +
      '<div class="field"><label>Periode</label><select><option>Jan–Mei 2027</option></select></div></div>' +
      '<div class="card"><h2>Daftar arsip berkode</h2><table class="tbl"><tr><th>Kode akad / petani</th><th>Dokumen</th><th>Uji / parameter</th><th>Keputusan</th><th>Kelengkapan</th></tr>' +
      rows + '</table>' +
      '<p class="foot-note mt14">' + STATE.arsip.length + ' dari ' + TOTAL_KONTRAK + ' · Arsip lintas tahap, bukan antrean persetujuan pembiayaan. Identitas pribadi diganti kode pada laporan.</p></div>' +
      '<div class="note mt24"><b>Batas kewenangan DPS</b>DPS membaca data, mengawasi jejak, mengunduh laporan, dan menyetujui versi ambang. DPS tidak mengedit data kontrak atau menyetujui pembiayaan.</div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/dps/jejak">Buka Jejak keputusan ' + KODE_TINJAU + '</a>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-label="Unduh arsip PDF" data-objek="Arsip akad Jan–Mei 2027">Unduh arsip PDF</button>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-label="Ekspor Excel" data-objek="Arsip akad berkode">Ekspor Excel</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak layar</button></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/dps/jejak'] = {
  screen: 'D2',
  render() {
    return shell('dps', '#/dps/jejak',
      '<h1 class="page">Jejak keputusan ' + KODE_TINJAU + '</h1>' +
      '<p class="sub">' + ARSIP_TINJAU + ' · Peristiwa ditambahkan; riwayat tidak dapat diedit atau dihapus.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="note mb24"><b>' + lock() + ' Jejak append-only · parameter ' + STATE.param.aktif.versi + '</b>Perubahan data menghasilkan versi baru. Tidak ada tindakan edit atau hapus pada arsip ini. Peristiwa bertanda <i>baru</i> terjadi pada sesi demo ini.</div>' +
      '<div class="layout"><div class="card"><h2>Riwayat lengkap akad</h2><div class="tl">' + STATE.jejak.map(j =>
        '<div class="item' + (j.baru ? ' baru' : '') + '"><div class="dot"></div><div class="when">' + j.waktu + '</div>' +
        '<div><div class="what">' + j.peristiwa + '</div><div class="desc">' + j.rincian + '</div></div></div>').join('') + '</div></div>' +
      '<div class="grid">' +
      '<div class="warn"><h2>Identitas arsip</h2><p class="b7">' + ARSIP_TINJAU + '</p>' +
      '<p>Petani ' + KODE_TINJAU + '; Sumberarum (contoh); versi ' + STATE.param.aktif.versi + '; q 800 kg; Ps Rp6.000.</p>' +
      '<span class="pill">✓ Riwayat tersedia</span></div>' +
      '<div class="card"><h2>Lampiran terkait</h2><p>Persetujuan data; panen/biaya; 4 skenario; alasan keputusan; pemahaman; akad; transfer; tiket timbang; keberatan.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="ekspor" data-label="Unduh jejak PDF" data-objek="Jejak keputusan ' + ARSIP_TINJAU + '">Unduh jejak PDF</button>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-label="Ekspor Excel" data-objek="Jejak keputusan berkode">Ekspor Excel</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak jejak</button></div></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/dps/persetujuan'] = {
  screen: 'D3',
  render() {
    const p = STATE.param;
    const disetujui = p.keputusan === 'disetujui' || p.keputusan === 'diterapkan';
    const pill = p.keputusan === 'diterapkan' ? '✓ ' + p.usulan.versi + ' disetujui DPS · diterapkan admin ' + p.diterapkanPada
      : disetujui ? '✓ ' + p.usulan.versi + ' disetujui DPS · menunggu penerapan admin'
        : p.keputusan === 'catatan' ? '△ Catatan perubahan dikirim ke manajer · belum ada persetujuan'
          : '○ Menunggu keputusan DPS · belum aktif';
    const TL = [
      ['8 Jan 2027', 'v1.1 · Arsip', 'Dipertahankan untuk jejak historis.'],
      ['10 Jan 2027', 'v1.2 · Disetujui', 'Hasan M. / DPS · diterapkan admin.'],
      ['12 Mei 2027', 'v1.3 · Diajukan', 'Ayu P. / Manajer · dasar dan lampiran terpasang.']
    ];
    if (disetujui) TL.push([p.tanggal.split(' · ')[0] + ' 2027', p.usulan.versi + ' · Disetujui', p.dpsOleh + ' pukul ' + p.tanggal.split(' · ')[1] + ' · catatan penilaian tersimpan.']);
    else if (p.keputusan === 'catatan') TL.push([p.tanggal.split(' · ')[0] + ' 2027', p.usulan.versi + ' · Catatan perubahan', p.dpsOleh + ' · dikembalikan ke manajer untuk diperbaiki.']);
    const keputusan = disetujui || p.keputusan === 'catatan'
      ? '<div class="card"><h2>Keputusan DPS tercatat</h2>' +
        '<p class="b7">' + (disetujui ? 'Versi ' + p.usulan.versi + ' disetujui' : 'Catatan perubahan dikirim ke manajer') + '</p>' +
        '<p class="sub">' + p.dpsOleh + ' · ' + p.tanggal + '</p>' +
        '<div class="mintbox"><p class="m0">' + p.catatan + '</p></div>' +
        '<p class="sub mt12">Keputusan tidak dapat ditimpa dari layar ini; perubahan menghasilkan peristiwa baru pada jejak.</p>' +
        '<div class="btn-row">' + (disetujui ? '<a class="btn btn-primary" href="#/admin/parameter">Lihat penerapan admin →</a>' : '<a class="btn btn-primary" href="#/manajer/parameter">Lihat usulan manajer →</a>') +
        '<button class="btn btn-ghost" data-aksi="cetak">Cetak keputusan</button></div></div>'
      : '<div class="card"><h2>Keputusan DPS</h2>' +
        '<div class="field"><label>Catatan penilaian · wajib</label><input id="catatan-dps" value="Dasar lokal dan kesepakatan telah diperiksa. Pastikan penerapan hanya pada calon akad musim berikutnya serta versi lama tetap tercatat."></div>' +
        '<div class="btn-row"><button class="btn btn-primary" data-aksi="paramDps" data-op="setujui">Setujui versi ' + p.usulan.versi + '</button>' +
        '<button class="btn btn-ghost" data-aksi="paramDps" data-op="catatan">Minta perubahan dengan catatan</button></div></div>';
    return shell('dps', '#/dps/persetujuan',
      '<h1 class="page">Tinjau usulan parameter ' + p.usulan.versi + '</h1>' +
      '<p class="sub">Diajukan ' + p.usulan.oleh + ' · ' + p.usulan.diajukan + ' · Efektif yang diusulkan ' + p.usulan.efektif + '</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<span class="pill mb20">' + pill + '</span>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Bandingkan versi</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Parameter</th><th>' + p.aktif.versi + ' · aktif</th><th>' + p.usulan.versi + ' · usulan</th><th>Perubahan</th></tr>' +
      '<tr><td>Manfaat minimum W_min</td><td>' + rp(p.aktif.wMin) + '</td><td>' + rp(p.usulan.wMin) + '</td><td>+' + rp(p.usulan.wMin - p.aktif.wMin) + '</td></tr>' +
      '<tr><td>Kontribusi minimum M_min</td><td>' + rp(p.aktif.mMin) + '</td><td>' + rp(p.usulan.mMin) + '</td><td>+' + rp(p.usulan.mMin - p.aktif.mMin) + '</td></tr>' +
      '<tr><td>Musim berlaku</td><td>' + TDATA.musim + '</td><td>Jun–Sep 2027</td><td>Musim berikutnya</td></tr>' +
      '<tr><td>Efektif</td><td>' + p.aktif.efektif + '</td><td>' + p.usulan.efektif + '</td><td>Tidak berlaku surut</td></tr></table></div></div>' +
      '<div class="card"><h2>Dasar usulan dan lampiran</h2>' +
      '<p>Penyesuaian kebutuhan rumah tangga dan biaya distribusi lokal untuk musim berikutnya. Tidak mengubah harga atau kewajiban akad berjalan.</p>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Lampiran</th><th>Keterangan</th></tr>' +
      '<tr><td>notulen-kelompok-10mei.pdf</td><td>Kesepakatan petani mengenai dasar ambang lokal</td></tr>' +
      '<tr><td>dasar-biaya-distribusi.pdf</td><td>Biaya lembaga dan justifikasi kontribusi</td></tr>' +
      '<tr><td>dampak-v1.3.xlsx</td><td>Uji dampak pada ' + TOTAL_KONTRAK + ' contoh kontrak</td></tr></table></div>' +
      '<p class="sub mt12">DPS perlu menilai dasar, kesepakatan, dan dampak; persetujuan bukan persetujuan pembiayaan kandidat.</p></div>' +
      keputusan +
      '</div><div class="grid">' +
      '<div class="note"><b>Setelah disetujui</b>Admin lembaga dapat menerapkan versi yang disetujui sesuai tanggal efektif. Sebelum itu ' + p.aktif.versi + ' tetap aktif.</div>' +
      '<div class="card"><h2>Riwayat persetujuan</h2><div class="tl">' + TL.map(t =>
        '<div class="item"><div class="dot"></div><div class="when">' + t[0] + '</div><div><div class="what">' + t[1] + '</div><div class="desc">' + t[2] + '</div></div></div>').join('') + '</div></div>' +
      '<p class="sub">Tidak tersedia tindakan setujui kontrak atau edit data petani untuk peran DPS.</p>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/dps/laporan'] = {
  screen: 'D4',
  render() {
    const belum = arsipBelumLengkap();
    const rows = STATE.arsip.map(a =>
      '<tr><td>' + a.kode + ' / ' + a.petani + '</td><td>' + STATE.param.aktif.versi + '</td><td>' + a.keputusan + '</td>' +
      '<td>' + st(a.lengkap[0], a.lengkap[1]) + '</td>' +
      '<td><a href="#/dps/jejak">Lihat ' + STATE.jejak.length + ' peristiwa →</a></td></tr>').join('');
    return shell('dps', '#/dps/laporan',
      '<h1 class="page">Laporan pengawasan</h1>' +
      '<p class="sub">Pratinjau periode Jan–Mei 2027 · Hanya kode petani pada dokumen laporan dan ekspor.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="grid g3 mb20">' +
      '<div class="field"><label>Periode</label><select><option>1 Jan–20 Mei 2027</option></select></div>' +
      '<div class="field"><label>Desa / status</label><select><option>Semua desa / semua tahap</option></select></div>' +
      '<div class="field"><label>Isi dokumen</label><select><option>Akad, uji, bukti, keputusan</option></select></div></div>' +
      '<div class="btn-row mb24">' +
      '<button class="btn btn-primary" data-aksi="ekspor" data-label="Unduh PDF laporan" data-objek="Laporan pengawasan Jan–Mei 2027">Unduh PDF</button>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-label="Unduh Excel laporan" data-objek="Laporan berkode Jan–Mei 2027">Unduh Excel</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak pratinjau</button>' +
      '<button class="btn btn-ghost" data-aksi="simpan" data-label="Terapkan filter" data-objek="Filter laporan periode">Terapkan filter</button></div>' +
      '<div class="layout"><div class="card"><h2>Kelengkapan ' + TOTAL_KONTRAK + ' kontrak aktif</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Dokumentasi</th><th>Lengkap</th><th>Perlu tindak lanjut</th></tr>' +
      '<tr><td>Persetujuan data</td><td>' + TOTAL_KONTRAK + '/' + TOTAL_KONTRAK + '</td><td>0</td></tr>' +
      '<tr><td>Hasil uji & alasan manajer</td><td>' + TOTAL_KONTRAK + '/' + TOTAL_KONTRAK + '</td><td>0</td></tr>' +
      '<tr><td>Pembacaan & pemahaman 5/5</td><td>' + TOTAL_KONTRAK + '/' + TOTAL_KONTRAK + '</td><td>0</td></tr>' +
      '<tr><td>Akad & bukti bayar penuh</td><td>' + TOTAL_KONTRAK + '/' + TOTAL_KONTRAK + '</td><td>0</td></tr>' +
      '<tr><td>Bukti serah terima</td><td>' + (TOTAL_KONTRAK - belum) + '/' + TOTAL_KONTRAK + '</td><td>' + belum + ' tinjauan penyerahan</td></tr></table></div></div>' +
      '<div class="warn"><h2>Catatan pengawasan</h2><div class="big-num">' + (TOTAL_KONTRAK - belum) + ' / ' + TOTAL_KONTRAK + '</div>' +
      '<p>Dokumentasi lengkap untuk tahap saat ini. ' + (belum > 0 ? belum + ' berkas penyerahan menunggu tinjauan manajer.' : 'Tidak ada berkas yang menunggu tinjauan.') + '</p>' +
      '<p class="sub">Ringkasan ini tidak menggantikan penilaian DPS terhadap dokumen.</p></div></div>' +
      '<div class="card mt24"><h2>Pratinjau lampiran laporan</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Kode akad / petani</th><th>Parameter</th><th>Keputusan manajer</th><th>Dokumen</th><th>Jejak</th></tr>' +
      rows + '</table></div>' +
      '<p class="sub mt12">' + STATE.arsip.length + ' dari ' + TOTAL_KONTRAK + ' baris · Laporan juga menyertakan skenario historis, catatan perbaikan, alasan keputusan, dan waktu pemeriksaan bukti.</p></div>' +
      '<div class="note mt24"><b>Ekspor tercatat dalam log audit</b>Pengunduh ' + (STATE.sesi ? STATE.sesi.nama : TDATA.users.dps) + ' / DPS · cakupan lembaga ini saja. Data identitas pribadi tidak dimasukkan dalam laporan berkode.</div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};
