const mongoose = require('mongoose')

const schemaProducts = new mongoose.Schema({
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 2400}
}, {versionKey: false})

module.exports = mongoose.model('products', schemaProducts)