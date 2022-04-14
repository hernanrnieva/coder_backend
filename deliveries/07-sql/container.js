const fs = require('fs')

class Container{
    /* Constructor */
    constructor(options, table){
        this.knex = require('knex')(options)
        this.table = table
    }

    /* Methods */
    async save(element){
        try{
            await this.knex(this.table).insert(element)
        }catch(e){
            console.log(e)
        }
        // finally{
        //     this.knex.destroy()
        // }
    }

    async getById(id){
        try{
            const element = await this.knex.from(this.table).select('*').where('id', id)
            return Object.values(JSON.parse(JSON.stringify(element)))[0]
        }catch(e){
            console.log(e)
        }
        // finally{
        //     this.knex.destroy()
        // }
    }
    
    async getAll(){
        try{
            const data = await this.knex.from(this.table).select('*')
            return Object.values(JSON.parse(JSON.stringify(data)))
        }catch(e){
            console.log(e)
        }
        // finally{
        //     this.knex.destroy()
        // }
    }

    async deleteById(pId){
        try{
            await this.knex.from(this.table).where({id: pId}).delete()
        }catch(e){
            console.log(e)
        }
        // finally{
        //     this.knex.destroy()
        // }
    }

    async deleteAll(){
        await this.knex.raw(`TRUNCATE ${this.table}`)
        .then(() => {
            console.log('Table truncated')
        })
        .catch((e) => {console.log(e)}) 
        .finally(() => {this.knex.destroy()}) 
    }
}

module.exports = Container

// const { sqlite3 } = require('./options/sqlite3')
// const { mariaDB } = require('./options/mariaDB')
// const { stringify } = require('querystring')
// const cont1 =  new Container(mariaDB, 'products')
// let products = []
// let product = null 
// let id = 0
// const productsSample = [
//     {
//         title: 'Fiat Tipo',
//         price: 15050.20,
//         thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/2016_Fiat_Tipo_Easy%2B_T-Jet_1.4_Front.jpg'
//     },
//     {
//         title: 'Fiat Duna',
//         price: 1100.05,
//         thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Fiat_Duna601.png'
//     },
//     {
//         title: 'VW Suran',
//         price: 25000.35,
//         thumbnail: 'https://fotos.perfil.com/2017/02/01/trim/1280/720/1-suran-track-02.png'
//     }
// ]

// async function containterTests(){
//     products = await cont1.getAll()
//     console.log('### Initial products:', products)
//     console.log(`### Initial products' length: ${products.length}`)
//     product = await cont1.getById(1)
//     console.log('### Product gotten from ID 1:', product)
//     product = await cont1.getById(2)
//     console.log('### Product gotten from ID 2:', product)
//     id = await cont1.save(product1)
//     console.log(`### ID received after saving ${product1.title}: ${id}`)
//     product = await cont1.getById(id)
//     console.log('### Product gotten from ID ', id, ':', product)
//     id = await cont1.save(product2)
//     console.log(`### ID received after saving ${product2.title}: ${id}`)
//     product = await cont1.getById(id)
//     console.log('### Product gotten from ID ', id, ':', product)
//     await cont1.deleteById(3)
//     products = await cont1.getAll()
//     console.log('### Products after having deleted ID 3:', products)
//     await cont1.deleteById(4)
//     products = await cont1.getAll()
//     console.log('### Products after having deleted ID 4:', products)
//     await cont1.deleteById(1)
//     products = await cont1.getAll()
//     console.log('### Products after having deleted ID 1:', products)
//     id = await cont1.save(product3)
//     console.log(`### ID received after saving ${product3.title}: ${id}`)
//     product = await cont1.getById(id)
//     console.log('### Product gotten from ID ', id, ':', product)
//     products = await cont1.getAll()
//     console.log('### All current products:', products)
//     cont1.deleteAll()
//     products = await cont1.getAll()
//     console.log('### Products after deletion of all:', products)
// }

// containterTests()