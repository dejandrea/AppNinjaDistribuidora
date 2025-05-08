const Conta = require('../models/Conta');
const Cliente = require('../models/Cliente');

// Função auxiliar para atualizar status do cliente com base no saldo
const atualizarStatusCliente = async (codigoCliente) => {
  // Busca o cliente
  const cliente = await Cliente.findOne({ codigoCliente });
  if (!cliente) return;

  // Calcula o saldo: somatório de débitos - créditos
  const [soma] = await Conta.aggregate([
    { $match: { codigoCliente } },
    {
      $group: {
        _id: '$codigoCliente',
        totalDebito: {
          $sum: {
            $cond: [{ $eq: ['$tipo', 'debito'] }, '$valor', 0]
          }
        },
        totalCredito: {
          $sum: {
            $cond: [{ $eq: ['$tipo', 'credito'] }, '$valor', 0]
          }
        }
      }
    },
    {
      $project: {
        saldo: { $subtract: ['$totalDebito', '$totalCredito'] }
      }
    }
  ]);

  const saldo = soma?.saldo || 0;

  // Atualiza status com base no limite
  const novoStatus = saldo >= cliente.limite ? 'bloqueado' : 'liberado';
  if (cliente.status !== novoStatus) {
    cliente.status = novoStatus;
    await cliente.save();
  }
};

// GET todas as contas
exports.getContas = async (req, res) => {
  try {
    const contas = await Conta.aggregate([
      {
        $lookup: {
          from: 'clientes',
          localField: 'codigoCliente',
          foreignField: 'codigoCliente',
          as: 'clienteInfo'
        }
      },
      {
        $unwind: {
          path: '$clienteInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          codigoConta: 1,
          codigoCliente: 1,
          valor: 1,
          tipo: 1,
          dataVencimento: 1,
          dataLancamento: 1,
          createdAt: 1,
          updatedAt: 1,
          clienteNome: '$clienteInfo.nome'
        }
      }
    ]);

    res.json(contas);
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

    // Atualiza status do cliente após salvar a conta
    await atualizarStatusCliente(novaConta.codigoCliente);

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

    // Atualiza status do cliente após editar conta
    await atualizarStatusCliente(contaAtualizada.codigoCliente);

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

    // Atualiza status do cliente após deletar conta
    await atualizarStatusCliente(contaDeletada.codigoCliente);

    res.status(200).json({ mensagem: 'Conta deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};