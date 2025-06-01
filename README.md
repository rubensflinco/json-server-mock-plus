# JSON Server Mock Plus

Uma biblioteca CLI simples para criar servidores REST a partir de arquivos JSON ou pastas com múltiplos arquivos JSON, com **documentação automática Swagger integrada**.

## ✨ Funcionalidades

- 📋 **Documentação Automática Swagger**: Interface interativa para testar e documentar APIs
- 🔄 **Schemas Inline**: Schemas gerados automaticamente baseados nos dados reais
- 🚀 **Múltiplos Métodos HTTP**: Suporte a GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
- 📁 **Modo Pasta ou Arquivo**: Carregamento de múltiplos arquivos JSON ou arquivo único
- 🌐 **CORS Habilitado**: Pronto para uso em aplicações web
- 🔗 **Parâmetros de Path**: Suporte automático a parâmetros como `:id`, `:userId`, etc.
- 🏷️ **Agrupamento Inteligente**: Endpoints agrupados por pasta ou arquivo de origem

## Instalação

```bash
# Instalação global
npm install -g json-server-mock-plus

# Ou use diretamente com npx
npx --yes json-server-mock-plus
```

## 📚 Documentação Swagger Automática

Ao iniciar o servidor, você terá acesso automático a uma interface Swagger completa:

- **Interface Principal**: `http://localhost:3000/` - Interface Swagger UI interativa
- **Especificação JSON**: `http://localhost:3000/swagger.json` - Especificação OpenAPI 3.0

### 🎯 Benefícios da Documentação Swagger

1. **Interface Interativa**: Teste todos os endpoints diretamente no navegador
2. **Documentação Automática**: Schemas e exemplos gerados automaticamente dos seus dados JSON
3. **Parâmetros de Path**: Detecção automática de parâmetros como `:id`, `:userId`
4. **Agrupamento por Origem**: Endpoints organizados por pasta ou arquivo
5. **Exemplos Reais**: Exemplos baseados nos dados reais dos seus arquivos JSON
6. **Múltiplos Métodos**: Documentação completa para GET, POST, PUT, DELETE, etc.

## Modos de Uso

### Modo Arquivo (Compatibilidade)

Use um único arquivo JSON com todos os endpoints:

```bash
# Usando a instalação global
json-server-mock-plus -f db.json

# Ou usando npx
npx --yes json-server-mock-plus -f db.json
```

### Modo Pasta (Novo!)

Use uma pasta com múltiplos arquivos JSON que serão carregados automaticamente:

```bash
# Usando a instalação global
json-server-mock-plus -d ./data

# Ou usando npx
npx --yes json-server-mock-plus -d ./data
```

## Modo Pasta - Estrutura de Arquivos

No modo pasta, você pode organizar seus endpoints em múltiplos arquivos JSON. Existem duas formas de estruturar os arquivos:

### 1. Arquivos JSON Simples

Cada arquivo JSON será transformado automaticamente em um endpoint GET:

```
data/
├── users.json          # Endpoint: /users (Grupo: users)
├── products.json       # Endpoint: /products (Grupo: products)
├── api/
│   └── orders.json     # Endpoint: /api/orders (Grupo: api)
└── config/
    └── settings.json   # Endpoint: /config/settings (Grupo: config)
```

**Exemplo** - `data/users.json`:
```json
[
  { "id": 1, "name": "João Silva", "email": "joao@email.com" },
  { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
]
```
Resultado: Endpoint `GET /users` retornando esses dados, agrupado como "users" no Swagger.

### 2. Arquivos com Estrutura de Endpoints

Para maior controle, use a estrutura completa com múltiplos métodos HTTP:

**Exemplo** - `data/api/users.json`:
```json
{
  "endpoints": {
    "users": {
      "GET": {
        "data": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com", "age": 30 },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com", "age": 25 }
        ]
      },
      "POST": {
        "data": { "id": 3, "name": "Novo Usuário", "email": "novo@email.com", "age": 28 }
      }
    },
    "users/:id": {
      "GET": {
        "data": { "id": 1, "name": "João Silva", "email": "joao@email.com", "age": 30 }
      },
      "PUT": {
        "data": { "id": 1, "name": "João Silva Atualizado", "email": "joao.novo@email.com", "age": 31 }
      },
      "DELETE": {
        "data": { "message": "Usuário removido com sucesso" }
      }
    },
    "users/:userId/posts": {
      "GET": {
        "data": [
          { "id": 1, "userId": 1, "title": "Primeiro Post", "content": "Conteúdo do primeiro post" }
        ]
      }
    }
  }
}
```

No Swagger, estes endpoints serão agrupados como "users" e cada parâmetro `:id`, `:userId` será automaticamente documentado como parâmetro de path obrigatório.

## Modo Arquivo (Formato Original)

