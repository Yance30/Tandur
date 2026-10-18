# Tandur — prototipe clickable

Prototipe antarmuka **Tandur**, perangkat kerja akad salam untuk lembaga keuangan syariah
(KSPPS/BMT). Semua data di dalamnya **ilustratif**; tidak ada backend, tidak ada login sungguhan,
dan tidak ada uang yang berpindah.

Tandur bukan pemberi pembiayaan. Pada alur yang dirancang, lembaga membayar petani langsung dan
penuh di muka; Tandur hanya mencatat, menguji kelayakan, dan menjaga jejak keputusan.

## Menjalankan

Tidak ada build step dan tidak ada dependensi. Buka berkasnya langsung:

```
prototipe/index.html
```

Klik dua kali di Explorer, atau dari shell:

```bash
start prototipe/index.html          # Windows
xdg-open prototipe/index.html       # Linux
open prototipe/index.html           # macOS
```

Prototipe berjalan lewat `file://`. Font sudah di-self-host di `css/fonts/` sehingga tampilan tetap
sama tanpa jaringan. Navigasi memakai hash (`#/…`), jadi tombol back/forward browser berfungsi.

> Desain khusus **web desktop**. Layar seluler (F16–F19, A7, P4) hanya ditampilkan sebagai
> placeholder berlabel, bukan tampilan responsif.

## Titik masuk

Landing: `#/beranda` → **Masuk** (`#/masuk`). Pilih tab peran, lalu tombol masuk.
Setiap peran diarahkan ke berandanya sendiri — bukan ke manajer.

| Peran | Verifikasi 2 langkah | Beranda |
| --- | --- | --- |
| Petugas lapangan (Rina S.) | tidak | `#/petugas/beranda` |
| Manajer pembiayaan (Ayu P.) | wajib | `#/manajer/portofolio` |
| Dewan Pengawas Syariah (Hasan M.) | wajib | `#/dps/arsip` |
| Admin lembaga (Dimas A.) | wajib | `#/admin/kelola-akun` |

Jalan pintas langsung: `#/masuk/petugas`, `#/masuk/manajer`, `#/masuk/dps`, `#/masuk/admin`.
Layar pendukung: `#/masuk/aktivasi` (A5), `#/masuk/lupa` (A3), `#/masuk/atur-ulang` (A4),
`#/masuk/sesi-berakhir` (A6), `#/bantuan` (S3 — contoh keadaan error, empty state, dan kontrol
terkunci).

## Alur demo yang dimaksud

Rantai tata kelola: **manajer mengusulkan → DPS menyetujui → admin menerapkan**. Admin tidak
berwenang menentukan ambang; petugas tidak berwenang menyetujui pembiayaan.

1. **Petugas** — `#/petugas/pendataan` → `biaya` → `cadangan` (3 langkah pendataan).
   Lanjut ke `#/petugas/calon-kontrak`, lalu `#/petugas/hasil-uji` (4 skenario sensitivitas).
   Klik **Kirim ke Antrean persetujuan**.
2. **Manajer** — `#/manajer/antrean` (M2) → **Tinjau** → `#/manajer/detail-persetujuan` (M3).
   Tombol **Setujui usulan** hanya aktif bila bukti lengkap. Untuk mencoba jalur koreksi:
   **Kirim permintaan perbaikan** → kembali ke layar petugas → **Kirim ulang setelah perbaikan**.
3. **Petugas** — `#/petugas/ringkasan-akad` (bacakan) → `uji-pemahaman` → `tanda-tangan` →
   `serah-terima` → **Ajukan ke Manajer** → `keberatan` bila ada selisih.
4. **Manajer** — setujui serah terima atau catat keberatan di `#/manajer/detail-kontrak`.
   Kelengkapan arsip DPS ikut berubah (10/12 → 11/12).
5. **DPS** — `#/dps/arsip`, `#/dps/jejak` (jejak tidak dapat ditimpa),
   `#/dps/persetujuan` → **Setujui usulan parameter v1.3**, `#/dps/laporan`.
6. **Admin** — `#/admin/parameter` (N4) → **Terapkan v1.3 sekarang**. Versi aktif baru lalu
   muncul terkunci di layar calon kontrak petugas. `#/admin/kelola-akun` untuk nonaktifkan/undang
   pengguna, `#/admin/log` untuk jejak audit.

Semua peristiwa tercatat pada `#/admin/log` (N6) dan `#/dps/jejak` (D2).

**Mengembalikan keadaan awal:** tautan **Reset data demo** di kaki sidebar setiap layar, atau
`#/beranda` setelah reset. Tidak perlu memuat ulang halaman.

