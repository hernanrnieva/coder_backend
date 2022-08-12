import { ProductDTO } from '../data/dtos/product.ts'
import { productService } from '../services/products.ts'

class ProductController {
    getProducts(): ProductDTO[] {
        return productService.getProducts()
    }

    createProduct(p: ProductDTO) {
        return productService.createProduct(p)
    }

    getProductById(id: number): ProductDTO {
        return productService.getProductById(id)
    }

    updateProductById(id: number, updated: ProductDTO): ProductDTO {
        return productService.updateProductById(id, updated)
    }

    deleteProductById(id: number): ProductDTO {
        return productService.deleteProductById(id)
    }
}

const productController = new ProductController()

export {
    productController
}