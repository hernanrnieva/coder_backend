const mongoose = require('mongoose')

class ContainerMongoDB{
    /* Constructor */
    constructor(url, model){
        this.url = url
        this.model = model
    }

    /* Heleper function for establishing connection */
    async connect(){
        try{
            const res = await mongoose.connect(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        }catch(e){
            console.log(e)
        }
    }

    /* Methods */
    async save(element){
        try{
            await this.connect()
            await this.model.create(element)
            mongoose.disconnect()
        }catch(e){
            console.log(e)
        }
    }

    async getById(id){
        try{
            const elements = await this.getAll()
            return elements.find(e => e.id == id)
        }catch(e){
            console.log(e)
        }
    }
    
    async getAll(){
        try{
            await this.connect()
            const elements = await this.model.find({})
            mongoose.disconnect()
            return elements
        }catch(e){
            console.log(e)
        }
    }

    async updateById(pId, product){
        try{
            await this.connect()
            let newProduct = await this.model.findOneAndUpdate({id: pId}, product, {returnOriginal: false})
            mongoose.disconnect()
            return newProduct
        }catch(e){
            console.log(e)
        }
    }

    async deleteById(pId){
        try{
            await this.connect()
            let result = await this.model.deleteOne({id: pId})
            console.log(result)
            if(result.deletedCount == 0)
                return `Product with id ${pId} could not be deleted`
            else
                return `Product with id ${pId} deleted successfully`
        }catch(e){
            console.log(e)
        }
    }

    async deleteAll(){
        try{
            await this.connect()
            this.model.deleteMany()
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = ContainerMongoDB