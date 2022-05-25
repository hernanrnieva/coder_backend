import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import hbs from 'express-handlebars'
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'privateKey'
const app = express()

function generateToken(user) {
    const token = jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: '1h'})
    return token
}

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
        const user = {name, password, address}
        const tknAccess = generateToken(user)

        users.push({name, password, address})
        res.json({tknAccess})
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
        const user = {name, password}
        const tknAccess = generateToken(user)
        res.json({tknAccess})
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

app.get('/dataJWT', auth, (req, res) => {
    const data = req.user

    res.json({data})
})

// Middleware
function auth(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            error: 'Not autenticated'
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if(err) {
            return res.status(403).json({
                error: 'Not authorized'
            })
        }

        req.user = decoded.data
        next()
    })
}