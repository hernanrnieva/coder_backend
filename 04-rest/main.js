/* Initializations */
const express = require('express')
const app = express()
const PORT = 8080
app.use(express.static('public'))

const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())

/* Server up */
const server = app.listen(PORT, () => 
    console.log(`Server up listening to port ${PORT}`)
)
server.on('error', (error) => console.log('An error has occured: ${error}'))

/* Product router implementation */
let products = []

router.get('/', (req, res) => {
    if(products.length != 0)
        res.json(products)

    res.json('No products have been loaded yet')
})

router.get('/:id', (req, res) => {
    let product = products.find(p => p.id == req.params.id)
    if(!product)
        res.json({error: `Product ${req.params.id} not found`})

    res.json(product)
})

router.post('/', (req, res) => {
    let newProduct = req.body
    let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
    newProduct["id"] = newId
    newProduct.price = parseFloat(req.body.price)
    products.push(newProduct)

    res.json(newId)
})

router.put('/:id', (req, res) => {
    let index = products.findIndex(p => p.id == req.params.id)
    if(index == -1)
        res.json({error: `Product ${req.params.id} not found to be updated`})

    let newProduct = req.body
    newProduct["id"] = parseInt(req.params.id)
    products[index] = newProduct

    res.json('Product updated')
})

router.delete('/:id', (req, res) => {
    let index = products.findIndex(p => p.id == req.params.id)
    if(index == -1)
        res.json({error: `Product ${req.params.id} not found to be deleted`})

    products.splice(index, 1)

    res.json('Product deleted')
})

app.use('/api/products', router)