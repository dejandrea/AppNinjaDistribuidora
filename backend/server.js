require('dotenv').config(); // Isso precisa ser a primeira linha
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const clienteRoutes = require('./routes/clienteRoutes');
app.use('/clientes', clienteRoutes);

const contaRoutes = require('./routes/contaRoutes');
app.use('/contas', contaRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.error('Erro ao conectar MongoDB', err));

// Importar e usar as rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
