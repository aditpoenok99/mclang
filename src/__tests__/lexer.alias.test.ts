import { Lexer } from '../lexer';
import { TokenType } from '../types';

describe('MCLANG aliases', () => {
  it('maps existing aliases', () => {
    const source = `mc nama = "moca"; moca angka = 1; marah (angka > 0) { } malu { }`;
    const tokens = new Lexer(source).tokenize();
    const types = tokens.map((t) => t.type);

    expect(types).toContain(TokenType.CONST);
    expect(types).toContain(TokenType.VAR);
    expect(types).toContain(TokenType.IF);
    expect(types).toContain(TokenType.ELSE);
  });

  it('maps 10 new aliases with m prefix', () => {
    const source = `
      mimpor { x } moy "./a.mc";
      mekspor mc y = 1;
      mfungsi;
      mbalik;
      muntuk;
      mselama;
      mkelas;
      mbenar;
      msalah;
    `;

    const types = new Lexer(source).tokenize().map((t) => t.type);

    expect(types).toContain(TokenType.IMPORT); // mimpor
    expect(types).toContain(TokenType.FROM); // moy
    expect(types).toContain(TokenType.EXPORT); // mekspor
    expect(types).toContain(TokenType.FUNCTION); // mfungsi
    expect(types).toContain(TokenType.RETURN); // mbalik
    expect(types).toContain(TokenType.FOR); // muntuk
    expect(types).toContain(TokenType.WHILE); // mselama
    expect(types).toContain(TokenType.CLASS); // mkelas
    expect(types).toContain(TokenType.BOOLEAN); // mbenar / msalah
  });
});
