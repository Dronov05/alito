const express = require('express')
const router = express.Router()

router.all("*", (req, res, next) => {


    const domain = process.env.NODE_ENV === 'development' ? process.env.DEV_HOST : process.env.PROD_HOST

    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Headers', 'API-Key');
    next()
})

module.exports = router