const express = require('express')
const router = express.Router()
const userController = require('./../controllers/usersController')
const usersValidation = require('./../validations/userValidation')

router.post('/register',usersValidation(),userController.register)
router.post('/login',userController.login)

module.exports = router
