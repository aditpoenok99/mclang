import { MCLang } from '../index';

describe('Parser + Runtime', () => {
  it('runs moca syntax branch correctly', () => {
    const src = `
      mc base = 10;
      moca hasil = 0;
      marah (base > 5) { tampil("ok"); } malu { tampil("no"); }
      hasil + 5;
    `;

    const result = MCLang.fromString(src).run();
    expect(result).toBe(5);
  });

  it('parses and compiles simple if statement', () => {
    const src = `mc a = 1; marah (a == 1) { tampil("yes"); }`;
    const js = MCLang.fromString(src).compile();
    expect(js).toContain('if (a == 1)');
    expect(js).toContain('const a = 1;');
  });
});
