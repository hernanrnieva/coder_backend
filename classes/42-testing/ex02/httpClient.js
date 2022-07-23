import { request } from 'http'

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}

const req = request(options, res => {
    let response = ''

    res.on('data', data => {
        response += data
    })

    res.on('end', () => {
        let dt = JSON.parse(response)
        console.log(dt)
    })
})

req.on('error', e => {
    console.log(e)
})

req.end()
