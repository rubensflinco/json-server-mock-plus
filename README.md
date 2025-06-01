# JSON Server Mock Plus

Uma biblioteca CLI simples para criar servidores REST a partir de arquivos JSON.

## Instalação

```bash
# Instalação global
npm install -g json-server-mock-plus

# Ou use diretamente com npx
npx --yes json-server-mock-plus
```

## Uso

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

2. Execute o servidor:

```bash
# Usando a instalação global
json-server-mock-plus -f db.json

# Ou usando npx
npx --yes json-server-mock-plus -f db.json
```

Por padrão, o servidor será iniciado em `http://localhost:3000`.

## Opções

- `-f, --file <path>`: Caminho para o arquivo JSON (obrigatório)
- `-p, --port <number>`: Porta do servidor (padrão: 3000)
- `-h, --host <string>`: Host do servidor (padrão: localhost)

## Exemplos de Uso do CLI

```bash
# Iniciar na porta 8080
npx json-server-mock-plus -f db.json -p 8080

# Iniciar em um host específico
npx json-server-mock-plus -f db.json -h 0.0.0.0

# Usando um arquivo JSON remoto
npx json-server-mock-plus -f https://raw.githubusercontent.com/seu-usuario/seu-repo/main/db.json

# Usando um arquivo JSON local com caminho relativo
npx json-server-mock-plus -f ./data/db.json
```

## Endpoints

O servidor criará automaticamente endpoints baseados nos métodos definidos no arquivo JSON. Cada endpoint pode ter diferentes métodos HTTP com seus próprios dados.

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

## Licença

MIT 