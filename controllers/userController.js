const User = require('../models/User')

module.exports.get = (req, res) => {
    User.find({}, (error, users) => {
        if(error) return res.status(500).json({
            message: "Error showing users"
        })
        res.json(users)
    })
}

module.exports.post = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        img_url: req.body.img_url,
        names: req.body.names,
        lastnames: req.body.lastnames,
        role: req.body.role,
        created_at: new Date()
    })
    user.save((error, user) => {
        if(error) return res.status(500).json({
            message: "Error posting users"
        })
        res.json({message: "User saved"})
    })
}

module.exports.put = (req, res) => {
    const id = req.params.id
    const body = req.body
    User.findByIdAndUpdate(id, body, {useFindAndModify: false})
    .then(data => res.json({message: "User updated"}))
    .catch(err => {
        res.status(500).json({message: "Error updating users "})
    })
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
    .then(data => res.json({message: "User deleted"}))
    .catch(err => {
        res.status(500).json({message: "Error deleting user "})
    })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    User.findById(id)
    .then(data => res.json(data))
    .catch(err => {
        res.status(500).json({message: "Data not found "})
    })
}

module.exports.auth = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    
    User.find({}, (error, users) => {
        if(error) return res.status(500).json({
            message: "Authentication failed"
        })
        const filtered = users.filter(i => i.username === user.username && i.password === user.password)

        if(filtered.length === 1){
            res.json({message: 'Succesfully authenticated', filtered})
        }
        else{
            res.json({message: 'Authentication failed'})
        }
    })
}