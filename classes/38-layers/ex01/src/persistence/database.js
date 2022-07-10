process.on('exit', () => {
    mongoose.disconnect()
})

const mongoose = require('mongoose')
const operationModel = require('./models/operation')

async function connect() {
    if(mongoose.connection.readyState == 0) {
        const URL = 'mongodb+srv://hnieva:83vkK5DfsCI1o5OR@cluster0.3gv82.mongodb.net/operations?retryWrites=true&w=majority'

        const answer = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
}

async function save(data) {
    try {
        await connect()
        await operationModel.create(data)

        return 'success'
    } catch(e) {
        console.log(e)
    }
}


async function get() {
    try {
        await connect()
        const result = await operationModel.find({}).lean()

        return result
    } catch(e) {
        return e
    }
}

module.exports = {
    save,
    get
}