const fs = require('fs')

let data = fs.readFile('./package.json', (error, data)=>{
    if(error) {
        console.log(error)
    } else {
        let parsedData = JSON.parse(data)
        console.log(JSON.stringify(parsedData, null, 2))
        fs.writeFile('info.txt', JSON.stringify(parsedData, null, 2), (error, datos)=>{
            if(error){
                console.log(error)
            }else{
                console.log('File generated')
            }
        })
    }
})
