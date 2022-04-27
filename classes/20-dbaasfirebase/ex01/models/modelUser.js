const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    name: {type: String, require: true, max: 100},
    lastname: {type: String, require: true, max: 100},
    age: {type: Number, require: true}
})

module.exports = mongoose.model('users', schemaUser)