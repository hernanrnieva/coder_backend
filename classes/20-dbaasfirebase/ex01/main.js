const mongoose = require('mongoose')
const modelUser = require('./models/modelUser')

const clients = [
    {
        name: "Hernan",
        lastname: "Nieva",
        age: 23
    },
    {
        name: "Julian",
        lastname: "Nieva",
        age: 20
    },
    {
        name: "Ramiro",
        lastname: "Nieva",
        age: 45
    },
    {
        name: "Adriana",
        lastname: "Pisarski",
        age: 40
    },
    {
        name: "Alina",
        lastname: "Pisarski",
        age: 70
    },
    {
        name: "Milagros",
        lastname: "Benavides",
        age: 22
    }
]

async function CRUD(){
    try {
        const URL = 'mongodb+srv://hnieva:Lamitadmas1124@cluster0.3gv82.mongodb.net/ecommerce?retryWrites=true&w=majority'
        let res = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database conneceted')

        // Find
        // console.log(await modelUser.find())

        // Insert
        // modelUser.create({
        //     name: 'Federico',
        //     lastname: 'Nieva',
        //     age: 23,
        // }).then((data) => console.log(data))
    }catch(e){
        console.log(e)
    }
}

CRUD()