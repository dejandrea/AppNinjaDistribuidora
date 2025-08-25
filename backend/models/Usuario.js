const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const usuarioSchema = new mongoose.Schema({
  codigoUsuario: { type: Number, unique: true }, 
  nome: { type: String, required: true },
  telefone: { type: String },
  endereco: { type: String },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  ativo: { type: Boolean, default: true },  
  status: { type: String, enum: ['liberado', 'bloqueado'], default: 'liberado' },
  observacoes: { type: String }
}, { timestamps: true });

// campo códigoUsuario autoincremental
usuarioSchema.plugin(AutoIncrement, { inc_field: 'codigoUsuario' });

module.exports = mongoose.model('Usuario', usuarioSchema);


