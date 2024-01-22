import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Super Gadget',
    description: 'The name of the product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
