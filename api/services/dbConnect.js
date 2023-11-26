const mongoose = require('mongoose')

if (process.env.NODE_ENV === "development") {
    mongoUrl = "mongodb://admin5:" + process.env.MONGO_DEV_PASSWORD + "@localhost:27017/alito?authSource=alito"
} else {
    mongoUrl = "mongodb://admin5:" + process.env.MONGO_PRODUCTION_PASSWORD + "@localhost:27017/alito?authSource=alito"
}

async function dbConnect(){
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.db
    }

    let url = 'mongodb://localhost:27017/alito'
    let options = {
        user: 'admin5',
        pass: process.env.NODE_ENV === "development" ? process.env.MONGO_DEV_PASSWORD : process.env.MONGO_PRODUCTION_PASSWORD,
        // pass: process.env.NODE_ENV === "development" ?  process.env.MONGO_DEV_PASSWORD : process.env.MONGO_PRODUCTION_PASSWORD,
        auth: {authSource: "alito"}
    }

    return mongoose.connect(url, options, (e) => {
        console.error(e)
    })
}

module.exports = dbConnect;

