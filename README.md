# LiveCodeBackendTT25.2

Projeto backend desenvolvido durante o Live Code do curso TT25.2 da EJCM.

Este repositório serve como base para criação de APIs REST com TypeScript, Express e Prisma, utilizando boas práticas e organização modular.

---

## ⚠️ Observações

- O `schema.prisma` utiliza um campo `password`, que **não segue o padrão da EJCM**.
- As rotas **não estão protegidas com autenticação por token**, como normalmente é feito na EJCM.

---

## 🛠️ Passo a Passo para Recriar o Projeto

### 1. Crie a estrutura inicial com Lemon Pie CLI

```bash
npm install -g lemon-pie-cli
lemon-pie create    # selecione a opção "prisma" quando solicitado
```

### 2. Configure o package.json
Adicione o seguinte trecho para informar onde está o schema do Prisma
```bash
"prisma": {
  "schema": "src/models/schema.prisma"
},
```
Também adicione o script de start
```bash
"start": "npx ts-node-dev --transpile-only --no-notify server.ts"
```

### 3. Atualize o tsconfig.json
Altere o target para suportar recursos mais modernos do ECMAScript
```bash
"target": "es2016"
```
por
```bash
"target": "es2022"
```

### 4. Ajuste a estrutura de pastas
- Renomeie a pasta prisma para models.
- Apague o .env, depois copie o arquivo .env.example para a raiz do projeto e renomeie para .env.

### 5. Configure o banco de dados PostgreSQL
Crie um banco no PostgreSQL local e atualize o .env com a string de conexão
```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE?schema=public
```
Substitua:
- **"PASSWORD"** pela senha do seu usuário postgres
- **"DATABASE"** pelo nome do banco criado

### 6. Comandos úteis e Instalação de Dependências
Gerar arquivos do Prisma (sempre que alterar o schema)
```bash
npx prisma generate
```
Uso do cors
```bash
npm install --save-dev @types/cors
```
Uso do zod
```bash
npm install zod
```
Uso do multer
```bash
npm install multer @types/multer
```
Uso do seed
```bash
npm install @faker-js/faker -D
```
Adicione também no package.json
```bash
"seed": "ts-node src/models/seed/seeder.ts"
```
Para executar a seed basta dar esse comando
```bash
npx prisma db seed
```
