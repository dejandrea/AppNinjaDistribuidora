const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');

router.post('/', contaController.criarConta);
router.get('/', contaController.listarContas);
router.delete('/:id', contaController.excluirConta);

module.exports = router;
