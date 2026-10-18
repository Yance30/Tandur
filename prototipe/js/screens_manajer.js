function mlarik(rentan) {
  const hs = rentan ? [52, 70, 26, 64] : [48, 78, 44, 72];
  return '<span class="inline-flex">' + hs.map((h, i) =>
    '<span class="ml' + (rentan && i === 2 ? ' bad' : '') + '"><i style="height:' + h + '%"></i></span>').join('') + '</span>';
}

function putusanPill(k) {
  if (k.putusan === 'disetujui') return '<span class="pill">✓ Disetujui ' + STATE.param.aktif.versi + '</span>';
  if (k.putusan === 'ditolak') return '<span class="pill">× Ditolak dengan alasan</span>';
  if (k.putusan === 'perbaikan') return '<span class="pill">△ Perbaikan diminta</span>';
  if (k.putusan === 'diajukan') return '<span class="pill">○ Baru diajukan petugas · menunggu keputusan</span>';
  return '<span class="pill">○ Menunggu keputusan manajer</span>';
}

ROUTES['/manajer/portofolio'] = {
  screen: 'M1',
  render() {
    const rows = STATE.aktif.map(a =>
      '<tr><td>' + a.kode + '<br><span class="sub">' + a.desa + '</span></td>' +
      '<td>' + a.q + '<br><span class="sub">' + a.ps + '</span></td>' +
      '<td>' + a.nilai + '</td><td>' + a.serah + '</td>' +
      '<td>' + st(a.status[0], a.status[1]) + '</td><td>' + mlarik(a.rentan) + '</td></tr>').join('');
    const perluSerah = STATE.aktif.filter(a => a.status[0] !== 'ok').length;
    return shell('manajer', '#/manajer/portofolio',
      '<h1 class="page">Portofolio pembiayaan</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · ' + TDATA.lembaga + ' · Musim ' + TDATA.musim + '</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="btn-row mb22"><button class="btn btn-primary" data-aksi="ekspor" data-label="Ekspor laporan DPS" data-objek="Portofolio berkode Jan–Mei 2027">Ekspor laporan DPS</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak portofolio</button></div>' +
      '<div class="layout"><div class="card"><h2>Keputusan yang menunggu Anda</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Prioritas</th><th>Kandidat / masalah</th><th>Tindakan</th></tr>' +
      '<tr><td>Hari ini</td><td>TDR-0034 · bukti lengkap, stress perlu alasan</td><td><a href="#/manajer/detail-persetujuan">Detail persetujuan →</a></td></tr>' +
      '<tr><td>1 hari</td><td>TDR-0036 · manfaat −20% di bawah ambang</td><td><a href="#/manajer/detail-persetujuan">Minta perbaikan →</a></td></tr>' +
      '<tr><td>2 hari</td><td>TDR-0038 · bukti cadangan belum ada</td><td><a href="#/manajer/detail-persetujuan">Lengkapi bukti →</a></td></tr></table></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/manajer/antrean">Buka Antrean persetujuan</a>' +
      '<a class="btn btn-ghost" href="#/manajer/detail-kontrak">Tinjau serah terima (' + perluSerah + ')</a></div></div>' +
      '<div class="warn"><h2>Ketahanan −20%</h2><div class="big-num">9 / ' + TOTAL_KONTRAK + '</div>' +
      '<p class="b7">75% kontrak aktif lolos empat sisi.</p>' +
      '<p>Pemantauan asumsi terbaru. Tidak menggantikan hasil uji historis saat persetujuan; bukan probabilitas gagal.</p></div></div>' +
      '<div class="grid g3 m240">' +
      '<div class="card stat"><div class="lab">Petani terdaftar</div><div class="num">24</div><div class="cap">' + TOTAL_KONTRAK + ' memiliki kontrak aktif</div></div>' +
      '<div class="card stat"><div class="lab">Kontrak aktif</div><div class="num">' + TOTAL_KONTRAK + '</div><div class="cap">Tidak termasuk ' + STATE.kandidat.length + ' kandidat antrean</div></div>' +
      '<div class="card stat"><div class="lab">Nilai salam aktif</div><div class="num">Rp58.800.000</div><div class="cap">Dibayar lembaga, bukan Tandur</div></div></div>' +
      '<div class="layout"><div class="card"><h2>Cadangan keluarga · ' + TOTAL_KONTRAK + ' kontrak</h2>' +
      '<div class="grid g3">' +
      '<div class="mintbox stat p18"><div class="lab">Minimum</div><div class="num fs28">100 kg</div><div class="cap">Cadangan terendah</div></div>' +
      '<div class="mintbox stat p18"><div class="lab">Median</div><div class="num fs28">200 kg</div><div class="cap">Nilai tengah</div></div>' +
      '<div class="mintbox stat p18"><div class="lab">Maksimum</div><div class="num fs28">350 kg</div><div class="cap">Cadangan tertinggi</div></div></div></div>' +
      '<div class="note"><b>△ 3 kontrak rentan</b>Buka Risiko portofolio untuk melihat manfaat petani dan kontribusi pada pemantauan skenario terbaru.</div></div>' +
      '<div class="card mt24"><h2>Kontrak aktif</h2>' +
      '<div class="dfs mb10">' +
      '<div class="field"><label>Cari kode / desa</label><input placeholder="Semua kode / desa"></div>' +
      '<div class="field"><label>Status / penyerahan</label><select><option>Semua status · Mei 2027</option></select></div></div>' +
      '<table class="tbl"><tr><th>Kode / desa</th><th>q / Ps</th><th>Nilai salam</th><th>Penyerahan</th><th>Status</th><th>Larik −20%</th></tr>' +
      rows + '</table>' +
      '<p class="sub mt14">' + STATE.aktif.length + ' dari ' + TOTAL_KONTRAK + '. Larik: Modal / Penyerahan / Manfaat / Kontribusi; garis = 100% ambang sendiri. Bukti BA yang belum lengkap memblokir finalisasi serah terima, bukan menghapus akad historis.</p></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/manajer/antrean'] = {
  screen: 'M2',
  render() {
    const TUJUAN = {
      detail: ['Detail persetujuan →', '#/manajer/detail-persetujuan'],
      perbaikan: ['Minta perbaikan →', '#/manajer/detail-persetujuan'],
      lengkapi: ['Lengkapi bukti →', '#/petugas/data-petani']
    };
    const PUTUSAN = {
      disetujui: ['ok', 'Disetujui'],
      ditolak: ['gagal', 'Ditolak'],
      perbaikan: ['tinjau', 'Perbaikan diminta'],
      diajukan: ['tunggu', 'Menunggu manajer']
    };
    const rows = STATE.kandidat.map(k => {
      const a = TUJUAN[k.aksi];
      const p = PUTUSAN[k.putusan];
      const putusan = p
        ? st(p[0], p[1]) + ' <a href="#/manajer/detail-persetujuan">Jejak →</a>'
        : '<a href="' + a[1] + '">' + a[0] + '</a>';
      return '<tr><td>' + k.kode + ' · ' + k.diterima + '</td>' +
        '<td>' + k.volume + ' kg · ' + rp(k.total) + '</td>' +
        '<td>' + st(k.bukti[0], k.bukti[1]) + '</td>' +
        '<td>' + duo(k.dasar) + '</td>' +
        '<td>' + duo(k.stress) + '</td>' +
        '<td>' + putusan + '</td></tr>';
    }).join('');
    const siap = STATE.kandidat.filter(k => k.bukti[0] === 'ok').length;
    return shell('manajer', '#/manajer/antrean',
      '<h1 class="page">Antrean persetujuan</h1>' +
      '<p class="sub">' + STATE.kandidat.length + ' kandidat · ' + siap + ' siap ditinjau, ' + (STATE.kandidat.length - siap) + ' perlu bukti. Tidak termasuk ' + TOTAL_KONTRAK + ' kontrak aktif.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="grid g3 mb22">' +
      '<div class="field"><label>Prioritas</label><select><option>Paling lama menunggu</option></select></div>' +
      '<div class="field"><label>Bukti / petugas</label><select><option>Semua kesiapan / semua petugas</option></select></div>' +
      '<div class="field"><label>Desa</label><select><option>Semua desa</option></select></div></div>' +
      '<div class="card"><h2>Kandidat yang memerlukan keputusan</h2>' +
      '<table class="tbl"><tr><th>Kode / diterima</th><th>Usulan salam</th><th>Bukti</th><th>Dasar / −20%</th><th>Stress −40% / harga</th><th>Tindakan</th></tr>' +
      rows + '</table>' +
      '<p class="foot-note mt14">W = manfaat petani · M = kontribusi lembaga. Tabel sensitivitas bukan probabilitas. Nama petani tidak ditampilkan.</p></div>' +
      '<div class="grid g2 mt24">' +
      '<div class="note"><b>○ Bukti belum lengkap tidak dapat disetujui</b>Minta petugas melengkapi data sumber. Manajer membaca data dan meninjau hasil, tidak menimpa bukti lapangan.</div>' +
      '<div class="warn"><h3>Alasan selalu wajib</h3><p>Setujui, minta perbaikan, atau tolak: setiap keputusan memiliki alasan, versi parameter, waktu, dan pelaku pada jejak keputusan.</p>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/manajer/detail-persetujuan">Buka ' + KODE_TINJAU + '</a>' +
      '<a class="btn btn-ghost" href="#/dps/jejak">Lihat jejak keputusan</a></div></div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/manajer/detail-persetujuan'] = {
  screen: 'M3',
  render() {
    const k = kandidat(KODE_TINJAU);
    const tabs = ['Dasar', 'Hasil −20%', 'Hasil −40%', 'Harga −10%'];
    const bolehSetuju = k.bukti[0] === 'ok';
    const keputusan = k.putusan === 'disetujui'
      ? '<div class="btn-row"><button class="btn btn-off" disabled>Usulan sudah disetujui</button></div>' +
        '<p class="sub mt14">Alasan tercatat: ' + k.alasan + '</p>'
      : k.putusan === 'ditolak'
        ? '<div class="btn-row"><button class="btn btn-off" disabled>Usulan ditolak</button></div>' +
          '<p class="sub mt14">Alasan tercatat: ' + k.alasan + '</p>'
        : '<div class="btn-row"><button class="btn btn-primary" data-aksi="keputusan" data-op="perbaikan">Kirim permintaan perbaikan</button></div>' +
          '<div class="btn-row mt12"><button class="btn btn-ghost" data-aksi="keputusan" data-op="tolak">Tolak dengan alasan</button></div>' +
          (k.putusan === 'perbaikan'
            ? '<div class="btn-row mt12"><button class="btn btn-off" disabled>Setujui setelah perbaikan</button></div>' +
              '<p class="sub mt14">Perbaikan masih diminta. Petugas mengirim ulang versi untuk ditinjau · ' +
              '<a href="#/petugas/hasil-uji">buka layar kirim ulang petugas →</a></p>'
            : bolehSetuju
              ? '<div class="btn-row mt12"><button class="btn btn-primary" data-aksi="keputusan" data-op="setuju">Setujui usulan</button></div>' +
                '<p class="sub mt14">Persetujuan menambah peristiwa pada jejak keputusan dengan parameter ' + STATE.param.aktif.versi + '.</p>'
              : '<div class="btn-row mt12"><button class="btn btn-off" disabled>Setujui usulan</button></div>' +
                '<p class="sub mt14">Bukti belum lengkap: persetujuan diblokir sampai petugas melengkapi data sumber.</p>');
    return shell('manajer', '#/manajer/antrean',
      '<h1 class="page">Tinjau kandidat ' + KODE_TINJAU + '</h1>' +
      '<p class="sub">15 Jan 2027, 10.00 WIB · ' + ARSIP_TINJAU + ' · Petugas Rina S. · DPS ' + STATE.param.aktif.versi + '</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      putusanPill(k) +
      '<div class="tabs wide mt622">' + tabs.map((t, i) =>
        '<a href="#/manajer/detail-persetujuan"' + (i === 1 ? ' class="active"' : '') + '>' + t + '</a>').join('') + '</div>' +
      '<div class="card"><h2>Skenario −20% · empat pemeriksaan lolos</h2>' + larik(TDATA.uji) +
      '<p class="foot-note m14018">Garis = 100% ambang sendiri; batas tampilan = 200%. Rupiah dan kg tidak disatukan dalam satu skala. Nilai negatif berarti di bawah ambang.</p>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Pemeriksaan</th><th>Perhitungan / batas</th></tr>' +
      '<tr><td>Modal</td><td>800 × Rp6.000 = Rp4.800.000 ≥ K Rp4.775.715</td></tr>' +
      '<tr><td>Penyerahan</td><td>800 ≤ 1.483,2 − 200 − 0 = 1.283,2 kg</td></tr>' +
      '<tr><td>Manfaat petani</td><td>800×6.000 + (1.483,2−800)×6.500 − 6.115.036 = Rp3.125.764</td></tr>' +
      '<tr><td>Kontribusi</td><td>800×(6.500−6.000) − 240.000 = Rp160.000</td></tr></table></div></div>' +
      '<div class="card mt24"><h2>Seluruh sensitivitas</h2>' + TABLE_UJI +
      '<div class="note mt18"><b>△ Jangan menyetujui skenario gagal</b>−40%: manfaat kurang Rp2.284.436, tidak ada rentang harga layak dengan input tetap. Harga −10% menggagalkan kontribusi. Revisi dan uji ulang jika skenario itu menjadi dasar keputusan.</div></div>' +
      '<div class="layout mt24"><div class="card"><h2>Bukti, harga, dan catatan lapangan</h2>' +
      '<p>' + st(k.bukti[0], k.bukti[1]) + ' · Persetujuan dan R/L terverifikasi. Riwayat panen terlampir. = Estimasi non-tunai dijelaskan dengan dasar bukti.</p>' +
      '<p class="b7">Rentang −20%: Rp5.970–Rp6.075/kg</p>' +
      '<p>Ps Rp6.000 di dalam rentang. Ph/Pj Rp6.500 dan B Rp240.000 memiliki catatan pasar dan biaya.</p>' +
      '<p class="sub">Rina: cadangan dipisahkan; konfirmasi pemahaman sebelum akad.</p>' +
      '<div class="btn-row"><button class="btn btn-ghost" data-aksi="bukti" data-kode="' + KODE_TINJAU + '">Tandai bukti lengkap</button>' +
      '<a class="btn btn-ghost" href="#/petugas/data-petani">Buka data sumber petugas →</a></div></div>' +
      '<div class="card"><h2>Keputusan manajer</h2>' +
      '<div class="field"><label>Hasil keputusan</label><select><option>Minta perbaikan sebelum keputusan akhir</option><option>Setujui usulan</option><option>Tolak dengan alasan</option></select></div>' +
      '<div class="field"><label>Alasan keputusan · wajib</label><input id="alasan-keputusan" value="Perjelas rencana penanganan hasil ekstrem; lampirkan dasar harga jual. Uji ulang bila input berubah."></div>' +
      '<div class="note m640"><b>Kondisi persetujuan</b>Hanya versi yang lolos dasar kelayakan disepakati, bukti lengkap, dan stress ditinjau dapat disetujui. Klik persetujuan tidak mengubah hasil gagal.</div>' +
      keputusan + '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/manajer/detail-kontrak'] = {
  screen: 'M4',
  render() {
    const self = '#/manajer/detail-kontrak';
    const tabs = [['Ringkasan', self], ['Uji kelayakan', '#/manajer/detail-persetujuan'], ['Akad', self], ['Bukti bayar', self], ['Serah terima', self], ['Jejak', '#/dps/jejak']];
    const s = STATE.serah;
    const serah = s.putusan === 'disetujui'
      ? '<div class="btn-row"><button class="btn btn-off" disabled>Serah terima disetujui</button>' +
        '<button class="btn btn-ghost" data-aksi="cetak">Cetak berita acara</button></div>' +
        '<p class="sub mt14">Alasan tercatat: ' + s.alasan + '</p>'
      : '<div class="btn-row"><button class="btn btn-primary" data-aksi="serah" data-op="setujui">Setujui serah terima</button>' +
        '<button class="btn btn-ghost" data-aksi="serah" data-op="klarifikasi">Minta klarifikasi</button>' +
        '<button class="btn btn-ghost" data-aksi="cetak">Lihat PDF BA</button></div>';
    const keberatan = s.keberatan === 'selesai'
      ? '<div class="btn-row"><button class="btn btn-off" disabled>Keberatan ditutup</button></div>' +
        '<p class="sub mt14">Keputusan tercatat pada jejak; petani sudah dibacakan hasilnya.</p>'
      : '<div class="btn-row"><button class="btn btn-primary" data-aksi="keberatan" data-op="terima">Setujui penyelesaian</button>' +
        '<button class="btn btn-ghost" data-aksi="keberatan" data-op="bukti">Minta bukti tambahan</button></div>';
    return shell('manajer', '#/manajer/detail-kontrak',
      '<h1 class="page">' + ARSIP_TINJAU + '</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · ' + KODE_TINJAU + ' · Pembayaran penuh di muka terdokumentasi · ' + STATE.param.aktif.versi + '</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="tabs wide mb24">' + tabs.map(t =>
        '<a href="' + t[1] + '"' + (t[0] === 'Serah terima' ? ' class="active"' : '') + '>' + t[0] + '</a>').join('') + '</div>' +
      '<div class="layout"><div class="grid">' +
      '<div class="card"><h2>Tinjau serah terima</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Pemeriksaan</th><th>Hasil lapangan</th><th>Contoh kesepakatan</th></tr>' +
      '<tr><td>Berat</td><td>800 kg · selisih 0 kg</td><td>800 kg · toleransi ±1%</td></tr>' +
      '<tr><td>Kadar air</td><td>24%</td><td>Maks. 25%</td></tr>' +
      '<tr><td>Kotoran</td><td>2%</td><td>Maks. 3%</td></tr>' +
      '<tr><td>Metode</td><td>Timbang ulang; 3 sampel</td><td>Diperiksa bersama</td></tr>' +
      '<tr><td>Petugas / saksi</td><td>Rina S. / Budi S.</td><td>20 Mei 2027</td></tr></table></div>' +
      '<p class="sub m14018">Mutu ilustratif, bukan standar tersertifikasi. Tiket timbang dan keterangan saksi tersedia.</p>' +
      '<div class="field"><label>Alasan persetujuan · wajib</label><input id="alasan-serah" value="Berat akhir dan mutu sesuai. Tiket timbang ulang dan saksi diperiksa."></div>' +
      serah + '</div>' +
      '<div class="card"><h2>Keberatan KBR-2027-0012</h2>' +
      '<p>Satu karung ditimbang ulang. Berat akhir 800 kg; harga dan volume akad tidak berubah.</p>' +
      '<div class="field"><label>Keputusan penyelesaian · wajib</label><input id="alasan-keberatan" value="Terima hasil timbang ulang; lampirkan bukti dan bacakan keputusan kepada petani sebelum ditutup."></div>' +
      keberatan + '</div>' +
      '</div><div class="grid">' +
      '<div class="warn"><h2>Ringkasan akad</h2><div class="big-num">Rp4.800.000</div>' +
      '<p>800 kg × Rp6.000; R 200 kg; L 0 kg; lahan 0,4 ha.</p>' +
      '<p>✓ Ditandatangani 16 Jan. ✓ Transfer langsung penuh 16 Jan. ✓ Pemahaman 5/5.</p>' +
      '<p>' + (s.putusan === 'disetujui' ? '✓ Serah terima disetujui manajer.' : '○ Serah terima menunggu keputusan manajer.') + '</p></div>' +
      '<div class="note"><b>Data sumber tidak diedit di sini</b>Minta petugas memperbaiki bukti. Keputusan manajer ditambahkan ke jejak, bukan menimpa catatan.</div>' +
      '<div class="card"><h2>Dokumen terkait</h2><p>Ringkasan akad.pdf; akad bertanda tangan; bukti transfer; tiket ulang; catatan saksi.</p>' +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/petugas/akad">Buka akad A4</a>' +
      '<a class="btn btn-ghost" href="#/petugas/berita-acara">Buka berita acara</a></div></div>' +
      '</div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/manajer/risiko'] = {
  screen: 'M5',
  render() {
    return shell('manajer', '#/manajer/risiko',
      '<h1 class="page">Ketahanan, bukan sekadar nilai salam.</h1>' +
      '<p class="sub">' + TDATA.hariIni + ' · ' + TOTAL_KONTRAK + ' kontrak aktif · Rp58.800.000 · Data ilustratif, bukan performa bisnis Tandur.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<div class="note mb24"><b>Skenario tidak menunjukkan probabilitas</b>Jumlah di bawah ini adalah kontrak yang lolos empat pemeriksaan pada masing-masing perubahan input. Jangan dibaca sebagai peluang gagal panen.</div>' +
      '<div class="card"><h2>Matriks sensitivitas · ' + TOTAL_KONTRAK + ' kontrak</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Skenario</th><th>Lolos empat sisi</th><th>Tinjau</th><th>Pemeriksaan yang paling sering gagal</th></tr>' +
      '<tr><td>Dasar</td><td>' + TOTAL_KONTRAK + ' / ' + TOTAL_KONTRAK + ' (100%)</td><td>0</td><td>—</td></tr>' +
      '<tr><td>Hasil −20%</td><td>9 / ' + TOTAL_KONTRAK + ' (75%)</td><td>3</td><td>Manfaat petani</td></tr>' +
      '<tr><td>Hasil −40%</td><td>2 / ' + TOTAL_KONTRAK + ' (16,7%)</td><td>10</td><td>Manfaat petani</td></tr>' +
      '<tr><td>Harga −10%</td><td>4 / ' + TOTAL_KONTRAK + ' (33,3%)</td><td>8</td><td>Kontribusi lembaga</td></tr></table></div></div>' +
      '<div class="grid g2 m240">' +
      '<div class="card"><h2>Distribusi cadangan keluarga R</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Rentang</th><th>Kontrak</th><th>Kuantitas</th></tr>' +
      '<tr><td>100–149 kg</td><td>2</td><td>Minimum 100 kg</td></tr>' +
      '<tr><td>150–199 kg</td><td>3</td><td>Di bawah median</td></tr>' +
      '<tr><td>200–249 kg</td><td>4</td><td>Median 200 kg</td></tr>' +
      '<tr><td>250–350 kg</td><td>3</td><td>Maksimum 350 kg</td></tr></table></div>' +
      '<p class="sub mt12">' + TOTAL_KONTRAK + ' kontrak. Cadangan tidak termasuk volume akad.</p></div>' +
      '<div class="card"><h2>Komitmen panen lain L</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Komitmen lain</th><th>Kontrak</th><th>Tindak lanjut</th></tr>' +
      '<tr><td>0 kg</td><td>8</td><td>Pantau perubahan komitmen</td></tr>' +
      '<tr><td>1–100 kg</td><td>3</td><td>Bukti komitmen tersedia</td></tr>' +
      '<tr><td>101–200 kg</td><td>1</td><td>Prioritaskan pemeriksaan kemampuan serah</td></tr></table></div>' +
      '<p class="sub mt12">Minimum 0 kg · median 0 kg · maksimum 200 kg.</p></div></div>' +
      '<div class="card"><h2>Kontrak paling rentan</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Kode</th><th>W hasil −20%</th><th>W hasil −40%</th><th>M harga −10%</th><th>Prioritas</th></tr>' +
      '<tr><td>TDR-0018</td><td>Rp2.460.000</td><td>Rp420.000</td><td>−Rp310.000</td><td>' + st('tinjau', 'Tinjau manfaat') + '</td></tr>' +
      '<tr><td>TDR-0024</td><td>Rp2.790.000</td><td>Rp590.000</td><td>−Rp280.000</td><td>' + st('tinjau', 'Tinjau manfaat') + '</td></tr>' +
      '<tr><td>TDR-0032</td><td>Rp2.880.000</td><td>Rp680.000</td><td>−Rp320.000</td><td>' + st('tinjau', 'Tinjau manfaat') + '</td></tr>' +
      '<tr><td>' + KODE_TINJAU + '</td><td>Rp3.125.764</td><td>Rp715.564</td><td>−Rp360.000</td><td>Pantau stress ekstrem</td></tr></table></div>' +
      '<p class="sub mt12">Ambang ilustratif ' + STATE.param.aktif.versi + ': W_min ' + rp(STATE.param.aktif.wMin) + '; M_min ' + rp(STATE.param.aktif.mMin) + '. ' + KODE_TINJAU + ' masih lolos hasil −20%.</p></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/manajer/detail-kontrak">Buka Detail kontrak rentan</a>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-label="Unduh analisis skenario" data-objek="Analisis skenario 12 kontrak">Unduh analisis skenario</button>' +
      '<a class="btn btn-ghost" href="#/manajer/parameter">Usulkan parameter</a></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};

ROUTES['/manajer/parameter'] = {
  screen: 'M6',
  render() {
    const p = STATE.param;
    const df = (lab, val, foot) => '<div class="df"><div class="lab">' + lab + '</div><div class="val fs155">' + val + '</div>' + (foot || '') + '</div>';
    const TL = [['10 Jan 2027', p.aktif.versi + ' · Aktif', 'Disetujui DPS, diterapkan admin.']];
    if (p.keputusan === 'menunggu') TL.push(['12 Mei 2027', p.usulan.versi + ' · Draf usulan', 'Ayu P. menyusun dasar dan dampak.'], [p.usulan.efektif, 'Efektif yang diusulkan', 'Belum aktif; menunggu persetujuan DPS.']);
    else if (p.keputusan === 'catatan') TL.push(['12 Mei 2027', p.usulan.versi + ' · Draf usulan', 'Ayu P. menyusun dasar dan dampak.'], [p.tanggal.split(' · ')[0] + ' Mei 2027', p.usulan.versi + ' · Catatan DPS', p.dpsOleh + ' · ' + p.catatan]);
    else if (p.keputusan === 'disetujui') TL.push(['12 Mei 2027', p.usulan.versi + ' · Draf usulan', 'Ayu P. menyusun dasar dan dampak.'], [p.tanggal.split(' · ')[0] + ' Mei 2027', p.usulan.versi + ' · Disetujui DPS', p.dpsOleh + ' · menunggu penerapan admin.'], [p.usulan.efektif, 'Efektif yang diusulkan', 'Belum aktif sampai admin menerapkan.']);
    else TL.push(['12 Mei 2027', p.usulan.versi + ' · Draf usulan', 'Ayu P. menyusun dasar dan dampak.'], [p.tanggal.split(' · ')[0] + ' Mei 2027', p.usulan.versi + ' · Disetujui DPS', p.dpsOleh + ' · catatan tersimpan.'], [p.diterapkanPada.split(' · ')[0] + ' Mei 2027', p.usulan.versi + ' · Diterapkan admin', 'Efektif ' + p.aktif.efektif + '; akad berjalan tidak berubah.']);
    const pill = p.keputusan === 'diterapkan' ? '✓ ' + p.aktif.versi + ' aktif'
      : p.keputusan === 'disetujui' ? '✓ ' + p.usulan.versi + ' disetujui DPS'
        : p.keputusan === 'catatan' ? '△ ' + p.usulan.versi + ' dikembalikan dengan catatan'
          : '○ ' + p.usulan.versi + ' menunggu keputusan DPS';
    return shell('manajer', '#/manajer/parameter',
      '<h1 class="page">Usulkan, tinjau, baru terapkan.</h1>' +
      '<p class="sub">Parameter dan laporan tata kelola · Perubahan ambang tidak berlaku surut pada akad yang ditandatangani.</p>' +
      '<div class="meta-chip">Data ilustratif · Musim tanam ' + TDATA.musim + '</div>' +
      '<span class="pill mb20">' + pill + '</span>' +
      '<div class="layout"><div class="card"><h2>Usulan ' + p.usulan.versi + ' · musim Jun—Sep 2027</h2>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Parameter</th><th>Aktif ' + p.aktif.versi + '</th><th>Usulan ' + p.usulan.versi + '</th></tr>' +
      '<tr><td>W_min</td><td>' + rp(p.aktif.wMin) + '</td><td>' + rp(p.usulan.wMin) + '</td></tr>' +
      '<tr><td>M_min</td><td>' + rp(p.aktif.mMin) + '</td><td>' + rp(p.usulan.mMin) + '</td></tr>' +
      '<tr><td>Tanggal efektif</td><td>' + p.aktif.efektif + '</td><td>' + p.usulan.efektif + ' (usulan)</td></tr></table></div>' +
      df('Dasar lokal dan kesepakatan petani', 'Ringkasan diskusi kelompok 10 Mei 2027, catatan kebutuhan rumah tangga, dan biaya distribusi lokal terlampir.', '<div class="verif">✓ Terverifikasi · notulen-kelompok.pdf · Tambah bukti</div>') +
      df('Alasan perubahan · wajib', 'Menyesuaikan manfaat minimum dengan kebutuhan musim berikutnya serta biaya lembaga, tanpa mengubah akad berjalan.') +
      df('Dampak uji ulang', TOTAL_KONTRAK + ' contoh kontrak disimulasikan; lampiran dampak-v1.3.xlsx tersedia. Keputusan tetap menunggu DPS.') +
      '<div class="btn-row"><a class="btn btn-primary" href="#/dps/persetujuan">Kirim usulan ke DPS</a>' +
      '<button class="btn btn-ghost" data-aksi="simpan" data-label="Simpan draf usulan" data-objek="Usulan parameter ' + p.usulan.versi + '">Simpan draf</button></div></div>' +
      '<div class="grid">' +
      '<div class="note"><b>Manajer tidak mengubah ambang aktif</b>DPS menyetujui versi. Admin hanya menerapkan versi yang telah disetujui. Hak petugas tetap baca-saja pada ambang.</div>' +
      '<div class="card"><h2>Riwayat versi</h2><div class="tl">' + TL.map(t =>
        '<div class="item"><div class="dot"></div><div class="when">' + t[0] + '</div><div><div class="what">' + t[1] + '</div><div class="desc">' + t[2] + '</div></div></div>').join('') + '</div></div>' +
      '</div></div>' +
      '<div class="card mt24"><h2>Laporan untuk DPS</h2>' +
      '<div class="dfs mb10">' +
      '<div class="field"><label>Periode laporan</label><select><option>Jan–Mei 2027</option></select></div>' +
      '<div class="field"><label>Cakupan</label><select><option>Akad, hasil uji, bukti & keputusan</option></select></div></div>' +
      '<div class="mintbox"><table class="tbl"><tr><th>Isi laporan</th><th>Ringkasan</th><th>Status</th></tr>' +
      '<tr><td>Portofolio berkode</td><td>' + TOTAL_KONTRAK + ' kontrak aktif · Rp58.800.000</td><td>' + st('ok', 'Siap') + '</td></tr>' +
      '<tr><td>Ketahanan hasil −20%</td><td>9/' + TOTAL_KONTRAK + ' kontrak lolos empat sisi</td><td>' + st('ok', 'Siap') + '</td></tr>' +
      '<tr><td>Jejak persetujuan</td><td>Keputusan, alasan, dan versi parameter</td><td>' + st('ok', 'Tersedia') + '</td></tr>' +
      '<tr><td>Bukti penyerahan</td><td>' + (TOTAL_KONTRAK - arsipBelumLengkap()) + ' lengkap; ' + arsipBelumLengkap() + ' menunggu tinjauan</td><td>' + st(arsipBelumLengkap() ? 'tinjau' : 'ok', arsipBelumLengkap() ? 'Perlu catatan' : 'Lengkap') + '</td></tr></table></div>' +
      '<div class="btn-row"><button class="btn btn-primary" data-aksi="ekspor" data-label="Unduh PDF laporan DPS" data-objek="Laporan DPS Jan–Mei 2027">Unduh PDF laporan DPS</button>' +
      '<button class="btn btn-ghost" data-aksi="ekspor" data-label="Unduh Excel berkode" data-objek="Laporan berkode DPS">Unduh Excel berkode</button>' +
      '<button class="btn btn-ghost" data-aksi="cetak">Cetak laporan</button></div></div>' +
      '<p class="foot-note">Tandur bukan pemberi pembiayaan. Lembaga membayar petani langsung, penuh di muka.</p>');
  }
};
