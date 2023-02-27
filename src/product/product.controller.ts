import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProduct({ id });
  }

  @Get('/')
  async getAllProducts() {
    return this.productService.getAllProducts({});
  }

  @Post('/:user_id')
  async createProduct(
    @Param('user_id') user_id: string,
    @Body()
    body: {
      name: string;
      description: string;
      discount: number;
      price: number;
      image: string;
      business: string;
      sku: string;
      upc: string;
      stock: number;
      gst_number: string;
    },
  ) {
    return this.productService.createProduct({
      name: body.name,
      description: body.description,
      discount: body.discount,
      price: body.price,
      image: body.image,
      business: { connect: { id: body.business } },
      sku: body.sku,
      upc: body.upc,
      stock: body.stock,
      gst_number: body.gst_number,
      created_by: { connect: { id: user_id } },
    });
  }

  @Patch('/:user_id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    body: {
      id: string;
      name: string;
      description: string;
      discount: number;
      price: number;
      image: string;
      business: string;
      sku: string;
      upc: string;
      stock: number;
      gst_number: string;
    },
  ) {
    return this.productService.updateProduct({
      data: {
        name: body.name,
        description: body.description,
        discount: body.discount,
        price: body.price,
        image: body.image,
        business: { connect: { id: body.business } },
        sku: body.sku,
        upc: body.upc,
        stock: body.stock,
        gst_number: body.gst_number,
      },
      where: { id: body.id },
    });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct({ id });
  }
}
