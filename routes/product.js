const express = require('express');
const { ingresarProducto, listarProductos, productoSeleccionado, carritoCompra, filtrarCategoria } = require('../Controllers/ProductControllers');
const router = express.Router();

router.get("/", listarProductos)
router.post("/crear",ingresarProducto)
router.get("/ver/:id",productoSeleccionado)
router.get("/carrito", carritoCompra)
router.get("/filtrar/:id", filtrarCategoria)
module.exports = router

