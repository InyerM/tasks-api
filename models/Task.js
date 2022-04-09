const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    description : String,
    state : String,
    username: String
}, {versionKey:false})

module.exports = mongoose.model('tasks', TaskSchema)