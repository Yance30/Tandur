ROUTES['/admin/parameter'] = {
  screen: 'N4',
  render() {
    const p = STATE.param;
    const siap = p.keputusan === 'disetujui';
    const diterapkan = p.keputusan === 'diterapkan';
    const pill = diterapkan ? '✓ ' + p.aktif.versi + ' aktif'
      : siap ? '✓ ' + p.usulan.versi + ' disetujui DPS'
        : p.keputusan === 'catatan' ? '△ ' + p.usulan.versi + ' dikembalikan dengan catatan'
          : '○ ' + p.usulan.versi + ' menunggu keputusan DPS';
    const keadaan = diterapkan ? 'Diterapkan ' + p.diterapkanPada + ' oleh ' + p.dpsOleh + '. W_min ' + rp(p.aktif.wMin) + '; M_min ' + rp(p.aktif.mMin) + '. Akad berjalan tetap memakai versi saat ditandatangani.'
      : siap ? 'Keadaan setelah D3: ' + p.dpsOleh + ', ' + p.tanggal + '. W_min ' + rp(p.usulan.wMin) + '; M_min ' + rp(p.usulan.mMin) + '. Efektif ' + p.usulan.efektif + '.'
        : p.keputusan === 'catatan' ? 'Catatan DPS: ' + p.catatan + ' Manajer perlu mengirim ulang usulan sebelum admin menjadwalkan.'
          : 'Belum ada persetujuan DPS untuk ' + p.usulan.versi + '. Versi yang belum disetujui tidak dapat dipilih atau diterapkan.';
    const tombol = siap
      ? '<button class="btn btn-primary" data-aksi="paramTerapkan">Terapkan ' + p.usulan.versi + ' sekarang</button>'
      : diterapkan
        ? '<button class="btn btn-off" disabled>' + p.aktif.versi + ' sudah diterapkan</button>'
        : '<button class="btn btn-off" disabled>Jadwalkan versi disetujui</button>';
    return shell('admin', '#/admin/parameter',
      '<h1 class="page">Parameter bawaan lembaga</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · Admin mengatur default, bukan menentukan ambang secara sepihak.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Default musim dan satuan</h2>' +
      '<div class="grid g2">' +
      '<div class="field"><label>Musim bawaan</label><select><option>Jun–Sep 2027</option></select></div>' +
      '<div class="field"><label>Komoditas aktif</label><input value="Padi / GKP"></div>' +
      '<div class="field"><label>Satuan luas / volume</label><input value="Hektare / kilogram"></div>' +
      '<div class="field"><label>Format nominal</label><input value="Rupiah · id-ID · Rp6.000"></div>' +
      '<div class="field gfull"><label>Mutu bawaan · contoh</label><input value="Kadar air ≤25%; kotoran ≤3%; toleransi timbang ±1%."></div>' +
      '<div class="field gfull"><label>Metode</label><input value="Timbang bersama, tiga sampel karung, alat kadar air. Konfirmasi pada tiap akad."></div></div>' +
      '<p class="sub">Spesifikasi ilustratif, bukan standar tersertifikasi. Harus disepakati dalam dokumen yang ditinjau.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="simpan" data-label="Simpan default operasional" data-objek="Default musim, komoditas, satuan, mutu">Simpan default operasional</button></div></div>' +
      '<div class="card"><h2>Ambang aktif · hanya baca</h2>' +
      '<table class="tbl"><tr><th>Parameter</th><th>Nilai aktif</th><th>Kewenangan</th></tr>' +
      '<tr><td>W_min</td><td>' + lock() + ' ' + rp(p.aktif.wMin) + '</td><td>Manajer usul → DPS setujui</td></tr>' +
      '<tr><td>M_min</td><td>' + lock() + ' ' + rp(p.aktif.mMin) + '</td><td>Manajer usul → DPS setujui</td></tr>' +
      '<tr><td>Versi / efektif</td><td>' + p.aktif.versi + ' / ' + p.aktif.efektif + '</td><td>Admin terapkan versi disetujui</td></tr></table>' +
      '<div class="btn-row"><button class="btn btn-off" disabled>Ubah nilai ambang</button></div>' +
      '<p class="sub mt14">Admin tidak berwenang menentukan ambang.</p></div>' +
      '</div><div class="grid">' +
      '<div class="warn"><h3>' + (diterapkan ? 'Versi diterapkan' : siap ? 'Versi siap diterapkan' : 'Versi menunggu DPS') + '</h3>' +
      '<span class="pill">' + pill + '</span>' +
      '<p class="mt12">' + keadaan + '</p>' +
      '<div class="field"><label>Tanggal penerapan</label><input id="tanggal-terapkan" value="' + p.usulan.efektif + '"' + (siap ? '' : ' disabled') + '></div>' +
      '<p class="sub mn126">· sesuai persetujuan DPS</p>' +
      '<div class="field"><label>Catatan penerapan</label><input id="catatan-terapkan" value="Hanya calon akad musim berikutnya; tidak mengubah akad berjalan."></div>' +
      '<div class="btn-row">' + tombol +
      '<a class="btn btn-ghost" href="#/dps/persetujuan">Buka layar persetujuan DPS →</a></div></div>' +
      '<div class="note"><b>' + (p.aktif.versi) + ' tetap aktif hingga versi baru diterapkan</b>Versi belum disetujui tidak dapat dipilih. Penjadwalan dan penerapan masuk log audit; versi lama tetap ada pada jejak akad.</div>' +
      '<p class="sub">Jagung dan integrasi: rencana tahun 3, bukan pilihan aktif.</p>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/admin/kelola-akun'] = {
  screen: 'N1',
  render() {
    const tombol = (u, label, op, bahaya) =>
      '<button class="aksilink' + (bahaya ? ' bahaya' : '') + '" data-aksi="akun" data-op="' + op + '" data-email="' + u.email + '">' + label + '</button>';
    const rows = STATE.users.map(u => {
      const status = u.status === 'aktif' ? st('ok', u.dua ? 'Aktif · 2 langkah' : 'Aktif')
        : u.status === 'tunggu' ? st('tunggu', 'Undangan menunggu') : st('gagal', 'Nonaktif');
      let aksi;
      if (u.saya) aksi = '<span class="sub">Akun Anda</span>';
      else if (u.status === 'aktif') aksi = tombol(u, 'Ubah peran', 'peran') + tombol(u, 'Reset akses', 'reset') + tombol(u, 'Nonaktifkan', 'nonaktif', true);
      else if (u.status === 'tunggu') aksi = tombol(u, 'Kirim ulang', 'ulang') + tombol(u, 'Batalkan', 'batalkan', true);
      else aksi = tombol(u, 'Aktifkan kembali', 'aktif') + tombol(u, 'Lihat riwayat', 'riwayat');
      return '<tr><td>' + u.nama + '<br><span class="sub">' + u.email + '</span></td><td>' + u.peran + '</td>' +
        '<td>' + status + '</td><td>' + u.terakhir + '</td><td>' + aksi + '</td></tr>';
    }).join('');
    const hitung = s => STATE.users.filter(u => u.status === s).length;
    const peran = p => STATE.users.filter(u => u.status === 'aktif' && u.peran === p).length;
    return shell('admin', '#/admin/kelola-akun',
      '<h1 class="page">Kelola akun lembaga</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · ' + TDATA.lembaga + ' · Akses hanya untuk pengguna yang diundang.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="btn-row mb22"><a class="btn btn-primary" href="#/admin/undang">Undang pengguna</a></div>' +
      '<div class="grid g3 mb24">' +
      '<div class="card stat"><div class="lab">Pengguna aktif</div><div class="num">' + hitung('aktif') + '</div><div class="cap">' + peran('Petugas') + ' petugas · ' + peran('Manajer') + ' manajer · ' + peran('DPS') + ' DPS · ' + peran('Admin') + ' admin</div></div>' +
      '<div class="card stat"><div class="lab">Undangan menunggu</div><div class="num">' + hitung('tunggu') + '</div><div class="cap">Belum memiliki akses aktif</div></div>' +
      '<div class="card stat"><div class="lab">Nonaktif</div><div class="num">' + hitung('nonaktif') + '</div><div class="cap">Riwayat tetap tersimpan</div></div></div>' +
      '<div class="grid g3 mb22">' +
      '<div class="field"><label>Cari nama / email</label><input placeholder="Cari pengguna..."></div>' +
      '<div class="field"><label>Peran</label><select><option>Semua peran</option></select></div>' +
      '<div class="field"><label>Status</label><select><option>Aktif, menunggu, nonaktif</option></select></div></div>' +
      '<div class="card"><h2>Pengguna lembaga</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Nama / kontak</th><th>Peran</th><th>Status</th><th>Terakhir aktif</th><th>Tindakan</th></tr>' +
      rows + '</table></div>' +
      '<p class="sub mt12">Tindakan pada prototipe ini mengubah data demo dan tercatat di Log audit.</p></div>' +
      '<div class="note mt24"><b>Perubahan akses wajib beralasan</b>Nonaktifkan akun tanpa menghapus jejak pekerjaan. Perubahan peran, reset, undangan, serta pelaku dan waktunya dicatat di Log audit.</div>' +
      '<p class="sub mt18">Admin dapat membaca data petani, tetapi tidak menjalankan uji pembiayaan atau menyetujui kontrak.</p>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/admin/log">Buka Log audit →</a></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/admin/undang'] = {
  screen: 'N2',
  render() {
    const K = [
      ['Data usaha', 'Tulis', 'Baca', 'Baca', 'Baca'],
      ['Jalankan uji', st('ok', 'Ya'), st('ok', 'Ya'), '—', '—'],
      ['Putuskan pembiayaan', '—', st('ok', 'Ya'), '—', '—'],
      ['Catat penyerahan', st('ok', 'Ya'), 'Baca', 'Baca', 'Baca'],
      ['Setujui penyerahan', '—', st('ok', 'Ya'), '—', '—'],
      ['Usul ambang', '—', st('ok', 'Ya'), '—', '—'],
      ['Setujui ambang', '—', '—', st('ok', 'Ya'), '—'],
      ['Terapkan versi disetujui', '—', '—', '—', st('ok', 'Ya')],
      ['Kelola akun / templat', '—', '—', '—', st('ok', 'Ya')]
    ];
    return shell('admin', '#/admin/undang',
      '<h1 class="page">Undang pengguna lembaga</h1>' +
      '<p class="sub">Undangan terikat lembaga dan peran; bukan pendaftaran publik atau eskalasi hak akses.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="layout undang-layout"><div class="card"><h2>Rincian undangan</h2>' +
      '<div class="field"><label>Nama pengguna</label><input id="undang-nama" value="Galih Prasetyo (contoh)"></div>' +
      '<div class="field"><label>Email kerja</label><input id="undang-email" type="email" value="galih@lembaga.example"></div>' +
      '<div class="field"><label>Nomor telepon</label><input value="08·· ···· 4321"></div>' +
      '<div class="field"><label>Peran yang ditetapkan</label><select id="undang-peran">' +
      ['Petugas', 'Manajer', 'DPS', 'Admin'].map(p => '<option>' + p + '</option>').join('') + '</select></div>' +
      '<p class="sub mn120">Pilihan: Petugas, Manajer, DPS, Admin. Ikuti mandat lembaga.</p>' +
      '<div class="field"><label>Wilayah tugas petugas</label><input value="Sumberarum / Kelompok Mekar (contoh)"></div>' +
      '<div class="field"><label>Alasan pemberian akses</label><input value="Pendampingan pendataan dan penyerahan wilayah Sumberarum."></div>' +
      '<label class="check"><input type="checkbox" id="undang-mandat" checked> Mandat dan kontak pengguna telah diverifikasi.</label>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="undang">Kirim undangan</button>' +
      '<a class="btn btn-ghost" href="#/admin/kelola-akun">Batal → Kelola akun</a>' +
      '<a class="btn btn-ghost" href="#/masuk/aktivasi">Pratinjau layar aktivasi →</a></div></div>' +
      '<div class="grid"><div class="card"><h2>Pratinjau kewenangan peran</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Kewenangan</th><th>Petugas</th><th>Manajer</th><th>DPS</th><th>Admin</th></tr>' +
      K.map(r => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td></tr>').join('') +
      '</table></div>' +
      '<p class="sub mt12">DPS dapat mengunduh laporan dan meninjau jejak keputusan. Tidak ada peran petani pada akun aplikasi.</p></div>' +
      '<div class="note"><b>Akun belum aktif sebelum aktivasi</b>Penerima membuat kata sandi melalui undangan. Manajer, DPS, dan admin wajib verifikasi dua langkah. Pilihan peran di landing tidak mengubah izin akun.</div></div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/admin/pengaturan'] = {
  screen: 'N3',
  render() {
    return shell('admin', '#/admin/pengaturan',
      '<h1 class="page">Pengaturan lembaga</h1>' +
      '<p class="sub">Identitas dan dokumentasi ' + TDATA.lembaga + '.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="layout"><div class="card"><h2>Identitas lembaga</h2>' +
      '<div class="field"><label>Nama lembaga</label><input value="KSPPS Tunas Makmur"></div>' +
      '<div class="field"><label>Cabang / wilayah</label><input value="Malang (contoh)"></div>' +
      '<div class="field"><label>Alamat korespondensi</label><input value="Jl. Sawah Sejahtera No. 12, Malang (alamat fiktif contoh)"></div>' +
      '<div class="dfs"><div class="field"><label>Kontak lembaga</label><input value="08·· ···· 2180"></div>' +
      '<div class="field"><label>Email layanan</label><input value="layanan@lembaga.example"></div></div>' +
      '<div class="field"><label>Gudang penyerahan bawaan</label><input value="Gudang Sumberarum, Malang (lokasi fiktif contoh)"></div>' +
      '<div class="field"><label>Penomoran akad</label><input value="TDR-{tahun}-{kode petani}-{urutan}"></div>' +
      '<p class="sub mn120">Contoh: ' + ARSIP_TINJAU + '. Nomor dokumen historis tidak berubah.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="simpan" data-label="Simpan pengaturan" data-objek="Identitas dan kontak lembaga">Simpan pengaturan</button><button class="btn btn-ghost" data-aksi="pesan" data-pesan="Perubahan dibatalkan. Nilai lama pada pengaturan lembaga tetap dipakai.">Batal</button></div></div>' +
      '<div class="grid">' +
      '<div class="warn"><h2>Identitas pada dokumen</h2>' +
      '<div class="card mb18 mt0"><p class="b7 fs17">KSPPS Tunas Makmur</p><p class="sub m0">Lembaga ilustratif · tanpa logo rekan</p></div>' +
      '<div class="btn-row mb14 mt0"><button class="btn btn-primary" data-aksi="simpan" data-label="Unggah logo lembaga" data-objek="Logo lembaga (berkas contoh)">Unggah logo lembaga</button></div>' +
      '<p class="sub">Gunakan hanya logo yang berhak dipakai lembaga. Logo Tandur tetap identitas perangkat kerja.</p>' +
      '<div class="mt12">' + logo({ ink: true, size: 30 }) + '</div></div>' +
      '<div class="note"><b>Perubahan tercatat</b>Nama, alamat, gudang, dan aturan penomoran disimpan dengan pelaku, waktu, serta alasan. Perubahan tidak mengubah isi akad yang sudah ditandatangani.</div>' +
      '<div class="field mt18"><label>Alasan perubahan</label><input value="Memperbarui kontak layanan dan gudang bawaan musim berikutnya."></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/admin/templat'] = {
  screen: 'N5',
  render() {
    const tabs = ['Ringkasan akad', 'Lima pertanyaan', 'Pesan WhatsApp', 'Berita acara'];
    return shell('admin', '#/admin/templat',
      '<h1 class="page">Templat jelas, versi terlacak.</h1>' +
      '<p class="sub">Draf v1.3 · Naskah akad memerlukan tinjauan syariah sebelum dipakai.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="tabs wide mt622">' + tabs.map((t, i) =>
        '<a href="#/admin/templat"' + (i === 0 ? ' class="active"' : '') + '>' + t + '</a>').join('') + '</div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Editor ringkasan akad</h2>' +
      '<div class="field"><label>Judul</label><input value="Ringkasan akad salam"></div>' +
      '<div class="field"><label>Pembuka</label><input value="Lembaga membayar penuh di muka {{uang_muka}} untuk {{volume}} kg pada {{harga_salam}}/kg."></div>' +
      '<div class="field"><label>Waktu, tempat, mutu</label><input value="Penyerahan {{tanggal_serah}} di {{lokasi_serah}}; mutu dan metode sesuai lampiran yang ditinjau."></div>' +
      '<div class="field"><label>Cadangan keluarga</label><input value="Cadangan {{cadangan_R}} kg tetap milik petani, tidak masuk volume akad."></div>' +
      '<div class="field"><label>Gagal panen / keberatan</label><input value="Hubungi petugas; bukti diverifikasi, penyelesaian bersama lembaga dan DPS sesuai akad."></div>' +
      '<div class="note m640"><b>○ Menunggu tinjauan syariah</b>Draf tidak menggantikan versi aktif sebelum ditinjau. Admin tidak menetapkan ketentuan syariah sendiri.</div>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="simpan" data-label="Simpan draf templat v1.3" data-objek="Templat ringkasan akad">Simpan draf v1.3</button>' +
      '<a class="btn btn-ghost" href="#/dps/persetujuan">Ajukan tinjauan DPS</a></div></div>' +
      '<div class="card"><h2>Blok templat lain</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Blok</th><th>Isi wajib</th></tr>' +
      '<tr><td>Lima pertanyaan</td><td>Uang muka; jumlah/harga; waktu/tempat; mutu/R; gagal panen/kontak</td></tr>' +
      '<tr><td>WhatsApp</td><td>Kode, ringkasan, kontak; tanpa data sensitif</td></tr>' +
      '<tr><td>Kop BA</td><td>Lembaga, nomor, berat/mutu, bukti, keberatan, tanda tangan</td></tr></table></div></div>' +
      '</div><div class="grid">' +
      '<div class="warn">' + logo({ ink: true, size: 28 }) +
      '<p class="sub m10018">' + TDATA.lembaga + '</p>' +
      '<h2 class="h2-lg">Ringkasan akad salam</h2>' +
      '<p class="sub">' + ARSIP_TINJAU + ' · Draf v1.3</p>' +
      '<div class="big-num">Rp4.800.000</div>' +
      '<p>Dibayar penuh di muka untuk 800 kg GKP pada Rp6.000/kg.</p>' +
      '<p>20 Mei 2027 di Gudang Sumberarum (contoh).</p>' +
      '<p>200 kg tetap untuk keluarga. Jika gagal panen: hubungi petugas untuk verifikasi dan penyelesaian sesuai akad bersama lembaga/DPS.</p>' +
      '<p class="sub">Draf legal operasional, wajib ditinjau DPS sebelum tanda tangan.</p>' +
      '<p>Petani _________</p><p>Petugas __________</p><p>Saksi _________</p></div>' +
      '<div class="card"><h2>Riwayat versi</h2><p>' + riwayatVersi() + '</p>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/akad">Pratinjau A4</a>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak pratinjau</button>' +
      '<a class="btn btn-ghost" href="#/dps/persetujuan">Bandingkan versi</a></div></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/admin/log'] = {
  screen: 'N6',
  render() {
    return shell('admin', '#/admin/log',
      '<h1 class="page">Log audit lembaga</h1>' +
      '<p class="sub">Peristiwa akun, konfigurasi, dan ekspor · Hanya untuk ' + TDATA.lembaga + '.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="grid g3 mb22">' +
      '<div class="field"><label>Rentang waktu</label><select><option>1–22 Mei 2027</option></select></div>' +
      '<div class="field"><label>Pelaku / peran</label><select><option>Semua pengguna</option></select></div>' +
      '<div class="field"><label>Jenis peristiwa</label><select><option>Semua aktivitas</option></select></div></div>' +
      '<div class="note mb24"><b>' + lock() + ' Riwayat tidak dapat dihapus lewat layar ini</b>Data lembaga terisolasi. Perubahan peran dan konfigurasi menyimpan nilai sebelum/sesudah, alasan, waktu, dan pelaku.</div>' +
      '<div class="card"><h2>Aktivitas terbaru</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Waktu WIB</th><th>Pelaku / peran</th><th>Peristiwa</th><th>Objek / ringkasan</th><th>Hasil</th></tr>' +
      STATE.log.map(r => '<tr><td>' + r.waktu + '</td><td>' + r.pelaku + '</td><td>' + r.peristiwa + '</td><td>' + r.objek + '</td><td>' + st('ok', r.hasil) + '</td></tr>').join('') +
      '</table></div>' +
      '<p class="sub mt12">' + STATE.log.length + ' peristiwa terbaru · Baris teratas adalah tindakan pada sesi demo ini. Log ini terpisah dari jejak keputusan setiap akad.</p></div>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="ekspor" data-label="Ekspor log berkode" data-objek="Log audit Jan–Mei 2027">Ekspor log berkode</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak log</button>' +
      '<a class="btn btn-ghost" href="#/admin/kelola-akun">Kembali ke Kelola akun</a></div>' +
      '<p class="sub mt18">Admin tidak mendapat kewenangan pembiayaan dari akses log. Pembacaan data tetap mengikuti mandat lembaga.</p>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};
