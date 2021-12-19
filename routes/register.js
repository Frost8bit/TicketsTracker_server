const express = require('express')
const router = express.Router()
const register = require('../controllers/register.controller')
//localhost:5000/api/register/
router.post('/register', register.create)
module.exports = router