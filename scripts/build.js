#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import { glob } from 'glob';

// Função para substituir importações .ts por .js
function replaceImports(content) {
  return content.replace(/from\s+['"`](.+)\.ts['"`]/g, "from '$1.js'");
}

// Função para restaurar importações .js para .ts
function restoreImports(content) {
  return content.replace(/from\s+['"`](.+)\.js['"`]/g, "from '$1.ts'");
}

console.log('🔄 Preparando arquivos para build...');

// Limpar pasta de build se existir
if (existsSync('dist')) {
  console.log('🗑️  Removendo pasta dist existente...');
  rmSync('dist', { recursive: true, force: true });
  console.log('✅ Pasta dist removida!');
}

// Encontrar todos os arquivos .ts
const tsFiles = glob.sync('src/**/*.ts');
const backups = new Map();

try {
  // Fazer backup e substituir importações
  tsFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    backups.set(file, content);
    
    const modifiedContent = replaceImports(content);
    if (modifiedContent !== content) {
      writeFileSync(file, modifiedContent, 'utf-8');
      console.log(`✅ Processado: ${file}`);
    }
  });

  console.log('🏗️  Executando build...');
  
  // Executar o build do TypeScript
  execSync('tsc', { stdio: 'inherit' });
  
  console.log('📋 Copiando arquivos da lib...');
  
  // Copiar arquivos necessários para a distribuição
  const filesToCopy = ['README.md', 'LICENSE'];
  
  filesToCopy.forEach(file => {
    if (existsSync(file)) {
      copyFileSync(file, `dist/${file}`);
      console.log(`✅ Copiado: ${file}`);
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${file}`);
    }
  });
  
  // Criar package.json otimizado para distribuição
  console.log('📦 Criando package.json para distribuição...');
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  
  // Remover devDependencies e scripts desnecessários para distribuição
  const distPackageJson = {
    ...packageJson,
    main: 'cli.js',
    bin: {
      "json-to-mock-api": "./cli.js"
    },
    scripts: {
      start: "node cli.js"
    }
  };
  
  // Remover campos que não são necessários na distribuição
  delete distPackageJson.devDependencies;
  delete distPackageJson.scripts.build;
  delete distPackageJson.scripts.dev;
  delete distPackageJson.scripts.test;
  
  writeFileSync('dist/package.json', JSON.stringify(distPackageJson, null, 2), 'utf-8');
  console.log('✅ package.json criado para distribuição');
  
  console.log('✅ Build concluído com sucesso!');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
} finally {
  // Restaurar arquivos originais
  console.log('🔄 Restaurando arquivos originais...');
  backups.forEach((content, file) => {
    writeFileSync(file, content, 'utf-8');
  });
  console.log('✅ Arquivos restaurados!');
} 