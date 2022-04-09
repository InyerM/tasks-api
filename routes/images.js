const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const imageController = require('../controllers/imageController')

router.get('/uploads', imageController.get)
router.post('/uploads', upload.single('file'), imageController.post)
router.put('/uploads/:id', upload.single('file'), imageController.put)
router.delete('/uploads/:id', imageController.delete)
router.get('/uploads/:id', imageController.show)

module.exports = router