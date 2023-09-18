const express = require('express');
const UserController = require('../app/controllers/UserController');
const router = express.Router()

router.delete('/delete/:id',UserController.delete)
router.put('/edit/:id', UserController.edit)
router.post('/add', UserController.add)
router.get('/', UserController.index)


module.exports = router