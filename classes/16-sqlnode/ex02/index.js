const knex = require('knex')({
    client: 'sqlite3',
    connection: {filename: './DB/cars.sqlite'}
})

const sqlite = async function(){
    try{
        await knex.schema.createTable('cars', (table) => {
            table.increments('id')
            table.string('name', 200)
            table.string('price', 5)
        })
    }
    catch(e){
        console.log(`Error encountered ${e}`)
    }
    finally{
        knex.destroy()
    }
}

sqlite()