const Cliente = require('../models/Cliente');

// GET todos os clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// GET cliente por codigoCliente
exports.getClienteByCodigo = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ codigoCliente: req.params.codigoCliente });
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// POST novo cliente
exports.createCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// PUT atualizar cliente por codigoCliente
exports.updateCliente = async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.findOneAndUpdate(
      { codigoCliente: req.params.codigoCliente },
      req.body,
      { new: true }
    );
    if (!clienteAtualizado) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.status(200).json(clienteAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// DELETE cliente por codigoCliente
exports.deleteCliente = async (req, res) => {
  try {
    const clienteDeletado = await Cliente.findOneAndDelete({ codigoCliente: req.params.codigoCliente });
    if (!clienteDeletado) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.status(200).json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

