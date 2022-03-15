const fs = require('fs')
const express = require('express')
const { domainToASCII } = require('url')
const app = express()
const PORT = 8080

const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())

const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.static('public'))

app.engine('cte', (filePath, data, cb) => {
    fs.readFile(filePath, (e, content) => {
        if(e)
            return cb(new Error(e))

        const rendered = content
            .toString()
            .replace('^^title$$', '' + data.title + '')
            .replace('^^message$$', '' + data.message + '')
            .replace('^^author$$', '' + data.author + '')
            .replace('^^version$$', '' + data.version + '')

        return cb(null, rendered)
    })
})

app.set('views', './views')
app.set('view engine', 'cte')

let data = {
    title: 'Hello this is Hernan.',
    message: 'How are you?',
    author: 'Hernan',
    version: '200.0.1',
}

app.get('/cte1', (req, res) => {
    res.render('template1', data)
})
