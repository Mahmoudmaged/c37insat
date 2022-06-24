const mongoose = require('mongoose')


const connectDB =  ()=>{
    return mongoose.connect(process.env.DBURI)
    .then(result=> console.log(`connect DB on URL ::::: ${process.env.DBURI}`))
    .catch (err=> console.log(`fail to connect DB`))
}

module.exports = connectDB