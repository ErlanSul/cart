import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ProductService } from '../product/product.service';
import { CartItemDetailsDto } from './dto/cart-item-details.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async addItemToCart(
    userId: number,
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemDetailsDto[]> {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    await this.productService.findOne(createCartItemDto.productId);

    await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: createCartItemDto.productId,
        quantity: createCartItemDto.quantity,
      },
    });

    return await this.getCartItems(userId);
  }

  async getCartItems(userId: number): Promise<CartItemDetailsDto[]> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || !cart.items) {
      throw new HttpException(`Cart not found`, HttpStatus.NOT_FOUND);
    }

    return cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      createdAt: item.createdAt,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
      },
    }));
  }
  // TODO This is the second option for returning the basket, it was not clearly described in the terms of reference
  /*
  async getCartItems(userId: number): Promise<any[]> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || !cart.items) {
      throw new HttpException(`Cart not found`, HttpStatus.NOT_FOUND);
    }

    // Агрегация элементов корзины по productId
    const aggregatedItems = cart.items.reduce((acc, item) => {
      if (acc[item.productId]) {
        acc[item.productId].quantity += item.quantity;
      } else {
        acc[item.productId] = {
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        };
      }
      return acc;
    }, {});

    // Преобразование объекта в массив
    return Object.values(aggregatedItems);
  }
*/

  async updateCartItem(
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItemDetailsDto[]> {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId: userId,
        },
      },
    });

    if (!cartItem) {
      throw new HttpException(
        `CartItem with ID ${cartItemId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: updateCartItemDto,
    });

    return await this.getCartItems(userId);
  }

  async removeCartItem(
    userId: number,
    cartItemId: number,
  ): Promise<CartItemDetailsDto[]> {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId: userId,
        },
      },
    });

    if (!cartItem) {
      throw new HttpException(
        `CartItem with ID ${cartItemId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return await this.getCartItems(userId);
  }
}
