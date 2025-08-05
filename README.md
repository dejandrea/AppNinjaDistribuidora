## 💾 Sistema de Gestão para Pequenos Negócios

Sistema web completo com controle de clientes, contas, mesas e comandas — ideal para pequenos negócios, bares, distribuidoras e afins.
Desenvolvido com **React**, **Node.js**, **Express** e **MongoDB**.

---

### 📌 Funcionalidades

* ✅ Cadastro e edição de **clientes**
* ✅ Controle de **mesas**: abrir, editar, fechar
* ✅ Gerenciamento de **contas/comandas**
* ✅ Tela administrativa para gestão
* ✅ Sistema em constante evolução (versão 2 com novo layout e login em desenvolvimento)

---

### 🛠️ Tecnologias Utilizadas

#### Frontend

* React
* Axios
* React Router
* Vite ou CRA

#### Backend

* Node.js
* Express.js
* Mongoose
* MongoDB Atlas
* dotenv

#### Outros

* Render (deploy do backend)
* Vercel (deploy do frontend)

---

### 🚀 Como Rodar Localmente

#### 📁 Clonar o projeto

```bash
git clone https://github.com/dejandrea/AppNinjaDistribuidora.git
cd AppNinjaDistribuidora
```

#### 🔧 Configurar Backend

1. Entre na pasta `backend`:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com o seguinte conteúdo:

```env
PORT=5000
MONGODB_URI=sua-uri-do-mongo
CORS_ORIGIN=http://localhost:5173
```

4. Inicie o servidor:

```bash
npm start
```

---

#### 💻 Configurar Frontend

1. Entre na pasta `frontend`:

```bash
cd ../frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com:

```env
REACT_APP_API_URL=http://localhost:5000
```

4. Inicie o servidor React:

```bash
npm run dev
```

---

### 🌐 Deploy

* **Backend:** hospedado na [Render](https://render.com/)
* **Frontend:** hospedado na [Vercel](https://vercel.com/)

---

### 📦 Estrutura do Projeto

```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── .env
│   └── server.js
│
└── frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services (axios/api.js)
    │   └── App.jsx
    └── .env
```

---

### ✅ Próximas Versões (roadmap)

* 🔒 Tela de login e autenticação (v3)
* 📊 PDV
* 👥 Permissões de usuário
* 📱 Responsividade mobile

---

### 👩‍💻 Desenvolvido por

Andrea França
[linkedin.com/in/andrea-de-j-s-frança-35866272](www.linkedin.com/in/andrea-de-j-s-frança-35866272)
