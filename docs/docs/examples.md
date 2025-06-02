# Exemplos Práticos

Esta seção contém exemplos completos e casos de uso reais do JSON Server Mock Plus.

## 🚀 Exemplos Básicos

### 1. API Simples de Usuários

```json title="users-simple.json"
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
    }
  }
}
```

**Uso:**
```bash
json-server-mock-plus -f users-simple.json
```

**Endpoints disponíveis:**
- `GET /users` - Lista usuários
- `POST /users` - Cria usuário

### 2. API com Parâmetros

```json title="users-params.json"
{
  "endpoints": {
    "users/:id": {
      "GET": {
        "body": { "id": 1, "name": "João Silva", "email": "joao@email.com" }
      },
      "PUT": {
        "body": { "id": 1, "name": "João Silva Atualizado", "email": "joao.novo@email.com" }
      },
      "DELETE": {
        "body": { "message": "Usuário removido com sucesso" }
      }
    }
  }
}
```

## 🏢 Exemplos Empresariais

### 1. API de E-commerce Completa

```json title="ecommerce.json"
{
  "endpoints": {
    "products": {
      "GET": {
        "body": [
          {
            "id": 1,
            "name": "Smartphone Galaxy",
            "price": 1299.99,
            "category": "electronics",
            "stock": 50,
            "rating": 4.5
          },
          {
            "id": 2,
            "name": "Notebook Dell",
            "price": 2499.99,
            "category": "computers",
            "stock": 25,
            "rating": 4.8
          }
        ],
        "headers": {
          "X-Total-Count": "150",
          "X-Page": "1",
          "X-Per-Page": "2",
          "X-Currency": "BRL",
          "Cache-Control": "public, max-age=300"
        },
        "cookies": {
          "viewed_products": "1,2",
          "currency": "BRL",
          "last_visit": "2024-01-15T10:30:00Z"
        }
      }
    },
    "products/:id": {
      "GET": {
        "body": {
          "id": 1,
          "name": "Smartphone Galaxy",
          "price": 1299.99,
          "description": "Smartphone com tela de 6.5 polegadas...",
          "images": ["img1.jpg", "img2.jpg"],
          "specifications": {
            "screen": "6.5 inches",
            "memory": "128GB",
            "camera": "48MP"
          }
        },
        "headers": {
          "ETag": "\"product-1-v1.2\"",
          "Cache-Control": "private, max-age=600"
        },
        "cookies": {
          "last_viewed_product": "1",
          "view_count": "1"
        }
      }
    },
    "cart": {
      "GET": {
        "body": {
          "id": "cart_123",
          "items": [
            {
              "productId": 1,
              "name": "Smartphone Galaxy",
              "price": 1299.99,
              "quantity": 1
            }
          ],
          "subtotal": 1299.99,
          "shipping": 29.99,
          "total": 1329.98
        },
        "cookies": {
          "cart_id": "cart_123",
          "items_count": "1",
          "last_update": "2024-01-15T11:00:00Z"
        }
      },
      "POST": {
        "body": {
          "message": "Produto adicionado ao carrinho",
          "cartId": "cart_123",
          "itemsCount": 2
        },
        "headers": {
          "X-Cart-Updated": "true"
        },
        "cookies": {
          "items_count": "2",
          "last_added": "product_2"
        }
      }
    },
    "checkout": {
      "POST": {
        "body": {
          "orderId": "order_456",
          "status": "confirmed",
          "total": 1329.98,
          "estimatedDelivery": "2024-01-20"
        },
        "headers": {
          "Location": "/orders/order_456",
          "X-Order-Status": "confirmed"
        },
        "cookies": {
          "last_order": "order_456",
          "cart_id": {
            "value": "",
            "options": { "maxAge": 0 }
          }
        }
      }
    }
  }
}
```

### 2. API de Autenticação e Usuários

