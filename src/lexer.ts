/**
 * MCLANG Lexer - Tokenizes source code
 */

import { Token, TokenType } from './types';

export class Lexer {
  private source: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;
  private tokens: Token[] = [];

  private keywords: Map<string, TokenType> = new Map([
    ['var', TokenType.VAR],
    ['const', TokenType.CONST],
    ['function', TokenType.FUNCTION],
    ['if', TokenType.IF],
    ['else', TokenType.ELSE],
    ['for', TokenType.FOR],
    ['while', TokenType.WHILE],
    ['return', TokenType.RETURN],
    ['class', TokenType.CLASS],
    ['extends', TokenType.EXTENDS],
    ['new', TokenType.NEW],
    ['this', TokenType.THIS],
    ['import', TokenType.IMPORT],
    ['export', TokenType.EXPORT],
    ['from', TokenType.FROM],
    ['true', TokenType.BOOLEAN],
    ['false', TokenType.BOOLEAN],
    ['async', TokenType.ASYNC],
    ['await', TokenType.AWAIT],
    ['element', TokenType.ELEMENT],
    ['style', TokenType.STYLE],
    ['script', TokenType.SCRIPT],

    // Mocasus native aliases
    ['mc', TokenType.CONST],
    ['moca', TokenType.VAR],
    ['marah', TokenType.IF],
    ['malu', TokenType.ELSE],
  ]);

  constructor(source: string) {
    this.source = source;
  }

  private peek(offset: number = 0): string {
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

  private skipWhitespace(): void {
    while (/\s/.test(this.peek())) {
      this.advance();
    }
  }

  private readString(quote: string): string {
    let value = '';
    this.advance();
    while (this.peek() !== quote && this.peek() !== '\0') {
      if (this.peek() === '\\') {
        this.advance();
        const next = this.peek();
        switch (next) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case 'r': value += '\r'; break;
          case '\\': value += '\\'; break;
          default: value += next;
        }
        this.advance();
      } else {
        value += this.peek();
        this.advance();
      }
    }
    if (this.peek() === '\0') {
      throw new Error(`Unterminated string at line ${this.line}`);
    }
    this.advance();
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
    return parseFloat(value);
  }

  private readIdentifier(): string {
    let value = '';
    while (/[a-zA-Z0-9_$]/.test(this.peek())) {
      value += this.peek();
      this.advance();
    }
    return value;
  }

