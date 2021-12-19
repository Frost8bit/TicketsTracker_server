const express = require('express')
const router = express.Router()
const company = require('../controllers/company.controller')
//localhost:333/api/companies/
router.get('/companies', company.findAll)
router.get('/company/:i_company', company.findOne)
router.put('/company/:i_company', company.update)
router.post('/company', company.create)
router.delete('/company/:i_company', company.delete)
module.exports = router