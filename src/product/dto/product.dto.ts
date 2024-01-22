import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the product',
  })
  id: number;

  @ApiProperty({
    example: 'Awesome Gadget',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: 49.99,
    description: 'The price of the product',
  })
  price: number;

  @ApiProperty({
    example: '2021-04-11T10:20:30Z',
    description: 'The date when the product was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-04-11T10:20:30Z',
    description: 'The date when the product was last updated',
  })
  updatedAt: Date;
}
