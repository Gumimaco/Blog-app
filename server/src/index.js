const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require("connect-mongo")
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()
require('./database/Connect')

const app = express()
const authRoute = require('./routes/auth')
const blogRoute = require('./routes/blog')
const imageRoute = require('./routes/image')
const PORT = 3001

app.use(cors({origin: "http://localhost:3000",credentials: true}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/blog_user_sessions'
        })
    })
    )
app.use(passport.initialize())
app.use(passport.session())
require('./strategies/Local')
require('./strategies/Google')


app.use('/api/auth',authRoute)
app.use('/api/blog',blogRoute)
app.use('/api/images',imageRoute)
app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
})