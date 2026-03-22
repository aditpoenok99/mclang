import { MCLang } from '../index';

describe('MCLANG smoke compile', () => {
  it('compiles source using new aliases without throwing', () => {
    const source = `
      mc judul = "Halo";
      moca angka = 7;
      marah (angka > 1) { moca hasil = angka + 1; } malu { moca hasil = 0; }
    `;

    const output = MCLang.fromString(source).compile();
    expect(output).toContain('Transpiled from MCLANG');
    expect(output).toContain('const judul = "Halo";');
  });
});
