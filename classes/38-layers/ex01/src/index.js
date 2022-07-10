const express = require('express')
const mainRouter = require('./routes/main')
const PORT = 8080
const app = express()

const server = app.listen(PORT, () => {
    console.log(`Server up listening at PORT: ${server.address().port}`)
})

app.use('/', mainRouter)