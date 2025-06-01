import express from 'express';
import cors from 'cors';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import chalk from 'chalk';

interface EndpointConfig {
  [method: string]: {
    data: any;
  };
}

interface JsonData {
  endpoints: Record<string, EndpointConfig>;
}

// Função para ler arquivos JSON recursivamente de uma pasta
function loadJsonFilesFromDirectory(directoryPath: string): JsonData {
  const combinedEndpoints: Record<string, EndpointConfig> = {};

  function readDirectory(currentPath: string, basePath: string = directoryPath): void {
    const items = readdirSync(currentPath);

    for (const item of items) {
      const itemPath = join(currentPath, item);
      const stats = statSync(itemPath);

      if (stats.isDirectory()) {
        // Recursivamente ler subpastas
        readDirectory(itemPath, basePath);
      } else if (stats.isFile() && extname(item) === '.json') {
        try {
          const jsonContent = JSON.parse(readFileSync(itemPath, 'utf-8'));
          const relativePath = relative(basePath, itemPath);
          
          // Se o arquivo tem estrutura de endpoints, usar diretamente
          if (jsonContent.endpoints) {
            Object.assign(combinedEndpoints, jsonContent.endpoints);
          } else {
            // Se não tem estrutura de endpoints, criar endpoint baseado no nome do arquivo
            const endpointName = relativePath
              .replace(/\\/g, '/') // Normalizar separadores de caminho
              .replace(/\.json$/, '') // Remover extensão .json
              .replace(/^\//, ''); // Remover barra inicial se houver

            // Criar endpoint com os dados do arquivo
            combinedEndpoints[endpointName] = {
              GET: {
                data: jsonContent
              }
            };
          }

          console.log(chalk.blue(`📁 Carregado: ${relativePath}`));
        } catch (error) {
          console.warn(chalk.yellow(`⚠️  Erro ao carregar ${itemPath}: ${error}`));
        }
      }
    }
  }

  readDirectory(directoryPath);
  
  return { endpoints: combinedEndpoints };
}

export async function startServer(
  inputPath: string, 
  port: number, 
  host: string, 
  isDirectory: boolean = false
): Promise<void> {
  const app = express();
  app.use(cors());
  app.use(express.json());

  let jsonData: JsonData;

  if (isDirectory) {
    console.log(chalk.blue('📂 Modo pasta: Carregando arquivos JSON recursivamente...'));
    jsonData = loadJsonFilesFromDirectory(inputPath);
  } else {
    console.log(chalk.blue('📄 Modo arquivo: Carregando arquivo JSON único...'));
    jsonData = JSON.parse(readFileSync(inputPath, 'utf-8'));
  }

  const { endpoints } = jsonData;

  // Verifica se existem endpoints
  if (!endpoints || Object.keys(endpoints).length === 0) {
    throw new Error('Nenhum endpoint encontrado. Verifique se os arquivos JSON estão no formato correto.');
  }

  // Cria rotas dinamicamente baseadas no arquivo JSON
  for (const [endpoint, methods] of Object.entries(endpoints)) {
    // Converte o endpoint para o formato do Express
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Configura os métodos HTTP para cada endpoint
    for (const [method, config] of Object.entries(methods as Record<string, { data: any }>)) {
      const { data } = config;

      switch (method.toUpperCase()) {
        case 'GET':
          app.get(path, (req, res) => {
            res.json(data);
          });
          break;

        case 'POST':
          app.post(path, (req, res) => {
            res.json(data);
          });
          break;

        case 'PUT':
          app.put(path, (req, res) => {
            res.json(data);
          });
          break;

        case 'DELETE':
          app.delete(path, (req, res) => {
            res.json(data);
          });
          break;
           
        case 'PATCH':
          app.patch(path, (req, res) => {
            res.json(data);
          });
          break;
           
        case 'OPTIONS':
          app.options(path, (req, res) => {
            res.json(data);
          });
          break;
           
        case 'HEAD':
          app.head(path, (req, res) => {
            res.json(data);
          });
          break;
   
        case 'ALL':
          app.all(path, (req, res) => {
            res.json(data);
          });
          break;
      }
    }
  }

  // Rota padrão
  app.get('/', (req, res) => {
    const availableEndpoints = Object.entries(endpoints).map(([endpoint, methods]) => ({
      endpoint,
      methods: Object.keys(methods as Record<string, any>)
    }));

    res.json({
      message: 'JSON Server Plus está rodando!',
      mode: isDirectory ? 'pasta' : 'arquivo',
      totalEndpoints: availableEndpoints.length,
      endpoints: availableEndpoints
    });
  });

  return new Promise((resolve, reject) => {
    app.listen(port, host, () => {
      console.log(chalk.blue('\n📋 Endpoints disponíveis:'));
      
      Object.entries(endpoints).forEach(([endpoint, methods]) => {
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const availableMethods = Object.keys(methods as Record<string, any>);
        
        availableMethods.forEach(method => {
          console.log(chalk.green(`  [${method}] http://${host}:${port}${path}`));
        });
      });

      console.log(chalk.yellow('\nRota padrão:'));
      console.log(chalk.green(`  [GET] http://${host}:${port}/`));
      console.log(chalk.blue(`\n📊 Total de endpoints: ${Object.keys(endpoints).length}`));
      console.log("");
      
      resolve();
    }).on('error', (error) => {
      reject(error);
    });
  });
} 