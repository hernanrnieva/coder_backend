const express = require('express')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = app.listen(PORT, () => 
    console.log(`Server is up at port ${server.address().port}`))

const phrase = {}
phrase.fullPhrase = ['Initial phrase', 'Car', 'Cell Phone']

app.get('/api/phrase', (req, res) => {
    res.json({data: phrase, status: 'Ok'})
})

app.get('/api/phrase/:pos', (req, res) => {
    res.json({data: phrase.fullPhrase[req.params.pos], status: 'Ok'})
})

app.post('/api/word', (req, res) => {
    let index = phrase.fullPhrase.push(req.body.word)
    res.json({data: index - 1, status: 'Ok'})
})

app.delete('/api/word/:pos', (req, res) => {
    phrase.fullPhrase.splice(req.params.pos, 1, "")
    res.json({data: phrase, status: 'Ok'})
})

app.put('/api/word/:pos', (req, res) => {
    phrase.fullPhrase.splice(req.params.pos, 1, req.body.word)
    res.json({data: phrase, status: 'Ok'})
})