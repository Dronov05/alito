const dbConnect = require("./dbConnect")
const mongoose = require("mongoose");
const User = require('../models/User')

async function addUserToDb() {
    await dbConnect()

    const collection = mongoose.model('users')

    await collection.create({
        username: 'Анна',
        password: '123456',
        role: 'user'
    })
}

module.exports = {addUserToDb}