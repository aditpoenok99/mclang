import { Lexer } from '../lexer';
import { TokenType } from '../types';

describe('MCLANG aliases', () => {
  it('maps mc/moca/marah/malu to language keywords', () => {
    const source = `
      mc nama = "moca";
      moca angka = 1;
      marah (angka > 0) { moca status = "ok"; } malu { moca status = "no"; }
    `;

    const tokens = new Lexer(source).tokenize();
    const types = tokens.map((t) => t.type);

    expect(types).toContain(TokenType.CONST); // mc
    expect(types).toContain(TokenType.VAR); // moca
    expect(types).toContain(TokenType.IF); // marah
    expect(types).toContain(TokenType.ELSE); // malu
  });
});
