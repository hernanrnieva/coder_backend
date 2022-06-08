const cluster = require('cluster')
const http = require('http')
const PORT = process.argv[2] || 8080

http.createServer((req, res) => {
    res.writeHead(200)
    res.end(`Process that responded: ${process.pid} and PORT: ${PORT}`)
})
.listen(PORT)

console.log(`Worker ${process.pid} is running`)