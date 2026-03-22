# Semantics & Paradigma Moca

## Paradigma

Moca mengadopsi **pragmatic multi-paradigm**:

1. **Imperative**
   - urutan instruksi jelas (`mc`, `moca`, `marah/malu`)
2. **Expression-oriented**
   - expression bisa berdiri sebagai statement
3. **Light functional style**
   - fungsi bawaan stdlib + evaluasi expression aman

## Semantics Utama

### 1) Binding semantics
- `mc` (const): immutable binding
- `moca` (var): mutable binding

### 2) Scope semantics
- Block scope dengan `{ ... }`
- Scope bertingkat (nested environments)

### 3) Control-flow semantics
- `marah (kondisi) { ... } malu { ... }`
- Kondisi di-evaluasi sebagai boolean (`truthy/falsy`)

### 4) Expression semantics
- Operator aritmatika: `+ - * / %`
- Perbandingan: `== != > >= < <=`
- Logika: `&& || !`

### 5) Call semantics
- Function call: `namaFungsi(arg1, arg2)`
- Stdlib bawaan dipanggil seperti fungsi biasa

## Error Semantics (Ala Moca)

Semua error mengadopsi format:

```text
[MocaError KODE] pesan jelas (baris X, kolom Y)
Tips Moca: saran perbaikan
```

Contoh kode error:
- `LEX001`: karakter tidak dikenal
- `PAR001`: struktur token tidak valid
- `RUN001`: variabel belum dideklarasikan

## Stability Contract

Moca dianggap stabil untuk core saat:
- lexer deterministic
- parser deterministic
- runtime menolak state invalid dengan error jelas
- script test parser/runtime/error lulus
