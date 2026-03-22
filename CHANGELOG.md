# MCLANG Change Log

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

## [1.0.0] - 2024-03-22

### Added
- Initial release of MCLANG (Mocasus Lang)
- Lexer for tokenizing MCLANG source code
- Basic parser and transpiler
- Support for element definitions (components)
- CSS scoping for component styles
- React-like hooks (useState, useEffect)
- CLI with basic commands (compile, watch, dev, build)
- Comprehensive documentation and examples
- MIT License
