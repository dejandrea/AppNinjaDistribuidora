const Conta = require('../models/Conta');

exports.criarConta = async (req, res) => {
  try {
    const conta = new Conta(req.body);
    await conta.save();
    res.status(201).json(conta);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarContas = async (req, res) => {
  try {
    const contas = await Conta.find().populate('clienteId', 'nome');
    res.json(contas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.excluirConta = async (req, res) => {
  try {
    const { id } = req.params;
    await Conta.findByIdAndDelete(id);
    res.json({ mensagem: 'Conta excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
