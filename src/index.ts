import * as fs from 'fs';
import * as path from 'path';
import { Program, Statement } from './ast';
import { MocaError } from './errors';
import { Interpreter, ModuleLoader } from './interpreter';
import { Lexer } from './lexer';
import { Parser } from './parser';

interface ModuleExecution {
  result: unknown;
  exports: Record<string, any>;
}

export class MCLang {
  private readonly source: string;

  constructor(source: string) {
    this.source = source;
  }

  public tokenize() {
    return new Lexer(this.source).tokenize();
  }

  public parse(): Program {
    return new Parser(this.tokenize()).parseProgram();
  }

  public run(moduleLoader?: ModuleLoader) {
    const ast = this.parse();
    const runtime = new Interpreter(moduleLoader);
    return runtime.evaluate(ast);
  }

  public check(): { ok: boolean; tokenCount: number; statementCount: number } {
    const tokens = this.tokenize();
    const ast = new Parser(tokens).parseProgram();
    return { ok: true, tokenCount: tokens.length, statementCount: ast.body.length };
  }

  public compile(): string {
    return this.transpileProgram(this.parse());
  }

  private transpileProgram(program: Program): string {
    const lines: string[] = ['// Transpiled from MCLANG v1.3.0'];

    for (const statement of program.body) {
      lines.push(this.emitStatement(statement));
    }
    return lines.join('\n');
  }

  private emitStatement(statement: Statement): string {
    if (statement.type === 'ImportStatement') {
      return `import { ${statement.specifiers.join(', ')} } from ${JSON.stringify(statement.source)};`;
    }

    if (statement.type === 'ExportDeclaration') {
      if (statement.declaration) {
        return `export ${statement.declaration.kind} ${statement.declaration.name} = ${this.emitExpression(statement.declaration.init)};`;
      }
      return `export { ${(statement.specifiers || []).join(', ')} };`;
    }

    if (statement.type === 'ExpressionStatement') return `${this.emitExpression(statement.expression)};`;
    if (statement.type === 'VariableDeclaration') return `${statement.kind} ${statement.name} = ${this.emitExpression(statement.init)};`;
    if (statement.type === 'BlockStatement') return `{\n${statement.body.map((s) => this.emitStatement(s)).join('\n')}\n}`;
    if (statement.type === 'IfStatement') {
      const test = this.emitExpression(statement.test);
      const cons = statement.consequent.body.map((s) => this.emitStatement(s)).join('\n');
      const alt = statement.alternate ? ` else {\n${statement.alternate.body.map((s) => this.emitStatement(s)).join('\n')}\n}` : '';
      return `if (${test}) {\n${cons}\n}${alt}`;
    }

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

  public static runFile(entryFile: string): unknown {
    const cache = new Map<string, ModuleExecution>();
    const execution = this.executeModule(entryFile, cache);
    return execution.result;
  }

  public static checkFile(entryFile: string): { ok: boolean; modules: number; tokenCount: number; statementCount: number } {
    const visited = new Set<string>();
    let tokenCount = 0;
    let statementCount = 0;

    const walk = (filePath: string): void => {
      const abs = this.normalizeModulePath(filePath);
      if (visited.has(abs)) return;
      visited.add(abs);

      const source = fs.readFileSync(abs, 'utf-8');
      const lang = new MCLang(source);
      const tokens = lang.tokenize();
      const program = new Parser(tokens).parseProgram();

      tokenCount += tokens.length;
      statementCount += program.body.length;

      for (const stmt of program.body) {
        if (stmt.type === 'ImportStatement') {
          const target = this.resolveImportPath(abs, stmt.source);
          walk(target);
        }
      }
    };

    walk(entryFile);
    return { ok: true, modules: visited.size, tokenCount, statementCount };
  }

  public static compileFile(entryFile: string): string {
    const source = fs.readFileSync(this.normalizeModulePath(entryFile), 'utf-8');
    return new MCLang(source).compile();
  }

  private static executeModule(filePath: string, cache: Map<string, ModuleExecution>): ModuleExecution {
    const abs = this.normalizeModulePath(filePath);
    const cached = cache.get(abs);
    if (cached) return cached;

    const source = fs.readFileSync(abs, 'utf-8');
    const lang = new MCLang(source);
    const ast = lang.parse();

    const loader: ModuleLoader = (spec: string) => {
      const targetPath = this.resolveImportPath(abs, spec);
      return this.executeModule(targetPath, cache).exports;
    };

    const runtime = new Interpreter(loader);
    const result = runtime.evaluate(ast);
    const exports = runtime.getExports();

    const execution: ModuleExecution = { result, exports };
    cache.set(abs, execution);
    return execution;
  }

  private static normalizeModulePath(filePath: string): string {
    let abs = path.resolve(filePath);
    if (!abs.endsWith('.mc')) {
      abs = `${abs}.mc`;
    }
    if (!fs.existsSync(abs)) {
      throw new MocaError(`File module tidak ditemukan: ${abs}`, 'MOD001', 0, 0, 'Pastikan path file .mc benar.');
    }
    return abs;
  }

  private static resolveImportPath(fromAbsFile: string, spec: string): string {
    if (!spec.startsWith('.')) {
      throw new MocaError(`Import '${spec}' belum didukung untuk non-relative path.`, 'MOD002', 0, 0, "Gunakan path relative seperti './utils.mc'.");
    }
    const base = path.dirname(fromAbsFile);
    const joined = path.resolve(base, spec);
    return joined.endsWith('.mc') ? joined : `${joined}.mc`;
  }
}

export { Lexer } from './lexer';
export { Parser } from './parser';
export { Interpreter } from './interpreter';
