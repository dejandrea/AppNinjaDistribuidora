// routes/mesaRoutes.js
const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');

router.post('/mesas', mesaController.criarMesa);
router.get('/mesas', mesaController.listarMesas);
router.get('/mesas/:id', mesaController.getMesa);
router.post('/mesas/:id/itens', mesaController.adicionarItem);
router.delete('/itens-mesa/:itemId', mesaController.removerItem);
router.put('/mesas/:id/fechar', mesaController.fecharMesa);

module.exports = router;
