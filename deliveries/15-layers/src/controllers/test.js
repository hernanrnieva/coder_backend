const {faker: faker} = require('@faker-js/faker')
faker.locale = 'en'
const {commerce, image} = faker
const logInfo = require('../logs/loggers').logInfo

function returnElement(){
    const element = {}
    element.title = commerce.productName()
    element.price = commerce.price()
    element.thumbnail = image.food()

    return element
}

const testController = {
    getTestProducts: (req, res) => {
        logInfo(`URL: ${req.baseUrl} & METHOD: ${req.method}`)
        const data = []

        for(let i = 0; i < 5; i++)
            data.push(returnElement())

        res.render('layouts/main-test', {products: data})
    }
}

module.exports = testController