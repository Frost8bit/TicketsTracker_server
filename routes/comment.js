const express = require('express')
const router = express.Router()
const comment = require('../controllers/comments.controller')
//localhost:5000/api/ticket/comment/
router.post('/comment', comment.create)
router.get('/comment/:i_comment', comment.findOne)
router.get('/comment/tt/:i_ticket', comment.findAllByTicket)
module.exports = router