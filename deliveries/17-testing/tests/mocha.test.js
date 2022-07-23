const mocha = require('mocha')
const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

const testProduct = {
    title: 'Test product',
    price: 3414,
    thumbnail: 'this is a thumbnail'
}

mocha.describe("Getting products", async () => {
    let id

    it('Getting products returns products added to the moment', async () => {
        let res = await request.get("/testProducts")

        expect(res.status).to.eql(200)
    })

    it('Adding a new product assings an id to it', async () => {
        let res = await request
            .post("/testProducts", testProduct)
            .send(testProduct)

        id = res.body

        expect(res.status).to.eql(200)
        expect(id).not.to.undefined
    })

    it('Updating product updates it title as requested', async () => {
        const newTitle = 'Updated via Mocha'

        let res = await request
            .put(`/testProducts/${id}`)
            .send({ title: 'Updated via Mocha' })

        const updatedTitle = res.body.title

        expect(res.status).to.eql(200)
        expect(updatedTitle).to.eql(newTitle)
    })

    it('Deleting a product deletes it successfully', async () => {
        let res = await request.delete(`/testProducts/${id}`)

        expect(res.status).to.eql(200)
    })
})