  public tokenize(): Token[] {
    while (this.position < this.source.length) {
      this.skipWhitespace();

      const char = this.peek();
      if (char === '\0') break;

      const startCol = this.column;

      if (/\d/.test(char)) {
        const value = this.readNumber();
        this.tokens.push({
          type: TokenType.NUMBER,
          value,
          line: this.line,
          column: startCol,
          raw: value.toString(),
        });
      } else if (char === '"' || char === "'") {
        const value = this.readString(char);
        this.tokens.push({
          type: TokenType.STRING,
          value,
          line: this.line,
          column: startCol,
          raw: char + value + char,
        });
      } else if (/[a-zA-Z_$]/.test(char)) {
        const identifier = this.readIdentifier();
        const type = this.keywords.get(identifier) || TokenType.IDENTIFIER;
        const value = type === TokenType.BOOLEAN ? identifier === 'true' : identifier;
        this.tokens.push({
          type,
          value,
          line: this.line,
          column: startCol,
          raw: identifier,
        });
      } else {
        switch (char) {
          case '+':
            this.advance();
            this.tokens.push({ type: TokenType.PLUS, value: '+', line: this.line, column: startCol, raw: '+' });
            break;
          case '-':
            this.advance();
            this.tokens.push({ type: TokenType.MINUS, value: '-', line: this.line, column: startCol, raw: '-' });
            break;
          case '*':
            this.advance();
            this.tokens.push({ type: TokenType.MULTIPLY, value: '*', line: this.line, column: startCol, raw: '*' });
            break;
          case '/':
            this.advance();
            this.tokens.push({ type: TokenType.DIVIDE, value: '/', line: this.line, column: startCol, raw: '/' });
            break;
          case '%':
            this.advance();
            this.tokens.push({ type: TokenType.MODULO, value: '%', line: this.line, column: startCol, raw: '%' });
            break;
          case '=':
            this.advance();
            if (this.peek() === '=') {
              this.advance();
              this.tokens.push({ type: TokenType.STRICT_EQUAL, value: '==', line: this.line, column: startCol, raw: '==' });
            } else if (this.peek() === '>') {
              this.advance();
              this.tokens.push({ type: TokenType.ARROW, value: '=>', line: this.line, column: startCol, raw: '=>' });
            } else {
              this.tokens.push({ type: TokenType.ASSIGN, value: '=', line: this.line, column: startCol, raw: '=' });
            }
            break;
          case '!':
            this.advance();
            if (this.peek() === '=') {
              this.advance();
              this.tokens.push({ type: TokenType.NOT_EQUAL, value: '!=', line: this.line, column: startCol, raw: '!=' });
            } else {
              this.tokens.push({ type: TokenType.NOT, value: '!', line: this.line, column: startCol, raw: '!' });
            }
            break;
          case '<':
            this.advance();
            if (this.peek() === '=') {
              this.advance();
              this.tokens.push({ type: TokenType.LESS_EQUAL, value: '<=', line: this.line, column: startCol, raw: '<=' });
            } else {
              this.tokens.push({ type: TokenType.LESS_THAN, value: '<', line: this.line, column: startCol, raw: '<' });
            }
            break;
          case '>':
            this.advance();
            if (this.peek() === '=') {
              this.advance();
              this.tokens.push({ type: TokenType.GREATER_EQUAL, value: '>=', line: this.line, column: startCol, raw: '>=' });
            } else {
              this.tokens.push({ type: TokenType.GREATER_THAN, value: '>', line: this.line, column: startCol, raw: '>' });
            }
            break;
          case '&':
            this.advance();
            if (this.peek() === '&') {
              this.advance();
              this.tokens.push({ type: TokenType.AND, value: '&&', line: this.line, column: startCol, raw: '&&' });
            }
            break;
          case '|':
            this.advance();
            if (this.peek() === '|') {
              this.advance();
              this.tokens.push({ type: TokenType.OR, value: '||', line: this.line, column: startCol, raw: '||' });
            }
            break;
          case '(':
            this.advance();
            this.tokens.push({ type: TokenType.LPAREN, value: '(', line: this.line, column: startCol, raw: '(' });
            break;
          case ')':
            this.advance();
            this.tokens.push({ type: TokenType.RPAREN, value: ')', line: this.line, column: startCol, raw: ')' });
            break;
          case '{':
            this.advance();
            this.tokens.push({ type: TokenType.LBRACE, value: '{', line: this.line, column: startCol, raw: '{' });
            break;
          case '}':
            this.advance();
            this.tokens.push({ type: TokenType.RBRACE, value: '}', line: this.line, column: startCol, raw: '}' });
            break;
          case '[':
            this.advance();
            this.tokens.push({ type: TokenType.LBRACKET, value: '[', line: this.line, column: startCol, raw: '[' });
            break;
          case ']':
            this.advance();
            this.tokens.push({ type: TokenType.RBRACKET, value: ']', line: this.line, column: startCol, raw: ']' });
            break;
          case ';':
            this.advance();
            this.tokens.push({ type: TokenType.SEMICOLON, value: ';', line: this.line, column: startCol, raw: ';' });
            break;
          case ',':
            this.advance();
            this.tokens.push({ type: TokenType.COMMA, value: ',', line: this.line, column: startCol, raw: ',' });
            break;
          case '.':
            this.advance();
            this.tokens.push({ type: TokenType.DOT, value: '.', line: this.line, column: startCol, raw: '.' });
            break;
          case ':':
            this.advance();
            this.tokens.push({ type: TokenType.COLON, value: ':', line: this.line, column: startCol, raw: ':' });
            break;
          default:
            this.advance();
        }
      }
    }

    this.tokens.push({ type: TokenType.EOF, value: '', line: this.line, column: this.column, raw: '' });
    return this.tokens;
  }
}
