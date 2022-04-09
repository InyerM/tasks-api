const mongoose = require("mongoose")
const Schema = mongoose.Schema

var imageSchema = new Schema({
    filename: String,
    path: String,
    size: Number,
    created_at: Date,
    username: String
})

module.exports = new mongoose.model('image', imageSchema);