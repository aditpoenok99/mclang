# MCLANG Change Log

## [2.6.0] - 2026-03-22

### Added
- New documentation website in `site/` with:
  - code blocks
  - interactive preview panel
  - copy/run demo flow
- Deploy-ready configs:
  - `vercel.json`
  - `railway.toml`
  - `Dockerfile` + `.dockerignore`
- New MCLANG logo asset: `assets/mclang-logo-v2-pink.svg`

### Changed
- Version bumped to `2.6.0` in package and CLI
- README updated for release and deployment quick steps

### Production note
- Core language is usable for MVP/prototyping.
- For strict production, recommend: CI test matrix, parser hardening, typed module contracts, and performance profiling.

## [1.3.0] - 2026-03-22

### Added
- 10 new `m*` syntax aliases
- Real module system antar file `.mc` (import/export)
- Test module import/export (`module.system.test.ts`)

### Changed
- CLI and package version bumped to `1.3.0`
- `mclang run/check` now supports module graph resolution
