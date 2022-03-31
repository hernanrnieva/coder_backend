const express = require('express')
const hbs = require('handlebars')
const fs = require('fs')
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

const fileContent = fs.readFileSync('./public/views/partials/table.hbs').toString()
let template = hbs.compile(fileContent)

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

let messages = []

io.on('connection', (socket) => {
    console.log('A user has connected')
    socket.emit('product', template({products}))
    // TODO: add message persistence
    try {
        messages = JSON.parse(fs.readFileSync('messages.txt', 'utf-8'))
    } catch(e) {}
    socket.emit('message', messages)

    socket.on('product', (data) => {
        let newProduct
        try{
            newProduct = validateProduct(data)
        }catch(e){
            // TODO: add error handling or notification to client
            console.log('Error found with product received')
        }
        let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
        newProduct["id"] = newId
        newProduct.price = data.price
        products.push(newProduct)
        io.sockets.emit('product', template({products}))
    })

    socket.on('message', (data) => {
        data["date"] = new Date().toLocaleString()
        messages.push(data)
        fs.writeFileSync('messages.txt', JSON.stringify(messages))
        io.sockets.emit('message', messages)
    })
})



