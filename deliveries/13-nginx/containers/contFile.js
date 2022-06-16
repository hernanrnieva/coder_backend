const fs = require('fs')

class ContainerFile{
    /* Constructor */
    constructor(path){
        this.path = path
        try{
            fs.readFile(this.path, 'utf-8')
        }catch(e){
            fs.closeSync(fs.openSync(this.path, 'a'))
        }
    }

    /* Methods */
    async save(product){
        /* Reads the whole file in order to correctly stringify */
        const content = await this.getAll()

        /* Makes a copy of the original object not to disturb it */
        const newProduct = Object.assign({}, product) 
        const newId = content.length > 0 ? content[content.length - 1].id + 1 : 1
        newProduct["id"] = newId 

        /* Writes dependening on previous read */
        try{
            if(content != null){
                await fs.promises.writeFile(this.path, JSON.stringify([...content, newProduct]))
            }else{
                await fs.promises.writeFile(this.path, JSON.stringify(newProduct))
            }
            return newId
        }catch(e){
            console.log(e)
            return null
        }
    }

    async getById(id){
        try {
            const products = await this.getAll()
            return products.find(p => id == p.id)
        } catch (e) {
            console.log(e)
        }
    }
    
    async getAll(){
        try{
            /* Reads and JSON formats */
            const content = await fs.promises.readFile(this.path, 'utf-8')
            const contentP = content? JSON.parse(content) : null

            /* Creates array based on JSON object and returns it */
            const contentArray = []
            if(content)
                for (let i in contentP) {
                    contentArray.push(contentP[i])
                }

            return contentArray
        }catch(e){
            return null
        }
    }

    async updateById(pId, product){
        try{
            const products = await this.getAll()
            const idx = products.findIndex(p => p.id == pId)
            if(idx < 0)
                return null
            
            product["id"] = parseInt(pId)
            products[idx] = product
            
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return product
        }catch(e){
            console.log(e)
        }
    }

    async deleteById(id){
        try{
            const products = await this.getAll()
            const idx = products.findIndex(p => p.id == id)
            if(idx < 0)
                return `Could not delete product with id ${id}`
            
            let removed = products.splice(idx, 1)
            
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return removed
        }catch(e){
            console.log(e)
        }
    }

    deleteAll(){
        try{
            /* Opens and closes file to force blanking */
            fs.closeSync(fs.openSync(this.path, 'w'))
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = ContainerFile