import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { MCLang } from '../index';

describe('Real module system (.mc import/export)', () => {
  it('resolves import/export antar file .mc', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'moca-mod-'));
    const modFile = path.join(dir, 'util.mc');
    const mainFile = path.join(dir, 'main.mc');

    fs.writeFileSync(modFile, 'mekspor mc nilai = 41;');
    fs.writeFileSync(mainFile, 'mimpor { nilai } moy "./util.mc"; nilai + 1;');

    const result = MCLang.runFile(mainFile);
    expect(result).toBe(42);
  });
});
