import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '../../config/config.service';
export const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.jwtSecret,
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  async validate(req: Request, payload: any) {
    const token = this.extractTokenFromHeader(req);
    if (!token || token === '') {
      throw new HttpException(`Token has expired`, HttpStatus.FORBIDDEN);
    }

    return { ...payload };
  }
}
