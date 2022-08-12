import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {};

  @Get()
  getProducts(@Req() req): ProductDTO[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param() params): ProductDTO {
    try {
      const product = this.productService.getProductById(params.id);
      return product;
    } catch(e) {
      throw new HttpException(e.message, 404);
    }
  }

  @Post()
  createProduct(@Body() product: ProductDTO): ProductDTO {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProductById(@Param() params, @Body() product: ProductDTO): ProductDTO {
    try {
      const newProduct = this.productService.updateProductById(params.id, product);
      return newProduct;
    } catch(e) {
      throw new HttpException(e.message, 404);
    }
  }

  @Delete(':id')
  deleteProductById(@Param() params): ProductDTO {
    try {
      const deleted = this.productService.deleteProductById(params.id);
      return deleted;
    } catch(e) {
      throw new HttpException(e.message, 404);
    }
  }

}