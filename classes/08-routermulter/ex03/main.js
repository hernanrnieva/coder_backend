const express = require('express')
const multer = require('multer')
const app = express()
const PORT = 8080
app.use(express.static('public'))

const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())

const server = app.listen(PORT, () => 
    console.log(`Server up listening to port ${PORT}`)
)
server.on('error', (error) => console.log('An error has occured: ${error'))

// Storage setting
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    },
})

const upload = multer({storage: storage})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/uploadFile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if(!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

app.post('/uploadFile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if(!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})