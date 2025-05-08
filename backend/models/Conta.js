const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contaSchema = new mongoose.Schema({
  codigoConta: { type: Number, unique: true },
  codigoCliente: {
    type: Number,
    required: true,
    ref: 'Cliente' // Referência ao modelo Cliente para usar populate
  },
  valor: { type: Number, required: true },
  dataVencimento: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  tipo: {
    type: String,
    enum: ['debito', 'credito'],
    default: "debito",
    required: true,
  },
  dataLancamento: {
    type: Date,
    default: Date.now(),
  },
  observacoes: String,
}, { timestamps: true });

contaSchema.plugin(AutoIncrement, { inc_field: 'codigoConta' });

module.exports = mongoose.model('Conta', contaSchema);


