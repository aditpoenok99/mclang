#!/usr/bin/env node

/**
 * MCLANG CLI
 */

import { Command } from 'commander';
import * as fs from 'fs';
import { MCLang } from './index';

const program = new Command();

program
  .name('mclang')
  .description('Mocasus Lang (MCLANG) - Modern programming language for web frontend')
  .version('1.1.0');

program
  .command('compile <file>')
  .description('Compile MCLANG file to JavaScript')
  .option('-o, --output <file>', 'Output file path')
  .action((file: string, options: any) => {
    try {
      if (!fs.existsSync(file)) {
        console.error(`Error: File not found: ${file}`);
        process.exit(1);
      }

      const mclang = MCLang.fromFile(file);
      const output = mclang.compile();

      const outputFile = options.output || file.replace(/\.mc$/, '.js');
      fs.writeFileSync(outputFile, output, 'utf-8');
      console.log(`✓ Compiled ${file} to ${outputFile}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('watch <directory>')
  .description('Watch directory for changes and compile')
  .action((directory: string) => {
    console.log(`Watching ${directory} for changes...`);
  });

program
  .command('init <project>')
  .description('Initialize a new MCLANG project')
  .action((project: string) => {
    console.log(`Initializing MCLANG project: ${project}`);
  });

program
  .command('build')
  .description('Build entire project')
  .action(() => {
    console.log('Building project...');
  });

program
  .command('dev')
  .description('Start development server')
  .action(() => {
    console.log('Starting development server...');
  });

program.parse(process.argv);
