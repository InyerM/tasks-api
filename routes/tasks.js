const express = require("express")
const router = express.Router()

const taskController = require('../controllers/taskController')

router.get('/tasks', taskController.get)
router.post('/tasks', taskController.post)
router.put('/tasks/:id', taskController.put)
router.delete('/tasks/:id', taskController.delete)
router.get('/tasks/:id', taskController.show)

module.exports = router