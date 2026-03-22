export type MocaValue = string | number | boolean | null | undefined;
export type MocaFunction = (...args: MocaValue[]) => MocaValue;

export interface Stdlib {
  [name: string]: MocaValue | MocaFunction;
}

export const createStdlib = (): Stdlib => ({
  tampil: (...args: MocaValue[]) => {
    console.log(...args);
    return null;
  },
  print: (...args: MocaValue[]) => {
    console.log(...args);
    return null;
  },
  panjang: (value: MocaValue) => {
    if (typeof value === 'string') return value.length;
    return 0;
  },
  tipe: (value: MocaValue) => typeof value,
  angka: (value: MocaValue) => Number(value),
  teks: (value: MocaValue) => String(value),
});
