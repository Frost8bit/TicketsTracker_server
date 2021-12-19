const express = require('express')
const router = express.Router()
const reply = require('../controllers/replies.controller')
//localhost:5000/api/ticket/reply
router.post('/reply', reply.create)
router.get('/reply/:i_reply', reply.findOne)
router.get('/reply/tt/:i_ticket', reply.findAllByTicket)
module.exports = router