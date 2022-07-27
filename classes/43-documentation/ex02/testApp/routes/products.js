var express = require('express')
var router = express.Router()
var debug = require('debug')('testApp:products')

function makeRandomId() {
    const nums = []
    for(let i = 0; i < 8; i++) 
        nums.push(Math.floor(10 * Math.random()))

    return `${Date.now()}-${nums.join(" ")}`
}

const products = []

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res, next) => {
    debug('Listeninig on ' + JSON.stringify(products))
    res.json(products)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const product = products.find(p => p.id == id)
    if(!product)
        return res.sendStatus(400)

    res.json(product)
})

router.post('/', (req, res, next) => {
    const { name, price} = req.body
    debug(req.body)
    const product = { id: makeRandomId(), name, price: Number(price) }

    products.push(product)
    res.status(201).json(product)
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const { name, price } = req.body
    const product = { id, name, price: Number(price) }

    const idx = products.findIndex(p => p.id == id)
    if(idx < 0)
        return res.sendStatus(404)

    products.splice(idx, 1, product)
    res.json(product)
})

module.exports = router