const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    id: {type: String, require: true, max: 100},
    password: {type: String, require: true}
}, {versionKey: false})

module.exports = mongoose.model('users', schemaUser)