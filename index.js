const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config();

const user = require('./routes/userLogin')
const hackerrank = require('./routes/hackerrank')
const github = require('./routes/github')
const stackoverflow = require('./routes/stackoverflow')
const candidate = require('./routes/candidates')
const recruiter = require('./routes/recruiter')

// Middleware
app.use(express.json())

app.use('/hackerrank', hackerrank)
app.use('/github', github)
app.use('/stackoverflow', stackoverflow)
app.use('/candidate', candidate)
app.use('/recruiter', recruiter)
app.use('/user', user)

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));


app.get('/', (req, res) => {
    console.log('/index.html')
    res.sendFile('/index.html')
})

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => console.log("Connected to DB"));

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))