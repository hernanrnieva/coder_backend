import { createServer } from 'http'
const PORT = 8080

const server = createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })

    res.end(
        JSON.stringify({
            dt: new Date().toLocaleString()
        })
    )
})

server.listen(PORT, () => { console.log(`Server up listening at PORT: ${PORT}`)})