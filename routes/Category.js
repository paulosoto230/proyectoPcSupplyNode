const express = require('express');
const { crearCategoria } = require('../Controllers/CategoryControllers');
const router = express.Router();


router.post("/crear", crearCategoria)

module.exports = router