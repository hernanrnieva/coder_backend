import axios from 'axios'

const URL = 'http://localhost:8080'

axios(URL).then((res) => {
    console.log(res.data)
}).catch((e) => {
    console.log(e)
})