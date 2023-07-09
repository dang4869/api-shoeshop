const express = require('express');
const router = express.Router()

const CategoryController = require('../app/controllers/CategoryController')

router.post('/add', CategoryController.add)
router.put('/edit/:id', CategoryController.edit)
router.delete('/delete/:id', CategoryController.delete)
router.get('/all', CategoryController.showAllProductCategory)
router.get('/:id', CategoryController.showProductCategory)
router.get('/', CategoryController.index)


module.exports = router