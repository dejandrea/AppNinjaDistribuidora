const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// número de rounds para gerar o salt (quanto maior, mais seguro, mas mais lento)
const saltRounds = 10;

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsuarioByCodigo = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ codigoUsuario: req.params.codigoUsuario });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // gera o hash da senha
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const usuario = new Usuario({
      nome,
      email,
      senha: hashedPassword
    });

    const novoUsuario = await usuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { senha, ...resto } = req.body;

    // Remove campos vazios (string vazia, null ou undefined)
    const dadosParaAtualizar = {};
    for (const [key, value] of Object.entries(resto)) {
      if (value !== "" && value !== null && value !== undefined) {
        dadosParaAtualizar[key] = value;
      }
    }

    // Se senha foi enviada e não está vazia, gera hash
    if (senha && senha.trim() !== "") {
      dadosParaAtualizar.senha = await bcrypt.hash(senha, saltRounds);
    }

    const usuarioAtualizado = await Usuario.findOneAndUpdate(
      { codigoUsuario: req.params.codigoUsuario },
      dadosParaAtualizar,
      { new: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(usuarioAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ error: 'Senha inválida' });

    res.json({ message: 'Login realizado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login', detalhes: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findOneAndDelete({ codigoUsuario: req.params.codigoUsuario });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
