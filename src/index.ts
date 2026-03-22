import { Lexer } from './lexer';
import { Parser } from './parser';
import { Interpreter } from './interpreter';
import { Program } from './ast';
import * as fs from 'fs';

export class MCLang {
  private readonly source: string;

  constructor(source: string) {
    this.source = source;
  }

  public tokenize() {
    return new Lexer(this.source).tokenize();
  }

  public parse(): Program {
    const tokens = this.tokenize();
    return new Parser(tokens).parseProgram();
  }

  public run() {
    const ast = this.parse();
    const runtime = new Interpreter();
    return runtime.evaluate(ast);
  }

  public check(): { ok: boolean; tokenCount: number; statementCount: number } {
    const tokens = this.tokenize();
    const ast = new Parser(tokens).parseProgram();
    return { ok: true, tokenCount: tokens.length, statementCount: ast.body.length };
  }

  public compile(): string {
    const ast = this.parse();
    return this.transpileProgram(ast);
  }

  private transpileProgram(program: Program): string {
    const lines = ['// Transpiled from MCLANG v1.2.0'];

    for (const statement of program.body) {
      if (statement.type === 'VariableDeclaration') {
        lines.push(`${statement.kind} ${statement.name} = ${this.emitExpression(statement.init)};`);
      } else if (statement.type === 'IfStatement') {
        const test = this.emitExpression(statement.test);
        const cons = statement.consequent.body.map((s) => this.emitStatement(s)).join('\n');
        const alt = statement.alternate ? ` else {\n${statement.alternate.body.map((s) => this.emitStatement(s)).join('\n')}\n}` : '';
        lines.push(`if (${test}) {\n${cons}\n}${alt}`);
      } else {
        lines.push(this.emitStatement(statement));
      }
    }

    return lines.join('\n');
  }

  private emitStatement(statement: any): string {
    if (statement.type === 'ExpressionStatement') return `${this.emitExpression(statement.expression)};`;
    if (statement.type === 'VariableDeclaration') return `${statement.kind} ${statement.name} = ${this.emitExpression(statement.init)};`;
    if (statement.type === 'BlockStatement') return `{\n${statement.body.map((s: any) => this.emitStatement(s)).join('\n')}\n}`;
    return '// statement not emitted';
  }

  private emitExpression(expression: any): string {
    switch (expression.type) {
      case 'Literal':
        return typeof expression.value === 'string' ? JSON.stringify(expression.value) : String(expression.value);
      case 'Identifier':
        return expression.name;
      case 'UnaryExpression':
        return `${expression.operator}${this.emitExpression(expression.argument)}`;
      case 'BinaryExpression':
        return `${this.emitExpression(expression.left)} ${expression.operator} ${this.emitExpression(expression.right)}`;
      case 'CallExpression':
        return `${expression.callee.name}(${expression.arguments.map((a: any) => this.emitExpression(a)).join(', ')})`;
      default:
        return 'undefined';
    }
  }

  public static fromFile(filePath: string): MCLang {
    return new MCLang(fs.readFileSync(filePath, 'utf-8'));
  }

  public static fromString(source: string): MCLang {
    return new MCLang(source);
  }
}

export { Lexer } from './lexer';
export { Parser } from './parser';
export { Interpreter } from './interpreter';
