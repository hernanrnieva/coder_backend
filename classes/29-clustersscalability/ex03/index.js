const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

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
        console.log(`Process that responded ${process.pid}`)
        res.writeHead(200)
        res.end('Hello World!')
    })
    .listen(8080)
    
    console.log(`Worker ${process.pid} is running`)
}