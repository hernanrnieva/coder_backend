require('dotenv').config()

const BACKGROUND = process.env.BACKGROUND || 'red'
const FRONT = process.env.FRONT || 'green'

console.log(BACKGROUND + '\n' + FRONT)