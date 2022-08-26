const express = require('express');
const { formularioCompra } = require('../Controllers/CompraControllers');
const router = express.Router();


router.get("/", formularioCompra)

module.exports = router