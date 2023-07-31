const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/clients', checkAuth, ClientController.showClientsList);
router.get("/addClient", checkAuth, ClientController.createClient);
router.post("/addClient", checkAuth, ClientController.createClientPost);
router.get("/addClientCard", checkAuth, ClientController.createClientCard);
router.post("/addClientCard", checkAuth, ClientController.createClientCardPost);



module.exports = router
