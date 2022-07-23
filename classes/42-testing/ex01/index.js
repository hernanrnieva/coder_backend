import { request } from 'http'
import { writeFile } from 'fs'

const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts',
    method: 'GET'
}

const req = request(options, res => {
    let response = ''

    res.on('data', data => {
        response += data
    })

    res.on('end', () => {
        const posts = JSON.parse(response)
        const file = 'postHttp.json'
        writeFile(file, JSON.stringify(posts, null, '\t'), e => {
            if(e) throw new Error(e)
            console.log('Wrote successfully')
        })
    })
})

req.on('error', e => {
    console.log(e)
})

req.end()