```json title="auth-system.json"
{
  "endpoints": {
    "auth/register": {
      "POST": {
        "body": {
          "user": {
            "id": 123,
            "name": "João Silva",
            "email": "joao@email.com",
            "role": "user"
          },
          "message": "Usuário criado com sucesso"
        },
        "headers": {
          "Location": "/users/123",
          "X-Registration-Status": "success"
        },
        "cookies": {
          "registration_complete": "true",
          "welcome_flow": {
            "value": "pending",
            "options": {
              "maxAge": 86400000,
              "path": "/"
            }
          }
        }
      }
    },
    "auth/login": {
      "POST": {
        "body": {
          "user": {
            "id": 123,
            "name": "João Silva",
            "email": "joao@email.com",
            "role": "user"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "expiresIn": 3600
        },
        "headers": {
          "X-Auth-Status": "success",
          "X-Token-Type": "Bearer"
        },
        "cookies": {
          "session_id": {
            "value": "sess_abc123def456",
            "options": {
              "httpOnly": true,
              "secure": true,
              "sameSite": "strict",
              "maxAge": 3600000
            }
          },
          "user_id": "123",
          "last_login": "2024-01-15T10:30:00Z",
          "login_count": "1"
        }
      }
    },
    "auth/logout": {
      "POST": {
        "body": {
          "message": "Logout realizado com sucesso"
        },
        "headers": {
          "X-Auth-Status": "logged_out"
        },
        "cookies": {
          "session_id": {
            "value": "",
            "options": { "maxAge": 0 }
          },
          "logout_time": "2024-01-15T11:00:00Z"
        }
      }
    },
    "auth/profile": {
      "GET": {
        "body": {
          "id": 123,
          "name": "João Silva",
          "email": "joao@email.com",
          "role": "user",
          "preferences": {
            "theme": "dark",
            "language": "pt-BR",
            "notifications": true
          },
          "stats": {
            "loginCount": 15,
            "lastLogin": "2024-01-15T10:30:00Z",
            "accountCreated": "2024-01-01T00:00:00Z"
          }
        },
        "headers": {
          "X-User-Role": "user",
          "Cache-Control": "private, max-age=300"
        },
        "cookies": {
          "profile_viewed": "true",
          "last_profile_update": "2024-01-10T15:30:00Z"
        }
      },
      "PUT": {
        "body": {
          "message": "Perfil atualizado com sucesso",
          "user": {
            "id": 123,
            "name": "João Silva Santos",
            "email": "joao.santos@email.com"
          }
        },
        "headers": {
          "X-Profile-Updated": "true"
        },
        "cookies": {
          "profile_updated": "2024-01-15T12:00:00Z",
          "update_count": "1"
        }
      }
    }
  }
}
```

## 📊 Exemplos com Paginação

### API de Blog com Paginação

```json title="blog-pagination.json"
{
  "endpoints": {
    "posts": {
      "GET": {
        "body": [
          {
            "id": 1,
            "title": "Introdução ao React",
            "excerpt": "Aprenda os conceitos básicos do React...",
            "author": "João Silva",
            "publishedAt": "2024-01-10T14:30:00Z",
            "tags": ["react", "javascript", "frontend"]
          },
          {
            "id": 2,
            "title": "Node.js para Iniciantes",
            "excerpt": "Guia completo para começar com Node.js...",
            "author": "Maria Santos",
            "publishedAt": "2024-01-12T16:45:00Z",
            "tags": ["nodejs", "javascript", "backend"]
          }
        ],
        "headers": {
          "X-Total-Count": "250",
          "X-Page": "1",
          "X-Per-Page": "2",
          "X-Total-Pages": "125",
          "Link": "</posts?page=2>; rel=\"next\", </posts?page=125>; rel=\"last\"",
          "Cache-Control": "public, max-age=300"
        },
        "cookies": {
          "posts_per_page": "2",
          "sort_order": "newest",
          "last_page_visited": "1"
        }
      }
    },
    "posts/:id": {
      "GET": {
        "body": {
          "id": 1,
          "title": "Introdução ao React",
          "content": "React é uma biblioteca JavaScript para construir interfaces de usuário...",
          "author": {
            "id": 1,
            "name": "João Silva",
            "avatar": "avatar1.jpg"
          },
          "publishedAt": "2024-01-10T14:30:00Z",
          "updatedAt": "2024-01-11T09:15:00Z",
          "tags": ["react", "javascript", "frontend"],
          "readTime": "5 min",
          "views": 1250,
          "likes": 89
        },
        "headers": {
          "ETag": "\"post-1-v2.1\"",
          "Last-Modified": "Wed, 11 Jan 2024 09:15:00 GMT",
          "Cache-Control": "public, max-age=600"
        },
        "cookies": {
          "last_read_post": "1",
          "reading_progress": "0",
          "post_views": "1251"
        }
      }
    }
  }
}
```

## 🔐 Exemplos de Segurança

### API com Headers de Segurança

```json title="secure-api.json"
{
  "endpoints": {
    "admin/dashboard": {
      "GET": {
        "body": {
          "stats": {
            "totalUsers": 1250,
            "activeUsers": 890,
            "revenue": 125000.50
          },
          "recentActivity": [
            { "action": "user_login", "timestamp": "2024-01-15T10:30:00Z" },
            { "action": "order_created", "timestamp": "2024-01-15T10:25:00Z" }
          ]
        },
        "headers": {
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "Content-Security-Policy": "default-src 'self'",
          "X-Admin-Access": "granted",
          "Cache-Control": "private, no-cache, no-store"
        },
        "cookies": {
          "admin_session": {
            "value": "admin_sess_xyz789",
            "options": {
              "httpOnly": true,
              "secure": true,
              "sameSite": "strict",
              "maxAge": 1800000,
              "path": "/admin"
            }
          },
          "csrf_token": {
            "value": "csrf_abc123",
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

## 🌐 Exemplo Multi-arquivo (Modo Pasta)

### Estrutura de Pastas

```
api-data/
├── users.json
├── products.json
├── auth/
│   ├── login.json
│   └── register.json
├── admin/
│   └── dashboard.json
└── public/
    └── config.json
