import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtTokenAuthDto } from './dto/jwt-token-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 201,
    description: 'JWT token',
    type: JwtTokenAuthDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<JwtTokenAuthDto> {
    return this.authService.login(loginAuthDto);
  }

  @Post('registration')
  @ApiOperation({ summary: 'Registration a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created', type: UserDto })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  async registration(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  // TODO We need to finish the logic of the refresh token and also delete the old token
}
