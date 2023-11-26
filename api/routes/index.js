const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("I'm root route")
})

module.exports = router