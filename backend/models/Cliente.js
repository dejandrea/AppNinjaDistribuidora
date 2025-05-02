const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  apelido:String,
  telefone: String,
  email: String,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
