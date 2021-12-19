const express = require('express')
const router = express.Router()
const correspondence = require('../controllers/correspondence.controller')
const replies = require ('../controllers/replies.controller')
const comments = require ('../controllers/comments.controller')

//localhost:5000/api/ticket/reply

router.get('/correspondence/tt/:i_ticket', correspondence.verboseAllByTicket)
router.get('/replies/tt/:i_ticket', replies.findAllByTicket)
router.get('/comments/tt/:i_ticket', comments.findAllByTicket)

module.exports = router