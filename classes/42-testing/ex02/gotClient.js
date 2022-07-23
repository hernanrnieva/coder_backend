import got from 'got'

const URL = 'http://localhost:8080'

got(URL).then((res) => {
    console.log(res.body)
}).catch((e) => {
    console.log(e)
})