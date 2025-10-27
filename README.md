# User Manager

Aplicação completa de gerenciamento de usuários com autenticação, painel administrativo, edição de dados e preenchimento automático de endereço via CEP (ViaCEP).

Tecnologias usadas:

- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS**
- **NextAuth (Credentials)** com JWT
- **Prisma ORM** + **SQLite** (modo desenvolvimento)
- **bcrypt** para hashing de senhas
- **ViaCEP API** para consulta automática de endereço no /signup e /admin/editar

---

## 🚀 Funcionalidades

| Recurso | Descrição |
|--------|-----------|
| Cadastro de usuário | Nome, e-mail, senha (com hash), CEP → cidade/UF preenchidos automaticamente |
| Login e sessão | Controle de acesso com NextAuth (JWT) |
| Área autenticada `/app` | Apenas usuários logados podem acessar |
| Painel Admin `/admin` | Controle de usuários (apenas `role=admin`) |
| Editar usuário | Atualização de nome, email, CEP, cidade, UF e role |
| Excluir usuário | Remoção direta pelo painel |
| Proteção por role | `user` → acesso limitado / `admin` → acesso total |

---

## 🧰 Pré-requisitos

- Node.js 18+
- npm

> Banco SQLite já funciona **sem instalar nada**.

---

## 📦 Instalação

```bash
# Clone o projeto
git clone <url-do-repositorio>

cd user-manager

# Instale dependências
npm install
