import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenAuthDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA1ODgxMDU2LCJleHAiOjE3MDU4ODExMTZ9.PQBYFuEcBH6zEz7QIzdQX6e6k_9HF1j4yYX6IU5bHmw',
    description: 'JWT token',
  })
  access_token: string;
}
