const express = require('express');
const db = require('./db')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan')
const multer = require('multer')
const app = express();
const cors=require("cors")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))


const tasks = require('./routes/tasks')
const users = require('./routes/users')
const images = require('./routes/images')
const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(tasks)
app.use(users)
app.use(images)


const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server running at port : " + PORT))