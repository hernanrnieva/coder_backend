const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length / 2 
const PORT = process.argv[2] || 8080

console.log(`Amount of CPU's: ${numCPUs}`)

if(cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`)
    
    for(let i = 0; i < numCPUs; i++)
        cluster.fork()

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end(`Process that responded: ${process.pid} and PORT: ${PORT}`)
    })
    .listen(PORT)
    
    console.log(`Worker ${process.pid} is running`)
}