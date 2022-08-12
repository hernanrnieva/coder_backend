import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  productList: ProductDTO[] = [];

  getProducts(): ProductDTO[] {
    return this.productList;
  }

  getProductById(id: number): ProductDTO {
    const idx = this.findProductIndex(id)
    
    return this.productList[idx]
  }

  createProduct(product: ProductDTO): ProductDTO {
    this.productList.push(product)
    return product
  }

  updateProductById(id: number, product: ProductDTO): ProductDTO {
    const idx = this.findProductIndex(id)

    this.productList[idx] = product

    return this.productList[idx]
  }

  deleteProductById(id: number) {
    const idx = this.findProductIndex(id)

    const deleted = this.productList.splice(idx, 1)
    
    return deleted[0]
  }

  findProductIndex(id) {
    const idx = this.productList.findIndex(p => p.id == id)
    if(idx < 0)
      throw new Error(`Product with id ${id} does not exist`)

    return idx
  }
}