const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// время видео 29-44 установка vim, + еще нужно написать доку по связке гитхаб и сервера