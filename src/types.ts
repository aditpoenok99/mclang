/**
 * MCLANG Type Definitions
 */

export enum TokenType {
  // Literals
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  IDENTIFIER = 'IDENTIFIER',
  BOOLEAN = 'BOOLEAN',

  // Keywords
  VAR = 'VAR',
  CONST = 'CONST',
  FUNCTION = 'FUNCTION',
  IF = 'IF',
  ELSE = 'ELSE',
  FOR = 'FOR',
  WHILE = 'WHILE',
  RETURN = 'RETURN',
  CLASS = 'CLASS',
  EXTENDS = 'EXTENDS',
  NEW = 'NEW',
  THIS = 'THIS',
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
  FROM = 'FROM',
  ASYNC = 'ASYNC',
  AWAIT = 'AWAIT',
  ELEMENT = 'ELEMENT',
  STYLE = 'STYLE',
  SCRIPT = 'SCRIPT',

  // Operators
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  MODULO = 'MODULO',
  ASSIGN = 'ASSIGN',
  EQUAL = 'EQUAL',
  STRICT_EQUAL = 'STRICT_EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  STRICT_NOT_EQUAL = 'STRICT_NOT_EQUAL',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  LESS_EQUAL = 'LESS_EQUAL',
  GREATER_EQUAL = 'GREATER_EQUAL',
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  ARROW = 'ARROW',

  // Delimiters
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  LBRACE = 'LBRACE',
  RBRACE = 'RBRACE',
  LBRACKET = 'LBRACKET',
  RBRACKET = 'RBRACKET',
  SEMICOLON = 'SEMICOLON',
  COMMA = 'COMMA',
  DOT = 'DOT',
  COLON = 'COLON',

  // Special
  TEMPLATE_STRING = 'TEMPLATE_STRING',
  EOF = 'EOF',
}

export interface Token {
  type: TokenType;
  value: string | number | boolean;
  line: number;
  column: number;
  raw: string;
}

export interface ASTNode {
  type: string;
  line: number;
  column: number;
}
