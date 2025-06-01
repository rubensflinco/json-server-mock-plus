#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { startServer } from './server.ts';

const program = new Command();

program
  .name('json-server-plus')
  .description('Crie um servidor REST a partir de um arquivo JSON')
  .version('1.0.0')
  .requiredOption('-f, --file <path>', 'caminho para o arquivo JSON')
  .option('-p, --port <number>', 'porta do servidor', '3000')
  .option('-h, --host <string>', 'host do servidor', 'localhost')
  .action(async (options) => {
    try {
      console.log(chalk.blue('[json-server-plus] 🚀 Iniciando servidor...'));
      await startServer(options.file, parseInt(options.port), options.host);
      console.log(chalk.green(`[json-server-plus] ✅ Servidor rodando em http://${options.host}:${options.port}`));
    } catch (error) {
      console.error(chalk.red('[json-server-plus] ❌ Erro ao iniciar o servidor:'), error);
      process.exit(1);
    }
  });

program.parse(); 