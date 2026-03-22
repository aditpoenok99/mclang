# Moca Standard Library (Core)

## Fungsi bawaan

- `tampil(...args)` → print ke console
- `print(...args)` → alias `tampil`
- `panjang(teks)` → panjang string
- `tipe(value)` → typeof sederhana
- `angka(value)` → cast ke number
- `teks(value)` → cast ke string

## Contoh

```mclang
mc nama = "Moca";
tampil(nama);

mc n = panjang("halo");
tampil(n);

mc jenis = tipe(10);
tampil(jenis);
```