## Dokumen yang dapat dicetak

`#/petugas/akad` (S1 ringkasan akad) dan `#/petugas/berita-acara` (S2) punya bilah dokumen dengan
tombol **Cetak / simpan PDF**. Bilah, sidebar, topbar, tab, dan baris tombol disembunyikan pada
`@media print`; margin halaman 16 mm; kartu tidak terpotong antar halaman.

## Struktur

```
index.html            titik masuk + urutan pemuatan skrip
css/fonts.css         @font-face Jost & Public Sans (woff2, font-display: swap)
css/fonts/            4 berkas woff2 (latin + latin-ext, weight 400–700)
css/app.css           token desain, komponen, kelas utilitas, @media print
js/data.js            TDATA — data dummy beku (lembaga, kontrak, uji, musim)
js/state.js           STATE, AKSI, jam simulasi, jejak, log, toast
js/ui.js              ROUTES, shell(), NAV, komponen render (card, tbl, pill, logo, turi)
js/screens_publik.js  P1–P5 (landing, cara kerja, ajukan)
js/screens_auth.js    A1–A6, S1–S3 (auth, dokumen, bantuan)
js/screens_petugas.js F1–F15
js/screens_manajer.js M1–M6
js/screens_dps.js     D1–D4
js/screens_admin.js   N1–N6
js/app.js             router, delegasi klik/input, rapikanA11y()
```

### Urutan pemuatan itu penting

`data.js` → `state.js` → `ui.js` → layar → `app.js`. `state.js` membaca `TDATA` saat dimuat, jadi
harus datang setelah `data.js`. Nilai turunan yang dipakai lintas berkas (`TOTAL_KONTRAK`,
`riwayatVersi()`, `arsipBelumLengkap()`) ditaruh di `state.js` agar tidak kena *temporal dead zone*
`const` pada berkas layar.

### Menambah layar

```js
ROUTES['/peran/nama-layar'] = {
  screen: 'KODE',
  render() {
    return shell('peran', '#/peran/nama-layar', '<h1 class="page">Judul</h1>' + …);
  }
};
```

`shell()` menambahkan sidebar + topbar sesuai peran; argumen kedua adalah item nav yang ditandai
aktif. Layar di luar `ROUTES` otomatis jatuh ke placeholder berlabel.

### Menambah aksi

Aksi tidak ditulis per layar. Pasang atribut, daftarkan handler-nya di tabel `AKSI` (`js/state.js`):

```html
<button class="btn btn-primary" data-aksi="namaAksi" data-label="Simpan X" data-objek="Y">…</button>
```

`jalankanAksi()` memanggil `AKSI.namaAksi(el, …)`, yang biasanya memutakhirkan `STATE`, memanggil
`tambahJejak()` / `catatLog()`, lalu `render()` dan `toast(pesan, 'ok'|'gagal'|'tunggu')`.
Tombol `.btn` tanpa `data-aksi` tetap memberi toast "belum terhubung ke data" supaya tidak ada
kontrol mati yang membingungkan.

Waktu pada prototipe adalah jam simulasi 2027 yang maju 2 menit **per aksi** (`waktuAksi()`,
di-memo per aksi) sehingga jejak, log, dan label layar dalam satu aksi selalu sama.

## Aksesibilitas

- Label isian dipasangkan otomatis ke kontrolnya oleh `rapikanA11y()` setelah setiap render
  (`label[for]`), jadi penulis layar tidak perlu memberi `id` manual.
- Semua `button` diberi `type="button"`, semua `th` tabel diberi `scope="col"`.
- `.tabs` berperan `tablist` dengan `role="tab"` + `aria-selected`; sidebar ber-`aria-label`.
- Fokus keyboard terlihat: ring `:focus-visible` berwarna lime di permukaan gelap.
- Kotak OTP punya `inputmode="numeric"`, `autocomplete="one-time-code"`, `aria-label` per digit,
  dan maju otomatis antar digit.
- SVG dekoratif (logo, Turi) ber-`aria-hidden`.

## Batasan yang disengaja

- Tidak ada validasi formulir sungguhan; isian tidak mengubah hasil perhitungan.
- Angka uji kelayakan berasal dari data dummy yang dihitung di `state.js`, bukan engine nyata.
- Unggah bukti, ekspor CSV/PDF, WhatsApp, dan sinkronisasi offline adalah simulasi (toast /
  `window.print()` saja).
- Peran dipilih saat masuk untuk keperluan demo; pada sistem nyata hak akses mengikuti akun yang
  diterbitkan lembaga.
