const {faker: faker} = require('@faker-js/faker')
faker.locale = 'en'
const {commerce, image} = faker
const express = require('express')
const Router = express.Router()

function returnElement(){
    const element = {}
    element.title = commerce.productName()
    element.price = commerce.price()
    element.thumbnail = image.food()
    return element
}

/* Test render */
Router.get('/', (req, res) => {
    const data = []

    for(let i = 0; i < 5; i++)
        data.push(returnElement())

    res.render('layouts/main-test', {products: data})
})

module.exports = Router