const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rotas do Cliente
router.get('/', clienteController.getClientes);
router.get('/codigo/:codigoCliente', clienteController.getClienteByCodigo);
router.post('/', clienteController.createCliente);
router.put('/:codigoCliente', clienteController.updateCliente);
router.delete('/:codigoCliente', clienteController.deleteCliente);

module.exports = router;

