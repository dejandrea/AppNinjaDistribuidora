require('dotenv').config(); // Isso precisa ser a primeira linha
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Exemplo de rota inicial
// app.get('/', (req, res) => res.send('API online'));

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("MongoDB conectado!"))
//   .catch(err => console.error("Erro ao conectar MongoDB", err));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.error('Erro ao conectar MongoDB', err));

app.use(express.json());

// Importar e usar as rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
