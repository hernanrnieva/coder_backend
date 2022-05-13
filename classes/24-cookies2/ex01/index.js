const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const PORT = 8080

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    store: new fileStore({path: './sessions', ttl: 3600, retries: 0}),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.listen(PORT, () => {console.log(`Server up listening at port: ${PORT}`)})

app.get('/login', (req, res) => {
    const {username, password} = req.query
    username == 'pepe' ? req.session.admin = true : req.session.admin = false

    req.session.user = username
    res.send('Login successful')
})

function auth(req, res, next){
    if(req.session?.user === 'pepe' && req.session?.admin)
        return next()
    
    return res.status(401).send('Authorization error!')
}

app.get('/private', auth, (req, res) => {
    res.send('If this got here it is because you are logged in correctly')
})

app.get('/logout', (req, res) => [
    req.session.destroy((e) => {
        if(e) res.send(e)
        else res.send('Logout ok!')
    })
])

/*
app.get('/root', (req, res) => {
    if(!req.session.name) {
        req.query.name
            ?   (req.session.name = req.query.name)
            :   (req.session.name = 'Anonymus')
    }

    if(req.session.counter) {
        req.session.counter ++
        res.send(
            `${req.session.name} has visited this site ${req.session.counter} times`
        )
    }

    else{
        req.session.counter = 1
        res.send(`Welcome, ${req.session.name}!`)
    }
})
*/