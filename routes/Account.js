const express = require('express');
const { account, editAccountForm, editAccount } = require('../Controllers/AccountControllers');
const router = express.Router();
const verificarUser = require('../middlewares/verificarUser')
const verificarLogeo = require('../middlewares/verificarLogeo')

router.get("/",verificarLogeo, account)
router.get("/editAccountForm",verificarLogeo, editAccountForm)
router.post("/editAccount",verificarLogeo, editAccount)


module.exports = router