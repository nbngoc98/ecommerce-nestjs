import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../types/product';

// import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(productDTO: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create({
      ...productDTO,
    });
    await product.save();
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async update(
    id: string,
    productDTO: UpdateProductDto,
    // userId: string,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);
    // if (userId !== product.owner.toString()) {
    //   throw new HttpException(
    //     'You do not own this product',
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }
    await product.update(productDTO);
    return await this.productModel.findById(id);
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id);
    if (product) {
      await product.remove();
      return `Delete Done`;
    }
    return `No data`;
  }
}
