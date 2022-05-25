import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import hbs from 'express-handlebars'

const app = express()

app.set('views', './src/views')
app.engine('hbs', hbs.engine({
    defaultLayout: 'main.hbs',
    layoutsDir: './src/views/layouts',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const users = [
    {
        name: 'Hernan',
        password: '12345',
        address: '351 763'
    },
    {
        name: 'Julian',
        password: '22230',
        address: '351 763'
    },
    {
        name: 'Milagros',
        password: '11141412',
        address: '351 763'
    }
]

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000
    }
}))

app.listen(8080, () => {
    console.log('Server up listening at PORT: 8080')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const {name, password, address} = req.body

    if(users.find(u => u.name == name))
        res.render('register-error')
    
    else{
        users.push({name, password, address})
        console.log(users)
        res.render('login')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const {name, password} = req.body

    if(u => u.name == name && u.password == password) {
        req.session.name = name
        req.session.password = password
        res.redirect('/data')
    }else{
        res.render('login-error')
    }
})

app.get('/data', isLoged, (req, res) => {
    const {name, password} = req.session

    res.json({name, password})
})

function isLoged(req, res, next) {
    if(req.session.name)
        next()
    else
        res.redirect('/login')
}

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('login')
})