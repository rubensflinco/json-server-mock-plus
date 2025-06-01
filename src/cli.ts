#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { startServer } from './server.ts';

// Ler package.json dinamicamente
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

const program = new Command();

program
  .name('json-server-mock-plus')
  .description('Crie um servidor REST a partir de um arquivo JSON')
  .version(packageJson.version)
  .requiredOption('-f, --file <path>', 'caminho para o arquivo JSON')
  .option('-p, --port <number>', 'porta do servidor', '3000')
  .option('-h, --host <string>', 'host do servidor', 'localhost')
  .action(async (options) => {
    try {
      console.log(chalk.blue(`[json-server-mock-plus v${packageJson.version}] 🚀 Iniciando servidor...`));
      await startServer(options.file, parseInt(options.port), options.host);
      console.log(chalk.green(`[json-server-mock-plus v${packageJson.version}] ✅ Servidor rodando em http://${options.host}:${options.port}`));
    } catch (error) {
      console.error(chalk.red(`[json-server-mock-plus v${packageJson.version}] ❌ Erro ao iniciar o servidor:`), error);
      process.exit(1);
    }
  });

program.parse(); 