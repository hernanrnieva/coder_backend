const http = require('http')
const port = 8080

const server = http.createServer((req, res) => {
    res.end(verifyTime())
})

const connectedServer = server.listen(port, () => {
    console.log(`Server running listening to port ${port}`)
})

function verifyTime(){
    const time = new Date().getHours()
    let message = ''
    if(6 < time && time <= 12)
        message = 'Good day!'
    else if(12 < time && time <= 19)
        message = 'Good afternoon!'
    else
        message = 'Good night!'
    return message
}