const express = require('express')
const router = express.Router()
const ticket = require('../controllers/ticket.controller')
//localhost:333/api/tickets/
router.get('/tickets/get_by_owner/:name', ticket.findAllByOwner)
router.get('/tickets/get_by_creator/:name', ticket.findAllByCreator)
router.get('/tickets', ticket.findAll)
router.get('/tickets/:i_ticket', ticket.findOne)
router.put('/tickets/:i_ticket', ticket.update)
router.post('/tickets', ticket.create)
router.delete('/tickets/:i_ticket', ticket.delete)
module.exports = router