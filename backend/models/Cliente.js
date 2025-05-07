const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const clienteSchema = new mongoose.Schema({
  codigoCliente: { type: Number, unique: true }, 
  nome: { type: String, required: true },
  apelido: { type: String},
  telefone: { type: String },
  email: { type: String },
  endereco: { type: String },
  ativo: { type: Boolean, default: true },  
  status: { type: String, enum: ['liberado', 'bloqueado'], default: 'liberado' },
  limite:{type:Number, default:100},
  observacoes: { type: String }
}, { timestamps: true });

// campo códigoCliente autoincremental
clienteSchema.plugin(AutoIncrement, { inc_field: 'codigoCliente' });

module.exports = mongoose.model('Cliente', clienteSchema);


