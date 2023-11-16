const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
    res.send('Я изменён в WebStorm и уже на сервере')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// время видео 29-44 установка vim, + еще нужно написать доку по связке гитхаб и сервера