const express = require("express")
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/users', userController.get)
router.post('/users', userController.post)
router.put('/users/:id', userController.put)
router.delete('/users/:id', userController.delete)
router.get('/users/:id', userController.show)
router.post('/auth/login', userController.auth)

module.exports = router