#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { MCLang } from './index';

const VERSION = '1.3.0';
const program = new Command();

program.name('mclang').description('Mocasus Lang CLI').version(VERSION);

const assertFile = (file: string): string => {
  const resolved = path.resolve(file);
  if (!fs.existsSync(resolved)) {
    console.error(`[MocaError CLI001] File tidak ditemukan: ${resolved}`);
    process.exit(1);
  }
  return resolved;
};

program
  .command('run <file>')
  .description('Menjalankan file .mc langsung (interpreter + module system)')
  .action((file: string) => {
    try {
      const entry = assertFile(file);
      const result = MCLang.runFile(entry);
      if (result !== null && result !== undefined) {
        console.log(result);
      }
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  });

program
  .command('check <file>')
  .description('Cek lexer + parser + graph module')
  .action((file: string) => {
    try {
      const entry = assertFile(file);
      const report = MCLang.checkFile(entry);
      console.log(`✓ valid | modules=${report.modules} tokens=${report.tokenCount} statements=${report.statementCount}`);
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  });

program
  .command('compile <file>')
  .description('Compile entry .mc ke JavaScript (entry file)')
  .option('-o, --output <file>', 'Output JS file path')
  .action((file: string, options: any) => {
    try {
      const entry = assertFile(file);
      const js = MCLang.compileFile(entry);
      const output = options.output || entry.replace(/\.mc$/, '.js');
      fs.writeFileSync(output, js, 'utf-8');
      console.log(`✓ Compiled ${entry} -> ${output}`);
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  });

program
  .command('repl')
  .description('REPL Moca interaktif')
  .action(() => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'moca> ' });
    console.log('Moca REPL v1.3.0 | ketik :q untuk keluar');
    rl.prompt();
    rl.on('line', (line) => {
      const txt = line.trim();
      if (txt === ':q') {
        rl.close();
        return;
      }
      try {
        const result = MCLang.fromString(txt).run();
        if (result !== null && result !== undefined) console.log(result);
      } catch (error: any) {
        console.error(error.message);
      }
      rl.prompt();
    });
  });

const mocaPm = program.command('moca').description('Package manager sederhana untuk proyek Moca');

const projectFile = (cwd: string) => path.join(cwd, 'moca.json');

const loadProject = (cwd: string): any => {
  const p = projectFile(cwd);
  if (!fs.existsSync(p)) {
    throw new Error('[MocaError PM001] moca.json belum ada. Jalankan `mclang moca init` dulu.');
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
};

const saveProject = (cwd: string, data: any): void => {
  fs.writeFileSync(projectFile(cwd), JSON.stringify(data, null, 2), 'utf-8');
};

mocaPm.command('init').description('Inisialisasi moca.json').action(() => {
  const cwd = process.cwd();
  const p = projectFile(cwd);
  if (fs.existsSync(p)) {
    console.log('moca.json sudah ada.');
    return;
  }
  saveProject(cwd, { name: path.basename(cwd), version: '0.1.0', dependencies: {} });
  console.log('✓ moca.json dibuat');
});

mocaPm.command('add <pkg> [version]').description('Tambah dependency ke moca.json').action((pkg: string, version?: string) => {
  const cwd = process.cwd();
  const data = loadProject(cwd);
  data.dependencies = data.dependencies || {};
  data.dependencies[pkg] = version || 'latest';
  saveProject(cwd, data);
  console.log(`✓ Added ${pkg}@${data.dependencies[pkg]}`);
});

mocaPm.command('remove <pkg>').description('Hapus dependency dari moca.json').action((pkg: string) => {
  const cwd = process.cwd();
  const data = loadProject(cwd);
  if (!data.dependencies || !data.dependencies[pkg]) {
    console.log(`Dependency '${pkg}' tidak ditemukan.`);
    return;
  }
  delete data.dependencies[pkg];
  saveProject(cwd, data);
  console.log(`✓ Removed ${pkg}`);
});

mocaPm.command('list').description('Lihat dependency Moca').action(() => {
  const cwd = process.cwd();
  const data = loadProject(cwd);
  const deps = data.dependencies || {};
  const entries = Object.entries(deps);
  if (entries.length === 0) {
    console.log('(kosong) belum ada dependency.');
    return;
  }
  entries.forEach(([name, version]) => console.log(`${name}@${version}`));
});

program.parse(process.argv);
