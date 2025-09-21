# 🍳 API de Receitas Culinárias  

API RESTful para gerenciamento de receitas culinárias, chefs, usuários e interações sociais.  

---

## 🚀 Tecnologias Utilizadas  
- **Backend:** Node.js  
- **Banco de Dados:** MySQL  
- **ORM:** Sequelize (opcional)  
- **Autenticação:** JWT  
- **Upload de Arquivos:** Multer  
- **Documentação:** Swagger/OpenAPI  

---

## 📌 Funcionalidades  
- **Chefs:** CRUD completo com paginação e busca  
- **Receitas:** CRUD com filtros, paginação e vínculo a chefs  
- **Uploads:** Upload e gerenciamento de imagens de receitas  
- **Usuários:** Registro, perfil, atualização e segurança (hash de senha)  
- **Autenticação JWT:** Login, logout, refresh token e middleware de proteção  
- **Favoritas:** Usuários podem salvar e gerenciar receitas favoritas  
- **Curtidas:** Curtir/descurtir receitas com ranking das mais populares  
- **Comentários:** CRUD de comentários com sistema de estrelas e moderação  

---

## ⚙️ Instalação e Configuração  

### 1. Clone o repositório  
```bash
git clone https://github.com/caioarchive/api_receitas.git
cd api-receitas
