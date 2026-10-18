window.TDATA = {
  lembaga: 'KSPPS Tunas Makmur — Malang (contoh)',
  musim: 'Jan–Mei 2027',
  hariIni: 'Kamis, 20 Mei 2027',
  users: { petugas: 'Rina S.', manajer: 'Ayu P.', dps: 'Hasan M.', admin: 'Dimas A.' },
  parameter: {
    aktif: { versi: 'v1.2', efektif: '10 Jan 2027', wMin: 3000000, mMin: 100000 },
    disetujui: { versi: 'v1.3', oleh: 'Hasan M. / DPS', tanggal: '22 Mei 2027', wMin: 3200000, mMin: 120000, efektif: '1 Jun 2027' }
  },
  kontrak: [
    { kode: 'TDR-0012', diterima: '13 Jan', volume: 800, harga: 6000, total: 4800000, status: ['ok', 'Terjadwal'], bukti: ['ok', 'Lengkap'], dasar: 'ok/ok', stress: 'tinjau/tinjau', aksi: 'detail' },
    { kode: 'TDR-0018', diterima: '12 Jan', volume: 650, harga: 5950, total: 3867500, status: ['tinjau', 'Tinjau'], bukti: ['ok', 'Lengkap'], dasar: 'ok/gagal', stress: 'gagal/gagal', aksi: 'perbaikan' },
    { kode: 'TDR-0021', diterima: '13 Jan', volume: 900, harga: 6050, total: 5445000, status: ['ok', 'Ditandatangani'], bukti: ['ok', 'Lengkap'], dasar: 'ok/ok', stress: 'tinjau/tinjau', aksi: 'detail' },
    { kode: 'TDR-0024', diterima: '11 Jan', volume: 700, harga: 6000, total: 4200000, status: ['tunggu', 'Verifikasi'], bukti: ['tunggu', 'R belum ada'], dasar: 'ok/gagal', stress: 'gagal/gagal', aksi: 'lengkapi' },
    { kode: 'TDR-0028', diterima: '14 Jan', volume: 750, harga: 5900, total: 4425000, status: ['tunggu', 'Verifikasi'], bukti: ['ok', 'Lengkap'], dasar: 'ok/ok', stress: 'tinjau/tinjau', aksi: 'detail' },
    { kode: 'TDR-0030', diterima: '14 Jan', volume: 500, harga: 5900, total: 2950000, status: ['tunggu', 'Verifikasi'], bukti: ['tunggu', 'Bukti panen'], dasar: 'belum/belum', stress: 'belum/belum', aksi: 'lengkapi' }
  ],
  uji: [
    { nama: 'Modal', nilai: 'Rp4.800.000', ambang: '≥ K Rp4.775.715', rasio: 1.005, st: 'ok' },
    { nama: 'Penyerahan', nilai: '1.283,2 kg', ambang: '≥ q 800 kg', rasio: 1.604, st: 'ok' },
    { nama: 'Manfaat petani', nilai: 'Rp3.125.764', ambang: '≥ Rp3.000.000', rasio: 1.042, st: 'ok' },
    { nama: 'Kontribusi lembaga', nilai: 'Rp160.000', ambang: '≥ Rp100.000', rasio: 1.6, st: 'ok' }
  ],
  arsip: [
    { kode: 'TDR-2027-0012-01', petani: 'TDR-0012', dokumen: 'Akad, bayar, BA draf', uji: 'Dasar & −20% ✓ / v1.2', keputusan: 'Manajer 15 Jan', lengkap: ['tinjau', 'BA menunggu'] },
    { kode: 'TDR-2027-0018-01', petani: 'TDR-0018', dokumen: 'Akad & bayar', uji: '−20% △ / v1.2', keputusan: 'Catatan risiko tersedia', lengkap: ['ok', 'Lengkap'] },
    { kode: 'TDR-2027-0021-01', petani: 'TDR-0021', dokumen: 'Akad, bayar, BA', uji: 'Dasar & −20% ✓ / v1.2', keputusan: 'Manajer 16 Jan', lengkap: ['ok', 'Lengkap'] },
    { kode: 'TDR-2027-0024-01', petani: 'TDR-0024', dokumen: 'Akad & bayar', uji: '−20% △ / v1.2', keputusan: 'Catatan risiko tersedia', lengkap: ['tinjau', 'Lampiran BA'] },
    { kode: 'TDR-2027-0028-01', petani: 'TDR-0028', dokumen: 'Akad, bayar, BA', uji: 'Dasar & −20% ✓ / v1.2', keputusan: 'Manajer 17 Jan', lengkap: ['ok', 'Lengkap'] }
  ]
};
