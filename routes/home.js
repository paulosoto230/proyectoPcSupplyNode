const express = require('express');
const { primeraVista } = require('../Controllers/HomeControllers');
const verificarLogeo = require('../middlewares/verificarLogeo');
const router = express.Router();

// rutas
router.get("/",verificarLogeo, primeraVista)

module.exports = router