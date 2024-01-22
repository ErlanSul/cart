import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date when the user was created',
  })
  createdAt: Date;
}

export class UserWithUpdatedAtDto extends UserDto {
  @ApiProperty({
    example: '2021-01-02T00:00:00.000Z',
    description: 'The date when the user was last updated',
  })
  updatedAt: Date;
}

export class UserWithDeletedAtDto extends UserDto {
  @ApiProperty({
    example: '2021-01-03T00:00:00.000Z',
    description: 'The date when the user was deleted',
  })
  deletedAt: Date;
}
