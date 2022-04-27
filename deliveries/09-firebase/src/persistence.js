const fs = require('fs')

class Persistence {
    constructor(path){
        this.path = path
    }

    writeFile(content){
        fs.writeFileSync(this.path, JSON.stringify(content))
    }

    readFile() {
        try{
            const data = fs.readFileSync(this.path, 'utf-8')
            const parsedData = JSON.parse(data)
            return parsedData
        }catch(e){
            return [] 
        }
    }
}

module.exports = Persistence