# Tandur — demo web desktop

Perangkat kerja akad salam untuk KSPPS/BMT. Data ilustratif; tanpa backend,
autentikasi sungguhan, atau perpindahan uang. Pembayaran dilakukan langsung
oleh lembaga kepada petani, Tandur mencatat buktinya.

## Menjalankan

Buka `prototipe/index.html` di browser desktop. Tidak perlu build atau jaringan.
Font dan logo tersedia lokal. Navigasi memakai hash; back/forward browser berfungsi.
Halaman operasional menggunakan layout desktop, tanpa halaman khusus mobile.

Logo asli pengguna disalin tanpa perubahan ke `assets/logo-tandur.png` dan digunakan
oleh komponen `logo()` pada halaman publik, login, sidebar, dan dokumen, serta favicon.
Gambar referensi di akar repo bukan halaman aplikasi.

## Demo dari awal sampai akhir

Demo memiliki satu kasus kerja, `TDR-0012` / `TDR-2027-0012-01`. Semua layar utama
membaca kasus yang sama. Gunakan **Reset data demo** untuk mengulang.

1. **Petugas → Pendataan**: isi identitas contoh, luas, panen, tanggal/lokasi,
   serta persetujuan pencatatan. Simpan untuk lanjut ke biaya.
2. **Biaya**: edit delapan komponen ekonomi dan tunai, lalu dana sendiri.
   Bagian tunai tidak boleh lebih besar daripada total ekonomi.
3. **Cadangan & bukti**: simpan R/L. Tambahkan empat jenis bukti dasar
   (persetujuan, panen, biaya, cadangan). **Gunakan bukti contoh** membuat berkas
   teks berlabel CONTOH; atau pilih berkas PDF/PNG/JPEG/TXT milik sendiri.
4. **Calon kontrak**: ubah q, Ps, Ph, Pj, dan B, kemudian **Jalankan uji**.
   Hasil dasar, panen −20%, panen −40%, dan harga −10% dihitung dari input.
   Klik **Kirim ke antrean manajer**. Bukti dasar wajib lengkap.
5. **Manajer → Antrean**: buka usulan. Periksa bukti, isi alasan, lalu setujui,
   minta perbaikan, atau tolak. Persetujuan membutuhkan 4/4 lolos pada dasar
   dan −20%, serta konfirmasi tinjauan bukti. Hasil stress ekstrem tetap terlihat.
6. Jalur koreksi: minta perbaikan → petugas mengubah data → uji ulang → kirim
   ulang. Versi sebelumnya dan alasan keputusannya tetap tersimpan.
7. **Ringkasan akad**: setelah disetujui, tandai dibacakan. Isi lima jawaban
   pada **Uji pemahaman**. Jawaban salah harus dijelaskan ulang; tanda tangan
   terkunci sampai semua benar.
8. **Tanda tangan**: lampirkan bukti dan konfirmasi pemeriksaan. Lanjut ke
   **Kontrak & pembayaran**, lampirkan bukti bayar, lalu konfirmasi pembayaran penuh.
9. **Serah terima**: isi berat, kadar air, kotoran, saksi, catatan, dan keberatan
   jika ada; lampirkan bukti timbang/mutu lalu ajukan ke manajer.
10. **Manajer → Detail kontrak**: selesaikan keberatan jika ada dan isi alasan.
    Finalisasi diblokir jika selisih berat melebihi ±1%, kadar air >25%, kotoran >3%,
    atau keberatan belum selesai. Manajer dapat meminta perbaikan data lapangan.
11. **DPS**: buka arsip, jejak, dan laporan. Dokumen ringkasan akad dan berita acara
    menggunakan nilai dari usulan yang sama; gunakan **Cetak / simpan PDF**.

Untuk menunjukkan perubahan harga yang tetap lolos dengan data awal, coba
800 kg × Rp6.030: nilai akad menjadi Rp4.824.000 sampai dokumen dan dashboard.
Angka ini hanya contoh pengujian, bukan rekomendasi harga atau pembiayaan.

## Parameter dan versi

