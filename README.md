🍳 API de Receitas Culinárias

API RESTful para gerenciamento de receitas culinárias, chefs, usuários e interações sociais.

🚀 Tecnologias Utilizadas

Backend: Node.js

Banco de Dados: MySQL

ORM: Sequelize
 (opcional, caso utilize ORM)

Autenticação: JWT

Upload de Arquivos: Multer

Documentação: Swagger/OpenAPI

📌 Funcionalidades

Chefs: CRUD completo com paginação e busca

Receitas: CRUD com filtros, paginação e vínculo a chefs

Uploads: Upload e gerenciamento de imagens de receitas

Usuários: Registro, perfil, atualização e segurança (hash de senha)

Autenticação JWT: Login, logout, refresh token e middleware de proteção

Favoritas: Usuários podem salvar e gerenciar receitas favoritas

Curtidas: Curtir/descurtir receitas com ranking das mais populares

Comentários: CRUD de comentários com sistema de estrelas e moderação

⚙️ Instalação e Configuração
1. Clone o repositório
git clone https://github.com/seu-usuario/api-receitas.git
cd api-receitas

2. Instale as dependências
npm install

3. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=receitas_db
JWT_SECRET=seu_segredo
JWT_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=7d
UPLOADS_DIR=uploads/

4. Configure o banco de dados

Crie o banco no MySQL:

CREATE DATABASE receitas_db;

5. Execute as migrações (se estiver usando Sequelize ou similar)
npx sequelize db:migrate

6. Inicie o servidor
npm run dev


A API estará disponível em:
👉 http://localhost:3000/api

📂 Estrutura Básica das Rotas
🔹 Chefs
GET    /api/chefs
GET    /api/chefs/:id
POST   /api/chefs
PUT    /api/chefs/:id
DELETE /api/chefs/:id

🔹 Receitas
GET    /api/receitas
GET    /api/receitas/:id
GET    /api/receitas?chef=:id
POST   /api/receitas
PUT    /api/receitas/:id
DELETE /api/receitas/:id

🔹 Uploads
POST   /api/receitas/:id/imagem
GET    /uploads/receitas/:filename
DELETE /api/receitas/:id/imagem

🔹 Usuários & Autenticação
POST   /api/usuarios/registro
GET    /api/usuarios/perfil
PUT    /api/usuarios/perfil
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh

🔹 Favoritas
POST   /api/favoritas
DELETE /api/favoritas/:id
GET    /api/favoritas
GET    /api/favoritas/:id

🔹 Curtidas
POST   /api/receitas/:id/curtir
DELETE /api/receitas/:id/curtir
GET    /api/usuarios/curtidas
GET    /api/receitas/populares

🔹 Comentários
POST   /api/receitas/:id/comentarios
GET    /api/receitas/:id/comentarios
PUT    /api/comentarios/:id
DELETE /api/comentarios/:id

📊 Modelos de Dados (exemplo)
Chef
{
  "id": 1,
  "nome": "Gordon Ramsay",
  "biografia": "Chef internacionalmente renomado",
  "especialidade": "Culinária Britânica",
  "experiencia": 25,
  "nacionalidade": "Reino Unido"
}

Receita
{
  "id": 1,
  "titulo": "Risoto de Cogumelos",
  "descricao": "Risoto cremoso com cogumelos frescos",
  "ingredientes": "Arroz arbóreo, cogumelos, vinho branco, parmesão...",
  "modoPreparo": "Refogue os cogumelos, adicione o arroz e cozinhe...",
  "tempoPreparo": 45,
  "porcoes": 4,
  "dificuldade": "Média",
  "chefs": [1, 2],
  "imagemUrl": "/uploads/receitas/risoto.jpg"
}

📖 Documentação

A documentação completa da API pode ser acessada via Swagger:
👉 http://localhost:3000/api-docs

✅ Próximos Passos

Configurar deploy em produção

Criar testes automatizados (unitários e integração)

Adicionar monitoramento e logs
