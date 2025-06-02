---
sidebar_position: 1
---

# Introdução

Bem-vindo ao **JSON Server Mock Plus**! 🚀

Uma biblioteca CLI simples e poderosa para criar servidores REST a partir de arquivos JSON ou pastas com múltiplos arquivos JSON, com **documentação automática Swagger integrada**.

## ✨ Funcionalidades Principais

- 📋 **Documentação Automática Swagger**: Interface interativa para testar e documentar APIs
- 🔧 **Headers Mockados**: Suporte a headers customizados de resposta para simulações realistas
- 🍪 **Cookies Mockados**: Suporte a cookies customizados de resposta com opções avançadas
- 🔄 **Schemas Inline**: Schemas gerados automaticamente baseados nos dados reais
- 🚀 **Múltiplos Métodos HTTP**: Suporte a GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
- 📁 **Modo Pasta ou Arquivo**: Carregamento de múltiplos arquivos JSON ou arquivo único
- 🌐 **CORS Habilitado**: Pronto para uso em aplicações web
- 🔗 **Parâmetros de Path**: Suporte automático a parâmetros como `:id`, `:userId`, etc.
- 🏷️ **Agrupamento Inteligente**: Endpoints agrupados por pasta ou arquivo de origem

## 🎯 Por que usar o JSON Server Mock Plus?

### Para Desenvolvedores Frontend
- **Desenvolvimento Independente**: Não dependa do backend estar pronto
- **Testes Realistas**: Simule comportamentos reais de API com headers e cookies
- **Prototipagem Rápida**: Crie APIs mockadas em minutos

### Para Equipes de Desenvolvimento
- **Documentação Automática**: Swagger UI gerado automaticamente
- **Colaboração**: Diferentes desenvolvedores podem trabalhar em endpoints separados
- **Padronização**: Estrutura consistente para todos os mocks

### Para Testes e QA
- **Cenários Controlados**: Simule diferentes respostas e comportamentos
- **Headers e Cookies**: Teste fluxos completos de autenticação e sessão
- **Ambientes Isolados**: Testes sem dependências externas

## 🚀 Início Rápido

### Instalação

```bash
# Instalação global
npm install -g json-server-mock-plus

# Ou use diretamente com npx
npx --yes json-server-mock-plus
```

### Primeiro Uso

1. **Crie um arquivo JSON simples:**

```json title="db.json"
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [
          { "id": 1, "name": "João Silva", "email": "joao@email.com" },
          { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
        ]
      }
    }
  }
}
```

2. **Inicie o servidor:**

```bash
npx json-server-mock-plus -f db.json
```

3. **Acesse a documentação:**
   - **Interface Swagger**: http://localhost:3000/
   - **API Endpoint**: http://localhost:3000/users

## 📚 Próximos Passos

- [**Instalação**](./installation): Guia completo de instalação
- [**Guia de Uso**](./usage): Como usar todas as funcionalidades
- [**Headers Mockados**](./headers): Simule headers de resposta
- [**Cookies Mockados**](./cookies): Configure cookies de resposta
- [**Exemplos**](./examples): Exemplos práticos e casos de uso

## 🤝 Contribuindo

O JSON Server Mock Plus é um projeto open source. Contribuições são bem-vindas!

- [GitHub Repository](https://github.com/rubensflinco/json-server-plus)
- [Issues](https://github.com/rubensflinco/json-server-plus/issues)
- [Discussions](https://github.com/rubensflinco/json-server-plus/discussions)

---

**Pronto para começar?** Vamos para a [instalação](./installation)! 🎉
