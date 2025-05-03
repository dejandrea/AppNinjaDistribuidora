const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');

// Rotas de Conta
router.get('/', contaController.getContas);
router.get('/codigo/:codigoConta', contaController.getContaByCodigo);
router.get('/cliente/:codigoCliente', contaController.getContasPorCliente);
router.post('/', contaController.createConta);
router.put('/:codigoConta', contaController.updateConta);
router.delete('/:codigoConta', contaController.deleteConta);

module.exports = router;

