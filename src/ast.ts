export type Statement = VariableDeclaration | IfStatement | BlockStatement | ExpressionStatement;

export type Expression = LiteralExpression | IdentifierExpression | BinaryExpression | UnaryExpression | CallExpression;

export interface Program {
  type: 'Program';
  body: Statement[];
}

export interface VariableDeclaration {
  type: 'VariableDeclaration';
  kind: 'const' | 'var';
  name: string;
  init: Expression;
}

export interface IfStatement {
  type: 'IfStatement';
  test: Expression;
  consequent: BlockStatement;
  alternate?: BlockStatement;
}

export interface BlockStatement {
  type: 'BlockStatement';
  body: Statement[];
}

export interface ExpressionStatement {
  type: 'ExpressionStatement';
  expression: Expression;
}

export interface LiteralExpression {
  type: 'Literal';
  value: string | number | boolean;
}

export interface IdentifierExpression {
  type: 'Identifier';
  name: string;
}

export interface UnaryExpression {
  type: 'UnaryExpression';
  operator: string;
  argument: Expression;
}

export interface BinaryExpression {
  type: 'BinaryExpression';
  operator: string;
  left: Expression;
  right: Expression;
}

export interface CallExpression {
  type: 'CallExpression';
  callee: IdentifierExpression;
  arguments: Expression[];
}
