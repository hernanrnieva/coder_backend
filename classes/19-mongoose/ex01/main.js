const mongoose = require('mongoose')
const studentModel = require('./models/studentSchema')

async function CRUD(){
    try {
        const URL = 'mongodb://127.0.0.1:27017/school'
        let res = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database conneceted')
        
        const students = [
            {
                name: 'Hernan',
                lastname: 'Nieva',
                course: 'Nature',
                dni: '42013839',
                mark: 10,
                age: 23
            },
            {
                name: 'Julian',
                lastname: 'Nieva',
                course: 'Maths',
                dni: '18334959',
                mark: 9,
                age: 18 
            },
            {
                name: 'Ramiro',
                lastname: 'Nieva',
                course: 'Maths',
                dni: '12400200',
                mark: 8,
                age: 80 
            },
            {
                name: 'Alina',
                lastname: 'Pisarski',
                course: 'Hola',
                dni: '90',
                mark: 2,
                age: 25 
            },
            {
                name: 'Adriana',
                lastname: 'Pisarski',
                course: 'Log',
                dni: '2122',
                mark: 2,
                age: 23 
            }
        ]

        // await studentModel.insertMany(students)
        // console.log(await studentModel.find())
        
        // a
        // studentModel.find({}).sort({name: 1})
        // .then((data) => console.log(data))

        // b
        // studentModel.find({}).sort({age: 1}).limit(1)
        // .then((data) => console.log(data))

        // c 
        // studentModel.find({course: 'Log'})
        // .then((data) => console.log(data))

        // d
        // studentModel.find({}).sort({age: 1}).limit(1).skip(2)
        // .then((data) => console.log(data))

        // e
        // studentModel.aggregate([{$group: {_id: 'average', mark_avg: {$avg: '$mark'}}}])
        // .then((data) => console.log(data))

        // f
        // studentModel.updateOne({name: 'Ramiro'}, {$set: {dni: 1111111}})
        // .then((data) => console.log(data))

        // g
        // studentModel.updateMany({}, {$set: {entering: false}}, {
        //     // Options
        //     returnNewDocument: true,
        //     new: true,
        //     strict: false,
        // })
        // .then((data) => console.log(data))

        // h
        // studentModel.updateMany({course: 'Hola'}, {$set: {entering: true}}, {
        //     returnNewDocument: true,
        //     new: true,
        //     strict: false,
        // })
        // .then((data) => console.log(data))

        // i
        // studentModel.deleteMany({cours: 'Hola'})
        // .then((data) => console.log(data))
    }catch(e){
        console.log(e)
    }
}

CRUD()