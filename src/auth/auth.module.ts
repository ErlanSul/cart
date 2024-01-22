// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';
export const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: configService.jwtSecret,
      signOptions: {
        expiresIn: configService.jwtTimeout,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AuthModule {}
