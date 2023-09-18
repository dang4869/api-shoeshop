const express = require('express');
const router = express.Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const productRouter = require('./product')
const categoryRouter = require('./category')

const { protect } = require('../app/middleware/auth');

router.use('/auth', authRouter)
router.use('/user', protect, userRouter)
router.use('/product', protect, productRouter)
router.use('/category', protect, categoryRouter)

module.exports = router