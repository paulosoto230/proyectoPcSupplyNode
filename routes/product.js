const express = require('express');
const { ingresarProducto, listarProductos, productoSeleccionado, carritoCompra, filtrarCategoria } = require('../Controllers/ProductControllers');
const verificarLogeo = require('../middlewares/verificarLogeo');
const router = express.Router();

router.get("/",verificarLogeo, listarProductos)
router.post("/crear",verificarLogeo,ingresarProducto)
router.get("/ver/:id",verificarLogeo,productoSeleccionado)
router.get("/carrito",verificarLogeo, carritoCompra)
router.get("/filtrar/:id",verificarLogeo, filtrarCategoria)
module.exports = router

