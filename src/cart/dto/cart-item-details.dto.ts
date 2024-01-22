import { ApiProperty } from '@nestjs/swagger';

class ProductDetailsDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Product Name' })
  name: string;

  @ApiProperty({ example: 100 })
  price: number;
}

export class CartItemDetailsDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 3 })
  quantity: number;

  @ApiProperty({ example: '2024-01-22T02:15:48.631Z' })
  createdAt: Date;

  @ApiProperty({ type: ProductDetailsDto })
  product: ProductDetailsDto;
}
