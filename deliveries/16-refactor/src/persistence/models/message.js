const mongoose = require('mongoose')

const schemaMessage = new mongoose.Schema({
    author: {type: Object, require: true},
    text: {type: String, require: true, max: 200},
    date: {type: String, require: true, max: 200},
    id: {type: Number, require: true}
}, {versionKey: false})

module.exports = mongoose.model('messages', schemaMessage)