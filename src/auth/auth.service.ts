import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { JwtTokenAuthDto } from './dto/jwt-token-auth.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginAuth: LoginAuthDto): Promise<UserDto> {
    const { email, password } = loginAuth;
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }

    throw new HttpException(`Invalid password or email`, HttpStatus.FORBIDDEN);
  }

  async login(loginAuth: LoginAuthDto): Promise<JwtTokenAuthDto> {
    const user: UserDto = await this.validateUser(loginAuth);
    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.jwtSecret,
        expiresIn: this.configService.jwtTimeout,
      }),
    };
  }
}
