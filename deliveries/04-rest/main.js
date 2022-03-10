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
const PRODUCT_KEYS = 3
let products = []

const validateProduct = (product) => {
    let keys = Object.keys(product).length
    console.log(keys)
    if(keys != PRODUCT_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!product.hasOwnProperty('title') || !product.hasOwnProperty('price') || !product.hasOwnProperty('thumbnail'))
        throw 'Object does not have the correct properties'

    return product
}

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
    let newProduct
    try{
        newProduct = validateProduct(req.body)
    }catch(e){
        res.json(e)
    } 
    let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
    newProduct["id"] = newId
    newProduct.price = parseFloat(req.body.price)
    products.push(newProduct)

    res.json(newId)
})

router.put('/:id', (req, res) => {
    let index = products.findIndex(p => p.id == parseInt(req.params.id))
    if(index == -1)
        res.json({error: `Product ${req.params.id} not found to be updated`})

    let newProduct
    try{
        newProduct = validateProduct(req.body)
    }catch(e){
        res.json(e)
    }
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