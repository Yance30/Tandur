const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const out = path.resolve(__dirname, '../../hasil-ui');
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const manifestPath = path.join(out, 'manifest.json');
  const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
  let nextNumber = previous.reduce((n, e) => Math.max(n, parseInt(e.file, 10) || 0), 0);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname, '../index.html')).href);
    const routes = await page.evaluate(() => Object.entries(ROUTES).map(([route, r]) => ({ route, code: r.screen })));
    const entries = [];
    for (const [i, item] of routes.entries()) {
      await page.evaluate(({ route }) => {
        muatState();
        const w = wf();
        w.petani.persetujuan = true;
        w.bukti = Object.keys(JENIS_BUKTI).map(jenis => ({ id: 'contoh-' + jenis, jenis, nama: jenis + '-contoh.txt', size: 11, data: 'data:text/plain;base64,RGF0YSBjb250b2g=', contoh: true }));
        w.hasil = snapshotDraf(); STATE.hasilSimulasi = clone(w.hasil);
        let tahap = 'draf';
        if (/^\/(manajer|dps)\//.test(route)) tahap = 'diajukan';
        if (/ringkasan-akad|uji-pemahaman|tanda-tangan/.test(route)) tahap = 'disetujui';
        if (route === '/petugas/kontrak') tahap = 'ditandatangani';
        if (/serah-terima|keberatan/.test(route)) tahap = 'dibayar';
        if (/detail-kontrak|portofolio|risiko/.test(route) || route === '/petugas/beranda') tahap = 'penyerahan';
        if (/berita-acara|\/akad$|^\/dps\/(arsip|jejak|laporan)/.test(route)) tahap = 'selesai';
        w.tahap = tahap;
        if (tahap !== 'draf') w.usulan = { ...snapshotDraf(), versi: 1, bukti: w.bukti.map(({id,jenis,nama}) => ({id,jenis,nama})), keputusan: tahap === 'diajukan' ? 'menunggu' : 'disetujui', alasan: 'Contoh demo: bukti dan risiko telah ditinjau.' };
        w.dibaca = true;
        w.jawaban = ['benar','benar','benar','benar','benar'];
        w.ttd = ['ditandatangani','dibayar','penyerahan','selesai'].includes(tahap);
        w.bayar = ['dibayar','penyerahan','selesai'].includes(tahap);
        if (['penyerahan','selesai'].includes(tahap)) w.serah = { berat:800, air:24, kotor:2, saksi:'Budi (contoh)', catatan:'Contoh pencatatan timbang dan mutu.', putusan:tahap === 'selesai' ? 'disetujui' : 'menunggu' };
        if (tahap !== 'draf') {
          STATE.jejak = [{ waktu:'20 Mei · 09.00', peristiwa:'Usulan demo dicatat', rincian:'Data ilustrasi untuk ekspor tampilan UI.' }];
          STATE.log = [{ waktu:'20 Mei 09.00', pelaku:'Rina S. / Petugas', peristiwa:'Usulan demo dicatat', objek:'TDR-0012 · data ilustrasi', hasil:'Tercatat' }];
        }
        const role = route.split('/')[1];
        if (['petugas','manajer','dps','admin'].includes(role)) sesiMulai(role);
        location.hash = '#' + route;
        render();
      }, item);
      await page.waitForTimeout(60);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.images].every(img => img.complete));
      const details = await page.evaluate(() => ({ title: document.querySelector('h1')?.textContent.trim() || document.title, broken: [...document.images].filter(x => !x.naturalWidth).length, height: document.documentElement.scrollHeight }));
      if (details.broken) throw new Error('Gambar rusak: ' + item.route);
      const file = previous.find(e => e.route === item.route)?.file || `${String(++nextNumber).padStart(2, '0')}-${item.code || 'UI'}-${item.route.slice(1).replaceAll('/', '-')}.png`;
      await page.screenshot({ path: path.join(out, file), fullPage: true, animations: 'disabled' });
      entries.push({ ...item, title:details.title, file, width:1440, height:details.height });
    }
    if (errors.length) throw new Error(errors.join('\n'));
    fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(entries, null, 2));
    fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Galeri UI Tandur</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f5ed;color:#183b2b;font:16px/1.6 system-ui}header,main{max-width:1440px;margin:auto;padding:32px}h1{margin:0;font-size:38px}p{margin:8px 0}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;padding-top:0}article{background:white;border:1px solid #d8dfd5;border-radius:14px;overflow:hidden}img{width:100%;height:235px;object-fit:cover;object-position:top;display:block;border-bottom:1px solid #ddd}section{padding:18px}h2{font-size:18px;margin:0}a{color:inherit}code{font-size:12px;overflow-wrap:anywhere}.button{display:inline-block;margin-top:12px;color:#fff;background:#24553b;padding:6px 12px;border-radius:7px;text-decoration:none}</style><header><h1>Galeri UI Tandur</h1><p>${entries.length} halaman · Desktop 1440 px · Gambar halaman penuh</p><p>Data contoh menggambarkan tahap alur yang sesuai untuk setiap halaman. Klik gambar untuk melihat ukuran penuh.</p></header><main>${entries.map(e => `<article><a href="${escape(e.file)}"><img loading="lazy" src="${escape(e.file)}" alt="${escape(e.title)}"></a><section><h2>${escape(e.code)} · ${escape(e.title)}</h2><code>${escape(e.route)}</code><br><a class="button" href="${escape(e.file)}">Lihat PNG</a></section></article>`).join('')}</main></html>`);
    fs.writeFileSync(path.join(out, 'README.md'), `# Hasil UI Tandur\n\n${entries.length} gambar PNG dari seluruh route prototipe saat ekspor. Buka index.html untuk galeri. Semua gambar langsung berada di folder ini.\n\n- Lebar desktop: 1440 piksel; tinggi mengikuti isi halaman penuh.\n- Data ilustrasi disiapkan per halaman agar tahap persetujuan, akad, dan serah terima terlihat. Bukan transaksi nyata atau satu sesi berurutan.\n- Route alias tetap diekspor, sehingga beberapa gambar menampilkan UI yang sama.\n- manifest.json mencatat route, kode layar, nama file, dan ukuran.\n- Sumber aplikasi tetap di ../prototipe/index.html. PNG adalah tampilan statis.\n- Untuk ekspor ulang, jalankan prototipe/tests/export-ui.cjs dengan Node.js dan Playwright serta browser Edge tersedia.\n`);
    console.log(`Berhasil: ${entries.length} PNG + galeri + manifest + README di ${out}`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
