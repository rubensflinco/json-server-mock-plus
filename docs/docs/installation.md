# Instalação

Este guia mostra como instalar e configurar o JSON Server Mock Plus em diferentes ambientes.

## 📋 Pré-requisitos

Antes de instalar o JSON Server Mock Plus, certifique-se de ter:

- **Node.js** versão 16.0 ou superior
- **npm** versão 7.0 ou superior (incluído com Node.js)

### Verificando os Pré-requisitos

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

## 🚀 Métodos de Instalação

### 1. Instalação Global (Recomendado)

A instalação global permite usar o comando `json-server-mock-plus` em qualquer lugar do sistema:

```bash
npm install -g json-server-mock-plus
```

**Uso após instalação global:**

```bash
json-server-mock-plus -f db.json
json-server-mock-plus -d ./data
```

### 2. Uso com npx (Sem Instalação)

Use diretamente sem instalar globalmente:

```bash
# Sempre usa a versão mais recente
npx --yes json-server-mock-plus -f db.json

# Especificar versão
npx json-server-mock-plus@latest -d ./data
```

### 3. Instalação Local no Projeto

Para projetos específicos, instale como dependência de desenvolvimento:

```bash
# Instalar como dev dependency
npm install --save-dev json-server-mock-plus

# Ou com yarn
yarn add --dev json-server-mock-plus
```

**Uso em projetos locais:**

```bash
# Via npm scripts
npx json-server-mock-plus -f db.json

# Ou adicionar ao package.json
```

```json title="package.json"
{
  "scripts": {
    "mock-server": "json-server-mock-plus -f db.json",
    "mock-dev": "json-server-mock-plus -d ./mock-data -p 3001"
  }
}
```

## 🔧 Configuração Inicial

### Estrutura Básica de Projeto

Após a instalação, crie a estrutura básica:

```
meu-projeto/
├── mock-data/
│   ├── users.json
│   ├── products.json
│   └── api/
│       └── orders.json
├── db.json
└── package.json
```

### Arquivo de Configuração Básico

Crie um arquivo `db.json` para começar:

```json title="db.json"
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
          "X-API-Version": "1.0"
        }
      },
      "POST": {
        "body": { "id": 3, "name": "Novo Usuário", "email": "novo@email.com" },
        "headers": {
          "Location": "/users/3"
        },
        "cookies": {
          "user_created": "true"
        }
      }
    }
  }
}
```

## 🧪 Verificando a Instalação

### Teste Básico

1. **Verificar se o comando está disponível:**

```bash
json-server-mock-plus --version
```

2. **Criar um arquivo de teste:**

```json title="test.json"
{
  "endpoints": {
    "hello": {
      "GET": {
        "body": { "message": "Hello World!" }
      }
    }
  }
}
```

3. **Iniciar o servidor:**

```bash
json-server-mock-plus -f test.json
```

4. **Verificar se está funcionando:**
   - Acesse: http://localhost:3000/
   - API: http://localhost:3000/hello

### Teste com Modo Pasta

1. **Criar estrutura de pastas:**

```bash
mkdir mock-data
echo '[{"id": 1, "name": "Teste"}]' > mock-data/users.json
```

2. **Iniciar em modo pasta:**

```bash
json-server-mock-plus -d mock-data
```

## 🐛 Solução de Problemas

### Problemas Comuns

#### Erro: "comando não encontrado"

**Problema:** `json-server-mock-plus: command not found`

**Soluções:**
```bash
# 1. Verificar se foi instalado globalmente
npm list -g json-server-mock-plus

# 2. Reinstalar globalmente
npm install -g json-server-mock-plus

# 3. Usar npx como alternativa
npx json-server-mock-plus --version
```

#### Erro de Permissão (Linux/Mac)

**Problema:** `EACCES: permission denied`

**Soluções:**
```bash
# 1. Usar sudo (não recomendado)
sudo npm install -g json-server-mock-plus

# 2. Configurar npm para pasta do usuário (recomendado)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g json-server-mock-plus
```

#### Porta em Uso

**Problema:** `Error: listen EADDRINUSE :::3000`

**Soluções:**
```bash
# Usar porta diferente
json-server-mock-plus -f db.json -p 3001

# Ou encontrar processo usando a porta
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

### Verificação de Saúde

Execute este script para verificar se tudo está funcionando:

```bash
#!/bin/bash
echo "🔍 Verificando instalação do JSON Server Mock Plus..."

# Verificar Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js não encontrado"
    exit 1
fi

# Verificar npm
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm não encontrado"
    exit 1
fi

# Verificar json-server-mock-plus
if command -v json-server-mock-plus &> /dev/null; then
    echo "✅ json-server-mock-plus: $(json-server-mock-plus --version)"
else
    echo "⚠️  json-server-mock-plus não encontrado globalmente"
    echo "💡 Tente: npx json-server-mock-plus --version"
fi

echo "🎉 Verificação concluída!"
```

## 📦 Atualizações

### Verificar Versão Atual

```bash
# Versão instalada globalmente
npm list -g json-server-mock-plus

# Versão mais recente disponível
npm view json-server-mock-plus version
```

### Atualizar para Versão Mais Recente

```bash
# Atualizar instalação global
npm update -g json-server-mock-plus

# Ou reinstalar
npm uninstall -g json-server-mock-plus
npm install -g json-server-mock-plus@latest
```

## 🔄 Desinstalação

Se precisar remover o JSON Server Mock Plus:

```bash
# Desinstalar globalmente
npm uninstall -g json-server-mock-plus

# Desinstalar localmente
npm uninstall json-server-mock-plus
```

---

**Próximo passo:** Agora que você tem o JSON Server Mock Plus instalado, vamos aprender como usá-lo no [Guia de Uso](./usage)! 🚀 