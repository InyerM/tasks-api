const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String,
    img_url: String,
    names: String,
    lastnames: String,
    role: String,
    created_at: Date
}, {versionKey:false})

module.exports = mongoose.model('users', UserSchema)