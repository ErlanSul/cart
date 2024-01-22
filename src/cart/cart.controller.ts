import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Authentication } from '../auth/decorators/authentication.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserPayload } from '../auth/interfaces/user-payload.iterface';
import { CartItemDetailsDto } from './dto/cart-item-details.dto';

@ApiTags('Cart')
@Authentication()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiBody({ type: CreateCartItemDto })
  @ApiResponse({ status: 200, type: [CartItemDetailsDto] })
  async addItem(
    @GetUser() user: UserPayload,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemDetailsDto[]> {
    return await this.cartService.addItemToCart(user.id, createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, type: [CartItemDetailsDto] })
  async getCartItems(
    @GetUser() user: UserPayload,
  ): Promise<CartItemDetailsDto[]> {
    return await this.cartService.getCartItems(user.id);
  }

  @Patch('item/:itemId')
  @ApiOperation({ summary: 'Update a cart item' })
  @ApiParam({ name: 'itemId', type: 'number' })
  @ApiBody({ type: UpdateCartItemDto })
  @ApiResponse({ status: 200, type: [CartItemDetailsDto] })
  async updateItem(
    @GetUser() user: UserPayload,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItemDetailsDto[]> {
    return await this.cartService.updateCartItem(
      user.id,
      itemId,
      updateCartItemDto,
    );
  }

  @Delete('item/:itemId')
  @ApiOperation({ summary: 'Remove a cart item' })
  @ApiParam({ name: 'itemId', type: 'number' })
  @ApiResponse({ status: 200, type: [CartItemDetailsDto] })
  async removeItem(
    @GetUser() user: UserPayload,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<CartItemDetailsDto[]> {
    return await this.cartService.removeCartItem(user.id, itemId);
  }
}
