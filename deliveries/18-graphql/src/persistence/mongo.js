const mongoose = require('mongoose')
process.on('exit', () => {
    if(mongoose.connection.readyState == 1)
        mongoose.disconnect()
})

class ContainerMongoDB{
    /* Constructor */
    constructor(url, model){
        this.url = url
        this.model = model
    }

    /* Heleper function for establishing connection */
    async connect(){
        try {
            if(mongoose.connection.readyState == 0) {
                await mongoose.connect(this.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            }
        } catch(e) {
            console.log(e)
        }
    }

    /* Methods */
    async save(element){
        try{
            await this.connect()
            await this.model.create(element)
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
            const elements = await this.model.find({}).lean()
            return elements
        }catch(e){
            console.log(e)
        }
    }

    async updateById(pId, product){
        try{
            await this.connect()
            let newProduct = await this.model.findOneAndUpdate({id: pId}, product, {returnOriginal: false})
            return newProduct
        }catch(e){
            console.log(e)
        }
    }

    async deleteById(pId){
        try{
            await this.connect()
            let result = await this.model.deleteOne({id: pId})
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