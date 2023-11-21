const express = require('express')
const app = express()
const port = 9001;

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// время видео 51-13 установка react