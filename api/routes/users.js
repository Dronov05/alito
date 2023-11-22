const express = require('express')
const {save, getAllUsers, deleteAllUsers} = require("../services/users.service")
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ok: true, users: '123'})
})

router.get('/get/all',  async (req, res) => {

    const users = await getAllUsers()

    res.json({ok: true, users: users})
})

router.get('/delete/all',  async (req, res) => {

    const users = await deleteAllUsers()

    res.json({ok: true, users: users})
})

router.post('/signup', async (req, res) => {

    const user = req.body

    try{
       await save(user)
        res.json({ok: true})
    } catch (e) {
        console.error(e)
        res.json({ok: false})
    }
})

router.post('/login', async (req, res) => {

    const user = req.body

    console.log(user)
    res.json({ok: true})

})

module.exports = router