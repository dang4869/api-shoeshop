const express = require('express')
const router = express.Router()

const AuthController = require('../app/controllers/AuthController')
const {protect, authorize} = require('../app/middleware/auth')

router.post('/forgotPassword', AuthController.forgotPassword)
router.post('/resetPassword/:resetToken', AuthController.resetPassword)
router.get('/logout', AuthController.logout)
router.get('/me',protect, AuthController.me)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router