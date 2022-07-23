class ProductDto {

    constructor(product) {
        this.id = product.id
        this.title = product.title
        this.price = product.price
        this.thumbnail = product.thumbnail
    }
}

module.exports = ProductDto