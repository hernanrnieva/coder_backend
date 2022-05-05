const { sqlite3 } = require('./options/sqlite3')
const { mariaDB } = require('./options/mariaDB')
const knex = require('knex')

async function generateTables() {
    /* Products table */
    const knexMariaDB = require('knex')(mariaDB)
    try{
        await knexMariaDB.schema.createTable('products', table => {
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
        })
    }
    catch(e){
        // TODO: error handling for when tables already exist
    }
    finally{
        knexMariaDB.destroy()
    }

    /* Messages table */
    const knexSQLite = require('knex')(sqlite3)
    try{
        await knexSQLite.schema.createTable('messages', table => {
            table.increments('id')
            table.string('text')
            table.string('date')
            table.string('email')
        })
    }
    catch(e){
        // TODO: error handling for when tables already exist
    }
    finally{
        knexSQLite.destroy()
    }
}

generateTables()