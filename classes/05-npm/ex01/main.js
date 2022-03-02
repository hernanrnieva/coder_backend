const moment = require('moment')
let today = moment('2022-02-23')
let bday = moment('1999-06-21')

console.log('Today is ' + today.format('DD/MM/YYYY'))
console.log('My bday is ' + bday.format('DD/MM/YYYY'))

console.log('Days passed since my birth day: ' + today.diff(bday, 'days'))
console.log('Months passed since my birth day: ' + today.diff(bday, 'months'))
console.log('Years passed since my birth day: ' + today.diff(bday, 'years'))