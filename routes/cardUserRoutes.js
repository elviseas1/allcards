const express = require('express')
const router = express.Router()
const CardUserController = require('../controllers/CardUserController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

//
router.get('/cardUser', checkAuth, CardUserController.showCardUser)
router.get("/cardUser/:id", checkAuth, CardUserController.updateCardUser);
router.post("/cardUser", checkAuth, CardUserController.updateCardUserSave);
router.post("/cardUser/D", checkAuth, CardUserController.updateCardUserSaveD);
router.get('/loginQrCode/:id', CardUserController.loginQrCode)
router.post('/loginQrCode/:id', CardUserController.loginQrCodePost)
router.get('/iCCU/:id', CardUserController.insertCodCarUser)



module.exports = router