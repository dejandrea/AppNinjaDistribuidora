require('dotenv').config(); // Isso precisa ser a primeira linha
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

const clienteRoutes = require('./routes/clienteRoutes');
app.use('/clientes', clienteRoutes);

const contaRoutes = require('./routes/contaRoutes');
app.use('/contas', contaRoutes);

const mesaRoutes = require('./routes/mesaRoutes');
app.use('/mesas', mesaRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.error('Erro ao conectar MongoDB', err));

// Importar e usar as rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta:${PORT}`);
});
