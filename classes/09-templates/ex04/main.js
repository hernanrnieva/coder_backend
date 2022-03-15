const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.static('public'))

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
}))

app.set('views', './views')
app.set('view engine', 'hbs')
        
let data = {
    name: 'Hernan',
    lastname: 'Nieva',
    age: 22,
    email: 'hernanrnieva@gmail.com',
    phone: 1130901857,
    fyh: new Date().toLocaleString(),
}

app.get('/', (req, res) => {
    res.render('data', data)
})