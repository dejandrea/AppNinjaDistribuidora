// models/Mesa.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MesaSchema = new mongoose.Schema({
    codigoMesa: { type: Number, unique: true },
  nomeCliente: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: String,
    enum: ['aberta', 'fechada'],
    default: 'aberta',
  },
  totalGeral: {
    type: Number,
    default: 0,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  }
});

MesaSchema.plugin(AutoIncrement, { inc_field: 'codigoMesa' });

module.exports = mongoose.model('Mesa', MesaSchema);
