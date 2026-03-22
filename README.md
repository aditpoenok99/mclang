# 🌸 MOCASUS LANG (MOCA / MCLANG)

<div align="center">

<img src="https://raw.githubusercontent.com/aditpoenok99/mclang/main/assets/mclang-logo-sakura.svg" alt="MCLANG Sakura Logo" width="110" />

[![Version](https://img.shields.io/badge/version-2.6.0-ff69b4?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-d946ef?style=for-the-badge)](LICENSE)

**Bahasa pemrograman Moca untuk frontend modern: parser, runtime, module system, CLI, dan package manager.**

</div>

---

## ✅ Status Validasi Pemakaian

MCLANG saat ini **bisa dipakai untuk MVP/real project skala kecil-menengah**:
- Lexer + Parser + Interpreter sudah jalan
- Module system antar file `.mc` sudah jalan (`mimpor`/`mekspor`)
- CLI sudah jalan (`run/check/compile/repl`)
- Package manager dasar (`mclang moca ...`)

Validasi cepat:

```bash
npm install
npm run build
npm test
mclang check examples/main.mc
mclang run examples/main.mc
```

---

## 🔤 Sintaks Moca (inti)

```mclang
mimpor { pajak } moy "./util.mc";
mc subtotal = 100;
marah (subtotal > 0) {
  tampil(subtotal + pajak);
} malu {
  tampil(0);
}
```

---

## 🚀 CLI

```bash
mclang check main.mc
mclang run main.mc
mclang compile main.mc -o dist/main.js
mclang repl

mclang moca init
mclang moca add ui-kit 1.0.0
mclang moca list
```

---

## 🌐 Website Docs

Dokumentasi promosi siap live di folder `site/` (code block + preview interaktif).

---

## ☁️ Auto Deploy Railway (GitHub Actions)

Workflow sudah ditambahkan: `.github/workflows/deploy-railway.yml`

### Wajib set secret & variable di GitHub repo:

- `RAILWAY_TOKEN` (Repository Secret)
- `RAILWAY_SERVICE` (Repository Variable, opsional tapi disarankan)

Setelah itu, setiap push ke `main` akan auto deploy ke Railway.

---

## 🔓 Open Source

MIT License, bebas untuk pribadi dan komersial.
