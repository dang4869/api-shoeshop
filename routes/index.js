const express = require('express');
const router = express.Router()
const authRouter = require('./auth')
const productRouter = require('./product')
const categoryRouter = require('./category')

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)

module.exports = router