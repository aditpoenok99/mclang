# 🌸 MOCASUS LANG (MOCA / MCLANG)

<div align="center">

![MCLANG Logo](assets/mclang-logo-pink.svg)

[![Version](https://img.shields.io/badge/version-1.2.0-ff69b4?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-d946ef?style=for-the-badge)](LICENSE)

**Bahasa pemrograman baru dengan sintaks khas Moca, parser+runtime, CLI, package manager, dan stdlib.**

</div>

---

## 🔥 Ringkasan v1.2.0

- ✅ Semantics & paradigma Moca sekarang jelas (`docs/SEMANTICS.md`)
- ✅ Lexer stabil + error message ala Moca
- ✅ Parser AST nyata
- ✅ Interpreter runtime yang bisa menjalankan program
- ✅ Standard Library bawaan (`tampil`, `panjang`, `tipe`, dll)
- ✅ CLI lebih lengkap (`run`, `check`, `compile`, `repl`)
- ✅ Package manager konsep Moca (`mclang moca ...`)

---

## 🧠 Sintaks Khas Moca

```mclang
mc nama = "Moca";
moca umur = 2;

marah (umur > 1) {
  tampil("aktif");
} malu {
  tampil("tidak aktif");
}
```

Alias:
- `mc` => `const`
- `moca` => `var`
- `marah` => `if`
- `malu` => `else`

---

## 🧭 Paradigma & Semantics

Moca sekarang punya kontrak semantics yang jelas:
- **Imperative core** + expression-oriented statements
- block scope (`{}`) dan binding rule (`mc` immutable, `moca` mutable)
- error contract ala Moca (`[MocaError CODE] ... Tips Moca: ...`)

Detail lengkap: `docs/SEMANTICS.md`

---

## 🚀 CLI (Bisa Dipakai)

```bash
# cek syntax + parser
mclang check app.mc

# jalankan langsung via interpreter
mclang run app.mc

# compile ke JavaScript
mclang compile app.mc -o dist/app.js

# repl interaktif
mclang repl
```

---

## 📦 Package Manager Konsep Moca

```bash
# init project metadata
mclang moca init

# add package (metadata)
mclang moca add ui-kit 1.0.0

# list package
mclang moca list

# remove package
mclang moca remove ui-kit
```

File metadata project: `moca.json`

---

## 📚 Standard Library Core

- `tampil(...args)` / `print(...args)`
- `panjang(teks)`
- `tipe(value)`
- `angka(value)`
- `teks(value)`

Detail: `docs/STDLIB.md`

---

## 🧪 Testing

```bash
npm test
npm run test:smoke
```

Cakupan test:
- alias syntax lexer
- parser + runtime
- error message style
- smoke compile

---

## 🛠️ Arsitektur Core

```text
src/
  lexer.ts        # tokenizer stabil + error jelas
  parser.ts       # AST parser
  interpreter.ts  # runtime evaluator
  stdlib.ts       # standard library core
  errors.ts       # MocaError format
  cli.ts          # run/check/compile/repl + moca pm
```

---

## 🔓 Open Source

MIT License. Bebas dipakai untuk personal/komersial.
