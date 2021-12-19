const express = require('express')
const router = express.Router()
const loginController = require('../controllers/sign-in.controller')
//localhost:333/api/login
router.post('/login', loginController.authenticate)
module.exports = router