import { Token, TokenType } from './types';
import { MocaError } from './errors';

export class Lexer {
  private readonly source: string;
  private position = 0;
  private line = 1;
  private column = 1;
  private readonly tokens: Token[] = [];

  private readonly keywords: Map<string, TokenType> = new Map([
    ['var', TokenType.VAR],
    ['const', TokenType.CONST],
    ['if', TokenType.IF],
    ['else', TokenType.ELSE],
    ['true', TokenType.BOOLEAN],
    ['false', TokenType.BOOLEAN],

    // Native Moca aliases
    ['mc', TokenType.CONST],
    ['moca', TokenType.VAR],
    ['marah', TokenType.IF],
    ['malu', TokenType.ELSE],
  ]);

  constructor(source: string) {
    this.source = source;
  }

  private peek(offset = 0): string {
    const pos = this.position + offset;
    return pos < this.source.length ? this.source[pos] : '\0';
  }

  private advance(): string {
    const char = this.peek();
    this.position++;
    if (char === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    return char;
  }

  private skipWhitespaceAndComments(): void {
    while (true) {
      while (/\s/.test(this.peek())) this.advance();

      if (this.peek() === '/' && this.peek(1) === '/') {
        while (this.peek() !== '\n' && this.peek() !== '\0') this.advance();
        continue;
      }

      if (this.peek() === '/' && this.peek(1) === '*') {
        this.advance();
        this.advance();
        while (!(this.peek() === '*' && this.peek(1) === '/')) {
          if (this.peek() === '\0') {
            throw new MocaError('Komentar belum ditutup.', 'LEX002', this.line, this.column, 'Tutup komentar dengan */');
          }
          this.advance();
        }
        this.advance();
        this.advance();
        continue;
      }
      break;
    }
  }

  private readIdentifier(): string {
    let value = '';
    while (/[a-zA-Z0-9_$]/.test(this.peek())) {
      value += this.peek();
      this.advance();
    }
    return value;
  }

  private readNumber(): number {
    let value = '';
    while (/\d/.test(this.peek())) {
      value += this.peek();
      this.advance();
    }

    if (this.peek() === '.' && /\d/.test(this.peek(1))) {
      value += this.peek();
      this.advance();
      while (/\d/.test(this.peek())) {
        value += this.peek();
        this.advance();
      }
    }
    return Number(value);
  }

  private readString(quote: string): string {
    this.advance();
    let value = '';
    while (this.peek() !== quote && this.peek() !== '\0') {
      if (this.peek() === '\\') {
        this.advance();
        const n = this.peek();
        switch (n) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case 'r': value += '\r'; break;
          case '\\': value += '\\'; break;
          case '"': value += '"'; break;
          case "'": value += "'"; break;
          default: value += n;
        }
        this.advance();
      } else {
        value += this.peek();
        this.advance();
      }
    }

    if (this.peek() === '\0') {
      throw new MocaError('String belum ditutup.', 'LEX003', this.line, this.column, `Gunakan ${quote} penutup.`);
    }
    this.advance();
    return value;
  }

  private add(type: TokenType, value: string | number | boolean, raw: string, line: number, column: number): void {
    this.tokens.push({ type, value, raw, line, column });
  }

  public tokenize(): Token[] {
    while (this.position < this.source.length) {
      this.skipWhitespaceAndComments();
      if (this.peek() === '\0') break;

      const line = this.line;
      const column = this.column;
      const char = this.peek();

      if (/\d/.test(char)) {
        const numberValue = this.readNumber();
        this.add(TokenType.NUMBER, numberValue, String(numberValue), line, column);
        continue;
      }

      if (char === '"' || char === "'") {
        const text = this.readString(char);
        this.add(TokenType.STRING, text, `${char}${text}${char}`, line, column);
        continue;
      }

      if (/[a-zA-Z_$]/.test(char)) {
        const ident = this.readIdentifier();
        const type = this.keywords.get(ident) || TokenType.IDENTIFIER;
        const value = type === TokenType.BOOLEAN ? ident === 'true' : ident;
        this.add(type, value, ident, line, column);
        continue;
      }

      const next = this.peek(1);
      if (char === '=' && next === '=') {
        this.advance(); this.advance();
        this.add(TokenType.STRICT_EQUAL, '==', '==', line, column);
        continue;
      }
      if (char === '!' && next === '=') {
        this.advance(); this.advance();
        this.add(TokenType.NOT_EQUAL, '!=', '!=', line, column);
        continue;
      }
      if (char === '<' && next === '=') {
        this.advance(); this.advance();
        this.add(TokenType.LESS_EQUAL, '<=', '<=', line, column);
        continue;
      }
      if (char === '>' && next === '=') {
        this.advance(); this.advance();
        this.add(TokenType.GREATER_EQUAL, '>=', '>=', line, column);
        continue;
      }
      if (char === '&' && next === '&') {
        this.advance(); this.advance();
        this.add(TokenType.AND, '&&', '&&', line, column);
        continue;
      }
      if (char === '|' && next === '|') {
        this.advance(); this.advance();
        this.add(TokenType.OR, '||', '||', line, column);
        continue;
      }
      if (char === '=' && next === '>') {
        this.advance(); this.advance();
        this.add(TokenType.ARROW, '=>', '=>', line, column);
        continue;
      }

      switch (char) {
        case '+': this.advance(); this.add(TokenType.PLUS, '+', '+', line, column); break;
        case '-': this.advance(); this.add(TokenType.MINUS, '-', '-', line, column); break;
        case '*': this.advance(); this.add(TokenType.MULTIPLY, '*', '*', line, column); break;
        case '/': this.advance(); this.add(TokenType.DIVIDE, '/', '/', line, column); break;
        case '%': this.advance(); this.add(TokenType.MODULO, '%', '%', line, column); break;
        case '=': this.advance(); this.add(TokenType.ASSIGN, '=', '=', line, column); break;
        case '!': this.advance(); this.add(TokenType.NOT, '!', '!', line, column); break;
        case '<': this.advance(); this.add(TokenType.LESS_THAN, '<', '<', line, column); break;
        case '>': this.advance(); this.add(TokenType.GREATER_THAN, '>', '>', line, column); break;
        case '(': this.advance(); this.add(TokenType.LPAREN, '(', '(', line, column); break;
        case ')': this.advance(); this.add(TokenType.RPAREN, ')', ')', line, column); break;
        case '{': this.advance(); this.add(TokenType.LBRACE, '{', '{', line, column); break;
        case '}': this.advance(); this.add(TokenType.RBRACE, '}', '}', line, column); break;
        case '[': this.advance(); this.add(TokenType.LBRACKET, '[', '[', line, column); break;
        case ']': this.advance(); this.add(TokenType.RBRACKET, ']', ']', line, column); break;
        case ';': this.advance(); this.add(TokenType.SEMICOLON, ';', ';', line, column); break;
        case ',': this.advance(); this.add(TokenType.COMMA, ',', ',', line, column); break;
        case '.': this.advance(); this.add(TokenType.DOT, '.', '.', line, column); break;
        case ':': this.advance(); this.add(TokenType.COLON, ':', ':', line, column); break;
        default:
          throw new MocaError(
            `Karakter '${char}' belum dikenali tokenizer Moca.`,
            'LEX001',
            line,
            column,
            'Gunakan karakter valid atau cek typo pada kode Anda.'
          );
      }
    }

    this.tokens.push({ type: TokenType.EOF, value: '', raw: '', line: this.line, column: this.column });
    return this.tokens;
  }
}
