const express = require('express')
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')
        
const PRODUCT_KEYS = 3
const products = []

const validateProduct = (product) => {
    let keys = Object.keys(product).length
    if(keys != PRODUCT_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!product.hasOwnProperty('title') || !product.hasOwnProperty('price') || !product.hasOwnProperty('thumbnail'))
        throw 'Object does not have the correct properties'

    return product
}

app.get('/products', (req, res) => {
    res.render('table', {products})
})

app.post('/products', (req, res) => {
    let newProduct
    try{
        newProduct = validateProduct(req.body)
    }catch(e){
        // TODO: add error handling or notification to client
        res.render('form', {products})
    }
    let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
    newProduct["id"] = newId
    newProduct.price = parseFloat(req.body.price).toFixed(2)
    products.push(newProduct)

    res.render('form', {products})
})

/* Not sure if this is really neccessary but couldn't find a way to
go from the table displaying only the products back to the form
without posting anything */
app.get('/productsb', (req, res) => {
    res.render('form', {products})
})