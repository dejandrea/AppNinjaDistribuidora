const Conta = require('../models/Conta');

// GET todas as contas
exports.getContas = async (req, res) => {
  try {
    const contas = await Conta.find().populate('codigoCliente', 'nome codigoCliente');
    res.status(200).json(contas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// GET conta por codigoConta
exports.getContaByCodigo = async (req, res) => {
  try {
    const conta = await Conta.findOne({ codigoConta: req.params.codigoConta }).populate('codigoCliente', 'nome codigoCliente');
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada' });
    res.status(200).json(conta);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// GET contas por codigoCliente
exports.getContasPorCliente = async (req, res) => {
  try {
    const contas = await Conta.find({ codigoCliente: req.params.codigoCliente }).populate('codigoCliente', 'nome codigoCliente');
    res.status(200).json(contas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// POST nova conta
exports.createConta = async (req, res) => {
  try {
    const novaConta = new Conta(req.body);
    await novaConta.save();
    res.status(201).json(novaConta);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// PUT atualizar conta por codigoConta
exports.updateConta = async (req, res) => {
  try {
    const contaAtualizada = await Conta.findOneAndUpdate(
      { codigoConta: req.params.codigoConta },
      req.body,
      { new: true }
    );
    if (!contaAtualizada) return res.status(404).json({ mensagem: 'Conta não encontrada' });
    res.status(200).json(contaAtualizada);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// DELETE conta por codigoConta
exports.deleteConta = async (req, res) => {
  try {
    const contaDeletada = await Conta.findOneAndDelete({ codigoConta: req.params.codigoConta });
    if (!contaDeletada) return res.status(404).json({ mensagem: 'Conta não encontrada' });
    res.status(200).json({ mensagem: 'Conta deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
