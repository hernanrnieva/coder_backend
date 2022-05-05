const fs = require('fs')

class ContainerDB{
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

module.exports = ContainerDB