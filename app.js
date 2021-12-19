const express = require('express')
const cors = require('cors')
const path = require('path')
const connection = require('./models/db')
const bodyParser = require('body-parser')

const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/sign-in')

const ticketRoutes = require('./routes/ticket')

const companyRoutes = require('./routes/company')

const replyRoutes = require('./routes/reply')

const commentRoutes = require('./routes/comment')

const userRoutes = require('./routes/user')

const correspondenceRoutes = require('./routes/correspondence')

const app = express()

process.env.SECRET_KEY="thisismysecretkey"

app.use(cors())

// parse requests of content-type: application/json
app.use(express.json({limit: '50mb'}))

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', function(req, res){
    res.send('this is server root page ')
})

app.use ('/api', registerRoutes)

app.use ('/api', loginRoutes)

app.use ('/api', ticketRoutes)

app.use ('/api', userRoutes)

app.use ('/api', companyRoutes)

app.use ('/api', replyRoutes)

app.use ('/api', commentRoutes)

app.use ('/api', correspondenceRoutes)

module.exports = app    