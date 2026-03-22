import { Program, Statement, Expression, BlockStatement, ImportStatement, ExportDeclaration } from './ast';
import { MocaError } from './errors';
import { Token, TokenType } from './types';

export class Parser {
  private readonly tokens: Token[];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parseProgram(): Program {
    const body: Statement[] = [];
    while (!this.isAtEnd()) {
      body.push(this.parseStatement());
    }
    return { type: 'Program', body };
  }

  private parseStatement(): Statement {
    if (this.match(TokenType.IMPORT)) return this.parseImportStatement();
    if (this.match(TokenType.EXPORT)) return this.parseExportStatement();
    if (this.match(TokenType.CONST)) return this.parseVariableDeclaration('const');
    if (this.match(TokenType.VAR)) return this.parseVariableDeclaration('var');
    if (this.match(TokenType.IF)) return this.parseIfStatement();
    if (this.match(TokenType.LBRACE)) return this.parseBlockAlreadyOpened();

    const expression = this.parseExpression();
    this.match(TokenType.SEMICOLON);
    return { type: 'ExpressionStatement', expression };
  }

  private parseImportStatement(): ImportStatement {
    const specifiers: string[] = [];

    if (this.match(TokenType.LBRACE)) {
      do {
        const ident = this.consume(TokenType.IDENTIFIER, 'Import wajib punya nama identifier.');
        specifiers.push(String(ident.value));
      } while (this.match(TokenType.COMMA));
      this.consume(TokenType.RBRACE, 'Daftar import harus ditutup }.');
    } else {
      const single = this.consume(TokenType.IDENTIFIER, 'Import default wajib identifier.');
      specifiers.push(String(single.value));
    }

    this.consume(TokenType.FROM, "Import wajib pakai 'moy/from'.");
    const src = this.consume(TokenType.STRING, 'Path module import wajib string.');
    this.match(TokenType.SEMICOLON);

    return {
      type: 'ImportStatement',
      specifiers,
      source: String(src.value),
    };
  }

  private parseExportStatement(): ExportDeclaration {
    if (this.match(TokenType.CONST)) {
      return { type: 'ExportDeclaration', declaration: this.parseVariableDeclaration('const') as any };
    }

    if (this.match(TokenType.VAR)) {
      return { type: 'ExportDeclaration', declaration: this.parseVariableDeclaration('var') as any };
    }

    if (this.match(TokenType.LBRACE)) {
      const specifiers: string[] = [];
      do {
        const ident = this.consume(TokenType.IDENTIFIER, 'Export list wajib identifier.');
        specifiers.push(String(ident.value));
      } while (this.match(TokenType.COMMA));
      this.consume(TokenType.RBRACE, 'Daftar export harus ditutup }.');
      this.match(TokenType.SEMICOLON);
      return { type: 'ExportDeclaration', specifiers };
    }

    const t = this.peek();
    throw new MocaError('Export Moca hanya mendukung deklarasi variabel atau daftar export.', 'PAR006', t.line, t.column, "Contoh: mekspor mc a = 1; atau mekspor { a };");
  }

  private parseVariableDeclaration(kind: 'const' | 'var'): Statement {
    const nameToken = this.consume(TokenType.IDENTIFIER, 'Nama variabel wajib ditulis setelah deklarasi.');
    this.consume(TokenType.ASSIGN, "Deklarasi variabel wajib punya '='.");
    const init = this.parseExpression();
    this.match(TokenType.SEMICOLON);

    return {
      type: 'VariableDeclaration',
      kind,
      name: String(nameToken.value),
      init,
    };
  }

  private parseIfStatement(): Statement {
    this.consume(TokenType.LPAREN, "Setelah 'marah/if' harus ada '(' .");
    const test = this.parseExpression();
    this.consume(TokenType.RPAREN, "Kondisi 'marah/if' harus ditutup ')' .");

    const consequent = this.parseBlockLike("Blok untuk 'marah/if' wajib pakai kurung kurawal.");
    let alternate: BlockStatement | undefined;

    if (this.match(TokenType.ELSE)) {
      alternate = this.parseBlockLike("Blok untuk 'malu/else' wajib pakai kurung kurawal.");
    }

    return { type: 'IfStatement', test, consequent, alternate };
  }

