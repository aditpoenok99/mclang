# 🌸 MOCASUS LANG (MCLANG)

<div align="center">

![MCLANG Logo](assets/mclang-logo-pink.svg)

[![Version](https://img.shields.io/badge/version-1.1.0-ff69b4?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-d946ef?style=for-the-badge)](LICENSE)
[![Open Source](https://img.shields.io/badge/open%20source-yes-ff85c1?style=for-the-badge)](OPEN_SOURCE.md)

**Bahasa pemrograman frontend dengan sintaks khas Mocasus + SPAWN animation.**

</div>

---

## ✨ Apa yang baru di v1.1.0

- Sintaks khas baru:
  - `mc` untuk `const`
  - `moca` untuk `var`
  - `marah` untuk `if`
  - `malu` untuk `else`
- Logo pink sederhana (`assets/mclang-logo-pink.svg`)
- README interaktif dengan contoh siap pakai
- Smoke test + test alias lexer

---

## 🚀 Quick Start

```bash
git clone https://github.com/aditpoenok99/mclang.git
cd mclang
npm install
npm run build
npm test
```

Compile file `.mc`:

```bash
mclang compile app.mc --output dist/app.js
```

---

## 🧠 Sintaks Khas Mocasus

### Alias keyword

```mclang
mc nama = "Mocasus";      // const
moca umur = 1;             // var

marah (umur > 0) {
  moca status = "aktif";
} malu {
  moca status = "nonaktif";
}
```

### Tetap kompatibel

Semua keyword standar tetap berjalan (`const/var/if/else`).

---

## 🎬 SPAWN Animation (Unique Feature)

```mclang
element Hero {
  const box = useRef()

  useEffect(() => {
    spawn(box, {
      duration: 700,
      easing: 'ease-out',
      from: { opacity: 0, translateY: 28 },
      to: { opacity: 1, translateY: 0 }
    })
  }, [])

  <section ref={box} class="hero">
    <h1>Halo MCLANG</h1>
  </section>

  style {
    .hero {
      background: linear-gradient(135deg, #ff9cc8 0%, #d946ef 100%);
      color: white;
      padding: 3rem;
      border-radius: 16px;
    }
  }
}
```

Lihat juga: `docs/SPAWN.md` dan `examples/SpawnAnimation.mc`.

---

## 🧪 Interaktif: Copy-Paste Test Cepat

Buat file `cek.mc`:

```mclang
mc judul = "Tes MCLANG";
moca angka = 7;

marah (angka > 3) {
  moca pesan = "jalan";
} malu {
  moca pesan = "berhenti";
}
```

Compile:

```bash
mclang compile cek.mc --output cek.js
```

Jika sukses, CLI akan menampilkan:

```text
✓ Compiled cek.mc to cek.js
```

---

## 📦 Struktur Penting

```text
src/
  lexer.ts          # tokenisasi + alias keyword baru
  cli.ts            # perintah mclang
  index.ts          # compile entry point
  __tests__/
    lexer.alias.test.ts
    smoke.compile.test.ts
assets/
  mclang-logo-pink.svg
```

---

## 🧪 Testing bahasa (status saat ini)

Jalankan:

```bash
npm test
npm run test:smoke
```

Cakupan saat ini:
- alias sintaks `mc/moca/marah/malu` terbaca lexer ✅
- compile dasar dari source string berjalan ✅

Catatan: transpiler masih tahap dasar (output masih minimal), namun toolchain inti sudah bisa dipakai untuk eksperimen bahasa.

---

## 🔓 Open Source

MCLANG menggunakan MIT License dan boleh dipakai siapa saja, termasuk proyek komersial.

Panduan kontribusi: `CONTRIBUTING.md` dan `OPEN_SOURCE.md`.

---

## 🗂️ Versioning Policy

Setiap fitur baru akan menaikkan versi di:
- `package.json`
- `src/cli.ts`
- `CHANGELOG.md`

Format saat ini: **SemVer** (`MAJOR.MINOR.PATCH`).
