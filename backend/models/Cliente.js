const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const clienteSchema = new mongoose.Schema({
  codigoCliente: { type: Number, unique: true },  // Código do cliente autoincremento
  nome: { type: String, required: true },          // Nome obrigatório
  apelido: { type: String },
  telefone: { type: String },
  email: { type: String },
  endereco: { type: String },
  ativo: { type: Boolean, default: true },         // Ativo (Sim/Não), padrão: sim
  observacoes: { type: String }
}, { timestamps: true });

// campo códigoCliente autoincremental
clienteSchema.plugin(AutoIncrement, { inc_field: 'codigoCliente' });

module.exports = mongoose.model('Cliente', clienteSchema);


