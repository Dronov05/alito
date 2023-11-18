const express = require('express')
const app = express()
const port = 9001

app.get('/', (req, res) => {
    res.send('Я теперь backend!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// время видео 51-13 установка react