# Headers Mockados

Os headers mockados permitem simular comportamentos reais de APIs, incluindo cache, paginação, versionamento e muito mais.

## 🔧 Como Funciona

Headers mockados são definidos no campo `headers` de cada método HTTP e são automaticamente enviados como cabeçalhos de resposta:

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [...],
        "headers": {
          "X-Total-Count": "100",
          "X-API-Version": "2.0",
          "Cache-Control": "max-age=3600"
        }
      }
    }
  }
}
```

## 📋 Características

- ✅ **Flexibilidade Total**: Qualquer header HTTP válido
- ✅ **Documentação Automática**: Aparecem no Swagger automaticamente
- ✅ **Por Método**: Cada método HTTP pode ter headers específicos
- ✅ **Opcional**: Endpoints funcionam normalmente sem headers
- ✅ **Simulação Realista**: Perfeito para testar comportamentos de API

## 🎯 Casos de Uso Comuns

### 1. Paginação

Simule APIs com paginação usando headers padrão:

```json
{
  "endpoints": {
    "posts": {
      "GET": {
        "body": [
          { "id": 1, "title": "Post 1" },
          { "id": 2, "title": "Post 2" }
        ],
        "headers": {
          "X-Total-Count": "150",
          "X-Page": "1",
          "X-Per-Page": "2",
          "X-Total-Pages": "75",
          "Link": "</posts?page=2>; rel=\"next\", </posts?page=75>; rel=\"last\""
        }
      }
    }
  }
}
```

**Headers de Paginação Úteis:**
- `X-Total-Count`: Total de itens
- `X-Page`: Página atual
- `X-Per-Page`: Itens por página
- `X-Total-Pages`: Total de páginas
- `Link`: Links de navegação (RFC 5988)

### 2. Cache e Performance

Configure headers de cache para simular comportamentos reais:

```json
{
  "endpoints": {
    "products": {
      "GET": {
        "body": [...],
        "headers": {
          "Cache-Control": "public, max-age=3600, s-maxage=7200",
          "ETag": "\"product-list-v1.2.3\"",
          "Last-Modified": "Wed, 15 Jan 2024 10:30:00 GMT",
          "Expires": "Wed, 15 Jan 2024 11:30:00 GMT",
          "Vary": "Accept-Encoding, User-Agent"
        }
      }
    },
    "products/:id": {
      "GET": {
        "body": {...},
        "headers": {
          "Cache-Control": "private, max-age=300",
          "ETag": "\"product-1-v2.1.0\"",
          "Last-Modified": "Wed, 15 Jan 2024 09:15:00 GMT"
        }
      }
    }
  }
}
```

**Headers de Cache Importantes:**
- `Cache-Control`: Diretivas de cache
- `ETag`: Identificador de versão do recurso
- `Last-Modified`: Data da última modificação
- `Expires`: Data de expiração
- `Vary`: Headers que afetam o cache

### 3. Rate Limiting

Simule limitação de taxa de requisições:

```json
{
  "endpoints": {
    "api/search": {
      "GET": {
        "body": {...},
        "headers": {
          "X-RateLimit-Limit": "1000",
          "X-RateLimit-Remaining": "999",
          "X-RateLimit-Reset": "1705315800",
          "X-RateLimit-Window": "3600",
          "Retry-After": "3600"
        }
      }
    }
  }
}
```

**Headers de Rate Limiting:**
- `X-RateLimit-Limit`: Limite total
- `X-RateLimit-Remaining`: Requisições restantes
- `X-RateLimit-Reset`: Timestamp do reset
- `X-RateLimit-Window`: Janela de tempo
- `Retry-After`: Tempo para tentar novamente

### 4. Versionamento de API

Configure headers de versionamento:

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [...],
        "headers": {
          "X-API-Version": "2.1.0",
          "X-Deprecated": "false",
          "X-Sunset": "2025-12-31",
          "X-Min-Client-Version": "1.5.0",
          "X-Latest-Version": "2.1.0"
        }
      }
    }
  }
}
```

**Headers de Versionamento:**
- `X-API-Version`: Versão atual da API
- `X-Deprecated`: Se a versão está depreciada
- `X-Sunset`: Data de descontinuação
- `X-Min-Client-Version`: Versão mínima do cliente
- `X-Latest-Version`: Versão mais recente disponível

### 5. Segurança

Adicione headers de segurança:

```json
{
  "endpoints": {
    "secure-data": {
      "GET": {
        "body": {...},
        "headers": {
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "Content-Security-Policy": "default-src 'self'",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        }
      }
    }
  }
}
```

