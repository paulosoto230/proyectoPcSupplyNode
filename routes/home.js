const express = require('express');
const { primeraVista } = require('../Controllers/HomeControllers');
const router = express.Router();

// rutas
router.get("/", primeraVista)

module.exports = router