const { sqlite3 } = require('./options/sqlite3')
const { mariaDB } = require('./options/mariaDB')
const knex = require('knex')

async function generateTables() {
    /* Products table */
    const knexSqlite3 = require('knex')(sqlite3)
    try{
        await knexSqlite3.schema.createTable('products', table => {
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
        knexSqlite3.destroy()
    }
}

generateTables()