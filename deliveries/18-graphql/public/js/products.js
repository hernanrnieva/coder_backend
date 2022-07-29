function createProduct() {
    const product = {
        title: document.getElementById('title').value,
        price: parseInt(document.getElementById('price').value),
        thumbnail: document.getElementById('thumbnail').value
    }

    const graphqlQuery = {
        "operationName" : "createProduct",
        "query": `mutation createProduct {            
            createProduct(data: {                
                title: "${product.title}",                
                price: ${product.price},                
                thumbnail: "${product.thumbnail}" 
            }) {                
                id,                
                title,                
                price,                
                thumbnail            
            }
        }`
    }

    const options = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(graphqlQuery)
    }

    fetch('/productsQl', options)
    .then(data => {
        generateHtml()
    })
}

function generateHtml() {
    const graphqlQuery = {
        "operationName" : "generateHtml",
        "query": `query generateHtml { 
            generateHtml
        }`
    }

    const options = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(graphqlQuery)
    }

    fetch('/productsQl', options)
    .then(data => {
        data.json().then((final) => {
            document.getElementById('products').innerHTML = final.data.generateHtml
        })
    })
}

generateHtml()