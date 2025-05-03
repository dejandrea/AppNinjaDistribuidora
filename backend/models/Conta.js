const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contaSchema = new mongoose.Schema({
  codigoConta: { type: Number, unique: true },   // Código da conta autoincremento
  codigoCliente: { type: Number, required: true },  // Referência para o Cliente
  valor: { type: Number, required: true },         // Valor da conta
  dataVencimento: { type: Date, default: () => new Date(Date.now() + 30*24*60*60*1000) },  // Data de vencimento, padrão: 30 dias à partir da data atual
  status: { type: String, enum: ['pendente', 'pago'], default: 'pendente' },  // Status da conta (pendente ou pago), padrão: pendente
}, { timestamps: true });

// campo códigoConta autoincremental
contaSchema.plugin(AutoIncrement, { inc_field: 'codigoConta' });

module.exports = mongoose.model('Conta', contaSchema);


