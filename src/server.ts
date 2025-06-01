import express from 'express';
import cors from 'cors';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import chalk from 'chalk';
import swaggerUi from 'swagger-ui-express';

// Ler package.json dinamicamente
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

interface EndpointConfig {
  [method: string]: {
    body: any;
  };
}

interface JsonData {
  endpoints: Record<string, EndpointConfig>;
  endpointsInfo: Record<string, EndpointInfo>;
}

interface EndpointInfo {
  config: EndpointConfig;
  source: string; // Nome da pasta ou arquivo de origem
}

// Função para gerar schema Swagger baseado nos dados (inline)
function generateInlineSchema(data: any): any {
  if (data === null) return { type: 'null' };
  if (data === undefined) return { type: 'string' };

  switch (typeof data) {
    case 'string':
      return { type: 'string', example: data };
    case 'number':
      return Number.isInteger(data) 
        ? { type: 'integer', example: data }
        : { type: 'number', example: data };
    case 'boolean':
      return { type: 'boolean', example: data };
    case 'object':
      if (Array.isArray(data)) {
        if (data.length === 0) {
          return { type: 'array', items: { type: 'object' }, example: [] };
        }
        const itemSchema = generateInlineSchema(data[0]);
        return {
          type: 'array',
          items: itemSchema,
          example: data.slice(0, 2) // Mostrar apenas 2 exemplos no Swagger
        };
      } else {
        const properties: any = {};
        const required: string[] = [];
        
        for (const [key, value] of Object.entries(data)) {
          if (value !== null && value !== undefined) {
            properties[key] = generateInlineSchema(value);
            required.push(key);
          }
        }
        
        return {
          type: 'object',
          properties,
          required,
          example: data
        };
      }
    default:
      return { type: 'string', example: String(data) };
  }
}

// Função para gerar documentação Swagger automaticamente
function generateSwaggerDocumentation(endpointsInfo: Record<string, EndpointInfo>, host: string, port: number): any {
  const paths: any = {};

  for (const [endpoint, info] of Object.entries(endpointsInfo)) {
    const { config: methods, source } = info;
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Converter parâmetros do Express (:id) para formato OpenAPI ({id})
    const swaggerPath = path.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, '{$1}');
    
    // Detectar parâmetros de path
    const pathParams = [];
    const paramMatches = path.match(/:([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (paramMatches) {
      for (const param of paramMatches) {
        const paramName = param.substring(1); // Remove o ':'
        pathParams.push({
          name: paramName,
          in: 'path',
          required: true,
          description: `ID do ${paramName === 'id' ? 'recurso' : paramName}`,
          schema: {
            type: paramName.toLowerCase().includes('id') ? 'integer' : 'string',
            example: paramName.toLowerCase().includes('id') ? 1 : `exemplo_${paramName}`
          }
        });
      }
    }

    if (!paths[swaggerPath]) {
      paths[swaggerPath] = {};
    }

    for (const [method, config] of Object.entries(methods)) {
      const { body } = config;
      const methodLower = method.toLowerCase();

      // Configurar a documentação do endpoint
      const endpointDoc: any = {
        tags: [source], // Usar o nome da pasta/arquivo como tag
        summary: `${method} ${endpoint}`,
        description: `Endpoint ${method} para ${endpoint}. Retorna dados mockados baseados no arquivo JSON.`,
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: Array.isArray(body) ? {
                  type: 'array',
                  items: generateInlineSchema(body[0] || {}),
                  example: body
                } : generateInlineSchema(body || {})
              }
            }
          },
          404: {
            description: 'Endpoint não encontrado'
          },
          500: {
            description: 'Erro interno do servidor'
          }
        }
      };

      // Adicionar parâmetros de path se existirem
      if (pathParams.length > 0) {
        endpointDoc.parameters = pathParams;
      }

      // Adicionar parâmetros de body para métodos que aceitam
      if (['post', 'put', 'patch'].includes(methodLower)) {
        endpointDoc.requestBody = {
          description: 'Dados a serem enviados',
          required: methodLower === 'post',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                additionalProperties: true,
                example: Array.isArray(body) && body.length > 0 ? body[0] : body
              }
            }
          }
        };
      }

      paths[swaggerPath][methodLower] = endpointDoc;
    }
  }

  // Gerar tags baseadas nas fontes únicas
  const uniqueSources = Array.from(new Set(Object.values(endpointsInfo).map(info => info.source)));
  const tags = uniqueSources.map(source => ({
    name: source,
    description: `Endpoints do ${source}`
  }));

  return {
    openapi: '3.0.0',
    info: {
      title: 'JSON Server Mock Plus API',
      version: packageJson.version,
      description: `
Esta é a documentação automática gerada para todos os endpoints disponíveis no JSON Server Mock Plus.

## Como Usar

Cada endpoint listado abaixo pode ser testado diretamente através desta interface Swagger.
Os dados retornados são baseados nos arquivos JSON configurados.

### Parâmetros Suportados

- **Path Parameters**: \`:id\`, \`:userId\`, etc. são automaticamente detectados
- **Request Body**: Para POST, PUT e PATCH requests

Desenvolvido com ❤️ usando JSON Server Mock Plus v${packageJson.version}
      `,
      contact: {
        name: 'JSON Server Mock Plus',
        url: 'https://github.com/rubensflinco/json-server-mock-plus'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://${host}:${port}`,
        description: 'Servidor de desenvolvimento'
      }
    ],
    paths,
    tags
  };
}

