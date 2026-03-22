import { MCLang } from '../index';

describe('Moca error message', () => {
  it('shows clear lexer error in Moca style', () => {
    const src = 'mc a = 1; @';
    expect(() => MCLang.fromString(src).check()).toThrow(/MocaError/);
    expect(() => MCLang.fromString(src).check()).toThrow(/Tips Moca/);
  });
});
