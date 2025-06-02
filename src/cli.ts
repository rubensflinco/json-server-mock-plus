#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { startServer } from './server.ts';

// Ler package.json dinamicamente
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

const program = new Command();

program
  .name('json-to-mock-api')
  .description('Crie um servidor REST a partir de um arquivo JSON ou pasta com arquivos JSON')
  .version(packageJson.version)
  .option('-f, --file <path>', 'caminho para o arquivo JSON (modo compatibilidade)')
  .option('-d, --directory <path>', 'caminho para a pasta com arquivos JSON')
  .option('-p, --port <number>', 'porta do servidor', '3000')
  .option('-h, --host <string>', 'host do servidor', 'localhost')
  .action(async (options) => {
    try {
      // Verificar se foi fornecido arquivo ou diretório
      if (!options.file && !options.directory) {
        console.error(chalk.red('❌ Erro: É necessário fornecer um arquivo (-f) ou diretório (-d)'));
        process.exit(1);
      }

      if (options.file && options.directory) {
        console.error(chalk.red('❌ Erro: Forneça apenas um arquivo (-f) OU um diretório (-d), não ambos'));
        process.exit(1);
      }

      const inputPath = options.file || options.directory;
      const isDirectory = !!options.directory;

      console.log(chalk.blue(`[json-to-mock-api v${packageJson.version}] 🚀 Iniciando servidor...`));
      await startServer(inputPath, parseInt(options.port), options.host, isDirectory);
      console.log(chalk.green(`[json-to-mock-api v${packageJson.version}] ✅ Servidor rodando em http://${options.host}:${options.port}`));
    } catch (error) {
      console.error(chalk.red(`[json-to-mock-api v${packageJson.version}] ❌ Erro ao iniciar o servidor:`), error);
      process.exit(1);
    }
  });

program.parse(); 