const express = require('express')

const app = express()
const PORT = parseInt(process.argv[3]) || 8082
// app.use(express.static('public'))

app.get('/data', (req, res) => {
    console.log(`Port: ${PORT} -> Fyh: ${Date.now()}`)
    res.send(`Server express <span style="color:blueviolet;">(Nginx)</span> at port: ${PORT} - <b>PID: ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

app.listen(PORT, err => {
    if(!err)
        console.log(`Server up running at port ${PORT}`)
})