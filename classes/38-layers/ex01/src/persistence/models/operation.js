const mongoose = require('mongoose')

const operationSchema = new mongoose.Schema({
    operation: String,
    val1: String,
    val2: String,
    result: String,
})

module.exports = mongoose.model('operations', operationSchema)