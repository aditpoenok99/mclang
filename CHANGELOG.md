# MCLANG Change Log

## [1.3.0] - 2026-03-22

### Added
- 10 new `m*` syntax aliases:
  - `moy` => `from`
  - `mimpor` => `import`
  - `mekspor` => `export`
  - `mfungsi` => `function`
  - `mbalik` => `return`
  - `muntuk` => `for`
  - `mselama` => `while`
  - `mkelas` => `class`
  - `mbenar` => `true`
  - `msalah` => `false`
- Real module system antar file `.mc` (import/export)
- Test module import/export (`module.system.test.ts`)

### Changed
- CLI and package version bumped to `1.3.0`
- `mclang run/check` now supports module graph resolution

## [1.2.0] - 2026-03-22

### Added
- Parser AST nyata (`src/parser.ts`)
- Interpreter runtime (`src/interpreter.ts`)
- Moca standard library core (`src/stdlib.ts`)
- Error system ala Moca (`src/errors.ts`)
- CLI commands baru: `run`, `check`, `repl`
- Package manager commands: `mclang moca init/add/remove/list`
- Dokumentasi semantics & paradigma (`docs/SEMANTICS.md`)
- Dokumentasi stdlib (`docs/STDLIB.md`)
- Test parser/runtime/error

### Changed
- Lexer diperkuat untuk stabilitas + komentar + error jelas
- `package.json` version `1.2.0`
- CLI version `1.2.0`
- README dirombak agar mencerminkan implementasi nyata

## [1.1.0] - 2026-03-22

### Added
- Native Mocasus syntax aliases:
  - `mc` => `const`
  - `moca` => `var`
  - `marah` => `if`
  - `malu` => `else`
- Pink simple logo asset: `assets/mclang-logo-pink.svg`
- Interactive README sections with preview-style code examples
- Smoke tests and alias lexer tests

### Changed
- CLI version bumped to `1.1.0`
- package version bumped to `1.1.0`
- Added `test:smoke` script
