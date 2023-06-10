# Node.js

## Arquitetura Monolítica

- Visão
- Controle
- Módulo
- Banco de dados.

Tudo junto numa única linguagem.

Muito rígido.

## Microserviços

- Front-end
  - Web
  - Mobile
- Back-End
  - Api
  - Sistema de Rotas
  - Banco de Dados

Tudo integrado e interligado entre si sem a necessidade concreta de utilziar apenas uma linguagem.
Padrão para transferência de dados. Conectar vários aplicações diferentes entre si.

É possível escalar o sistema facilmente.

## Node.js

### **npm init**

```json
// package.json
{
  "name": "segunda_aula",
  "version": "1.0.0",
  "description": "Aula sobre nodejs do xandão",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Carlos Eduardo",
  "license": "ISC"
}
```

### **npm install express**

```json
// package.json
"dependencies": {
    "express": "^4.18.2"
  }
```

### **npm install -D nodemon**

```json
// package.json
"devDependencies": {
    "nodemon": "^2.0.20"
  }
```

### **Scripts**

```json
// package.json
"scripts": {
    "devStart": "nodemon server.js"
  }
```

### **npm install -D dotenv**

```js
// .env
PORT = 5000;
```

```js
//server.js
const app = require("./app");
require("dotenv").config();

// Define a porta do serviço.
app.set("port", process.env.PORT || 5000);

// Inicio do servidor.
const server = app.listen(app.get("port"), () => {
  console.log("O servidor está rodando na porta " + app.get("port"));
});
```

```js
//app.js
const express = require("express");
const app = express();

module.exports = app;
```

Pense em um cenário
4 models
