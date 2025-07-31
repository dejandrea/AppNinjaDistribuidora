// controllers/mesaController.js
const Mesa = require('../models/Mesa');
const ItemMesa = require('../models/ItemMesa');

exports.criarMesa = async (req, res) => {
  try {
    const novaMesa = new Mesa(req.body);
    await novaMesa.save();
    res.status(201).json(novaMesa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar mesa' });
  }
};

exports.listarMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find().sort({ dataCriacao: -1 });
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar mesas' });
  }
};

exports.getMesa = async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    const itens = await ItemMesa.find({ mesaId: req.params.id });
    res.json({ mesa, itens });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar mesa' });
  }
};

exports.adicionarItem = async (req, res) => {
  try {
    const { mesaId, descricao, valorUnitario, quantidade } = req.body;
    const total = valorUnitario * quantidade;

    const novoItem = new ItemMesa({
      mesaId,
      descricao,
      valorUnitario,
      quantidade,
      total
    });

    await novoItem.save();

    const totalGeral = await ItemMesa.aggregate([
      { $match: { mesaId: novoItem.mesaId } },
      { $group: { _id: null, soma: { $sum: "$total" } } }
    ]);

    await Mesa.findByIdAndUpdate(mesaId, {
      totalGeral: totalGeral[0]?.soma || 0
    });

    res.status(201).json(novoItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item' });
  }
};

exports.removerItem = async (req, res) => {
  try {
    const item = await ItemMesa.findByIdAndDelete(req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });

    const totalGeral = await ItemMesa.aggregate([
      { $match: { mesaId: item.mesaId } },
      { $group: { _id: null, soma: { $sum: "$total" } } }
    ]);

    await Mesa.findByIdAndUpdate(item.mesaId, {
      totalGeral: totalGeral[0]?.soma || 0
    });

    res.json({ message: 'Item removido' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover item' });
  }
};

exports.fecharMesa = async (req, res) => {
  try {
    const mesa = await Mesa.findByIdAndUpdate(req.params.id, { status: 'fechada' }, { new: true });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fechar mesa' });
  }
};
