// Perhitungan ilustratif; bukan rekomendasi atau persetujuan pembiayaan.
const INPUT_SIMULASI = Object.freeze({ q: 800, ps: 6000, ph: 6500, pj: 6500, b: 240000 });
const KONTEKS_SIMULASI = Object.freeze({ Q: 1854, C: 6115036, K: 4775715, R: 200, L: 0 });
const SKENARIO_SIMULASI = { dasar: 'Dasar', '-20': 'Hasil −20%', '-40': 'Hasil −40%', harga: 'Harga −10%' };
const angkaSimulasi = n => n.toLocaleString('id-ID', { maximumFractionDigits: 2 });

function hitungSimulasi(input, parameter, skenario, konteks = KONTEKS_SIMULASI) {
  const { q, ps, ph, pj, b } = input;
  if (!Object.hasOwn(SKENARIO_SIMULASI, skenario) ||
      ![q, ps, ph, pj, b].every(Number.isFinite) ||
      q <= 0 || ps <= 0 || ph <= 0 || pj <= 0 || b < 0) {
    throw new Error('Volume dan harga harus lebih dari nol; biaya tidak boleh negatif.');
  }
  const { Q, C, K, R, L } = konteks;
  const panen = Q * (skenario === '-20' ? 0.8 : skenario === '-40' ? 0.6 : 1);
  const faktorHarga = skenario === 'harga' ? 0.9 : 1;
  const hargaSisa = ph * faktorHarga, hargaJual = pj * faktorHarga;
  const batas = panen - R - L, uang = q * ps;
  const manfaat = uang + (panen - q) * hargaSisa - C;
  const kontribusi = q * (hargaJual - ps) - b;
  const bawah = Math.ceil(Math.max(K / q, (parameter.wMin + C - (panen - q) * hargaSisa) / q));
  const atas = Math.floor(hargaJual - (b + parameter.mMin) / q);
  const nilai = [uang, batas, manfaat, kontribusi];
  const ambang = [K, q, parameter.wMin, parameter.mMin];
  const sisi = ['Modal', 'Penyerahan', 'Manfaat petani', 'Kontribusi lembaga'].map((nama, i) => ({
    nama, nilai: i === 1 ? angkaSimulasi(nilai[i]) + ' kg' : rp(nilai[i]),
    ambang: '≥ ' + (i === 1 ? angkaSimulasi(q) + ' kg' : rp(ambang[i])),
    rasio: ambang[i] === 0 ? (nilai[i] >= 0 ? 2 : 0) : nilai[i] / ambang[i], st: nilai[i] >= ambang[i] ? 'ok' : 'gagal'
  }));
  return { panen, batas, uang, manfaat, kontribusi, bawah, atas, sisi,
    rentangAda: batas >= q && bawah <= atas, lolos: sisi.filter(s => s.st === 'ok').length };
}

function inputSimulasi(kunci, label) {
  const nilai = STATE.simulasi[kunci];
  return '<div class="field"><label for="sim-' + kunci + '">' + label + '</label>' +
    '<input id="sim-' + kunci + '" type="number" min="' + (kunci === 'b' ? '0' : '0.01') +
    '" max="1000000000" step="0.01" required value="' + nilai + '" data-simulasi="' + kunci + '"></div>';
}

AKSI.hitungSimulasi = () => {
  const input = {};
  for (const key of Object.keys(INPUT_SIMULASI)) {
    const el = elId('sim-' + key);
    if (!el.reportValidity()) return;
    input[key] = el.valueAsNumber;
  }
  STATE.simulasi = input;
  STATE.hasilSimulasi = { input: { ...input }, parameter: { ...STATE.param.aktif } };
  location.hash = '/petugas/simulasi';
};

AKSI.resetSimulasi = () => {
  STATE.simulasi = { ...INPUT_SIMULASI };
  STATE.hasilSimulasi = null;
  render();
};

ROUTES['/petugas/simulasi'] = {
  screen: 'F8S',
  render() {
    const hasil = STATE.hasilSimulasi;
    if (!hasil) return shell('petugas', '#/petugas/calon-kontrak',
      '<h1 class="page">Belum ada hasil simulasi</h1><a class="btn btn-primary" href="#/petugas/calon-kontrak">Isi calon kontrak</a>');
    const { input, parameter } = hasil;
    const hasilUji = Object.entries(SKENARIO_SIMULASI).map(([key, nama]) => ({ nama, ...hitungSimulasi(input, parameter, key) }));
    return shell('petugas', '#/petugas/calon-kontrak',
      '<h1 class="page">Hasil simulasi empat sisi</h1>' +
      '<p class="sub">Volume ' + angkaSimulasi(input.q) + ' kg · Harga salam ' + rp(input.ps) + '/kg · Parameter ' + parameter.versi + '</p>' +
      '<div class="note mb24"><b>Simulasi dari input Anda</b>Hasil ini belum menjadi usulan atau akad. Alur persetujuan dan dokumen demo menggunakan contoh tetap 800 kg × Rp6.000. Data simulasi tidak mengubah arsip contoh.</div>' +
      '<div class="card"><h2>Asumsi perhitungan</h2><p>Q 1.854 kg · C Rp6.115.036 · K Rp4.775.715 · R 200 kg · L 0 kg.</p>' +
      '<p>Harga sisa panen ' + rp(input.ph) + '/kg · Harga jual lembaga ' + rp(input.pj) + '/kg · Biaya lembaga ' + rp(input.b) + '.</p>' +
      '<p>U = q × Ps; batas serah = Q skenario − R − L; W = U + (Q skenario − q) × Ph skenario − C; M = q × (Pj skenario − Ps) − B.</p>' +
      '<p>Harga −10% menurunkan Ph dan Pj; harga salam tetap. Cadangan membatasi volume serah. Nilai W mengikuti model contoh dan menilai seluruh sisa panen, termasuk cadangan; bukan arus kas bersih. Sensitivitas bukan probabilitas kejadian.</p></div>' +
      hasilUji.map(h => '<div class="card mt24"><h2>' + h.nama + ' · ' + h.lolos + '/4 lolos</h2>' + larik(h.sisi) + LARIK_FOOT +
        '<p>Hasil panen ' + angkaSimulasi(h.panen) + ' kg · batas serah ' + angkaSimulasi(h.batas) + ' kg.</p>' +
        '<p>' + (h.rentangAda ? 'Rentang harga salam layak: ' + rp(h.bawah) + '–' + rp(h.atas) + '/kg (rupiah bulat, dengan input lain tetap).' :
          'Tidak ada rentang harga salam yang memenuhi keempat sisi dengan input lain tetap.') + '</p>' +
        '<p>' + (h.lolos === 4 ? 'Lolos hitungan; bukti dan risiko tetap perlu ditinjau manajer.' : 'Perlu revisi atau tinjauan: ' + h.sisi.filter(s => s.st === 'gagal').map(s => s.nama).join(', ') + '.') + '</p></div>').join('') +
      '<div class="btn-row"><a class="btn btn-primary" href="#/petugas/calon-kontrak">Ubah input simulasi</a>' +
      '<a class="btn btn-ghost" href="#/petugas/hasil-uji">Lanjut demo persetujuan contoh 800 kg</a></div>');
  }
};
