const mongoose = require('mongoose')

async function dbConnect(){
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.db
    }

    let url = 'mongodb://localhost:27017/alito'
    let options = {
        user: 'admin5',
        pass:'qwerty5nero',
        auth: {authSource: 'alito'}
    }

    return mongoose.connect(url, options, (e) => {
        console.error(e)
    })
}





module.exports = dbConnect;

