import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The new name of the user',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'The new email of the user',
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}
