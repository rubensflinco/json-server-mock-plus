# JSON Server Mock Plus

Uma biblioteca CLI simples para criar servidores REST a partir de arquivos JSON ou pastas com múltiplos arquivos JSON.

## Instalação

```bash
# Instalação global
npm install -g json-server-mock-plus

# Ou use diretamente com npx
npx --yes json-server-mock-plus
```

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
├── users.json          # Endpoint: /users
├── products.json       # Endpoint: /products
├── api/
│   └── orders.json     # Endpoint: /api/orders
└── config/
    └── settings.json   # Endpoint: /config/settings
```

**Exemplo** - `data/users.json`:
```json
[
  { "id": 1, "name": "João Silva", "email": "joao@email.com" },
  { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
]
```
Resultado: Endpoint `GET /users` retornando esses dados.

### 2. Arquivos com Estrutura de Endpoints

Para maior controle, use a estrutura completa com múltiplos métodos HTTP:

**Exemplo** - `data/api/orders.json`:
```json
{
  "endpoints": {
    "orders": {
      "GET": {
        "data": [
          { "id": 1, "userId": 1, "total": 3500, "status": "pendente" }
        ]
      },
      "POST": {
        "data": { "id": 3, "userId": 1, "total": 800, "status": "criado" }
      }
    },
    "orders/:id": {
      "GET": {
        "data": { "id": 1, "userId": 1, "total": 3500, "status": "pendente" }
      }
    }
  }
}
```

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
        "data": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" }
        ]
      },
      "PUT": {
        "data": [
          { "id": 1, "name": "João Silva Atualizado", "email": "joao.novo@email.com" }
        ]
      },
      "DELETE": {
        "data": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" }
        ]
      }
    },
    "products": {
      "GET": {
        "data": [
          { "id": 1, "name": "Notebook", "price": 3500 },
          { "id": 2, "name": "Smartphone", "price": 2000 }
        ]
      },
      "POST": {
        "data": [
          { "id": 1, "name": "Notebook", "price": 3500 }
        ]
      }
    },
    "users/:id": {
      "GET": {
        "data": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
        ]
      }
    }
  }
}
```

Por padrão, o servidor será iniciado em `http://localhost:3000`.

## Opções

- `-f, --file <path>`: Caminho para o arquivo JSON (modo compatibilidade)
- `-d, --directory <path>`: Caminho para a pasta com arquivos JSON (modo pasta)
- `-p, --port <number>`: Porta do servidor (padrão: 3000)
- `-h, --host <string>`: Host do servidor (padrão: localhost)

## Exemplos de Uso do CLI

```bash
# Modo arquivo - Iniciar na porta 8080
npx json-server-mock-plus -f db.json -p 8080

# Modo pasta - Carregar todos os JSONs de uma pasta
npx json-server-mock-plus -d ./data

# Modo pasta - Iniciar em um host específico
npx json-server-mock-plus -d ./api-data -h 0.0.0.0 -p 8080

# Modo arquivo - Usando um arquivo JSON local com caminho relativo
npx json-server-mock-plus -f ./data/db.json
```

## Vantagens do Modo Pasta

1. **Organização**: Separe endpoints em arquivos lógicos
2. **Manutenção**: Facilita a manutenção de APIs grandes
3. **Colaboração**: Diferentes desenvolvedores podem trabalhar em endpoints separados
4. **Flexibilidade**: Misture arquivos simples com estruturas complexas
5. **Escalabilidade**: Adicione novos endpoints simplesmente criando novos arquivos

## Endpoints

O servidor criará automaticamente endpoints baseados nos métodos definidos nos arquivos JSON. Cada endpoint pode ter diferentes métodos HTTP com seus próprios dados.

### Parâmetros Dinâmicos

Você pode criar rotas com parâmetros dinâmicos usando a sintaxe `:parametro`. Por exemplo:

```json
{
  "endpoints": {
    "users/:id": {
      "GET": {
        "data": [
          { "id": 1, "name": "João" },
          { "id": 2, "name": "Maria" }
        ]
      }
    }
  }
}
```

Neste caso:
- `/users/1` retornará o usuário com id 1
- `/users/2` retornará o usuário com id 2
- `/users/999` retornará `{ error: 'Item não encontrado' }`

Métodos HTTP suportados:
- GET
- POST
- PUT
- DELETE
- PATCH
- OPTIONS
- HEAD
- ALL

## Estrutura do JSON

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
        "data": [
          // Array de dados para busca por parâmetro
        ]
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

## Licença

MIT 