Manajer mengusulkan ambang → DPS menyetujui dengan catatan → admin menerapkan.
Penerapan berlangsung saat tombol diklik untuk uji berikutnya; tidak ada penjadwal.
Setiap hasil uji dan usulan menyimpan salinan parameter. Mengaktifkan versi baru
tidak mengubah akad yang sedang ditinjau atau sudah disetujui.
Data yang telah dikirim terkunci; revisi hanya tersedia setelah perbaikan/penolakan.

## Perhitungan

- C = jumlah biaya ekonomi; K = maksimum(0, biaya tunai − dana sendiri).
- U = q × Ps.
- Batas serah = Q skenario − R − L; pemeriksaan q ≤ batas serah.
- W = U + (Q skenario − q) × Ph skenario − C.
- M = q × (Pj skenario − Ps) − B.
- Harga −10% menurunkan Ph dan Pj, bukan harga salam Ps.
- Batas bawah Ps = maksimum(K/q, (W_min+C−(Q skenario−q)×Ph skenario)/q).
- Batas atas Ps = Pj skenario−(B+M_min)/q.

Rentang dibulatkan ke dalam: bawah ke atas, atas ke bawah dalam rupiah bulat.
Rentang tidak tersedia jika batas serah gagal atau bawah melebihi atas.
W menilai seluruh sisa panen, termasuk cadangan; bukan kas bersih petani.
Sensitivitas bukan probabilitas. Model dan ambang tetap ilustratif.

## Penyimpanan, berkas, dan ekspor

- State, input formulir utama, bukti, dan jejak tersimpan pada `localStorage`
  dengan kunci `tandur-demo-v2`. Refresh mempertahankan data pada browser/profil yang sama.
- Perilaku `localStorage` pada `file://` bergantung browser; memindahkan file,
  mengganti profil, private browsing, atau menghapus data browser dapat menghilangkan state.
- Bukti maksimum 1 MB per berkas dan total 2 MB. Bukti disimpan di browser,
  tanpa diunggah ke layanan luar. Unduhan mengembalikan isi berkas yang sama.
- CSV benar-benar diunduh; PDF memakai dialog cetak browser.
- **Unduh cadangan data** menghasilkan JSON. Pemulihan JSON melalui UI belum tersedia.
- **Siapkan teks pesan** menyediakan teks untuk disalin, tanpa mengirim pesan.
- **Reset data demo** menghapus state kasus saat ini beserta bukti/jejak lokal.
- Jika penyimpanan gagal, UI memberi peringatan. Gunakan berkas contoh kecil dan
  unduh cadangan. Jangan masukkan data pribadi nyata ke demo.

## Struktur kode

`index.html` memuat skrip dalam urutan berikut:

1. `data.js`, `state.js`: data contoh, state awal, aksi akun/log/toast.
2. `ui.js`: komponen bersama, logo, shell desktop, navigasi dan grafik Larik.
3. `screens_*.js`: halaman publik, autentikasi demo, admin dan rancangan layar awal.
4. `simulasi.js`: fungsi hitung empat skenario dan komponen input numerik.
5. `workflow.js`: sumber utama alur operasional terpadu, penyimpanan, bukti,
   validasi langkah, dokumen, dashboard, parameter, dan laporan. Registrasi route
   di berkas ini menggantikan rancangan statis pada `screens_*.js`.
6. `app.js`: router dan delegasi event, diikuti pemulihan input formulir.

Semua perubahan tampilan logo dilakukan melalui `logo()` di `ui.js`.
Fitur yang belum terhubung di luar alur utama diberi label **(simulasi)**.
Login, OTP, pengiriman undangan, integrasi WhatsApp, dan layanan eksternal tetap demo.
Jejak lokal bukan audit yang tahan manipulasi; reset browser dapat menghapusnya.

## Verifikasi browser

Memerlukan Node.js, Playwright, dan Microsoft Edge. Ini dependensi pengujian saja.

```text
node prototipe/tests/demo.cjs
```

Pastikan `playwright` tersedia pada jalur modul Node (`NODE_PATH` bila perlu).
Tes memeriksa render semua route dan logo, formulir yang bertahan setelah refresh,
validasi, unggah/unduh aktual, revisi dan snapshot parameter, blokir persetujuan,
pemahaman, tanda tangan/pembayaran, toleransi penyerahan, keberatan, dokumen,
dashboard, CSV, dan reset. Screenshot dibuat di `tmp/` pada akar proyek.
