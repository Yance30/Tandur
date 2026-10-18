const EXTRA = {
  '/beranda': ['P1', 'Landing Tandur'],
  '/ajukan': ['P2', 'Ajukan akses lembaga'],
  '/masuk/lupa': ['A3', 'Lupa kata sandi'],
  '/manajer/detail-persetujuan': ['M3', 'Detail persetujuan'],
  '/bantuan': ['S3', 'Bantuan & keadaan sistem']
};

const HOME = {
  petugas: '/petugas/beranda',
  manajer: '/manajer/portofolio',
  dps: '/dps/arsip',
  admin: '/admin/kelola-akun'
};

const LOGIN_LABEL = {
  petugas: ['petugas', 'Beranda petugas'],
  manajer: ['manajer', 'Portofolio · Manajer pembiayaan'],
  dps: ['DPS', 'Arsip akad · Dewan Pengawas Syariah'],
  admin: ['admin', 'Kelola akun · Admin lembaga']
};

function roleFor(path) {
  const m = path.match(/^\/(petugas|manajer|dps|admin)\//);
  return m ? m[1] : 'petugas';
}

function metaFor(path) {
  const role = roleFor(path);
  const item = NAV[role].items.find(it => it[1] === '#' + path);
  if (item) return [item[2], item[0]];
  if (EXTRA[path]) return EXTRA[path];
  return ['—', 'Layar'];
}

function rapikanA11y() {
  const root = document.getElementById('app');
  let n = 0;
  root.querySelectorAll('.field label').forEach(lab => {
    const kontrol = lab.parentElement.querySelector('input,select,textarea');
    if (!kontrol || lab.htmlFor) return;
    if (!kontrol.id) kontrol.id = 'f' + (++n);
    lab.htmlFor = kontrol.id;
  });
  root.querySelectorAll('button:not([type])').forEach(b => b.setAttribute('type', 'button'));
  root.querySelectorAll('table.tbl th').forEach(th => th.setAttribute('scope', 'col'));
  root.querySelectorAll('.tabs').forEach(t => {
    t.setAttribute('role', 'tablist');
    t.querySelectorAll('button,a').forEach(b => {
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', b.classList.contains('active') ? 'true' : 'false');
    });
  });
  root.querySelectorAll('.sidebar nav').forEach(n2 => n2.setAttribute('aria-label', 'Menu peran'));
}

function render() {
  const path = location.hash.slice(1) || '/beranda';
  if (path === '/masuk/sesi-berakhir') sesiSelesai();
  const route = ROUTES[path];
  let html;
  if (route) {
    html = route.render();
    document.title = 'Tandur — ' + route.screen;
  } else {
    const [code, label] = metaFor(path);
    const body = placeholder(code, label);
    if (path.startsWith('/masuk') || path.startsWith('/beranda') || path.startsWith('/ajukan') || path.startsWith('/bantuan')) {
      html = '<div class="plain">' + body + '</div>';
    } else {
      html = shell(roleFor(path), '', body);
    }
    document.title = 'Tandur — ' + code;
  }
  document.getElementById('app').innerHTML = html;
  rapikanA11y();
  setelahRenderWorkflow();
  simpanDemo();
  window.scrollTo(0, 0);
}

document.addEventListener('click', e => {
  const back = e.target.closest('[data-back]');
  if (back) { e.preventDefault(); history.back(); return; }

  const tab = e.target.closest('[data-tab]');
  if (tab) {
    tab.closest('.tabs').querySelectorAll('button').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const role = tab.dataset.tab;
    const [nama, tujuan] = LOGIN_LABEL[role];
    document.getElementById('login-title').textContent = 'Masuk sebagai ' + nama;
    document.getElementById('login-sub').textContent = 'Lanjutkan ke ' + tujuan + '.';
    document.getElementById('login-email').value = LOGIN_EMAIL[role];
    const btn = document.getElementById('login-btn');
    btn.dataset.role = role;
    if (role === 'petugas') delete btn.dataset.verify; else btn.dataset.verify = '1';
    btn.textContent = loginBtnLabel(role);
    return;
  }

  const aksi = e.target.closest('[data-aksi]');
  if (aksi) {
    if (aksi.disabled) return;
    e.preventDefault();
    jalankanAksi(aksi);
    return;
  }

  const login = e.target.closest('[data-login]');
  if (login) {
    const role = login.dataset.role || 'manajer';
    sesiMulai(role);
    location.hash = login.dataset.verify ? '/masuk/verifikasi/' + role : (HOME[role] || HOME.petugas);
    return;
  }

  const mati = e.target.closest('button.btn');
  if (mati && !mati.disabled) {
    toast('“' + labelAksi(mati) + '” belum terhubung ke data di prototipe ini.', 'tunggu');
  }
});

document.addEventListener('input', e => {
  const kotak = e.target;
  if (kotak.dataset.simulasi && kotak.validity.valid) {
    STATE.simulasi[kotak.dataset.simulasi] = kotak.valueAsNumber;
    return;
  }
  if (!kotak.parentElement || !kotak.parentElement.classList.contains('otp')) return;
  if (kotak.value.length < 1) return;
  const next = kotak.nextElementSibling;
  if (next) next.focus(); else kotak.blur();
});

window.addEventListener('hashchange', render);
render();
