const { options } = require('./options/mariaDB')
const knex = require('knex')(options)

const cars = [
    {name: 'Audi A3', price: 25500},
    {name: 'Fiat Tipo', price: 13000},
    {name: 'Toyota Yaris', price: 15000},
    {name: 'Bentley', price: 30000}
]

// knex.from('cars').where('price', '>', 18000).orderBy('price', 'asc').select('name', 'price')
// .then((data) => {
//     for (r of data) {
//         console.log(`${r.name} ${r.price}`)
//     }
// })
// .catch((e) => {console.log('Error selecting:: ' + e)})
// .finally(() => knex.destroy())

// knex.from('cars').where('price', 25000).update({price: '24444'})
// .then((data) => {console.log('Price updated')})
// .catch((e) => {console.log('Error encountered: ' + e)})
// .finally(() => knex.destroy())

knex.from('cars').where('price', 13000).delete()
.then(() => {console.log('Car deleted')})
.catch((e) => {console.log(`Error encountered ${e}`)})
.finally(() => knex.destroy())