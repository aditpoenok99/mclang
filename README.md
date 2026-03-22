# 🌸 MOCASUS LANG (MOCA / MCLANG)

<div align="center">

![MCLANG Logo](assets/mclang-logo-pink.svg)

[![Version](https://img.shields.io/badge/version-1.3.0-ff69b4?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-d946ef?style=for-the-badge)](LICENSE)

**Bahasa pemrograman baru dengan sintaks Moca, parser+runtime, CLI, package manager, stdlib, dan module system real antar file `.mc`.**

</div>

---

## ✨ Baru di v1.3.0

- ✅ Tambahan **10 sintaks baru** awalan `m` (termasuk `moy`)
- ✅ **Module system real**: `mimpor` / `mekspor` antar file `.mc`
- ✅ CLI `run/check` sudah membaca graph module

---

## 🔤 10 Sintaks Baru Awalan `m`

1. `moy` => `from`
2. `mimpor` => `import`
3. `mekspor` => `export`
4. `mfungsi` => `function` (reserved)
5. `mbalik` => `return` (reserved)
6. `muntuk` => `for` (reserved)
7. `mselama` => `while` (reserved)
8. `mkelas` => `class` (reserved)
9. `mbenar` => `true`
10. `msalah` => `false`

Sintaks lama tetap ada:
- `mc` => `const`
- `moca` => `var`
- `marah` => `if`
- `malu` => `else`

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
# cek syntax + parser + graph module
mclang check main.mc

# jalankan interpreter dengan module resolution
mclang run main.mc

# compile entry ke JavaScript
mclang compile main.mc -o dist/main.js

# repl
mclang repl
```

Package manager konsep Moca:

```bash
mclang moca init
mclang moca add ui-kit 1.0.0
mclang moca list
mclang moca remove ui-kit
```

---

## 🧪 Testing

```bash
npm test
npm run test:smoke
```

Coverage mencakup:
- alias sintaks
- runtime parser
- error message
- **module import/export antar file `.mc`**

---

## 🛠️ Core Files

```text
src/
  lexer.ts        # tokenizer + alias m*
  parser.ts       # parser AST + import/export
  interpreter.ts  # runtime + module binding
  index.ts        # module resolver antar .mc
  cli.ts          # run/check/compile/repl + moca pm
```

---

## 🔓 Open Source

MIT License, bebas untuk pribadi dan komersial.
