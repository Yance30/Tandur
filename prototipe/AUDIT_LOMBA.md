# Audit prototipe untuk lomba — 18 Oktober 2026

## Cakupan

Penilaian difokuskan pada demo business plan: alur yang dapat diperagakan, konsistensi
angka, keterbacaan di laptop, navigasi, dokumen, dan kejelasan batas simulasi.
Backend, autentikasi produksi, banyak lembaga, dan sinkronisasi server tidak dijadikan
persyaratan kelulusan audit ini.

## Temuan dan tindakan

| Temuan | Dampak saat demo | Perbaikan |
|---|---|---|
| Tabel kewenangan admin melebar pada laptop | Pengguliran horizontal; setelah dibatasi, kata menjadi terlalu sempit | Bagian undangan dan tabel disusun selebar konten, diperiksa visual |
| Tampilkan kata sandi berupa radio yang tidak bekerja | Kontrol terlihat aktif tetapi tidak melakukan tindakan | Diganti tombol tampil/sembunyi dengan status aksesibel |
| Semua grafik gagal memakai tinggi tetap 10% | Nilai mendekati ambang terlihat sama dengan nilai jauh di bawah ambang | Batang mengikuti rasio aktual; angka negatif tidak digambarkan sebagai batang positif |
| Harga pada kartu terang mewarisi teks pucat dari latar gelap | Harga dan penjelasan sulit dibaca | Warna teks kartu ditetapkan gelap; kontras harga diperiksa |
| Privasi dan syarat kembali ke beranda | Navigasi memberi hasil berbeda dari label | Ditambahkan halaman penjelasan data lokal dan ketentuan demo |
| Menu Peran kembali ke beranda | Tidak langsung menjelaskan peran | Ditambahkan halaman peran dengan pintasan demo |
| Keterangan offline menyatakan demo berjalan daring | Bertentangan dengan aplikasi file lokal | Diperjelas bahwa demo lokal bekerja tanpa jaringan, sinkronisasi belum tersedia |
| Permohonan akses tampak mengirim data, tetapi hanya membuka login | Berpotensi disalahpahami sebagai integrasi aktif | Tombol dan pengantar menyebut pratinjau/simulasi secara eksplisit |
| OTP sebagian kosong tetapi tombol melanjutkan | Menimbulkan kesan validasi rusak | Enam digit contoh diisi; dijelaskan bahwa tidak ada SMS/email nyata |
| Pengguna perlu mengingat sendiri perpindahan peran | Presentasi mudah terputus | Panduan demo dari beranda dan petunjuk langkah berikutnya mengikuti tahap kasus |
| Teks pencarian pada topbar bukan kontrol pencarian | Terlihat seperti fitur yang dapat diklik | Diganti penanda kasus demo aktif |

## Verifikasi

- Pengujian alur utama: pendataan, biaya, bukti, perubahan harga, revisi usulan,
  persetujuan, pemahaman salah/benar, tanda tangan, pembayaran, penyerahan,
  keberatan, parameter, dokumen, dashboard, unduhan CSV, penyimpanan dan reset.
- Peninjauan seluruh 58 route pada viewport desktop 1366×768 dan 1280×768.
- Pemeriksaan route tujuan tautan, gambar termuat, input berlabel, dan lebar konten.
- Pemeriksaan visual halaman undang pengguna, dokumen pada mode cetak, dan kartu harga.
- Tes perilaku kontrol kata sandi dan rasio grafik.

Hasil audit tidak berarti seluruh kombinasi data dan setiap fitur di luar alur utama
telah diuji. Screenshot mode cetak memeriksa tampilan cetak browser; tidak memverifikasi
hasil setiap model printer fisik.

## Batas yang wajar untuk prototipe lomba

- Satu kasus kerja cukup untuk menunjukkan alur lengkap; dashboard menyebut data demo.
- Login, OTP, serta layanan eksternal disimulasikan dan diberi penjelasan.
- Bukti contoh tersedia agar demonstrasi tidak membutuhkan dokumen pribadi.
- Rumus, asumsi manfaat, ambang, dan stress scenario dijelaskan; angka bukan prediksi
  panen atau keputusan pembiayaan otomatis.
- Keunikan produk dan validitas kebutuhan pengguna tetap harus dibuktikan dalam
  proposal/presentasi. Audit antarmuka tidak membuktikan permintaan pasar atau peluang menang.
