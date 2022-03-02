const express = require('express')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => 
    console.log(`Server is up at port ${server.address().port}`))

const phrase = 'Hi World! How are you?'

app.get('/api/phrase', (req, res) => 
    res.json({phrase}))

app.get('/api/chars/:num', (req, res) => {
    const char = phrase[req.params.num]
    if(isNaN(req.params.num))
        res.json({error: 'Parameter is not a number'})
    else
        char === undefined ? res.json({error: 'Parameter is out of word boundaries'}) : res.json({char}) 
})