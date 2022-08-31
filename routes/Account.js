const express = require('express');
const { account } = require('../Controllers/AccountControllers');
const router = express.Router();
const verificarUser = require('../middlewares/verificarUser')
const verificarLogeo = require('../middlewares/verificarLogeo')

router.get("/",verificarLogeo, account)

module.exports = router