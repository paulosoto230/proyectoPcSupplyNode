const express = require('express');
const { account, editAccountForm } = require('../Controllers/AccountControllers');
const router = express.Router();
const verificarUser = require('../middlewares/verificarUser')
const verificarLogeo = require('../middlewares/verificarLogeo')

router.get("/",verificarLogeo, account)
router.get("/editAccountForm",verificarLogeo, editAccountForm)



module.exports = router