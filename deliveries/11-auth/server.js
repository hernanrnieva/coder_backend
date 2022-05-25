/* Const declarations and imports */
const express = require('express')
const hbs = require('handlebars')
const fs = require('fs')
const handlebars = require('express-handlebars')
const ContainerDB = require('./containers/contDB')
const ContainerFile = require('./containers/contFile')
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')
const MessageNormalizer = require('./normalizr')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const userDaoMongo = require('./daos/users/usersDaoMongoDB')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const localStrategy = Strategy
const bcrypt = require ('bcrypt')
const saltRounds = 2

/* Server initialization */
const app = express()
const PORT = 8080
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

app.use(express.static('./public'))
app.use(passport.initialize())
app.use(passport.session())

const server = httpServer.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})
server.on('error', (error) => console.log(`Error encountered: ${error}`))
/* ##### Server Up ##### */

// const users = [
//     {
//         email: 'Hernan',
//         password: '12345',
//     },
//     {
//         email: 'Julian',
//         password: '22230',
//     },
//     {
//         email: 'Milagros',
//         password: '11141412',
//     }
// ]
/* Users persistence */
const users = new userDaoMongo()

/* Passport configuration */
// Login
passport.use('login', new localStrategy({usernameField: 'email'}, async function(username, password, done) {
    const exists = await users.getById(username)
    if(!exists)
        return done(null, false)
    
    bcrypt.compare(password, exists.password, (err, result) => {
        if(!result)
            return done(null, false)
            
        return done(null, exists)
    })
}))

// Register
passport.use('register', new localStrategy({usernameField: 'email'}, async function(username, password, done) {
    const exists = await users.getById(username)
    if(exists)
        return done(null, false)

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const newUser = {id: username, password: hash}
        users.save(newUser).then(() => {
            return done(null,newUser)
        }).catch((e) => {
            console.log(e)
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async function(user, done) {
    const dsUser = users.getById(user.id)
    done(null, dsUser)
})

/* Template configuration */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: './public/views/layouts',
    defaultLayout: ''
}))
app.set('views', './public/views')
app.set('view engine', 'hbs')
const fileContent = fs.readFileSync('./public/views/partials/table.hbs').toString()
let template = hbs.compile(fileContent)

/* Container and sql initializations */
const products = new ContainerFile('products.txt') 
const messages = new ContainerFile('messages.txt') 
const messageNormalizer = new MessageNormalizer()

/* Product helper functions */
const validateProduct = require('./helpers/products')

/* Message helper functions */
const validateMessage = require('./helpers/messages')

/* Test render */
const testRouter = require('./test-api/products-test')
app.use('/products-test', testRouter)

/* Good renders */
app.get('/register', (req, res) => {
    res.render('layouts/register')
})

app.post('/register', passport.authenticate('register', {
    failureRedirect: '/register-fail',
    successRedirect: '/products'
}))

app.get('/register-fail', (req, res) => {
    res.render('layouts/register-fail')
})

app.get('/login', (req, res) => {
    res.render('layouts/login')
})

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/login-fail',
    successRedirect: '/products'
}))

app.get('/login-fail', (req, res) => {
    res.render('layouts/login-fail')
})

app.get('/products', (req, res) => {
    if(!req.session.passport)
        res.redirect('/login')
    else
        res.render('layouts/main', {email: req.session.passport.user.id})
})

app.get('/logout', (req, res) => {
    const user = req.session.passport.user.id
    req.session.destroy((e) => {
        if(e) 
            res.json(e)
        else
            res.render('layouts/goodbye', {username: user})
    })
})

/* Socket functionality */
io.on('connection', (socket) => {
    /* Existing products emittance */
    products.getAll().then((data) => {
        socket.emit('product', template({products: data}))
    })

    /* Existing messages emittance */
    messages.getAll().then((data) => {
        const normalized = messageNormalizer.normalizeMessages({
            id: 'messages',
            messages: data
        })
        socket.emit('message', normalized)
    })

    /* New product receipt */
    socket.on('product', (data) => {
        let newProduct
        try{
            newProduct = validateProduct(data)
        }catch(e){
            console.log('Error found with product received')
        }
        
        products.save(newProduct)
        .then(() => {products.getAll().then((data) => {
            io.sockets.emit('product', template({products: data}))
        })})
    })

    /* New message receipt */
    socket.on('message', (message) => {
        message = validateMessage(message)
        if(!message)
            socket.emit('eMessage')
        else {
            message["date"] = new Date().toLocaleString()
            messages.save(message)
            .then(() => {messages.getAll().then((data) => {
                const normalized = messageNormalizer.normalizeMessages({
                    id: 'messages',
                    messages: data
                })
                socket.emit('message', normalized)
                io.sockets.emit('message', normalized)
            })})
        }
    })
})