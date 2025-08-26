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
    const usuario = await Usuario.findOne({ codigoUsuario: req.params.codigoUsuario });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    const { nome, email, senha } = req.body;

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    if (senha) {
      // se a senha foi enviada, gera novo hash
      usuario.senha = await bcrypt.hash(senha, saltRounds);
    }

    const usuarioAtualizado = await usuario.save();
    res.json(usuarioAtualizado);
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