**Headers de Segurança:**
- `Strict-Transport-Security`: Força HTTPS
- `X-Content-Type-Options`: Previne MIME sniffing
- `X-Frame-Options`: Previne clickjacking
- `X-XSS-Protection`: Proteção XSS
- `Content-Security-Policy`: Política de segurança de conteúdo
- `Referrer-Policy`: Política de referrer

### 6. CORS

Configure headers CORS para desenvolvimento:

```json
{
  "endpoints": {
    "api/data": {
      "OPTIONS": {
        "body": "",
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400",
          "Access-Control-Allow-Credentials": "true"
        }
      },
      "GET": {
        "body": {...},
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "X-Total-Count, X-API-Version"
        }
      }
    }
  }
}
```

**Headers CORS:**
- `Access-Control-Allow-Origin`: Origens permitidas
- `Access-Control-Allow-Methods`: Métodos permitidos
- `Access-Control-Allow-Headers`: Headers permitidos
- `Access-Control-Max-Age`: Cache do preflight
- `Access-Control-Expose-Headers`: Headers expostos

### 7. Localização e Recursos

Headers para recursos criados/modificados:

```json
{
  "endpoints": {
    "users": {
      "POST": {
        "body": { "id": 123, "name": "Novo Usuário" },
        "headers": {
          "Location": "/users/123",
          "X-Created-At": "2024-01-15T10:30:00Z",
          "X-Resource-ID": "123",
          "X-Operation": "create"
        }
      },
      "PUT": {
        "body": { "id": 123, "name": "Usuário Atualizado" },
        "headers": {
          "X-Updated-At": "2024-01-15T11:45:00Z",
          "X-Version": "2",
          "X-Operation": "update",
          "ETag": "\"user-123-v2\""
        }
      }
    }
  }
}
```

**Headers de Localização:**
- `Location`: URL do recurso criado
- `X-Created-At`: Timestamp de criação
- `X-Updated-At`: Timestamp de atualização
- `X-Resource-ID`: ID do recurso
- `X-Operation`: Tipo de operação

## 🔍 Headers Personalizados

Você pode criar headers completamente personalizados:

```json
{
  "endpoints": {
    "custom-api": {
      "GET": {
        "body": {...},
        "headers": {
          "X-Company-Name": "MinhaEmpresa",
          "X-Environment": "development",
          "X-Request-ID": "req_abc123def456",
          "X-Processing-Time": "0.045s",
          "X-Server-Region": "us-east-1",
          "X-Feature-Flags": "feature1,feature2,feature3"
        }
      }
    }
  }
}
```

## 📚 Documentação Automática

Headers configurados aparecem automaticamente na documentação Swagger:

- **Descrição**: Cada header é documentado automaticamente
- **Exemplo**: Valor do header é usado como exemplo
- **Tipo**: Detectado automaticamente como string
- **Visibilidade**: Aparece na seção "Response Headers"

## 💡 Dicas e Melhores Práticas

### Convenções de Nomenclatura

1. **Headers Padrão**: Use nomes padrão quando possível (`Cache-Control`, `ETag`)
2. **Headers Customizados**: Use prefixo `X-` para headers personalizados
3. **Consistência**: Mantenha padrão consistente em toda a API

### Valores Realistas

1. **Timestamps**: Use formato ISO 8601 (`2024-01-15T10:30:00Z`)
2. **ETags**: Use aspas duplas (`"abc123"`)
3. **Cache-Control**: Use diretivas válidas (`max-age=3600`)
4. **Números**: Use valores realistas para contadores

### Organização

1. **Agrupe por Funcionalidade**: Headers relacionados juntos
2. **Documente Comportamentos**: Use comentários quando necessário
3. **Teste Cenários**: Configure diferentes headers para diferentes cenários

### Exemplo Completo

```json title="headers-completo.json"
{
  "endpoints": {
    "products": {
      "GET": {
        "body": [
          { "id": 1, "name": "Produto A", "price": 99.99 },
          { "id": 2, "name": "Produto B", "price": 149.99 }
        ],
        "headers": {
          // Paginação
          "X-Total-Count": "1000",
          "X-Page": "1",
          "X-Per-Page": "2",
          
          // Cache
          "Cache-Control": "public, max-age=300",
          "ETag": "\"products-v1.2.3\"",
          
          // Rate Limiting
          "X-RateLimit-Limit": "100",
          "X-RateLimit-Remaining": "99",
          
          // Versionamento
          "X-API-Version": "2.0",
          
          // Personalizado
          "X-Currency": "BRL",
          "X-Processing-Time": "0.023s"
        }
      }
    }
  }
}
```

---

**Próximo:** Explore [Cookies Mockados](./cookies) para simular autenticação e sessões! 🍪 