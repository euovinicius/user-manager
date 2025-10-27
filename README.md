Perfeito. Vou **reorganizar**, **corrigir formatação**, **incluir blocos de código corretos**, remover duplicações e deixar **pronto para copiar e colar**.

Aqui está o **README completo e corrigido**:

---

### ✅ **README.md — copie e cole**

````md
# User Manager

Aplicação completa de gerenciamento de usuários com autenticação, painel administrativo, edição de dados e preenchimento automático de endereço via CEP (ViaCEP).

---

## 🧱 Tecnologias Utilizadas

- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS**
- **NextAuth (Credentials + JWT)**
- **Prisma ORM** + **SQLite** (desenvolvimento local)
- **bcrypt** (hash de senhas)
- **ViaCEP API** (preenchimento automático de endereço)

---

## 🚀 Funcionalidades

| Recurso | Descrição |
|--------|-----------|
| Cadastro de usuário | Nome, e-mail, senha (com hash), CEP → cidade/UF automatizados |
| Login | Autenticação segura com JWT via NextAuth |
| Área logada `/app` | Acessível apenas após login |
| Painel Admin `/admin` | Controle de usuários (somente `role = admin`) |
| Editar usuário | Nome, E-mail, CEP, Cidade, Estado e Role |
| Excluir usuário | Remoção direta no painel |
| Controle de permissões | `user` (restrito) / `admin` (acesso total) |

---

## 🧰 Pré-requisitos

- Node.js **18+**
- npm

> O banco SQLite funciona **sem configuração adicional**.

---

## 📦 Instalação

```bash
# Clone o projeto
git clone <url-do-repositorio>

cd user-manager

# Instale as dependências
npm install
````

---

## 🔧 Configuração de Ambiente

Crie um arquivo **.env** na raiz do projeto:

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET=SUA_CHAVE_SECRETA_AQUI
```

### Gerar um AUTH_SECRET seguro:

```bash
npx auth secret
```

Copie o valor e substitua no `.env`.

---

## 🗄️ Configurando o Banco de Dados (Prisma + SQLite)

```bash
npx prisma migrate dev --name init
```

### Opcional: visualizar o banco

```bash
npx prisma studio
```

---

## 🏃 Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

### Produção Local (simulação)

```bash
npm run build
npm start
```

---

## 🔐 Tornando um Usuário Administrador

Por padrão, todos os usuários novos têm:

```
role = "user"
```

Para promover um usuário para admin:

```bash
npx prisma studio
```

* Abra a tabela **User**
* Localize o usuário
* Altere o campo `role` para:

```
admin
```

Salve e feche.

---

## 🗂️ Estrutura do Projeto

```
src/
  app/
    signup/          # Cadastro com preenchimento automático de CEP
    login/           # Login e autenticação
    app/             # Área acessada após login
    admin/           # Painel administrativo (listar, editar, excluir)
  auth.ts            # Configuração do NextAuth (session, jwt, providers)
  middleware.ts      # Proteções de rota (/app e /admin)
prisma/
  schema.prisma       # Modelo do banco SQLite
```
