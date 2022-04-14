const { sqlite3 } = require('./options/sqlite3')
const { mariaDB } = require('./options/mariaDB')
const knex = require('knex')

const knexSQLite = require('knex')(sqlite3)
const knexMariaDB = require('knex')(mariaDB)

async function generateTables() {
    /* Products table */
    try{
        await knexMariaDB.schema.createTable('products', table => {
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
        })
    }
    catch(e){
        console.log(`Error encountered: ${e}`)
        return null
    }
    finally{
        knexMariaDB.destroy()
    }
    console.log('Products table created')

    /* Messages table */
    try{
        await knexSQLite.schema.createTable('messages', table => {
            table.increments('id')
            table.string('text')
            table.string('date')
            table.string('email')
        })
    }
    catch(e){
        console.log(`Error encountered: ${e}`)
        return null
    }
    finally{
        knexSQLite.destroy()
    }
    console.log('Messages table created')
}

module.exports = generateTables