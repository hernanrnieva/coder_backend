import faker from 'faker'
faker.locale = 'en'
const {name, internet, random, vehicle} = faker
import {writeFile} from 'fs'

import express from 'express'
const app = express()
app.listen(8080, () => console.log('Server up listening at Port 8080'))

let element = {}
let data = []

function returnElement(index) {
    element = {}
    element.id = index
    element.name = name.firstName()
    element.lastname = name.lastName()
    element.colour = vehicle.color()
    return element
}

app.get('/', (req, res) => {
    data = []
    let dataA

    req.query.dataA? (dataA = req.query.dataA) : (dataA = 10)

    for(let i = 0; i < dataA; i++)
        data.push(returnElement(i + 1))

    res.send(data)
})