  private parseBlockLike(errorMessage: string): BlockStatement {
    this.consume(TokenType.LBRACE, errorMessage);
    return this.parseBlockAlreadyOpened();
  }

  private parseBlockAlreadyOpened(): BlockStatement {
    const body: Statement[] = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      body.push(this.parseStatement());
    }
    this.consume(TokenType.RBRACE, 'Blok belum ditutup dengan } .');
    return { type: 'BlockStatement', body };
  }

  private parseExpression(): Expression {
    return this.parseOr();
  }

  private parseOr(): Expression {
    let expr = this.parseAnd();
    while (this.match(TokenType.OR)) {
      const operator = '||';
      const right = this.parseAnd();
      expr = { type: 'BinaryExpression', operator, left: expr, right };
    }
    return expr;
  }

  private parseAnd(): Expression {
    let expr = this.parseEquality();
    while (this.match(TokenType.AND)) {
      const operator = '&&';
      const right = this.parseEquality();
      expr = { type: 'BinaryExpression', operator, left: expr, right };
    }
    return expr;
  }

  private parseEquality(): Expression {
    let expr = this.parseComparison();
    while (this.match(TokenType.STRICT_EQUAL, TokenType.NOT_EQUAL)) {
      const opToken = this.previous();
      const operator = String(opToken.value);
      const right = this.parseComparison();
      expr = { type: 'BinaryExpression', operator, left: expr, right };
    }
    return expr;
  }

  private parseComparison(): Expression {
    let expr = this.parseTerm();
    while (this.match(TokenType.GREATER_THAN, TokenType.GREATER_EQUAL, TokenType.LESS_THAN, TokenType.LESS_EQUAL)) {
      const operator = String(this.previous().value);
      const right = this.parseTerm();
      expr = { type: 'BinaryExpression', operator, left: expr, right };
    }
    return expr;
  }

  private parseTerm(): Expression {
    let expr = this.parseFactor();
    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = String(this.previous().value);
      const right = this.parseFactor();
      expr = { type: 'BinaryExpression', operator, left: expr, right };
    }
    return expr;
  }

  private parseFactor(): Expression {
    let expr = this.parseUnary();
    while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
      const operator = String(this.previous().value);
      const right = this.parseUnary();
      expr = { type: 'BinaryExpression', operator, left: expr, right };
    }
    return expr;
  }

  private parseUnary(): Expression {
    if (this.match(TokenType.NOT, TokenType.MINUS)) {
      const operator = String(this.previous().value);
      const argument = this.parseUnary();
      return { type: 'UnaryExpression', operator, argument };
    }
    return this.parseCall();
  }

  private parseCall(): Expression {
    const primary = this.parsePrimary();

    if (primary.type === 'Identifier' && this.match(TokenType.LPAREN)) {
      const args: Expression[] = [];
      if (!this.check(TokenType.RPAREN)) {
        do {
          args.push(this.parseExpression());
        } while (this.match(TokenType.COMMA));
      }
      this.consume(TokenType.RPAREN, 'Pemanggilan fungsi belum ditutup ).');
      return { type: 'CallExpression', callee: primary, arguments: args };
    }

    return primary;
  }

  private parsePrimary(): Expression {
    if (this.match(TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN)) {
      return { type: 'Literal', value: this.previous().value as string | number | boolean };
    }

    if (this.match(TokenType.IDENTIFIER)) {
      return { type: 'Identifier', name: String(this.previous().value) };
    }

    if (this.match(TokenType.LPAREN)) {
      const expr = this.parseExpression();
      this.consume(TokenType.RPAREN, 'Kurung ekspresi belum ditutup ).');
      return expr;
    }

    const token = this.peek();
    throw new MocaError(
      `Token '${token.raw || token.type}' tidak valid di posisi ini.`,
      'PAR001',
      token.line,
      token.column,
      'Cek struktur ekspresi atau deklarasi Anda.'
    );
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    const t = this.peek();
    throw new MocaError(message, 'PAR002', t.line, t.column, `Ketemu '${t.raw || t.type}'`);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }
}
