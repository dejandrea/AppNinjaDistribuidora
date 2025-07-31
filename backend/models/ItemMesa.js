// models/ItemMesa.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ItemMesaSchema = new mongoose.Schema({
  codigoMesa: {
    type: Number,
    required: true,
    ref: 'Mesa'
  },
  descricao: {
    type: String,
    required: true,
  },
  valorUnitario: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('ItemMesa', ItemMesaSchema);