// Função para ler arquivos JSON recursivamente de uma pasta
function loadJsonFilesFromDirectory(directoryPath: string): { endpoints: Record<string, EndpointConfig>, endpointsInfo: Record<string, EndpointInfo> } {
  const combinedEndpoints: Record<string, EndpointConfig> = {};
  const endpointsInfo: Record<string, EndpointInfo> = {};

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
          
          // Determinar o nome da fonte (pasta ou arquivo)
          const pathParts = relativePath.replace(/\\/g, '/').split('/');
          const fileName = pathParts[pathParts.length - 1].replace(/\.json$/, '');
          const folderName = pathParts.length > 1 ? pathParts[pathParts.length - 2] : fileName;
          
          // Se o arquivo tem estrutura de endpoints, usar diretamente
          if (jsonContent.endpoints) {
            for (const [endpoint, methods] of Object.entries(jsonContent.endpoints)) {
              combinedEndpoints[endpoint] = methods as EndpointConfig;
              endpointsInfo[endpoint] = {
                config: methods as EndpointConfig,
                source: Object.keys(jsonContent.endpoints).length > 1 ? fileName : folderName
              };
            }
          } else {
            // Se não tem estrutura de endpoints, criar endpoint baseado no nome do arquivo
            const endpointName = relativePath
              .replace(/\\/g, '/') // Normalizar separadores de caminho
              .replace(/\.json$/, '') // Remover extensão .json
              .replace(/^\//, ''); // Remover barra inicial se houver

            // Criar endpoint com os dados do arquivo
            combinedEndpoints[endpointName] = {
              GET: {
                body: jsonContent
              }
            };
            
            endpointsInfo[endpointName] = {
              config: {
                GET: {
                  body: jsonContent
                }
              },
              source: folderName
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
  
  return { endpoints: combinedEndpoints, endpointsInfo };
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
    const fileContent = JSON.parse(readFileSync(inputPath, 'utf-8'));
    const fileName = inputPath.split(/[\/\\]/).pop()?.replace(/\.json$/, '') || 'arquivo';
    
    jsonData = {
      endpoints: fileContent.endpoints || { [fileName]: { GET: { body: fileContent } } },
      endpointsInfo: {}
    };
    
    // Criar endpointsInfo para arquivo único
    for (const [endpoint, methods] of Object.entries(jsonData.endpoints)) {
      jsonData.endpointsInfo[endpoint] = {
        config: methods,
        source: fileName
      };
    }
  }

  const { endpoints } = jsonData;

  // Verifica se existem endpoints
  if (!endpoints || Object.keys(endpoints).length === 0) {
    throw new Error('Nenhum endpoint encontrado. Verifique se os arquivos JSON estão no formato correto.');
  }

  // Gerar documentação Swagger automaticamente
  console.log(chalk.blue('📚 Gerando documentação Swagger automaticamente...'));
  const swaggerSpec = generateSwaggerDocumentation(jsonData.endpointsInfo, host, port);

  // Configurar Swagger UI no endpoint raiz
  app.use('/', swaggerUi.serve);
  app.get('/', swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'JSON Server Mock Plus v' + packageJson.version + ' - Documentação API',
    customfavIcon: 'https://swagger.io/swagger-ui/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info .title { color: #3b82f6; }
      .swagger-ui .scheme-container { background: #f8fafc; padding: 15px; border-radius: 5px; }
    `,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestHeaders: true,
      tryItOutEnabled: true
    }
  }));

  // Endpoint para obter a especificação Swagger em JSON
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });

  // Cria rotas dinamicamente baseadas no arquivo JSON
  for (const [endpoint, methods] of Object.entries(endpoints)) {
    // Converte o endpoint para o formato do Express
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Configura os métodos HTTP para cada endpoint
    for (const [method, config] of Object.entries(methods as Record<string, { body: any }>)) {
      const { body } = config;

      switch (method.toUpperCase()) {
        case 'GET':
          app.get(path, (req, res) => {
            res.json(body);
          });
          break;

        case 'POST':
          app.post(path, (req, res) => {
            res.json(body);
          });
          break;

        case 'PUT':
          app.put(path, (req, res) => {
            res.json(body);
          });
          break;

        case 'DELETE':
          app.delete(path, (req, res) => {
            res.json(body);
          });
          break;
           
        case 'PATCH':
          app.patch(path, (req, res) => {
            res.json(body);
          });
          break;
           
        case 'OPTIONS':
          app.options(path, (req, res) => {
            res.json(body);
          });
          break;
           
        case 'HEAD':
          app.head(path, (req, res) => {
            res.json(body);
          });
          break;
   
        case 'ALL':
          app.all(path, (req, res) => {
            res.json(body);
          });
          break;
      }
    }
  }

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

      console.log(chalk.yellow('\n📚 Documentação Swagger:'));
      console.log(chalk.green(`  [GET] http://${host}:${port}/ (Interface Swagger UI)`));
      console.log(chalk.green(`  [GET] http://${host}:${port}/swagger.json (Especificação JSON)`));
      
      console.log(chalk.blue(`\n📊 Total de endpoints: ${Object.keys(endpoints).length}`));
      console.log(chalk.magenta('🎉 Documentação automática gerada com sucesso!'));
      console.log("");
      
      resolve();
    }).on('error', (error) => {
      reject(error);
    });
  });
} 