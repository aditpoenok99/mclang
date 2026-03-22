# MCLANG Change Log

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

### Features
- Variable declarations (const, var)
- Functions with arrow function syntax
- Control flow (if/else, for, while, switch)
- Objects and arrays with destructuring
- Template literals with interpolation
- Async/await support
- Class declarations
- Module system (import/export)
- Component composition with props and children
- State management with hooks
- Event handling
- Conditional and loop rendering
- Responsive CSS media queries

### Coming Soon
- Advanced type system
- Better error messages and diagnostics
- Hot module replacement
- Performance optimization
- Plugin system
- LSP (Language Server Protocol) support
- Online playground
- Official VS Code extension

---

See [GitHub](https://github.com/aditpoenok99/mclang) for more details.
