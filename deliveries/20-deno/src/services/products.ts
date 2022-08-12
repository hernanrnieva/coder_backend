import { ProductDTO } from '../data/dtos/product.ts'

class ProductService {
    productList: ProductDTO[] = []

    getProducts(): ProductDTO[] {
        return this.productList
    }

    createProduct(product: ProductDTO): ProductDTO {
        this.productList.push(product)
        return product
    }

    getProductById(id: number): ProductDTO {
        const idx = this.productList.findIndex(p => p.id == id)
        if(idx < 0)
            throw new Error(`Product with id ${id} could not be found`)

        return this.productList[idx]
    }

    updateProductById(id: number, updated: ProductDTO): ProductDTO {
        const idx = this.productList.findIndex(p => p.id == id)
        if(idx < 0)
            throw new Error(`Product with id ${id} could not be found`)

        this.productList[idx] = updated

        return this.productList[idx]
    }

    deleteProductById(id: number): ProductDTO {
        const idx = this.productList.findIndex(p => p.id == id)
        if(idx < 0)
            throw new Error(`Product with id ${id} could not be found`)

        const deleted = this.productList.splice(idx, 1)
        
        return deleted[0]
    }
}

const productService = new ProductService()

export {
    productService
}