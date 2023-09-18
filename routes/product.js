const express = require('express')
const router = express.Router()

const ProductController = require('../app/controllers/ProductController')
const { protect } = require('../app/middleware/auth')

router.delete('/delete/:id', ProductController.delete)
router.put('/edit/:id', ProductController.edit)
router.put('/event/:type/:id', ProductController. event)
router.post('/add', ProductController.add)
router.get('/:id', ProductController.showOne)
router.get('/',protect, ProductController.index)


module.exports = router