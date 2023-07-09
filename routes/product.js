const express = require('express')
const router = express.Router()

const ProductController = require('../app/controllers/ProductController')

router.delete('/delete/:id', ProductController.delete)
router.put('/edit/:id', ProductController.edit)
router.put('/event/:type/:id', ProductController.event)
router.post('/add', ProductController.add)
router.get('/:id', ProductController.showOne)
router.get('/', ProductController.index)


module.exports = router