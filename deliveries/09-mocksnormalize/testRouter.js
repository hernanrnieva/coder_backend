const express = require('express')
const Router = express.Router()
const {faker: faker} = require('@faker-js/faker')
faker.locale = 'en'
const {name, random, vehicle} = faker

function returnElement(){
    const element = {}
    element.title = name.firstName()
    element.price = random.number()
    element.thumbnail = vehicle.color()
    return element
}

Router.get('/', (req, res) => {
    const data = []

    for(let i = 0; i < 5; i++)
        data.push(returnElement())

    res.render('main-test', {products: data})
})

module.exports = Router