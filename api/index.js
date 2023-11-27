require('dotenv').config()
const express = require('express')
const app = express()
const port = 9001;
const cors = require('cors')
const logger = require('morgan');
const sessions = require('express-session');
const MongoStore = require('connect-mongo')

app.use(cors({
    credentials: true,
    origin: ['https://api.allspacex.ru', 'https://allspacex.ru']
    // origin: ['http://localhost:3000', 'https://allspacex.ru']
}));

let mongoUrl

if (process.env.NODE_ENV === "development") {
    mongoUrl = "mongodb://admin5:" + process.env.MONGO_DEV_PASSWORD + "@localhost:27017/alito?authSource=alito"
} else {
    mongoUrl = "mongodb://admin5:" + process.env.MONGO_PRODUCTION_PASSWORD + "@localhost:27017/alito?authSource=alito"
}

app.use(sessions({
    secret: "thisismvtyrrcwkeyfhrqfgrfrty84fwir767",
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        ttl: 60 * 24 * 60 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000* 60 * 60 * 24 * 30,
    },
}))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const allRouter = require('./routes/all')
const mongoose = require("mongoose");


app.use(logger('dev'))
app.use(express.json())
app.use('*', allRouter)
app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})