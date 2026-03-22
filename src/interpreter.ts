import { Program, Statement, Expression } from './ast';
import { MocaError } from './errors';
import { createStdlib, MocaValue } from './stdlib';

export type ModuleLoader = (spec: string) => Record<string, MocaValue>;

interface Binding {
  value: MocaValue | ((...args: MocaValue[]) => MocaValue);
  mutable: boolean;
}

class Environment {
  private readonly map = new Map<string, Binding>();
  private readonly parent?: Environment;

  constructor(parent?: Environment) {
    this.parent = parent;
  }

  define(name: string, value: Binding['value'], mutable: boolean): void {
    if (this.map.has(name)) {
      throw new MocaError(`Variabel '${name}' sudah ada di scope ini.`, 'RUN004', 0, 0, 'Gunakan nama lain atau hapus deklarasi duplikat.');
    }
    this.map.set(name, { value, mutable });
  }

  get(name: string): Binding['value'] {
    const own = this.map.get(name);
    if (own) return own.value;
    if (this.parent) return this.parent.get(name);
    throw new MocaError(`Identifier '${name}' tidak ditemukan.`, 'RUN003', 0, 0, 'Pastikan nama variabel/fungsi benar.');
  }
}

export class Interpreter {
  private readonly globals = new Environment();
  private readonly exportsMap = new Map<string, MocaValue>();
  private readonly moduleLoader?: ModuleLoader;

  constructor(moduleLoader?: ModuleLoader) {
    this.moduleLoader = moduleLoader;
    const std = createStdlib();
    Object.entries(std).forEach(([k, v]) => {
      this.globals.define(k, v as Binding['value'], false);
    });
  }

  public evaluate(program: Program): MocaValue {
    return this.executeBlock(program.body, this.globals);
  }

  public getExports(): Record<string, MocaValue> {
    return Object.fromEntries(this.exportsMap.entries());
  }

  private executeBlock(statements: Statement[], env: Environment): MocaValue {
    let last: MocaValue = null;
    for (const statement of statements) {
      last = this.execute(statement, env);
    }
    return last;
  }

  private execute(statement: Statement, env: Environment): MocaValue {
    switch (statement.type) {
      case 'ImportStatement': {
        if (!this.moduleLoader) {
          throw new MocaError('Module loader belum tersedia untuk import.', 'RUN010', 0, 0);
        }
        const moduleExports = this.moduleLoader(statement.source);
        for (const name of statement.specifiers) {
          if (!(name in moduleExports)) {
            throw new MocaError(`Export '${name}' tidak ada di module '${statement.source}'.`, 'RUN011', 0, 0, 'Cek nama export di file target.');
          }
          env.define(name, moduleExports[name], false);
        }
        return null;
      }
      case 'ExportDeclaration': {
        if (statement.declaration) {
          const v = this.execute(statement.declaration, env);
          this.exportsMap.set(statement.declaration.name, v);
          return v;
        }
        if (statement.specifiers) {
          for (const name of statement.specifiers) {
            this.exportsMap.set(name, env.get(name) as MocaValue);
          }
        }
        return null;
      }
      case 'VariableDeclaration': {
        const value = this.evalExpr(statement.init, env);
        env.define(statement.name, value, statement.kind === 'var');
        return value;
      }
      case 'IfStatement': {
        const test = this.evalExpr(statement.test, env);
        if (Boolean(test)) return this.executeBlock(statement.consequent.body, new Environment(env));
        if (statement.alternate) return this.executeBlock(statement.alternate.body, new Environment(env));
        return null;
      }
      case 'BlockStatement':
        return this.executeBlock(statement.body, new Environment(env));
      case 'ExpressionStatement':
        return this.evalExpr(statement.expression, env);
      default:
        return null;
    }
  }

  private evalExpr(expr: Expression, env: Environment): MocaValue {
    switch (expr.type) {
      case 'Literal': return expr.value;
      case 'Identifier': return env.get(expr.name) as MocaValue;
      case 'UnaryExpression': {
        const v = this.evalExpr(expr.argument, env);
        if (expr.operator === '!') return !Boolean(v);
        if (expr.operator === '-') return -Number(v);
        return v;
      }
      case 'BinaryExpression': {
        const left = this.evalExpr(expr.left, env);
        const right = this.evalExpr(expr.right, env);
        switch (expr.operator) {
          case '+': return Number(left) + Number(right);
          case '-': return Number(left) - Number(right);
          case '*': return Number(left) * Number(right);
          case '/': return Number(left) / Number(right);
          case '%': return Number(left) % Number(right);
          case '==': return left === right;
          case '!=': return left !== right;
          case '>': return Number(left) > Number(right);
          case '>=': return Number(left) >= Number(right);
          case '<': return Number(left) < Number(right);
          case '<=': return Number(left) <= Number(right);
          case '&&': return Boolean(left) && Boolean(right);
          case '||': return Boolean(left) || Boolean(right);
          default:
            throw new MocaError(`Operator '${expr.operator}' belum didukung runtime.`, 'RUN005', 0, 0);
        }
      }
      case 'CallExpression': {
        const fn = env.get(expr.callee.name);
        const args = expr.arguments.map((a) => this.evalExpr(a, env));
        if (typeof fn !== 'function') {
          throw new MocaError(`'${expr.callee.name}' bukan fungsi.`, 'RUN006', 0, 0, 'Gunakan fungsi stdlib atau import fungsi yang benar.');
        }
        return fn(...args);
      }
      default:
        return null;
    }
  }
}
