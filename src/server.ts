import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import chalk from 'chalk';

export async function startServer(jsonFilePath: string, port: number, host: string): Promise<void> {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Lê o arquivo JSON
  const jsonData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));
  const { endpoints } = jsonData;

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
      console.log("");
      
      resolve();
    }).on('error', (error) => {
      reject(error);
    });
  });
} 