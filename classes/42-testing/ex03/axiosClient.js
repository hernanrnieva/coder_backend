import axios from 'axios'

const URL = 'http://localhost:8080/in'

const sendNumbers = () => {
    axios
    .post(URL, { number: Math.random() })
    .then((res) => {
        console.log(res.data)
    })
    .catch((e) => {
        console.log(e)
    })
}

setInterval(sendNumbers, 2000)
sendNumbers()