import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(): Promise<ProductDto[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number, ignoreNotFound = false): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product && !ignoreNotFound) {
      throw new HttpException(
        `Product with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
