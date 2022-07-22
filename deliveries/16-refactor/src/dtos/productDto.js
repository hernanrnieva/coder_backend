class ProductDto {

    constructor(product) {
        this.title = product.title
        this.price = product.price
        this.thumbnail = product.thumbnail
    }
}

module.exports = ProductDto