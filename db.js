const mongoose = require('mongoose')
const url = 'mongodb://localhost/db_tasks'

mongoose.connect(url)

const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Error to connect MongoDD'))
    db.once('open', () => {
        console.log('Connected to MongoDB')
})

module.exports = db