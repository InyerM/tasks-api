const Image = require('../models/Image')
const { unlink } = require('fs-extra')
const path = require('path');

module.exports.get = async (req, res) => {
    const images = await Image.find()
    res.json(images)
}

module.exports.post = async (req, res) => {

    const file = req.file
    const image = new Image({
        filename : file.filename,
        path : '/images/' + file.filename,
        size : file.size,
        created_at : new Date(),
        username : req.body.username
    })

    await image.save()

    res.json({message: 'Image uploaded successfully', image})
}

module.exports.put = async (req, res) => {
    const id = req.params.id
    const image = {
        filename : req.file.filename,
        path : '/images/' + req.file.filename,
        size : req.file.size,
        created_at : new Date(),
        username : req.body.username
    }
    try{
        const imageToUpdate = await Image.findByIdAndUpdate(id, image, {useFindAndModify: false})
        await unlink(path.resolve('./public/' + imageToUpdate.path))
        res.json({message: 'Image updated successfully'})
    }catch(err){
        res.json({message: 'Error updating image'})
    }
    
}

module.exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        const image = await Image.findByIdAndDelete(id)
        await unlink(path.resolve('./public/' + image.path))
        res.json({message: 'Image deleted successfully'})
    }
    catch(err){
        res.json({message: 'Error deleting image'})
    }
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Image.findById(id)
    .then(data => res.json(data))
    .catch(err => {
        res.status(500).json({message: "Data not found" + err.message})
    })
}