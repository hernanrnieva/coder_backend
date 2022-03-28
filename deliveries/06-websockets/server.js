const express = require('express')
const handlebars = require('express-handlebars')
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')
const app = express()
const PORT = 8080

const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)
app.use(express.static('./public'))

const server = httpServer.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})
server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: './public/views/layouts',
    defaultLayout: 'main.hbs'
}))

app.set('views', './public/views')
app.set('view engine', 'hbs')
        
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
    res.render('layouts/main', {products})
})

app.post('/products', (req, res) => {
    let newProduct
    try{
        newProduct = validateProduct(req.body)
    }catch(e){
        // TODO: add error handling or notification to client
        res.render('layouts/main', {products})
    }
    let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
    newProduct["id"] = newId
    newProduct.price = parseFloat(req.body.price).toFixed(2)
    products.push(newProduct)

    res.render('layouts/main', {products})
})

const messages = [
    {email: 'hernanrnieva@gmail.com', date: new Date().toLocaleString(), text: 'Hello there!'},
    {email: 'juliannieva@gmail.com', date: new Date().toLocaleString(), text: 'Hi'},
    {email: 'pc@gmail.com', date: new Date().toLocaleString(), text: 'How is it going?'},
    {email: 'hernanrnieva@gmail.com', date: new Date().toLocaleString(), text: 'Fine, and you guys?'}
]

io.on('connection', (socket) => {
    console.log('A user has connected')
    socket.emit('product', products)
    socket.emit('message', messages)

    socket.on('product', (data) => {
        let newProduct
        try{
            newProduct = validateProduct(data)
        }catch(e){
            // TODO: add error handling or notification to client
            console.log('Erorr found with product received')
        }
        let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
        newProduct["id"] = newId
        newProduct.price = parseFloat(req.body.price).toFixed(2)
        products.push(newProduct)
        io.sockets.emit('product', products)
    })

    socket.on('message', (data) => {
        data["date"] = new Date().toLocaleString()
        messages.push(data)
        io.sockets.emit('message', messages)
    })
})



