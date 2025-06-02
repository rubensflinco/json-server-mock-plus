# Cookies Mockados

Os cookies mockados permitem simular autenticação, sessões, preferências do usuário e outros comportamentos que dependem de cookies.

## 🍪 Como Funciona

Cookies mockados são definidos no campo `cookies` de cada método HTTP e são automaticamente enviados como cookies de resposta:

```json
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": { "success": true },
        "cookies": {
          "session_id": "abc123",
          "user_id": "1"
        }
      }
    }
  }
}
```

## 📋 Características

- ✅ **Cookies Simples**: Apenas valor como string
- ✅ **Cookies Avançados**: Objeto com valor e opções
- ✅ **Opções Completas**: Todas as opções do Express.js
- ✅ **Documentação Automática**: Aparecem no Swagger
- ✅ **Por Método**: Cada método HTTP pode ter cookies específicos
- ✅ **Opcional**: Endpoints funcionam normalmente sem cookies

## 🎯 Formatos Suportados

### 1. Cookie Simples

Para casos básicos, use apenas o valor:

```json
{
  "cookies": {
    "theme": "dark",
    "language": "pt-BR",
    "user_id": "123"
  }
}
```

### 2. Cookie Avançado

Para controle total, use objeto com `value` e `options`:

```json
{
  "cookies": {
    "session_id": {
      "value": "sess_abc123def456",
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
}
```

## ⚙️ Opções de Cookie

Todas as opções do Express.js são suportadas:

| Opção | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `httpOnly` | boolean | Cookie acessível apenas via HTTP | `true` |
| `secure` | boolean | Cookie só enviado via HTTPS | `true` |
| `sameSite` | string | Controle CSRF | `"strict"`, `"lax"`, `"none"` |
| `maxAge` | number | Duração em milissegundos | `3600000` (1 hora) |
| `expires` | Date/string | Data de expiração | `"2024-12-31T23:59:59Z"` |
| `path` | string | Caminho onde é válido | `"/"`, `"/admin"` |
| `domain` | string | Domínio onde é válido | `".exemplo.com"` |

## 🎯 Casos de Uso Comuns

### 1. Autenticação e Sessão

Simule login/logout com cookies seguros:

```json
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": {
          "user": { "id": 1, "name": "João Silva" },
          "message": "Login realizado com sucesso"
        },
        "headers": {
          "X-Auth-Status": "success"
        },
        "cookies": {
          "session_id": {
            "value": "sess_abc123def456ghi789",
            "options": {
              "httpOnly": true,
              "secure": true,
              "sameSite": "strict",
              "maxAge": 3600000,
              "path": "/"
            }
          },
          "auth_token": {
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
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
    "auth/logout": {
      "POST": {
        "body": { "message": "Logout realizado com sucesso" },
        "cookies": {
          "session_id": {
            "value": "",
            "options": { "maxAge": 0 }
          },
          "auth_token": {
            "value": "",
            "options": { "maxAge": 0 }
          },
          "logout_time": "2024-01-15T11:00:00Z"
        }
      }
    }
  }
}
```

### 2. Preferências do Usuário

Armazene configurações do usuário:

```json
{
  "endpoints": {
    "preferences": {
      "GET": {
        "body": {
          "theme": "dark",
          "language": "pt-BR",
          "notifications": true
        },
        "cookies": {
          "theme": "dark",
          "language": "pt-BR",
          "notifications": "enabled",
          "timezone": "America/Sao_Paulo",
          "preference_version": {
            "value": "1.2",
            "options": {
              "maxAge": 31536000000,
              "sameSite": "lax"
            }
          }
        }
      },
      "PUT": {
        "body": { "message": "Preferências atualizadas" },
        "cookies": {
          "theme": "light",
          "notifications": "disabled",
          "preference_updated": {
            "value": "2024-01-15T12:00:00Z",
            "options": {
              "maxAge": 2592000000
            }
          }
        }
      }
    }
  }
}
```

### 3. E-commerce e Carrinho

Simule carrinho de compras:

```json
{
  "endpoints": {
    "cart": {
      "GET": {
        "body": {
          "items": [
            { "id": 1, "name": "Produto A", "quantity": 2 },
            { "id": 2, "name": "Produto B", "quantity": 1 }
          ],
          "total": 150.00
        },
        "cookies": {
          "cart_id": "cart_xyz789",
          "items_count": "3",
          "currency": "BRL",
          "last_activity": {
            "value": "2024-01-15T13:30:00Z",
            "options": {
              "maxAge": 1800000,
              "path": "/shop"
            }
          }
        }
      },
      "POST": {
        "body": { "message": "Item adicionado ao carrinho" },
        "cookies": {
          "items_count": "4",
          "last_added": "product_3",
          "discount_applied": {
            "value": "SAVE10",
            "options": {
              "maxAge": 3600000,
              "domain": ".loja.com"
            }
          }
        }
      }
    }
  }
}
```

### 4. Analytics e Tracking

Configure cookies de analytics:

```json
{
  "endpoints": {
    "analytics/track": {
      "POST": {
        "body": { "tracked": true },
        "cookies": {
          "visitor_id": {
            "value": "visitor_abc123",
            "options": {
              "maxAge": 31536000000,
              "sameSite": "none",
              "secure": true
            }
          },
          "session_start": "2024-01-15T10:00:00Z",
          "page_count": "1",
          "utm_source": "google",
          "utm_campaign": {
            "value": "winter_sale_2024",
            "options": {
              "maxAge": 604800000
            }
          },
          "referrer": "https://google.com"
        }
      }
    }
  }
}
```

