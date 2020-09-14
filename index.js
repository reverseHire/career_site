const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config();

const user = require('./routes/userLogin')
const candidate = require('./routes/candidates')

// Middleware
app.use(express.json())
app.use('/user', user)
app.use('/candidate', candidate)

app.get('/', (req, res) => {
    res.send("Hello World")
})

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, ()=> console.log("Connected to DB"));

app.listen(3000, () => console.log("Listening on port 3000"))