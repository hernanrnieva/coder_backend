const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {type: String, require: true, max: 100},
    lastname: {type: String, require: true, max: 100},
    course: {type: String, require: true, max: 100},
    dni: {type: String, require: true, max: 100},
    mark: {type: Number, require: true},
    age: {type: Number, require: true}
})

module.exports = mongoose.model('students', studentSchema)