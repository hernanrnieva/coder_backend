import got from 'got'

const URL = 'http://localhost:8080/out'

const askNumbers = () => {
    got(URL, { responseType: 'json'})
    .then((res) => {
        const { numbers } = res.body
        console.log(numbers)
    })
    .catch((e) => {
        console.log(e)
    })
}

setInterval(askNumbers, 10000)
askNumbers()