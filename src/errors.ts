export class MocaError extends Error {
  public readonly code: string;
  public readonly line: number;
  public readonly column: number;
  public readonly hint?: string;

  constructor(message: string, code: string, line: number, column: number, hint?: string) {
    super(`[MocaError ${code}] ${message} (baris ${line}, kolom ${column})${hint ? `\nTips Moca: ${hint}` : ''}`);
    this.name = 'MocaError';
    this.code = code;
    this.line = line;
    this.column = column;
    this.hint = hint;
  }
}
