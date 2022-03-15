const fs = require('fs')
const express = require('express')
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

app.engine('ntl', function(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        if(err)
            return callback(new Error(err))
        
        const rendered = content.toString()
                                .replace('#title#', ''+ options.title +'')
                                .replace('#message#', ''+ options.message +'')
        
        return callback(null, rendered)
    })
})
app.set('views', './views') // Sepecified views directory
app.set('view engine', 'ntl') // Registering the templat engine

app.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: 'stranger'})
})