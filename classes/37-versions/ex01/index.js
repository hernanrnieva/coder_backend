const express = require('express')
const PORT = 8080
const app = express()

const server = app.listen(PORT, () => {
    console.log(`Server up listening at PORT: ${server.address().port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World from Yarn')
})