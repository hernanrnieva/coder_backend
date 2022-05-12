const express = require('express')
const cookieParser = require('cookie-parser')
const PORT = 8080

const app = express()
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(PORT, () => {console.log(`Server up listening at port: ${PORT}`)})

/*
app.get('/set', (req, res) => {
    res.cookie('cookie', 'express').send('cookieSet')
})

app.get('/setE', (req, res) => {
    res.cookie('cookie2', 'hello').send('cookieSet')
})

app.get('/setEX', (req, res) => {
    res.cookie('cookie3', 'cookieThatExpires', {maxAge: 10000})
    .send('cookieSet')
})

app.get('/get', (req, res) => {
    res.send(req.cookies)
})

app.get('/clr', (req, res) => {
    res.clearCookie('cookie2').send('cookie Deleted')
})
*/

app.post('/cookies', (req, res) => {
    if(req.body.time)
        res.cookie(req.body.name, req.body.value, {maxAge: req.body.time}).send({process: 'ok'})

    else
    res.cookie(req.body.name, req.body.value).send({process: 'ok'})
})

app.get('/cookies', (req, res) => {
    res.send(req.cookies)
})

app.delete('/clr', (req, res) => {
    res.clearCookie(req.query.name).send('Cookie deleted')
})