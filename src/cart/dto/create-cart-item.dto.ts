import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateCartItemDto } from './update-cart-item.dto';

export class CreateCartItemDto extends UpdateCartItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;
}
