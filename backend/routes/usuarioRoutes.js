// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas de Usuário
router.get('/', usuarioController.getUsuarios);
router.get('/codigo/:codigoUsuario', usuarioController.getUsuarioByCodigo);
router.post('/login',usuarioController.login);
router.post('/', usuarioController.createUsuario);
router.put('/:codigoUsuario', usuarioController.updateUsuario);
router.delete('/:codigoUsuario', usuarioController.deleteUsuario);

module.exports = router;

