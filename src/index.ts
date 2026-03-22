/**
 * MCLANG Main Entry Point
 */

import { Lexer } from './lexer';
import * as fs from 'fs';
import * as path from 'path';

export class MCLang {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  public compile(): string {
    const lexer = new Lexer(this.source);
    const tokens = lexer.tokenize();
    
    // TODO: Implement parser and transpiler
    // For now, return basic transpile
    return this.transpile(tokens);
  }

  private transpile(tokens: any[]): string {
    // Basic transpile logic
    // In a full implementation, this would parse tokens into AST
    // and generate JavaScript/HTML/CSS output
    return `// Transpiled from MCLANG\n// Token count: ${tokens.length}`;
  }

  public static fromFile(filePath: string): MCLang {
    const source = fs.readFileSync(filePath, 'utf-8');
    return new MCLang(source);
  }

  public static fromString(source: string): MCLang {
    return new MCLang(source);
  }
}

export { Lexer } from './lexer';
export { Token, TokenType } from './types';