### 5. Consentimento e GDPR

Gerencie consentimento de cookies:

```json
{
  "endpoints": {
    "consent": {
      "GET": {
        "body": {
          "consentGiven": true,
          "gdprCompliant": true
        },
        "cookies": {
          "cookie_consent": {
            "value": "accepted",
            "options": {
              "maxAge": 31536000000,
              "sameSite": "strict"
            }
          },
          "marketing_consent": "denied",
          "analytics_consent": "accepted",
          "functional_consent": "accepted",
          "consent_version": {
            "value": "2.1",
            "options": {
              "maxAge": 31536000000
            }
          },
          "consent_date": "2024-01-15T09:00:00Z"
        }
      },
      "POST": {
        "body": { "message": "Consentimento atualizado" },
        "cookies": {
          "cookie_consent": {
            "value": "updated",
            "options": {
              "maxAge": 31536000000
            }
          },
          "consent_updated": "2024-01-15T14:30:00Z"
        }
      }
    }
  }
}
```

### 6. Configurações de Aplicação

Armazene configurações específicas:

```json
{
  "endpoints": {
    "settings": {
      "GET": {
        "body": {
          "layout": "grid",
          "itemsPerPage": 20,
          "sortBy": "name"
        },
        "cookies": {
          "layout_mode": "grid",
          "items_per_page": "20",
          "sort_preference": "name_asc",
          "sidebar_collapsed": "false",
          "view_mode": {
            "value": "detailed",
            "options": {
              "maxAge": 2592000000,
              "path": "/dashboard"
            }
          }
        }
      }
    }
  }
}
```

## 🔒 Segurança de Cookies

### Cookies Seguros para Autenticação

```json
{
  "cookies": {
    "session_token": {
      "value": "secure_token_here",
      "options": {
        "httpOnly": true,      // Não acessível via JavaScript
        "secure": true,        // Apenas HTTPS
        "sameSite": "strict",  // Proteção CSRF máxima
        "maxAge": 3600000,     // 1 hora
        "path": "/"
      }
    }
  }
}
```

### Cookies para Desenvolvimento

```json
{
  "cookies": {
    "dev_session": {
      "value": "dev_token",
      "options": {
        "httpOnly": false,     // Acessível via JavaScript (dev)
        "secure": false,       // HTTP permitido (dev)
        "sameSite": "lax",     // Menos restritivo
        "maxAge": 86400000     // 24 horas
      }
    }
  }
}
```

## 🕒 Gerenciamento de Tempo

### Cookies de Sessão (temporários)

```json
{
  "cookies": {
    "temp_data": "valor_temporario"
    // Sem maxAge = cookie de sessão
  }
}
```

### Cookies Persistentes

```json
{
  "cookies": {
    "remember_me": {
      "value": "true",
      "options": {
        "maxAge": 2592000000  // 30 dias
      }
    }
  }
}
```

### Expiração de Cookies

```json
{
  "cookies": {
    "expired_cookie": {
      "value": "",
      "options": {
        "maxAge": 0  // Expira imediatamente
      }
    }
  }
}
```

## 🌐 Cookies Multi-domínio

### Cookie para Subdomínios

```json
{
  "cookies": {
    "shared_data": {
      "value": "compartilhado",
      "options": {
        "domain": ".exemplo.com",  // Válido para *.exemplo.com
        "path": "/"
      }
    }
  }
}
```

### Cookie Específico de Path

```json
{
  "cookies": {
    "admin_session": {
      "value": "admin_token",
      "options": {
        "path": "/admin",  // Apenas para /admin/*
        "httpOnly": true,
        "secure": true
      }
    }
  }
}
```

## 📚 Documentação Automática

Cookies configurados aparecem automaticamente na documentação Swagger na descrição do endpoint:

```
Endpoint POST para auth/login. Retorna dados mockados baseados no arquivo JSON.

**Cookies mockados configurados:** session_id, auth_token, user_id
```

## 💡 Dicas e Melhores Práticas

### Nomenclatura

1. **Use nomes descritivos**: `session_id`, `user_preferences`
2. **Seja consistente**: Mantenha padrão em toda aplicação
3. **Evite caracteres especiais**: Use apenas letras, números e underscore

### Segurança

1. **Use `httpOnly`** para cookies sensíveis
2. **Use `secure`** em produção (HTTPS)
3. **Configure `sameSite`** adequadamente
4. **Defina `maxAge`** apropriado

### Performance

1. **Evite cookies grandes**: Limite de ~4KB por cookie
2. **Use compressão** quando necessário
3. **Expire cookies desnecessários**

### Desenvolvimento

1. **Configure diferentes valores** para dev/prod
2. **Use cookies de debug** em desenvolvimento
3. **Teste cenários de expiração**

### Exemplo Completo

```json title="cookies-completo.json"
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": {
          "user": { "id": 1, "name": "João" },
          "success": true
        },
        "headers": {
          "X-Auth-Status": "success"
        },
        "cookies": {
          // Cookie de sessão seguro
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
          
          // Preferências do usuário
          "theme": "dark",
          "language": "pt-BR",
          
          // Analytics
          "login_count": "1",
          "last_login": "2024-01-15T10:30:00Z",
          
          // Lembrar usuário
          "remember_me": {
            "value": "true",
            "options": {
              "maxAge": 2592000000,
              "sameSite": "lax"
            }
          }
        }
      }
    }
  }
}
```

---

**Próximo:** Explore [Exemplos Práticos](./examples) com casos de uso reais! 🚀 