const Task = require('../models/Task')

module.exports.get = (req, res) => {
    Task.find({}, (error, tasks) => {
        if(error) return res.status(500).json({
            message: "Error showing tasks"
        })
        res.json(tasks)
    })
}

module.exports.post = (req, res) => {
    const task = new Task({
        description : req.body.description,
        state : req.body.state,
        username : req.body.username
    })
    task.save((error, task) => {
        if(error) return res.status(500).json({
            message: "Error posting tasks"
        })
        res.json({message: "Task saved"})
    })
}

module.exports.put = (req, res) => {
    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id, body, {useFindAndModify: false})
    .then(data => res.json({message: "Task updated"}))
    .catch(err => {
        res.status(500).json({message: "Error updating task"})
    })
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then(data => res.json({message: "Task deleted"}))
    .catch(err => {
        res.status(500).json({message: "Error deleting task"})
    })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Task.findById(id)
    .then(data => res.json(data))
    .catch(err => {
        res.status(500).json({message: "Data not found"})
    })
}