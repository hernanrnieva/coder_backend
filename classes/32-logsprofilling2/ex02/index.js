const express = require('express')
const crypto = require('crypto')
const app = express()
const users = {}

app.use(express.static('public'))

const port = parseint(process.argv[2]) || 8080
const server = app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`)
})

server.on('error', (error) => console.log(`error en servidor: ${error}`))

app.get('/getusers', (req, res) => {
    res.json({ users })
})

app.get('/newuser', (req, res) => {
    let username = req.query.username || ''
    const password = req.query.password || ''
    username = username.replace(/[!@#$%^&*]/g, '')
    
    if (!username || !password || users[username]) {
        return res.sendstatus(400)
    }
    
    const salt = crypto.randombytes(128).tostring('base64')
    const hash = crypto.pbkdf2sync(password, salt, 10000, 512, 'sha512')
    users[username] = { salt, hash }
    
    res.sendstatus(200)
})

app.get('/auth-bloq', (req, res) => {
    let username = req.query.username || ''
    const password = req.query.password || ''
    username = username.replace(/[!@#$%^&*]/g, '')
    
    if (!username || !password || !users[username]) {
        process.exit(1) 
        // return res.sendstatus(400)
    }
    
    const { salt, hash } = users[username]
    const encrypthash = crypto.pbkdf2sync(password, salt, 10000, 512, 'sha512')
    
    if (crypto.timingsafeequal(hash, encrypthash)) {
        res.sendstatus(200)
    } else {
        process.exit(1)
        // res.sendstatus(401);
    }
})

app.get('/auth-nobloq', (req, res) => {
    let username = req.query.username || ''
    const password = req.query.password || ''
    username = username.replace(/[!@#$%^&*]/g, '')
    
    if (!username || !password || !users[username]) {
        process.exit(1)
        // return res.sendstatus(400);
    }
    
    crypto.pbkdf2(password,users[username].salt,10000,512,'sha512',(err, hash) => {
        if (users[username].hash.tostring() === hash.tostring()) {
            res.sendstatus(200)
        } else {
            process.exit(1)
            // res.sendstatus(401);
        }
    })
})