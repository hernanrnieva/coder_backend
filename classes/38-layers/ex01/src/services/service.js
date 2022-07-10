// const operationsDB = require('../persistence/local')
const operationsDB = require('../persistence/database')

async function saveData(operation, val1, val2, result) {
    const data = {
        operation,
        val1,
        val2,
        result
    }

    await operationsDB.save(data)
}

async function getData() {
    return operationsDB.get()
}

const service = {
    saveData,
    getData
}

module.exports = service