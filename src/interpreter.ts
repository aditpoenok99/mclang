import { Program, Statement, Expression } from './ast';
import { MocaError } from './errors';
import { createStdlib, MocaValue } from './stdlib';

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

  assign(name: string, value: MocaValue): void {
    const own = this.map.get(name);
    if (own) {
      if (!own.mutable) {
        throw new MocaError(`Variabel '${name}' bersifat konstan (mc).`, 'RUN002', 0, 0, 'Gunakan moca jika ingin bisa diubah.');
      }
      own.value = value;
      return;
    }
    if (this.parent) return this.parent.assign(name, value);
    throw new MocaError(`Variabel '${name}' belum didefinisikan.`, 'RUN001', 0, 0, 'Deklarasikan dulu dengan mc/moca.');
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

  constructor() {
    const std = createStdlib();
    Object.entries(std).forEach(([k, v]) => {
      this.globals.define(k, v as Binding['value'], false);
    });
  }

  public evaluate(program: Program): MocaValue {
    return this.executeBlock(program.body, this.globals);
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
      case 'VariableDeclaration': {
        const value = this.evalExpr(statement.init, env);
        env.define(statement.name, value, statement.kind === 'var');
        return value;
      }
      case 'IfStatement': {
        const test = this.evalExpr(statement.test, env);
        if (Boolean(test)) {
          return this.executeBlock(statement.consequent.body, new Environment(env));
        }
        if (statement.alternate) {
          return this.executeBlock(statement.alternate.body, new Environment(env));
        }
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
      case 'Literal':
        return expr.value;
      case 'Identifier':
        return env.get(expr.name) as MocaValue;
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
          case '+': return (left as number) + (right as number);
          case '-': return (left as number) - (right as number);
          case '*': return (left as number) * (right as number);
          case '/': return (left as number) / (right as number);
          case '%': return (left as number) % (right as number);
          case '==': return left === right;
          case '!=': return left !== right;
          case '>': return (left as number) > (right as number);
          case '>=': return (left as number) >= (right as number);
          case '<': return (left as number) < (right as number);
          case '<=': return (left as number) <= (right as number);
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
          throw new MocaError(`'${expr.callee.name}' bukan fungsi.`, 'RUN006', 0, 0, 'Gunakan nama fungsi stdlib seperti tampil().');
        }
        return fn(...args);
      }
      default:
        return null;
    }
  }
}
