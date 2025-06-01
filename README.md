# JSON Server Mock Plus

Uma biblioteca CLI simples para criar servidores REST a partir de arquivos JSON ou pastas com múltiplos arquivos JSON, com **documentação automática Swagger integrada**.

## ✨ Funcionalidades

- 📋 **Documentação Automática Swagger**: Interface interativa para testar e documentar APIs
- 🔧 **Headers Mockados**: Suporte a headers customizados de resposta para simulações realistas
- 🍪 **Cookies Mockados**: Suporte a cookies customizados de resposta com opções avançadas
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
        "body": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com", "age": 30 },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com", "age": 25 }
        ]
      },
      "POST": {
        "body": { "id": 3, "name": "Novo Usuário", "email": "novo@email.com", "age": 28 }
      }
    },
    "users/:id": {
      "GET": {
        "body": { "id": 1, "name": "João Silva", "email": "joao@email.com", "age": 30 }
      },
      "PUT": {
        "body": { "id": 1, "name": "João Silva Atualizado", "email": "joao.novo@email.com", "age": 31 }
      },
      "DELETE": {
        "body": { "message": "Usuário removido com sucesso" }
      }
    },
    "users/:userId/posts": {
      "GET": {
        "body": [
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
        "body": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
        ]
      },
      "POST": {
        "body": { "id": 3, "name": "Novo Usuário", "email": "novo@email.com" }
      }
    },
    "products": {
      "GET": {
        "body": [
          { "id": 1, "name": "Notebook", "price": 3500 },
          { "id": 2, "name": "Smartphone", "price": 2000 }
        ]
      }
    },
    "users/:id": {
      "GET": {
        "body": { "id": 1, "name": "João Silva", "email": "joao@email.com" }
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
        "body": { "id": 1, "name": "João", "email": "joao@email.com" }
      }
    },
    "users/:userId/posts/:postId": {
      "GET": {
        "body": { "id": 1, "userId": 1, "title": "Post", "content": "Conteúdo" }
      }
    }
  }
}
```

No Swagger, você verá:
- `users/{id}` com parâmetro `id` (integer, obrigatório)
- `users/{userId}/posts/{postId}` com parâmetros `userId` e `postId` (integer, obrigatório)

### 🔧 Headers Mockados

**NOVO!** Agora você pode definir headers personalizados que serão enviados como cabeçalhos de resposta em seus endpoints. Esta funcionalidade é útil para simular APIs reais que retornam headers específicos.

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
        ],
        "headers": {
          "X-Total-Count": "2",
          "X-API-Version": "1.0",
          "Cache-Control": "max-age=3600",
          "X-Custom-Header": "valor-personalizado"
        }
      },
      "POST": {
        "body": { "id": 3, "name": "Novo Usuário", "email": "novo@email.com" },
        "headers": {
          "X-Created-At": "2024-01-15T10:30:00Z",
          "Location": "/users/3",
          "X-Rate-Limit": "100"
        }
      }
    },
    "products/:id": {
      "GET": {
        "body": { "id": 1, "name": "Produto", "price": 99.99 },
        "headers": {
          "X-Product-Version": "2.1",
          "ETag": "\"abc123\"",
          "Last-Modified": "Wed, 15 Jan 2024 10:30:00 GMT"
        }
      }
    }
  }
}
```

#### Características dos Headers Mockados:

- **Flexibilidade Total**: Defina qualquer header HTTP personalizado
- **Documentação Automática**: Headers aparecem automaticamente na documentação Swagger
- **Simulação Realista**: Simule headers comuns como `X-Total-Count`, `Location`, `ETag`, etc.
- **Por Método**: Cada método HTTP pode ter seus próprios headers específicos
- **Opcional**: Headers são opcionais - endpoints funcionam normalmente sem eles

#### Exemplos de Headers Úteis:

- **Paginação**: `X-Total-Count`, `X-Page`, `X-Per-Page`
- **Versionamento**: `X-API-Version`, `X-Product-Version`
- **Cache**: `Cache-Control`, `ETag`, `Last-Modified`
- **Rate Limiting**: `X-Rate-Limit`, `X-Rate-Remaining`
- **Localização**: `Location` (para recursos criados)
- **Timestamps**: `X-Created-At`, `X-Updated-At`
- **Ambiente**: `X-Environment`, `X-Test-Mode`

Métodos HTTP suportados:
- GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, ALL

### 🍪 Cookies Mockados

**NOVO!** Agora você pode definir cookies personalizados que serão enviados como cookies de resposta em seus endpoints. Esta funcionalidade é perfeita para simular autenticação, preferências do usuário, sessões e muito mais.