```

### users.json
```json
[
  { "id": 1, "name": "João Silva", "email": "joao@email.com" },
  { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
]
```

### products.json
```json
[
  { "id": 1, "name": "Produto A", "price": 99.99 },
  { "id": 2, "name": "Produto B", "price": 149.99 }
]
```

### auth/login.json
```json
{
  "endpoints": {
    "login": {
      "POST": {
        "body": {
          "token": "jwt_token_here",
          "user": { "id": 1, "name": "João" }
        },
        "cookies": {
          "session_id": {
            "value": "sess_123",
            "options": { "httpOnly": true, "maxAge": 3600000 }
          }
        }
      }
    }
  }
}
```

**Uso:**
```bash
json-server-mock-plus -d api-data
```

**Endpoints gerados:**
- `GET /users`
- `GET /products`
- `POST /auth/login`
- `GET /admin/dashboard`
- `GET /public/config`

## 🧪 Exemplos para Testes

### API de Testes com Diferentes Cenários

```json title="test-scenarios.json"
{
  "endpoints": {
    "test/success": {
      "GET": {
        "body": { "status": "success", "data": "Operação bem-sucedida" },
        "headers": { "X-Test-Scenario": "success" }
      }
    },
    "test/error": {
      "GET": {
        "body": { "error": "Erro simulado", "code": 500 },
        "headers": { "X-Test-Scenario": "error" }
      }
    },
    "test/slow": {
      "GET": {
        "body": { "status": "success", "message": "Resposta lenta simulada" },
        "headers": { 
          "X-Test-Scenario": "slow",
          "X-Response-Time": "2000ms"
        }
      }
    },
    "test/cache": {
      "GET": {
        "body": { "data": "Dados cacheados", "timestamp": "2024-01-15T10:30:00Z" },
        "headers": {
          "Cache-Control": "public, max-age=3600",
          "ETag": "\"cache-test-v1\"",
          "X-Cache-Status": "HIT"
        }
      }
    }
  }
}
```

## 📱 Exemplo de API Mobile

### API para Aplicativo Mobile

```json title="mobile-api.json"
{
  "endpoints": {
    "mobile/config": {
      "GET": {
        "body": {
          "appVersion": "1.2.0",
          "minSupportedVersion": "1.0.0",
          "features": {
            "pushNotifications": true,
            "biometricAuth": true,
            "darkMode": true
          },
          "endpoints": {
            "api": "https://api.exemplo.com",
            "cdn": "https://cdn.exemplo.com"
          }
        },
        "headers": {
          "X-App-Version": "1.2.0",
          "X-Platform": "mobile",
          "Cache-Control": "public, max-age=86400"
        },
        "cookies": {
          "device_id": "device_abc123",
          "app_install_date": "2024-01-01T00:00:00Z"
        }
      }
    },
    "mobile/notifications": {
      "GET": {
        "body": [
          {
            "id": 1,
            "title": "Nova mensagem",
            "body": "Você tem uma nova mensagem",
            "type": "message",
            "timestamp": "2024-01-15T10:30:00Z",
            "read": false
          }
        ],
        "headers": {
          "X-Notification-Count": "1",
          "X-Unread-Count": "1"
        },
        "cookies": {
          "last_notification_check": "2024-01-15T10:30:00Z",
          "notification_preferences": "all"
        }
      }
    }
  }
}
```

## 🚀 Como Usar os Exemplos

### 1. Copiar e Usar

Copie qualquer exemplo acima e salve em um arquivo `.json`:

```bash
# Salvar exemplo em arquivo
echo '{"endpoints": {...}}' > meu-exemplo.json

# Executar
json-server-mock-plus -f meu-exemplo.json
```

### 2. Combinar Exemplos

Combine diferentes exemplos em um arquivo:

```json title="api-completa.json"
{
  "endpoints": {
    // Copie endpoints de diferentes exemplos aqui
    "users": { ... },
    "products": { ... },
    "auth/login": { ... }
  }
}
```

### 3. Modo Pasta

Organize exemplos em pastas separadas:

```bash
mkdir minha-api
# Salve cada exemplo em arquivos separados
json-server-mock-plus -d minha-api
```

## 💡 Dicas para Criar Seus Próprios Exemplos

1. **Comece Simples**: Use apenas `body` primeiro
2. **Adicione Headers**: Para simular comportamentos reais
3. **Configure Cookies**: Para autenticação e sessões
4. **Use Parâmetros**: Para endpoints dinâmicos
5. **Teste Cenários**: Crie diferentes respostas para testes

---

**Pronto para começar?** Escolha um exemplo e comece a experimentar! 🎉 