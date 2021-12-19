const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
//localhost:333/api/user/

//create user
router.post('/user', user.create)

//find user by email
router.post('/user/get_by_email/', user.findByEmail)

//find user by i_user
router.get('/user/get_by_id/:i_user', user.findOne)

//get all users
router.get('/user/all', user.findAll)

//remove user by id
router.delete('/user/:i_user', user.delete)

//update user by id
router.put('/user/:i_user', user.update)

//get all users with role admin
router.get('/user/all/admins', user.findAllAdmins)

//get all users with role customer
router.get('/user/all/customers', user.findAllCustomers)

module.exports = router