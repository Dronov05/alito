const dbConnect = require("./dbConnect")
const mongoose = require("mongoose");
const User = require('../models/User')

async function save(user) {
    await dbConnect()

    const collection = mongoose.model('users')

    const username = 'user' + new Date().getTime()

    await collection.create({
        email: user.email,
        password: user.password,
        username: username,
        role: 'user'
    })
}

async function getAllUsers() {
    await dbConnect()
    const collection = mongoose.model('users')

    const users = await collection.find({})
    return users
}

async function deleteAllUsers() {
    await dbConnect()
    const collection = mongoose.model('users')

    const users = await collection.deleteMany({})

}

module.exports = {save, getAllUsers, deleteAllUsers}