import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import hbs from 'express-handlebars'
import passport from 'passport'
import {Strategy} from 'passport-local'
const localStrategy = Strategy

const app = express()

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(function(err, req, res, next) {
    console.log(err)
})

const users = [
    {
        username: 'Hernan',
        password: '12345',
        address: '351 763'
    },
    {
        username: 'Julian',
        password: '22230',
        address: '351 763'
    },
    {
        username: 'Milagros',
        password: '11141412',
        address: '351 763'
    }
]

passport.use('login', new localStrategy({usernameField: 'name'}, (username, password, done) => {
    const exists = users.find(u => u.username == username && u.password == password)
    if(!exists)
        return done(null, false)
    
    return done(null, exists)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    const dsUser = users.find(u => u.username == user.username)
    done(null, dsUser)
})

app.set('views', './src/views')
app.engine('hbs', hbs.engine({
    defaultLayout: 'main.hbs',
    layoutsDir: './src/views/layouts',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

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

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/login-fail',
    successRedirect: '/data'
}))

app.get('/data', isLoged, (req, res) => {
    console.log(req.session)
    res.render('data', req.session.passport.user)
})

app.get('/login-fail', (req, res) => {
    res.render('login-error')
})

function isLoged(req, res, next) {
    console.log(req.session)
    if(req.session)
        next()
    else
        res.redirect('/login')
}

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('login')
})