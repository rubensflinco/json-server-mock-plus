# Json-To-Mock-Api

A simple CLI library to create REST servers from JSON files or folders with multiple JSON files, featuring **automatic integrated Swagger documentation**.

[![NPM Version](https://img.shields.io/npm/v/json-to-mock-api.svg)](https://www.npmjs.com/package/json-to-mock-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/rubensflinco/json-to-mock-api/blob/main/LICENSE)
[![GitHub](https://img.shields.io/github/stars/rubensflinco/json-to-mock-api?style=social)](https://github.com/rubensflinco/json-to-mock-api)

## ✨ Features

- 📋 **Automatic Swagger Documentation**: Interactive interface to test and document APIs
- 🔧 **Mocked Headers**: Support for custom response headers for realistic simulations
- 🍪 **Mocked Cookies**: Support for custom response cookies with advanced options
- 🔄 **Inline Schemas**: Automatically generated schemas based on real data
- 🚀 **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
- 📁 **File or Folder Mode**: Load multiple JSON files or single file
- 🌐 **CORS Enabled**: Ready for web applications
- 🔗 **Path Parameters**: Automatic support for parameters like `:id`, `:userId`, etc.
- 🏷️ **Smart Grouping**: Endpoints grouped by folder or file origin

## Installation

```bash
# Global installation
npm install -g json-to-mock-api

# Or use directly with npx
npx --yes json-to-mock-api
```

## Quick Start

### 1. Create a JSON file called `db.json`:

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [
          { "id": 1, "name": "John Doe", "email": "john@email.com" },
          { "id": 2, "name": "Jane Smith", "email": "jane@email.com" }
        ],
        "headers": {
          "X-Total-Count": "2"
        },
        "cookies": {
          "session": "abc123"
        }
      },
      "POST": {
        "body": { "id": 3, "name": "New User", "email": "new@email.com" }
      }
    },
    "users/:id": {
      "GET": {
        "body": { "id": 1, "name": "John Doe", "email": "john@email.com" }
      }
    }
  }
}
```

### 2. Run the command:

```bash
npx --yes json-to-mock-api -f db.json
```

### 3. Access:

- **Swagger UI**: `http://localhost:3000/` (Interactive documentation)
- **API Endpoint**: `http://localhost:3000/users`
- **OpenAPI Spec**: `http://localhost:3000/swagger.json`

## Usage Modes

### File Mode
```bash
json-to-mock-api -f db.json
```

### Folder Mode
```bash
json-to-mock-api -d ./data
```

## CLI Options

- `-f, --file <path>`: Path to JSON file
- `-d, --directory <path>`: Path to folder with JSON files  
- `-p, --port <number>`: Server port (default: 3000)
- `-h, --host <string>`: Server host (default: localhost)

## 📚 Complete Documentation

For detailed documentation, advanced features, examples, and guides, visit:

**[Official Documentation →](https://jsont-to-mock-api.fdoma.in/)**

The documentation includes:
- Complete setup guides
- Folder mode examples
- Advanced JSON structures
- Headers and cookies configuration
- Path parameters usage
- Multiple file organization strategies
- Best practices and tips

## License

MIT

---

**[📖 Read the Full Documentation](https://jsont-to-mock-api.fdoma.in/)** | **[🐛 Report Issues](https://github.com/rubensflinco/json-to-mock-api/issues)** | **[💬 Discussions](https://github.com/rubensflinco/json-to-mock-api/discussions)** 