```json
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": {
          "message": "Login realizado com sucesso",
          "user": { "id": 1, "name": "João Silva" }
        },
        "headers": {
          "X-Auth-Status": "success"
        },
        "cookies": {
          "session_id": {
            "value": "sess_abc123def456",
            "options": {
              "httpOnly": true,
              "secure": true,
              "sameSite": "strict",
              "maxAge": 3600000,
              "path": "/"
            }
          },
          "auth_token": {
            "value": "jwt_token_here",
            "options": {
              "httpOnly": true,
              "secure": true,
              "maxAge": 86400000
            }
          },
          "user_id": "1",
          "last_login": "2024-01-15T10:30:00Z"
        }
      }
    },
    "preferences": {
      "GET": {
        "body": {
          "theme": "dark",
          "language": "pt-BR"
        },
        "cookies": {
          "theme": "dark",
          "language": "pt-BR",
          "preferences_version": {
            "value": "1.2",
            "options": {
              "maxAge": 31536000000,
              "sameSite": "lax"
            }
          }
        }
      }
    }
  }
}
```

#### Características dos Cookies Mockados:

- **Cookies Simples**: Defina apenas o valor como string
- **Cookies Avançados**: Use objeto com `value` e `options` para controle total
- **Opções Completas**: Suporte a todas as opções do Express.js (`httpOnly`, `secure`, `sameSite`, `maxAge`, `path`, `domain`)
- **Documentação Automática**: Cookies aparecem automaticamente na documentação Swagger
- **Simulação Realista**: Perfeito para testar autenticação, sessões, preferências, etc.
- **Por Método**: Cada método HTTP pode ter seus próprios cookies específicos
- **Opcional**: Cookies são opcionais - endpoints funcionam normalmente sem eles

#### Formatos Suportados:

**1. Cookie Simples (apenas valor):**
```json
"cookies": {
  "simple_cookie": "valor_do_cookie"
}
```

**2. Cookie com Opções:**
```json
"cookies": {
  "advanced_cookie": {
    "value": "valor_do_cookie",
    "options": {
      "httpOnly": true,
      "secure": true,
      "sameSite": "strict",
      "maxAge": 3600000,
      "path": "/",
      "domain": ".exemplo.com"
    }
  }
}
```

#### Opções de Cookie Disponíveis:

- **`httpOnly`**: Torna o cookie acessível apenas via HTTP (não JavaScript)
- **`secure`**: Cookie só é enviado via HTTPS
- **`sameSite`**: Controla quando o cookie é enviado (`strict`, `lax`, `none`)
- **`maxAge`**: Duração do cookie em milissegundos
- **`path`**: Caminho onde o cookie é válido
- **`domain`**: Domínio onde o cookie é válido
- **`expires`**: Data de expiração específica

#### Exemplos de Uso Prático:

- **Autenticação**: `session_id`, `auth_token`, `refresh_token`
- **Preferências**: `theme`, `language`, `timezone`
- **Carrinho de Compras**: `cart_id`, `items_count`, `currency`
- **Analytics**: `visitor_id`, `utm_source`, `session_start`
- **Consentimento**: `cookie_consent`, `marketing_consent`, `analytics_consent`
- **Configurações**: `layout_mode`, `notifications_enabled`

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
        "body": {
          // Seus dados aqui
        },
        "headers": {
          // Headers de resposta opcionais
          "X-Custom-Header": "valor",
          "Cache-Control": "max-age=3600"
        },
        "cookies": {
          // Cookies de resposta opcionais
          "simple_cookie": "valor",
          "advanced_cookie": {
            "value": "valor_com_opcoes",
            "options": {
              "httpOnly": true,
              "maxAge": 3600000
            }
          }
        }
      }
    },
    "nome-do-endpoint/:parametro": {
      "METODO_HTTP": {
        "body": {
          // Dados para endpoints com parâmetros
        },
        "headers": {
          // Headers específicos para este endpoint
          "X-Param-Type": "dynamic"
        },
        "cookies": {
          // Cookies específicos para este endpoint
          "param_cookie": "dynamic_value"
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
  { "id": 1, "body": "exemplo" }
]
```
*Headers não são suportados em arquivos JSON simples - use a estrutura completa se precisar de headers*
*Cookies não são suportados em arquivos JSON simples - use a estrutura completa se precisar de cookies*

2. **JSON com estrutura de endpoints** (controle total):
```json
{
  "endpoints": {
    "endpoint-name": {
      "GET": { 
        "body": [...],
        "headers": {
          "X-Method": "GET",
          "Cache-Control": "public, max-age=300"
        },
        "cookies": {
          "viewed_endpoint": "endpoint-name",
          "visit_count": {
            "value": "1",
            "options": {
              "maxAge": 86400000
            }
          }
        }
      },
      "POST": { 
        "body": {...},
        "headers": {
          "X-Method": "POST",
          "Location": "/endpoint-name/1"
        },
        "cookies": {
          "last_action": "create",
          "csrf_token": {
            "value": "abc123",
            "options": {
              "httpOnly": true,
              "sameSite": "strict"
            }
          }
        }
      }
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