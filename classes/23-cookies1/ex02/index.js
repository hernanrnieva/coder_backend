const express = require('express')
const session = require('express-session')
const PORT = 8080

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.listen(PORT, () => {console.log(`Server up listening at port: ${PORT}`)})

app.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter ++
        res.send(`You visited this site ${req.session.counter} times`)
    }else{
        req.session.counter = 1
        res.send('Welcome!')
    }
})

app.get('/logout', (req, res) => [
    req.session.destroy((e) => {
        if(e) res.send(e)
        else res.send('Logout ok!')
    })
])