const express = require('express');
const { formularioCompra } = require('../Controllers/CompraControllers');
const verificarLogeo = require('../middlewares/verificarLogeo');
const router = express.Router();
const verificarUser = require("../middlewares/verificarUser")

router.get("/",verificarUser,verificarLogeo, formularioCompra)

module.exports = router