1. Crie um arquivo JSON com seus endpoints. Por exemplo, `db.json`:

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "data": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
        ]
      },
      "POST": {
        "data": { "id": 3, "name": "Novo Usuário", "email": "novo@email.com" }
      }
    },
    "products": {
      "GET": {
        "data": [
          { "id": 1, "name": "Notebook", "price": 3500 },
          { "id": 2, "name": "Smartphone", "price": 2000 }
        ]
      }
    },
    "users/:id": {
      "GET": {
        "data": { "id": 1, "name": "João Silva", "email": "joao@email.com" }
      }
    }
  }
}
```

Por padrão, o servidor será iniciado em `http://localhost:3000` com a documentação Swagger na raiz.

## Opções

- `-f, --file <path>`: Caminho para o arquivo JSON (modo compatibilidade)
- `-d, --directory <path>`: Caminho para a pasta com arquivos JSON (modo pasta)
- `-p, --port <number>`: Porta do servidor (padrão: 3000)
- `-h, --host <string>`: Host do servidor (padrão: localhost)

## Exemplos de Uso do CLI

```bash
# Modo arquivo - Iniciar na porta 8080
npx json-server-mock-plus -f db.json -p 8080
# Acesse: http://localhost:8080/ (Swagger UI)

# Modo pasta - Carregar todos os JSONs de uma pasta
npx json-server-mock-plus -d ./data
# Acesse: http://localhost:3000/ (Swagger UI)

# Modo pasta - Iniciar em um host específico
npx json-server-mock-plus -d ./api-data -h 0.0.0.0 -p 8080
# Acesse: http://0.0.0.0:8080/ (Swagger UI)

# Modo arquivo - Usando um arquivo JSON local com caminho relativo
npx json-server-mock-plus -f ./data/db.json
# Acesse: http://localhost:3000/ (Swagger UI)
```

## 🚀 Vantagens

### Modo Pasta
1. **Organização**: Separe endpoints em arquivos lógicos
2. **Manutenção**: Facilita a manutenção de APIs grandes
3. **Colaboração**: Diferentes desenvolvedores podem trabalhar em endpoints separados
4. **Flexibilidade**: Misture arquivos simples com estruturas complexas
5. **Escalabilidade**: Adicione novos endpoints simplesmente criando novos arquivos

### Documentação Swagger
1. **Teste Interativo**: Teste todos os endpoints diretamente no navegador
2. **Documentação Visual**: Interface moderna e intuitiva
3. **Validação Automática**: Schemas gerados automaticamente
4. **Exemplos Reais**: Baseados nos seus dados JSON reais
5. **Padrão OpenAPI**: Compatível com ferramentas padrão da indústria

## 📋 Endpoints e Documentação

O servidor criará automaticamente:

1. **Endpoints de API**: Baseados nos métodos definidos nos arquivos JSON
2. **Documentação Swagger**: Interface automática em `/`
3. **Especificação OpenAPI**: JSON disponível em `/swagger.json`

### Parâmetros Dinâmicos

Você pode criar rotas com parâmetros dinâmicos usando a sintaxe `:parametro`. Estes são automaticamente detectados e documentados no Swagger:

```json
{
  "endpoints": {
    "users/:id": {
      "GET": {
        "data": { "id": 1, "name": "João", "email": "joao@email.com" }
      }
    },
    "users/:userId/posts/:postId": {
      "GET": {
        "data": { "id": 1, "userId": 1, "title": "Post", "content": "Conteúdo" }
      }
    }
  }
}
```

No Swagger, você verá:
- `users/{id}` com parâmetro `id` (integer, obrigatório)
- `users/{userId}/posts/{postId}` com parâmetros `userId` e `postId` (integer, obrigatório)

Métodos HTTP suportados:
- GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, ALL

## 📊 Estrutura do JSON

### Modo Arquivo

O arquivo JSON deve seguir a seguinte estrutura:

```json
{
  "endpoints": {
    "nome-do-endpoint": {
      "METODO_HTTP": {
        "data": {
          // Seus dados aqui
        }
      }
    },
    "nome-do-endpoint/:parametro": {
      "METODO_HTTP": {
        "data": {
          // Dados para endpoints com parâmetros
        }
      }
    }
  }
}
```

### Modo Pasta

No modo pasta, cada arquivo pode ser:

1. **JSON Simples** (cria endpoint GET automaticamente):
```json
[
  { "id": 1, "data": "exemplo" }
]
```

2. **JSON com estrutura de endpoints** (controle total):
```json
{
  "endpoints": {
    "endpoint-name": {
      "GET": { "data": [...] },
      "POST": { "data": {...} }
    }
  }
}
```

## 🎯 Interface Swagger

Ao acessar a raiz do servidor (`http://localhost:3000/`), você encontrará:

- **Lista de Endpoints**: Todos os endpoints organizados por grupos
- **Métodos HTTP**: Cada método com sua documentação específica
- **Parâmetros**: Parâmetros de path automaticamente detectados
- **Schemas**: Estruturas de dados com exemplos reais
- **Try it out**: Botões para testar cada endpoint diretamente
- **Request/Response**: Exemplos de requisição e resposta

## Licença

MIT 