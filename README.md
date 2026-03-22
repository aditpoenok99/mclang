# 🌸 MOCASUS LANG (MOCA / MCLANG)

<div align="center">

<img src="https://raw.githubusercontent.com/aditpoenok99/mclang/main/assets/mclang-logo-v2-pink.svg" alt="MCLANG Logo" width="120" />

[![Version](https://img.shields.io/badge/version-2.6.0-ff69b4?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-d946ef?style=for-the-badge)](LICENSE)

**Bahasa pemrograman baru dengan sintaks Moca, parser+runtime, CLI, package manager, stdlib, dan module system real antar file `.mc`.**

</div>

---

## ✨ Baru di v2.6.0

- ✅ Website dokumentasi baru di `site/` (code block + preview)
- ✅ Deploy config siap Vercel / Railway
- ✅ Logo baru MCLANG v2 pink
- ✅ Rilis versi 2.6.0

---

## 📦 Module System Real (`.mc` ke `.mc`)

### `util.mc`

```mclang
mekspor mc pajak = 11;
mekspor mc diskon = 3;
```

### `main.mc`

```mclang
mimpor { pajak, diskon } moy "./util.mc";
mc total = pajak + diskon;
tampil(total);
```

Jalankan:

```bash
mclang run main.mc
```

---

## 🚀 CLI Production Flow

```bash
mclang check main.mc
mclang run main.mc
mclang compile main.mc -o dist/main.js
mclang repl
```

Package manager Moca:

```bash
mclang moca init
mclang moca add ui-kit 1.0.0
mclang moca list
mclang moca remove ui-kit
```

---

## 🌐 Website Docs

Dokumentasi promosi siap live di folder:

```text
site/
  index.html
  styles.css
  app.js
```

Fitur:
- code block
- preview simulasi hasil kode
- CTA ke GitHub

---

## ☁️ Deploy cepat

### Vercel
- Import repo ini
- Framework: `Other`
- Deploy (file `vercel.json` sudah ada)

### Railway
- New Project → Deploy from GitHub repo ini
- Railway pakai `Dockerfile` + `railway.toml` otomatis

---

## 🧪 Testing

```bash
npm test
npm run test:smoke
```

---

## 🔓 Open Source

MIT License, bebas untuk pribadi dan komersial.
