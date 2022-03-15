const fs = require('fs')

class Container{
    /* Constructor */
    constructor(path){
        this.path = path
        console.log('Container initialized')
    }

    /* Methods */
    async save(product){
        /* Reads the whole file in order to correctly stringify */
        let content = await this.getAll()

        /* Makes a copy of the original object not to disturb it */
        let newProduct = Object.assign({}, product) 
        const newId = content[content.length - 1].id + 1 
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
            console.log('e')
            return null
        }
    }

    async getById(id){
        let products = []
        try {
            products = await this.getAll()
            return products.find(p => id === p.id)
        } catch (e) {
            console.log(e)
        }
    }
    
    async getAll(){
        try{
            /* Reads and JSON formats */
            let content = await fs.promises.readFile(this.path, 'utf-8')
            let contentP = JSON.parse(content)

            /* Creates array based on JSON object and returns it */
            let contentArray = []
            for (let i in contentP) {
                contentArray.push(contentP[i])
            }
            return contentArray
        }catch(e){
            return null
        }
    }

    async deleteById(id){
        try{
            const content = await this.getAll()
            const idx = content.findIndex(p => p.id === id)
            content.splice(idx, 1)
            fs.writeFileSync(this.path, JSON.stringify([...content]))
        }catch(e){
            console.log('Could not delete product with specified id')
        }
    }

    deleteAll(){
        try{
            fs.closeSync(fs.openSync(this.path, 'w'));
            this.idCounter = 0
        }catch(e){
            console.log('File could not be emptied')
        }
    }
}

/* * * * * Tests * * * * */
const cont1 = new Container('cars.txt')
let products = []
let product = null 
let id = 0
const product1 = {
    title: 'Fiat Tipo',
    price: 15050.20,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/2016_Fiat_Tipo_Easy%2B_T-Jet_1.4_Front.jpg'
}
const product2 = {
    title: 'Fiat Duna',
    price: 1100.05,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Fiat_Duna601.png'
}
const product3 = {
    title: 'VW Suran',
    price: 25000.35,
    thumbnail: 'https://fotos.perfil.com/2017/02/01/trim/1280/720/1-suran-track-02.png'
}

async function containterTests(){
    products = await cont1.getAll()
    console.log('### Initial products:', products)
    console.log(`### Initial products' length: ${products.length}`)
    product = await cont1.getById(1)
    console.log('### Product gotten from ID 1:', product)
    product = await cont1.getById(2)
    console.log('### Product gotten from ID 2:', product)
    id = await cont1.save(product1)
    console.log(`### ID received after saving ${product1.title}: ${id}`)
    product = await cont1.getById(id)
    console.log('### Product gotten from ID ', id, ':', product)
    id = await cont1.save(product2)
    console.log(`### ID received after saving ${product2.title}: ${id}`)
    product = await cont1.getById(id)
    console.log('### Product gotten from ID ', id, ':', product)
    await cont1.deleteById(3)
    products = await cont1.getAll()
    console.log('### Products after having deleted ID 3:', products)
    await cont1.deleteById(4)
    products = await cont1.getAll()
    console.log('### Products after having deleted ID 4:', products)
    await cont1.deleteById(1)
    products = await cont1.getAll()
    console.log('### Products after having deleted ID 1:', products)
    id = await cont1.save(product3)
    console.log(`### ID received after saving ${product3.title}: ${id}`)
    product = await cont1.getById(id)
    console.log('### Product gotten from ID ', id, ':', product)
    products = await cont1.getAll()
    console.log('### All current products:', products)
    cont1.deleteAll()
    products = await cont1.getAll()
    console.log('### Products after deletion of all:', products)
}

containterTests()