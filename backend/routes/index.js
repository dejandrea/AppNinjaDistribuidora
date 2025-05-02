const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API da Ninja Distribuidora funcionando 🚀');
});

module.exports = router;
