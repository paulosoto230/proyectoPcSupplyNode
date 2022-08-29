const express = require('express');
const { formularioCompra } = require('../Controllers/CompraControllers');
const router = express.Router();
const verificarUser = require("../middlewares/verificarUser")

router.get("/",verificarUser, formularioCompra)

module.exports = router