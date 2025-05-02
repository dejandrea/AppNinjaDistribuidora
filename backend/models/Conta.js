const mongoose = require('mongoose');

const ContaSchema = new mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  dataVencimento: {
    type: Date,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pendente', 'Pago'],
    default: 'Pendente'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Conta', ContaSchema);
