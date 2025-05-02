const Cliente = require('../models/Cliente');

exports.criarCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.json({ mensagem: 'Cliente excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
