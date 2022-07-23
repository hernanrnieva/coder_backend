const axios = require("axios")

const testProduct = {
    title: "Test product",
    price: 3414,
    thumbnail: "this is a thumbnail"
}

const printSeparator = () => {
    console.log('----------------------------')
}

const printFailure = () => {
    console.log('Test failed')
    printSeparator()
}

const printSuccess = (message) => {
    console.log('Test succeded: ' + message)
    printSeparator()
}

const testAddProduct = async () => {
    try {
        printSeparator()

        console.log('Adding product')
        const res = await axios.post('http://localhost:8080/testProducts/', testProduct)

        const id = res.data

        printSuccess(`Received id ${id} from response`)

        return id
    } catch (e) {
        printFailure()
    }
}

const testGetProducts = async (id) => {
    try {
        printSeparator()

        console.log('Getting products')
        const res = await axios.get('http://localhost:8080/testProducts/')

        const products = res.data

        const index = products.findIndex((p) => p.id == id)
        if(index < 0) {
            throw 'Test error'
        }

        printSuccess(`Product with id ${id} received among the other products`)
    } catch (e) {
        printFailure()
    }
}

const testUpdateProduct = async (id) => {
    try {
        printSeparator()

        console.log('Updating product')
        const res = await axios.put(`http://localhost:8080/testProducts/${id}`, {title: 'Updated'})
        const newTitle = res.data.title

        printSuccess(`Product with title '${newTitle}' received after updating`)
    } catch (e) {
        printFailure()
    }
}

const testDeleteProduct = async (id) => {
    try {
        printSeparator()

        console.log('Deleting product');
        const res = await axios.delete(`http://localhost:8080/testProducts/${id}`)

        printSuccess(res.data)
    } catch (e) {
        printFailure()
    }
}

const test = async () => {
    console.log('\n\n##### AXIOS TESTING #####')
    const id = await testAddProduct()
    await testGetProducts(id)
    await testUpdateProduct(id)
    await testDeleteProduct(id)
}

test()